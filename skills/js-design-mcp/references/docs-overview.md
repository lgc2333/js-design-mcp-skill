# JiShi Official Docs AI Index

Captured from official JiShi Design documentation on 2026-06-18.

Use this as the short map before opening full docs or typings. Markdown docs are under `official-docs/` and arranged by the official sidebar. Declaration files are under `official-typings/`.

## Scope

- Plugin API docs: 70 files under `official-docs/插件 API/`.
- Widget API docs: 52 files under `official-docs/小组件 API/`.
- Total: 122 Markdown files.

- Plugin typings: `official-typings/plugin/plugin-api.d.ts` and `official-typings/plugin/index.d.ts`.
- Widget typings: `official-typings/widget/index.d.ts`.

The Markdown source URL list is static. Typings come from official npm packages.

## High-Value Starting Points

- Plugin execution/API overview: [插件 API 概述](<official-docs/插件 API/API 指南/基础介绍/插件 API 概述.md>)
- PluginAPI object: [jsDesign](<official-docs/插件 API/API 指南/基础介绍/jsDesign.md>)
- UI bridge: [jsDesign.ui](<official-docs/插件 API/API 指南/基础介绍/jsDesign.ui.md>)
- Selection/page/node access: [页面节点 PageNode](<official-docs/插件 API/API 指南/节点相关/页面节点 PageNode.md>), [画板节点 FrameNode](<official-docs/插件 API/API 指南/节点相关/画板节点 FrameNode.md>), [节点类型](<official-docs/插件 API/API 指南/节点相关/节点类型.md>)
- Text work: [文本节点 TextNode](<official-docs/插件 API/API 指南/节点相关/文本节点 TextNode.md>), [处理文本内容](<official-docs/插件 API/开发者文档/开发指南/处理文本内容.md>)
- Export/image work: [导出设置 ExportSettings](<official-docs/插件 API/API 指南/其他/导出设置 ExportSettings.md>), [处理图片](<official-docs/插件 API/开发者文档/开发指南/处理图片.md>)
- Network/storage: [fetch](<official-docs/插件 API/API 指南/基础介绍/fetch.md>), [jsDesign.clientStorage](<official-docs/插件 API/API 指南/基础介绍/jsDesign.clientStorage.md>)
- Widget API overview: [小组件 API 概述](<official-docs/小组件 API/API 指南/基础介绍/小组件 API 概述.md>)
- Widget API object: [jsDesign.widget](<official-docs/小组件 API/API 指南/基础介绍/jsDesign.widget.md>)
- Widget components: [自动布局 AutoLayout](<official-docs/小组件 API/API 指南/组件类型/自动布局 AutoLayout.md>), [SVG](<official-docs/小组件 API/API 指南/组件类型/SVG.md>)

## Sections

- Plugin developer docs: 11 docs under `official-docs/插件 API/开发者文档/`.
- Plugin API guide: 59 docs under `official-docs/插件 API/API 指南/`.
- Widget developer docs: 13 docs under `official-docs/小组件 API/开发者文档/`.
- Widget API guide: 39 docs under `official-docs/小组件 API/API 指南/`.
- Plugin declaration files: `official-typings/plugin/`.
- Widget declaration files: `official-typings/widget/`.

## Common Lookup

- Create/modify shapes: open the plugin `jsDesign` doc plus the relevant node doc such as `RectangleNode`.
- Traverse document: open plugin docs for `jsDesign`, `DocumentNode`, `PageNode`, and relevant node types.
- Build widgets: open widget docs for `jsDesign.widget`, component types, hooks, and `widgetSyncedState`.
- Use MCP `execute_script`: prefer docs for `jsDesign`, `PageNode`, node creation methods, and JSON-safe manual projection.
- Confirm exact property names, unions, and overloads: open `official-typings/plugin/plugin-api.d.ts` for Plugin API or `official-typings/widget/index.d.ts` for Widget API.
