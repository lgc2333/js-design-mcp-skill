import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { mkdtemp } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { crawlOfficialTypings, parseArgs, resolveOutputPath } from '../scripts/crawl-official-typings.ts'

describe('official typings args', () => {
  it('defaults to temp/official-typings under the working directory', () => {
    const options = parseArgs([], 'D:\\Coding\\js-design-mcp-skill')

    assert.equal(options.outDir, path.resolve('D:\\Coding\\js-design-mcp-skill', 'temp', 'official-typings'))
    assert.equal(options.dryRun, false)
    assert.equal(options.keep, false)
  })

  it('accepts output and mode flags', () => {
    const options = parseArgs(['--out-dir', 'tmp/types', '--dry-run', '--keep'], '/repo')

    assert.equal(options.outDir, path.resolve('/repo', 'tmp/types'))
    assert.equal(options.dryRun, true)
    assert.equal(options.keep, true)
  })
})

describe('official typings output paths', () => {
  it('keeps output paths inside the output directory', () => {
    assert.equal(resolveOutputPath('/tmp/types', 'plugin/index.d.ts'), path.resolve('/tmp/types', 'plugin', 'index.d.ts'))
    assert.throws(() => resolveOutputPath('/tmp/types', '../escape.d.ts'), /escapes/)
  })
})

describe('crawlOfficialTypings', () => {
  it('writes extracted declarations with crawl metadata headers', async () => {
    const outDir = await mkdtemp(path.join(os.tmpdir(), 'official-typings-out-'))
    const extractedDir = await mkdtemp(path.join(os.tmpdir(), 'official-typings-extracted-'))
    const pluginSource = path.join(extractedDir, 'plugin-api.d.ts')
    const widgetSource = path.join(extractedDir, 'index.d.ts')
    const seenUrls: string[] = []
    const fetchImpl = async (url: string) => {
      seenUrls.push(url)
      if (url === 'https://registry.npmjs.org/@jsdesigndeveloper%2Fplugin-typings') {
        return Response.json({
          'dist-tags': { latest: '1.2.3' },
          versions: {
            '1.2.3': {
              dist: { tarball: 'https://example.test/plugin.tgz' },
            },
          },
        })
      }
      if (url === 'https://registry.npmjs.org/@jsdesigndeveloper%2Fwidget-typings') {
        return Response.json({
          'dist-tags': { latest: '1.2.4' },
          versions: {
            '1.2.4': {
              dist: { tarball: 'https://example.test/widget.tgz' },
            },
          },
        })
      }
      return new Response(new Uint8Array([1, 2, 3]), { status: 200 })
    }

    await mkdir(extractedDir, { recursive: true })
    await writeFile(pluginSource, 'interface PluginAPI {}\n', 'utf8')
    await writeFile(widgetSource, 'declare namespace JSX {}\n', 'utf8')

    try {
      const results = await crawlOfficialTypings({
        packages: [
          {
            kind: 'plugin',
            packageName: '@jsdesigndeveloper/plugin-typings',
          },
          {
            kind: 'widget',
            packageName: '@jsdesigndeveloper/widget-typings',
          },
        ],
        outDir,
        fetchImpl,
        capturedAt: '2026-06-18',
        extractor: async (archivePath) => {
          if (archivePath.endsWith('plugin.tgz')) {
            return [{ path: 'plugin-api.d.ts', sourcePath: pluginSource, bytes: 23 }]
          }
          return [{ path: 'index.d.ts', sourcePath: widgetSource, bytes: 25 }]
        },
      })

      assert.deepEqual(seenUrls, [
        'https://registry.npmjs.org/@jsdesigndeveloper%2Fplugin-typings',
        'https://example.test/plugin.tgz',
        'https://registry.npmjs.org/@jsdesigndeveloper%2Fwidget-typings',
        'https://example.test/widget.tgz',
      ])
      assert.deepEqual(
        results.map((result) => [result.kind, result.files.map((file) => file.path)]),
        [
          ['plugin', ['plugin-api.d.ts']],
          ['widget', ['index.d.ts']],
        ],
      )

      assert.equal(
        await readFile(path.join(outDir, 'plugin', 'plugin-api.d.ts'), 'utf8'),
        ['// Crawl-Date: 2026-06-18', '// Package: @jsdesigndeveloper/plugin-typings', '// Version: 1.2.3', '', 'interface PluginAPI {}', ''].join('\n'),
      )
      assert.equal(
        await readFile(path.join(outDir, 'widget', 'index.d.ts'), 'utf8'),
        ['// Crawl-Date: 2026-06-18', '// Package: @jsdesigndeveloper/widget-typings', '// Version: 1.2.4', '', 'declare namespace JSX {}', ''].join('\n'),
      )

      const manifest = JSON.parse(await readFile(path.join(outDir, 'crawl-manifest.json'), 'utf8'))
      assert.equal(manifest.capturedAt, '2026-06-18')
      assert.equal(manifest.extractor, '7z')
      assert.equal(manifest.count, 2)
      assert.deepEqual(
        manifest.packages.map((entry: { kind: string; packageName: string; fileCount: number }) => [entry.kind, entry.packageName, entry.fileCount]),
        [
          ['plugin', '@jsdesigndeveloper/plugin-typings', 1],
          ['widget', '@jsdesigndeveloper/widget-typings', 1],
        ],
      )
    } finally {
      await rm(outDir, { force: true, recursive: true })
      await rm(extractedDir, { force: true, recursive: true })
    }
  })
})
