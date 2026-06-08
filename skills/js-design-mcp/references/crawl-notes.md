# Crawl Notes

Date: 2026-06-08

## Official Entry Points

- Developer entry: <https://js.design/developer>
- Plugin guide entry: <https://js.design/developer-doc/plugin/Guide/1.Start/Intro>
- Plugin API reference entry: <https://js.design/developer-doc/plugin/api/reference/intro>
- JiShi app entry: <https://js.design/jsdesign>
- MCP server package: <https://www.npmjs.com/package/@jiujiang/jishi-mcp-server>
- MCP plugin page: <https://js.design/community?category=detail&type=plugin&id=6974f39f0aebe8c71f2bb18c>
- Plugin typings: <https://www.npmjs.com/package/@jsdesigndeveloper/plugin-typings>

## Current Local Layout

- `official-plugin-docs/index.json` - machine-readable metadata with official URL, source URL, summary, headings, symbols, and local path.
- `official-plugin-docs/README.md` - short AI index.
- `official-plugin-docs/_indexes/` - section indexes without old filename prefixes.
- `official-plugin-docs/api/` - API docs with the fixed `developer-doc/plugin` prefix removed locally.
- `official-plugin-docs/guide/` - guide docs with the fixed `developer-doc/plugin` prefix removed locally.

The current backup has 70 full docs: 59 API pages and 11 guide pages.

## What Was Crawlable

`https://js.design/developer` is an SPA entry. The useful documentation routes are under `https://js.design/developer-doc/plugin/...`.

Primary raw Markdown source pattern:

`https://img.js.design/assets/developer-doc/plugin/.../*.md`

Special raw Markdown source for the API `fetch` page:

`https://img.js.design/assets/docs/plugin/api/reference/fetch2024-04-07%2020-29-35.md`

Bare direct URL access can return 403. Fetch with browser-like headers such as:

```http
Referer: https://js.design/jsdesign
User-Agent: Mozilla/5.0
```

## Pitfalls Found While Crawling

- Directly opening `https://js.design/developer-doc/...` can return only the SPA shell or fail outside browser context; use rendered browser capture when route content is dynamic.
- Do not rely only on the `assets/developer-doc/plugin/.../*.md` pattern. The `fetch` API page used the older `assets/docs/plugin/api/reference/...` namespace.
- Some raw Markdown files do not begin with `#`; validate by content markers such as `FetchOptions` and `FetchResponse`, not only by heading syntax.
- `https://js.design/backend/...` and `https://api.js.design/...` were dead ends for old CMS endpoints in this environment. The rendered page exposed requests under `https://js.design/cmsapi/...`.
- Source map URLs under `https://devops.js.design/sourcemaps/...` may fail with TLS/transport errors and should not be required for the crawl.
- Static editor/runtime chunks are not a reliable API documentation index. Use official docs capture, raw Markdown URLs, and rendered page network assets instead.
- API guide navigation has two visually important areas: guide pages and the top `API` guide/reference tab. Count both before deciding the crawl is complete.

## How The Last Missing Page Was Found

Open `https://js.design/developer-doc/plugin/api/reference/fetch` in a browser-like context and inspect observed page assets/network resources. The page loads:

`https://img.js.design/assets/docs/plugin/api/reference/fetch2024-04-07%2020-29-35.md`

That raw file has no leading `#` heading but contains the `fetch(url: string, init: FetchOptions): Promise<FetchResponse>` API content.
