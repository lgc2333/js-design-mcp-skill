---
name: js-design-mcp
description: Use when performing JiShi Design (js.design) MCP operations, including inspecting nodes, running execute_script, creating canvas content, exporting assets, or using PluginAPI/WidgetAPI references.
---

# JiShi Design MCP

## Overview

Use `execute_script` as a JiShi Design plugin-context JavaScript runner. Keep three layers separate: the MCP text wrapper, the script return value, and JiShi `jsDesign` PluginAPI objects.

## First Move

1. Check connection with `list_plugin_clients`.
2. For discovery, prefer `get_page_nodes`, `get_selection`, or `get_node_children`.
3. For custom reads/writes, use `execute_script` with a `try/catch` wrapper, explicit `return`, and JSON-safe projections.

If `list_plugin_clients` shows no connected JiShi plugin client, report the missing connection and ask the user to open/start the JiShi MCP plugin before assuming `execute_script` can run.

## execute_script Rules

`code` is a function body executed in the JiShi plugin context. `jsDesign` is the global PluginAPI object. The server wraps most plugin results as MCP text: `content[0].text = JSON.stringify(result, null, 2)`.

Every `execute_script` call must be wrapped:

```js
try {
  return {
    ok: true,
    pageName: jsDesign.currentPage.name,
    nodes: jsDesign.currentPage.children.map((node) => ({
      id: node.id,
      name: node.name,
      type: node.type,
      width: node.width,
      height: node.height,
    })),
  }
} catch (error) {
  return {
    ok: false,
    name: error && error.name,
    message: error && error.message,
    stack: error && error.stack,
  }
}
```

Avoid raw nodes and non-JSON values:

```js
return jsDesign.currentPage.children[0] // bad: often serializes poorly
```

Return only strings, numbers, booleans, null, arrays, and plain objects. Avoid `undefined`, no-return scripts, functions, symbols, BigInt, Date, cyclic objects, and raw node objects. Promise returns are supported; `console.log` is not returned to the caller.

Use `{ ok: true, ... }` for success and `{ ok: false, name, message, stack }` for failures so callers can distinguish script errors from MCP transport errors.

Keep `execute_script` calls small enough to debug. Prefer splitting large edits into focused discovery, mutation, and verification calls.

## Canvas Creation

For visible canvas work, prefer `jsDesign.createNodeFromJSXAsync` with `jsDesign.widget.h`. It creates normal `SceneNode` trees quickly and avoids most incremental `appendChild` layout churn.

Concrete widget node names available from `jsDesign.widget`: `AutoLayout`, `Frame`, `Image`, `Rectangle`, `Ellipse`, `Text`, `SVG`, `Input`, and `Line`. `Fragment` and `Span` are also declared, but `Fragment` is not a concrete canvas root and `Span` is for text children. For exact props, signatures, and examples, check the declaration file `references/official-typings/widget/index.d.ts` and the component docs under `references/official-docs/小组件 API/API 指南/组件类型/`.

```js
try {
  const { h, AutoLayout, Text } = jsDesign.widget
  const el = h(
    AutoLayout,
    { name: 'Card', direction: 'vertical', spacing: 8, padding: 16, width: 320, fill: '#FFFFFF' },
    h(Text, { fontSize: 20, fontWeight: 700, fill: '#111827' }, 'Title'),
    h(Text, { width: 'fill-parent', fill: '#6B7280' }, 'Body copy'),
  )
  const node = await jsDesign.createNodeFromJSXAsync(el)
  node.x = 80
  node.y = 80
  return { ok: true, id: node.id, name: node.name, type: node.type, width: node.width, height: node.height }
} catch (error) {
  return { ok: false, name: error && error.name, message: error && error.message, stack: error && error.stack }
}
```

Rules:

- Use a single concrete root (`AutoLayout`, `Frame`, etc.); avoid multi-root `Fragment`.
- In MCP scripts, use `jsDesign.widget.h(...)`, not TSX literals.
- Created nodes are parented to `jsDesign.currentPage`; append to another parent after creation if needed.
- Use imperative creation only for small edits, unsupported node types, post-processing, or mutations of existing nodes.

## Gotchas

Scan the relevant file in `references/gotchas/` before MCP operations:

- `plugin-api-docs.md` - observed API/docs mismatches.
- `jsx-node-creation.md` - declarative `createNodeFromJSXAsync` and `jsDesign.widget.h` node creation.
- `js-node-operations.md` - imperative PluginAPI node creation, parenting, reparenting, traversal, and deletion.
- `auto-layout-sizing.md` - auto layout, sizing, scaling, and visual layout verification pitfalls.
- `text-styles.md` - font loading, text style links, and text mutation pitfalls.
- `exports-assets.md` - image export, export settings, names, and asset cleanup.

## Visual Verification

After any visible layout, text, style, export, or asset mutation, export the affected node/frame and inspect the image before claiming visual correctness. JSON reads can confirm node fields, but they cannot prove what JiShi actually rendered: text may clip, auto-layout may recalculate unexpectedly, exported assets may be blank or scaled wrong, and icons can disappear even when dimensions look sane. Use visual inspection as the final source of truth for rendered output.

## Official API References

Start at `references/docs-overview.md`. Use Markdown docs for concepts and examples, and typings for exact API signatures, fields, overloads, and literal values.

- Plugin API docs: `references/official-docs/插件 API/` (70 docs).
- Widget API docs: `references/official-docs/小组件 API/` (52 docs).
- Plugin typings: `references/official-typings/plugin/plugin-api.d.ts` and `references/official-typings/plugin/index.d.ts`.
- Widget typings: `references/official-typings/widget/index.d.ts`.
- Maintenance notes: `references/docs-crawl-notes.md`.

## Tool Return Types

All tools return MCP `content` text. Parse or describe the text payload from the observed call.

- `list_plugin_clients`: JSON array of connected clients; each observed client has `clientId`, `connectedAt`, and `info`.
- `get_page_nodes`: JSON object like `{ pageName, pageId, nodeCount, nodes }`; `nodes` are top-level summaries.
- `get_selection`: either `"No selection"` or a JSON array of selected node summaries/details.
- `get_node_children`: observed as a JSON array of child node summaries/details for the requested node.
- `execute_script`: whatever the script returns; by this skill it must be `{ ok: true, ... }` or `{ ok: false, name, message, stack }`.
- `save_image`: text status or error text; can fail for environment/path reasons.
- `download_icons`: SVG/download/status/error text depending on selection, node IDs, and environment.

Do not invent universal fields like `{ success, data }`. Tools return MCP text content, but the JSON or text inside depends on the specific tool, plugin state, and plugin version.

## References

- `references/gotchas/` - short notes for observed JSX creation, JS node operations, layout, text, export, and API mismatch pitfalls.
- `references/docs-crawl-notes.md` - official docs static URL list maintenance notes and crawl findings.
- `references/docs-overview.md` - short index for official docs and typings.
- `references/official-docs/` - 122 official docs: 70 Plugin API docs and 52 Widget API docs.
- `references/official-typings/` - official npm declaration files for Plugin API and Widget API.
