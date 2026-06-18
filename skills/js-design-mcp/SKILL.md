---
name: js-design-mcp
description: 'Use when need to call JiShi Design (js.design) MCP execute_script or write plugin-context JavaScript; simple read operations do not require this skill. Note: Check connection with list_plugin_clients first before calling any tool.'
---

# JiShi Design MCP

## Overview

Use `execute_script` as a JiShi Design plugin-context JavaScript runner. Keep three layers separate: the MCP text wrapper, the script return value, and JiShi `jsDesign` PluginAPI objects.

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

Keep `execute_script` calls small enough to debug. Prefer splitting large edits into focused discovery, mutation, and verification calls. Breaking work into pieces also avoids long broker timeouts and makes partial failures traceable instead of leaving you unsure which operations completed.

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
- When creating a page from scratch, prefer auto layout and responsive sizing changes over manual absolute positioning for the main structure.
- Use imperative creation only for small edits, unsupported node types, post-processing, or mutations of existing nodes.

## Visual Verification

After any visible layout, text, style, export, or asset mutation, export the affected node/frame and inspect the image before claiming visual correctness. JSON reads can confirm node fields, but they cannot prove what JiShi actually rendered: text may clip, auto-layout may recalculate unexpectedly, exported assets may be blank or scaled wrong, and icons can disappear even when dimensions look sane. Use visual inspection as the final source of truth for rendered output.

## Gotchas

Scan the relevant file in `references/gotchas/` before MCP operations:

- `plugin-api-docs.md` - observed API/docs mismatches.
- `jsx-node-creation.md` - declarative `createNodeFromJSXAsync` and `jsDesign.widget.h` node creation.
- `js-node-operations.md` - imperative PluginAPI node creation, parenting, reparenting, traversal, and deletion.
- `auto-layout-sizing.md` - auto layout, sizing, scaling, and visual layout verification pitfalls.
- `responsive-audits.md` - full-tree audits and snippets for fixed-size leftovers, clipping, and responsive repair.
- `svg-icons.md` - external SVG/Iconify import, sizing, and cropping pitfalls.
- `text-styles.md` - font loading, text style links, and text mutation pitfalls.
- `exports-assets.md` - image export, export settings, names, and asset cleanup.

## Official API References

Start at `references/docs-overview.md`. Use Markdown docs for concepts and examples, and typings for exact API signatures, fields, overloads, and literal values.

- Plugin API docs: `references/official-docs/插件 API/` (70 docs).
- Widget API docs: `references/official-docs/小组件 API/` (52 docs).
- Plugin typings: `references/official-typings/plugin/plugin-api.d.ts` and `references/official-typings/plugin/index.d.ts`.
- Widget typings: `references/official-typings/widget/index.d.ts`.
- Maintenance notes: `references/docs-crawl-notes.md`.

## References

- `references/gotchas/`
- `references/docs-crawl-notes.md` - official docs static URL list maintenance notes and crawl findings.
- `references/docs-overview.md` - short index for official docs and typings.
- `references/official-docs/` - 122 official docs: 70 Plugin API docs and 52 Widget API docs.
- `references/official-typings/` - official npm declaration files for Plugin API and Widget API.
