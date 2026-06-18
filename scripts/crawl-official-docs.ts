import { mkdir, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { OFFICIAL_DOCS, type OfficialDocEntry } from './official-docs-list.ts'

type FetchLike = (url: string, init?: RequestInit) => Promise<Response>

type CliOptions = {
  outDir: string
  dryRun: boolean
  keep: boolean
}

type CrawlResult = {
  title: string
  url: string
  path: string
  bytes: number
}

const DEFAULT_HEADERS = {
  referer: 'https://js.design/jsdesign',
  'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' + '(KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
}

export async function crawlOfficialDocs({ docs, outDir, fetchImpl = fetch, keep = false }: { docs: readonly OfficialDocEntry[]; outDir: string; fetchImpl?: FetchLike; keep?: boolean }): Promise<CrawlResult[]> {
  if (!keep) {
    await rm(outDir, { force: true, recursive: true })
  }
  await mkdir(outDir, { recursive: true })

  const results: CrawlResult[] = []

  for (const doc of docs) {
    const markdown = await fetchMarkdown(doc.url, fetchImpl)
    const outputPath = resolveOutputPath(outDir, doc.path)
    await mkdir(path.dirname(outputPath), { recursive: true })
    await writeFile(outputPath, markdown, 'utf8')
    results.push({
      title: doc.title,
      url: doc.url,
      path: doc.path,
      bytes: Buffer.byteLength(markdown, 'utf8'),
    })
  }

  await writeManifest(outDir, results)
  return results
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

export function parseArgs(args: string[], cwd = process.cwd()): CliOptions {
  const options: CliOptions = {
    outDir: path.resolve(cwd, 'temp', 'official-docs'),
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

async function fetchMarkdown(url: string, fetchImpl: FetchLike): Promise<string> {
  const response = await fetchImpl(url, { headers: DEFAULT_HEADERS })

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} while fetching ${url}`)
  }

  return response.text()
}

async function writeManifest(outDir: string, results: CrawlResult[]) {
  const manifest = {
    capturedAt: new Date().toISOString(),
    sourceList: 'scripts/official-docs-list.ts',
    count: results.length,
    documents: results,
  }

  await writeFile(path.join(outDir, 'crawl-manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8')
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
          count: OFFICIAL_DOCS.length,
          documents: OFFICIAL_DOCS,
        },
        null,
        2,
      ),
    )
  } else {
    crawlOfficialDocs({
      docs: OFFICIAL_DOCS,
      outDir: options.outDir,
      keep: options.keep,
    })
      .then((results) => {
        console.log(`Wrote ${results.length} docs to ${options.outDir}`)
      })
      .catch((error: unknown) => {
        console.error(error instanceof Error ? error.message : error)
        process.exitCode = 1
      })
  }
}
