import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { mkdtemp, readFile, rm } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { crawlOfficialDocs, parseArgs, resolveOutputPath } from '../scripts/crawl-official-docs.ts'
import { OFFICIAL_DOCS } from '../scripts/official-docs-list.ts'

function countMarkdownFiles(dir: string): number {
  return readdirSync(dir, { withFileTypes: true }).reduce((count, entry) => {
    const entryPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      return count + countMarkdownFiles(entryPath)
    }
    return count + (entry.name.endsWith('.md') ? 1 : 0)
  }, 0)
}

describe('OFFICIAL_DOCS', () => {
  it('contains pre-resolved URL and path pairs', () => {
    assert.equal(OFFICIAL_DOCS.length, 122)
    assert.ok(OFFICIAL_DOCS.every((doc) => doc.url.startsWith('https://img.js.design/')))
    assert.ok(OFFICIAL_DOCS.every((doc) => doc.path.endsWith('.md')))
    assert.ok(OFFICIAL_DOCS.some((doc) => doc.path.endsWith('其他/RGB_RGBA.md')))
    assert.ok(OFFICIAL_DOCS.some((doc) => doc.path.endsWith('组件类型/自动布局 AutoLayout.md')))
    assert.ok(OFFICIAL_DOCS.some((doc) => doc.path.endsWith('组件类型/SVG.md')))
  })

  it('matches the promoted reference docs', () => {
    const docsRoot = path.resolve('skills/js-design-mcp/references/official-docs')

    assert.equal(countMarkdownFiles(docsRoot), OFFICIAL_DOCS.length)
    assert.equal(countMarkdownFiles(path.join(docsRoot, '插件 API')), 70)
    assert.equal(countMarkdownFiles(path.join(docsRoot, '小组件 API')), 52)

    for (const doc of OFFICIAL_DOCS) {
      assert.ok(existsSync(path.join(docsRoot, ...doc.path.split('/'))), doc.path)
    }
  })

  it('keeps public docs pointed at the current official-docs layout', () => {
    const publicDocs = ['README.md', 'skills/js-design-mcp/SKILL.md', 'skills/js-design-mcp/references/docs-overview.md']
    const text = publicDocs.map((file) => readFileSync(file, 'utf8')).join('\n')

    assert.match(text, /official-docs/)
    assert.match(text, /122/)
    assert.doesNotMatch(text, /official-plugin-docs|_indexes|index\.json|70 official docs|59 API pages|11 guide pages/)
  })
})

describe('parseArgs', () => {
  it('defaults to temp/official-docs under the working directory', () => {
    const options = parseArgs([], 'D:\\Coding\\js-design-mcp-skill')

    assert.equal(options.outDir, path.resolve('D:\\Coding\\js-design-mcp-skill', 'temp', 'official-docs'))
    assert.equal(options.dryRun, false)
    assert.equal(options.keep, false)
  })

  it('accepts output and mode flags', () => {
    const options = parseArgs(['--out-dir', 'tmp/docs', '--dry-run', '--keep'], '/repo')

    assert.equal(options.outDir, path.resolve('/repo', 'tmp/docs'))
    assert.equal(options.dryRun, true)
    assert.equal(options.keep, true)
  })
})

describe('resolveOutputPath', () => {
  it('keeps output paths inside the output directory', () => {
    assert.equal(resolveOutputPath('/tmp/docs', '插件 API/API 指南/jsDesign.md'), path.resolve('/tmp/docs', '插件 API', 'API 指南', 'jsDesign.md'))
    assert.throws(() => resolveOutputPath('/tmp/docs', '../escape.md'), /escapes/)
  })
})

describe('crawlOfficialDocs', () => {
  it('fetches each pre-resolved URL and writes it to the matching path', async () => {
    const outDir = await mkdtemp(path.join(os.tmpdir(), 'official-docs-'))
    const docs = [
      {
        title: 'Doc A',
        url: 'https://example.test/a.md',
        path: '插件 API/开发者文档/开始使用/Doc A.md',
      },
      {
        title: 'Doc B',
        url: 'https://example.test/b.md',
        path: '小组件 API/API 指南/组件类型/Doc B.md',
      },
    ]
    const seenUrls: string[] = []
    const fetchImpl = async (url: string) => {
      seenUrls.push(url)
      return new Response(`# ${url}`, { status: 200 })
    }

    try {
      const results = await crawlOfficialDocs({ docs, outDir, fetchImpl })

      assert.deepEqual(
        seenUrls,
        docs.map((doc) => doc.url),
      )
      assert.equal(results.length, 2)
      assert.equal(await readFile(path.join(outDir, '插件 API', '开发者文档', '开始使用', 'Doc A.md'), 'utf8'), '# https://example.test/a.md')
      const manifest = JSON.parse(await readFile(path.join(outDir, 'crawl-manifest.json'), 'utf8'))
      assert.equal(manifest.count, 2)
      assert.deepEqual(
        manifest.documents.map((doc: { path: string }) => doc.path),
        docs.map((doc) => doc.path),
      )
    } finally {
      await rm(outDir, { force: true, recursive: true })
    }
  })
})
