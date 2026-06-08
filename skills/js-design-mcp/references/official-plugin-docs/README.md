# JiShi Plugin Docs AI Index

Captured from official JiShi Design plugin documentation on 2026-06-08.

Use this as the short map before opening full docs. Files are under `api/` and `guide/`. Machine-readable full metadata is in `index.json`.

## Schema Tip

Search `index.json` when you need exact docs; do not open it just to confirm the schema. Record type: `kind: "api" | "guide"`, `category: "reference" | "node" | "style" | "other" | "start" | "development"`, `slug/title/siteUrl/localPath/sourcePath/sourceUrl/summary: string`, `bytes: number`, `headings/symbols: string[]`. Open `localPath` only when the target page is needed.

## High-Value Starting Points

- Plugin execution/API overview: [插件 API 概述](api/reference/intro.md)
- PluginAPI object: [jsDesign](api/reference/jsDesign.md)
- UI bridge: [jsDesign.ui](api/reference/jsDesign-ui.md)
- Selection/page/node access: [页面节点 PageNode](api/node/PageNode.md), [画板节点 FrameNode](api/node/FrameNode.md), [节点类型](api/node/NodeType.md)
- Text work: [文本节点 TextNode](api/node/TextNode.md), [处理文本内容](guide/development/Working-with-Text.md)
- Export/image work: [导出设置 ExportSettings](api/other/ExportSettings.md), [处理图片](guide/development/Working-with-Images.md)
- Network/storage: [fetch](api/reference/fetch.md), [jsDesign.clientStorage](api/reference/jsDesign-clientStorage.md)

## Sections

- API reference foundation: 8 docs. See `_indexes/api-reference.md`.
- API node-related: 17 docs. See `_indexes/api-node.md`.
- API style-related: 11 docs. See `_indexes/api-style.md`.
- API other types/settings: 23 docs. See `_indexes/api-other.md`.
- Guide/tutorial docs: 11 docs. See `_indexes/guide.md`.

## Common Lookup

- Create/modify shapes: open `api/reference/jsDesign.md` plus the node doc such as `api/node/RectangleNode.md`.
- Traverse document: open `api/reference/jsDesign.md`, `api/node/DocumentNode.md`, `api/node/PageNode.md`, and relevant node types.
- Use MCP `execute_script`: prefer docs for `jsDesign`, `PageNode`, node creation methods, and JSON-safe manual projection.
