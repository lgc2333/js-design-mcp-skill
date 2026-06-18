# Docs Crawl Notes

Date: 2026-06-18

Read this file before doing any work related to crawling, refreshing, or reorganizing official docs.

## Current Model

The official docs crawler is intentionally static.

- `scripts/official-docs-list.ts` is the URL index. It contains the pre-resolved `title`, raw Markdown `url`, and output `path` for each page.
- `scripts/crawl-official-docs.ts` does not discover docs and does not query CMS endpoints. It only fetches the URLs listed in `official-docs-list.ts`, writes each response to its matching path, and creates `crawl-manifest.json`.
- The top comment in `scripts/official-docs-list.ts` is intentional: update that URL index manually when fresh upstream docs are needed.

This means `npm run crawl:docs` is reproducible for the current static list, but it is not an automatic "latest docs" updater.

## Current Local Layout

- `scripts/official-docs-list.ts` - static list of 122 docs, covering Plugin API and Widget API pages from the sidebar entries in `temp/doc-list.md`.
- `scripts/crawl-official-docs.ts` - fetch-only crawler that consumes the static list.
- `temp/official-docs/` - generated crawl output and `crawl-manifest.json`.
- `skills/js-design-mcp/references/official-docs/` - skill reference docs when the generated docs are promoted into the skill.
- `skills/js-design-mcp/references/docs-crawl-notes.md` - this maintenance note.

## Official Entry Points

- Developer entry: <https://js.design/developer>
- Plugin guide entry: <https://js.design/developer-doc/plugin/guide/start/Intro>
- Plugin API reference entry: <https://js.design/developer-doc/plugin/api/reference/intro>
- Widget guide entry: <https://js.design/developer-doc/widget/guide/start/Intro>
- Widget API reference entry: <https://js.design/developer-doc/widget/api/reference/intro>
- JiShi app entry: <https://js.design/jsdesign>
- MCP server package: <https://www.npmjs.com/package/@jiujiang/jishi-mcp-server>
- MCP plugin page: <https://js.design/community?category=detail&type=plugin&id=6974f39f0aebe8c71f2bb18c>
- Plugin typings: <https://www.npmjs.com/package/@jsdesigndeveloper/plugin-typings>

## How To Refresh The Static URL List

1. Open an official docs page in a browser/DevTools context, for example `https://js.design/developer-doc/widget/api/reference/intro`.
2. Inspect the Network panel for the CMS calls:
   - `https://js.design/cmsapi/catalog?pageNum=1&pageSize=999&docType=3`
   - `https://js.design/cmsapi/catalog?pageNum=1&pageSize=999&docType=4`
   - `https://js.design/cmsapi/cms/web/doc?docType={docType}&parentId={catalogId}`
3. Use `docType=3` for Plugin API and `docType=4` for Widget API.
4. For each top-level catalog returned by `/cmsapi/catalog`, call `/cmsapi/cms/web/doc` with that catalog's `catalogId` as `parentId`.
5. Read `docOssUrl` from the returned docs. Those URLs are the raw Markdown sources to put into `scripts/official-docs-list.ts`.
6. Keep output paths aligned to the sidebar entries in `temp/doc-list.md`.
7. Preserve special file naming:
   - `RGB/RGBA` -> `RGB_RGBA.md`
   - Widget component tags drop angle brackets and slashes, for example `自动布局 <AutoLayout />` -> `自动布局 AutoLayout.md`, `<SVG />` -> `SVG.md`
8. Run:

```powershell
npm run crawl:docs
npm test
npm run format
```

## Fetching Details

Bare direct URL access can return 403. Fetch raw Markdown with browser-like headers such as:

```http
Referer: https://js.design/jsdesign
User-Agent: Mozilla/5.0
```

`scripts/crawl-official-docs.ts` already sends these headers.

## Pitfalls Found While Crawling

- Directly opening `https://js.design/developer-doc/...` can return only the SPA shell or fail outside browser context; inspect rendered browser network requests when refreshing URLs.
- Do not rely on a guessed `assets/developer-doc/.../*.md` pattern. Current pages use timestamped `assets/docs/.../*.md` `docOssUrl` values from CMS responses.
- Some raw Markdown files do not begin with `#`; validate by content markers, not only heading syntax.
- `https://js.design/backend/...` and `https://api.js.design/...` were dead ends for old CMS endpoints in this environment. The rendered page exposed the useful requests under `https://js.design/cmsapi/...`.
- Source map URLs under `https://devops.js.design/sourcemaps/...` may fail with TLS/transport errors and should not be required for the crawl.
- Static editor/runtime chunks are not a reliable API documentation index. Use official docs capture, CMS `docOssUrl` values, and rendered page network assets instead.
- Count both Plugin API and Widget API docs before deciding the crawl is complete. The 2026-06-18 static list has 122 docs.
