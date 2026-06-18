import { spawn } from 'node:child_process'
import { mkdir, mkdtemp, readdir, readFile, rm, stat, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

type FetchLike = (url: string, init?: RequestInit) => Promise<Response>
type Extractor = (archivePath: string, workDir: string) => Promise<DeclarationFile[]>

export type TypingsKind = 'plugin' | 'widget'

export type TypingsPackage = {
  kind: TypingsKind
  packageName: string
}

export type ResolvedTypingsPackage = TypingsPackage & {
  version: string
  tarballUrl: string
}

export type DeclarationFile = {
  path: string
  sourcePath: string
  bytes: number
}

export type TypingsCrawlResult = ResolvedTypingsPackage & {
  fileCount: number
  files: DeclarationFile[]
}

type CliOptions = {
  outDir: string
  dryRun: boolean
  keep: boolean
}

const DEFAULT_HEADERS = {
  referer: 'https://js.design/jsdesign',
  'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' + '(KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
}

export const OFFICIAL_TYPINGS_PACKAGES: readonly TypingsPackage[] = [
  {
    kind: 'plugin',
    packageName: '@jsdesigndeveloper/plugin-typings',
  },
  {
    kind: 'widget',
    packageName: '@jsdesigndeveloper/widget-typings',
  },
]

export async function crawlOfficialTypings({
  packages = OFFICIAL_TYPINGS_PACKAGES,
  outDir,
  fetchImpl = fetch,
  keep = false,
  extractor = extractDeclarationFilesWith7z,
  capturedAt = new Date().toISOString().slice(0, 10),
}: {
  packages?: readonly TypingsPackage[]
  outDir: string
  fetchImpl?: FetchLike
  keep?: boolean
  extractor?: Extractor
  capturedAt?: string
}): Promise<TypingsCrawlResult[]> {
  if (!keep) {
    await rm(outDir, { force: true, recursive: true })
  }
  await mkdir(outDir, { recursive: true })

  const workRoot = await mkdtemp(path.join(os.tmpdir(), 'official-typings-'))

  try {
    const results: TypingsCrawlResult[] = []

    for (const packageSpec of packages) {
      const packageInfo = await resolveTypingsPackage(packageSpec, fetchImpl)
      const packageWorkDir = path.join(workRoot, packageInfo.kind)
      await mkdir(packageWorkDir, { recursive: true })

      const archivePath = path.join(packageWorkDir, `${packageInfo.kind}.tgz`)
      await downloadTarball(packageInfo.tarballUrl, archivePath, fetchImpl)

      const files = await extractor(archivePath, packageWorkDir)
      const packageDir = path.posix.join(packageInfo.kind)

      for (const file of files) {
        const outputPath = resolveOutputPath(outDir, path.posix.join(packageDir, file.path))
        await mkdir(path.dirname(outputPath), { recursive: true })
        await writeDeclarationFile(outputPath, file.sourcePath, packageInfo, capturedAt)
      }

      results.push({
        ...packageInfo,
        fileCount: files.length,
        files,
      })
    }

    await writeManifest(outDir, results, capturedAt)
    return results
  } finally {
    await rm(workRoot, { force: true, recursive: true })
  }
}

export async function resolveTypingsPackage(packageSpec: TypingsPackage, fetchImpl: FetchLike = fetch): Promise<ResolvedTypingsPackage> {
  const metadataUrl = `https://registry.npmjs.org/${encodeURIComponent(packageSpec.packageName).replace('%40', '@')}`
  const response = await fetchImpl(metadataUrl, { headers: DEFAULT_HEADERS })

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} while fetching ${metadataUrl}`)
  }

  const metadata = (await response.json()) as {
    'dist-tags'?: { latest?: unknown }
    versions?: Record<string, { dist?: { tarball?: unknown } }>
  }
  const version = metadata['dist-tags']?.latest

  if (typeof version !== 'string') {
    throw new Error(`No latest dist-tag found for ${packageSpec.packageName}`)
  }

  const tarballUrl = metadata.versions?.[version]?.dist?.tarball

  if (typeof tarballUrl !== 'string') {
    throw new Error(`No tarball URL found for ${packageSpec.packageName}@${version}`)
  }

  return {
    ...packageSpec,
    version,
    tarballUrl,
  }
}

export function parseArgs(args: string[], cwd = process.cwd()): CliOptions {
  const options: CliOptions = {
    outDir: path.resolve(cwd, 'temp', 'official-typings'),
    dryRun: false,
    keep: false,
  }

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index]
    if (arg === '--out-dir') {
      options.outDir = path.resolve(cwd, requireValue(args, (index += 1), arg))
    } else if (arg === '--dry-run') {
      options.dryRun = true
    } else if (arg === '--keep') {
      options.keep = true
    } else {
      throw new Error(`Unknown argument: ${arg}`)
    }
  }

  return options
}

export function resolveOutputPath(outDir: string, relativePath: string): string {
  const normalizedParts = relativePath.split('/').filter(Boolean)
  const outputPath = path.resolve(outDir, ...normalizedParts)
  const outputRoot = path.resolve(outDir)

  if (outputPath !== outputRoot && !outputPath.startsWith(`${outputRoot}${path.sep}`)) {
    throw new Error(`Output path escapes output directory: ${relativePath}`)
  }

  return outputPath
}

export async function extractDeclarationFilesWith7z(archivePath: string, workDir: string): Promise<DeclarationFile[]> {
  const tgzDir = path.join(workDir, 'tgz')
  const packageDir = path.join(workDir, 'package')

  await mkdir(tgzDir, { recursive: true })
  await mkdir(packageDir, { recursive: true })

  await run7z(['x', '-y', `-o${tgzDir}`, archivePath])

  const tarPath = (await listFiles(tgzDir)).find((file) => file.toLowerCase().endsWith('.tar'))
  if (!tarPath) {
    throw new Error(`7z did not extract a .tar file from ${archivePath}`)
  }

  await run7z(['x', '-y', `-o${packageDir}`, tarPath])

  const extractedFiles = await listFiles(packageDir)
  const declarations: DeclarationFile[] = []

  for (const sourcePath of extractedFiles) {
    if (!sourcePath.endsWith('.d.ts')) continue

    const relativeToPackage = path.relative(path.join(packageDir, 'package'), sourcePath)
    if (relativeToPackage.startsWith('..') || path.isAbsolute(relativeToPackage)) continue

    const normalizedPath = normalizePackagePath(relativeToPackage)
    const info = await stat(sourcePath)
    declarations.push({
      path: normalizedPath,
      sourcePath,
      bytes: info.size,
    })
  }

  return declarations.sort((a, b) => a.path.localeCompare(b.path))
}

async function downloadTarball(url: string, outputPath: string, fetchImpl: FetchLike): Promise<void> {
  const response = await fetchImpl(url, { headers: DEFAULT_HEADERS })

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} while fetching ${url}`)
  }

  const bytes = Buffer.from(await response.arrayBuffer())
  await writeFile(outputPath, bytes)
}

async function writeDeclarationFile(outputPath: string, sourcePath: string, packageInfo: ResolvedTypingsPackage, capturedAt: string): Promise<void> {
  const content = await readFile(sourcePath, 'utf8')
  const header = `${[`// Crawl-Date: ${capturedAt}`, `// Package: ${packageInfo.packageName}`, `// Version: ${packageInfo.version}`].join('\n')}\n\n`

  await writeFile(outputPath, `${header}${content}`, 'utf8')
}

async function writeManifest(outDir: string, results: TypingsCrawlResult[], capturedAt: string) {
  const manifest = {
    capturedAt,
    source: 'official npm typings packages',
    extractor: '7z',
    output: 'plugin and widget directories mirror package .d.ts files',
    count: results.length,
    packages: results.map((result) => ({
      kind: result.kind,
      packageName: result.packageName,
      version: result.version,
      tarballUrl: result.tarballUrl,
      fileCount: result.fileCount,
      files: result.files.map((file) => ({
        path: file.path,
        bytes: file.bytes,
      })),
    })),
  }

  await writeFile(path.join(outDir, 'crawl-manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8')
}

async function listFiles(root: string): Promise<string[]> {
  const entries = await readdir(root, { withFileTypes: true })
  const files: string[] = []

  for (const entry of entries) {
    const entryPath = path.join(root, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await listFiles(entryPath)))
    } else if (entry.isFile()) {
      files.push(entryPath)
    }
  }

  return files
}

async function run7z(args: string[]): Promise<void> {
  const { code, stderr } = await runCommand('7z', args)

  if (code !== 0) {
    throw new Error(`7z ${args.join(' ')} failed with exit code ${code}${stderr ? `: ${stderr}` : ''}`)
  }
}

function runCommand(command: string, args: string[]): Promise<{ code: number | null; stderr: string }> {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: ['ignore', 'ignore', 'pipe'],
      windowsHide: true,
    })
    let stderr = ''

    child.stderr.setEncoding('utf8')
    child.stderr.on('data', (chunk: string) => {
      stderr += chunk
    })
    child.on('error', (error) => {
      if ('code' in error && error.code === 'ENOENT') {
        reject(new Error('7z is required to crawl official typings, but it was not found on PATH. Install 7-Zip or NanaZip and expose a 7z command.'))
      } else {
        reject(error)
      }
    })
    child.on('close', (code) => resolve({ code, stderr: stderr.trim() }))
  })
}

function normalizePackagePath(relativePath: string): string {
  const normalized = path.posix.normalize(relativePath.replaceAll('\\', '/'))

  if (normalized.startsWith('../') || normalized === '..' || path.posix.isAbsolute(normalized)) {
    throw new Error(`Package path escapes package root: ${relativePath}`)
  }

  return normalized
}

function requireValue(args: string[], index: number, name: string): string {
  const value = args[index]
  if (!value) throw new Error(`${name} requires a value`)
  return value
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)

if (isMain) {
  const options = parseArgs(process.argv.slice(2))

  if (options.dryRun) {
    console.log(
      JSON.stringify(
        {
          outputDirectory: options.outDir,
          count: OFFICIAL_TYPINGS_PACKAGES.length,
          packages: OFFICIAL_TYPINGS_PACKAGES,
        },
        null,
        2,
      ),
    )
  } else {
    crawlOfficialTypings({
      outDir: options.outDir,
      keep: options.keep,
    })
      .then((results) => {
        console.log(`Wrote ${results.reduce((count, result) => count + result.fileCount, 0)} declaration files to ${options.outDir}`)
      })
      .catch((error: unknown) => {
        console.error(error instanceof Error ? error.message : error)
        process.exitCode = 1
      })
  }
}
