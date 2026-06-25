---
name: js-design-mcp
description: Use when a task involves JiShi Design/js.design canvas work through 九匠即时MCP, jishi-design MCP, or jsDesign PluginAPI.
---

# JiShi Design MCP

Use the `jishi-design` MCP server to read, export, and modify JiShi Design canvases.

## First Step

Call `list_plugin_clients` before other tools. If no client is connected, ask the user to open the `九匠即时MCP` plugin in JiShi Design and confirm it shows connected.

If multiple clients are connected, choose by `info.docName` and pass that `clientId` to every later tool. Without `clientId`, tools use the first online client.

## Standard Flow

1. Discover top-level frames with `get_page_nodes`.
2. Drill into the target with `get_node_children` by `id` or `name`, or `get_selection` when the user selected nodes.
3. Export with `save_image` or `download_icons`, or modify with `execute_script`.

Do not pull an entire large tree first. Probe with shallow `maxDepth`, then drill into specific child ids.

## Tool Routing

- `list_plugin_clients`: list connected JiShi documents.
- `get_page_nodes`: list current page top-level nodes; no parameters.
- `get_selection`: read selected nodes. Useful args: `includeChildren`, `maxDepth`, `maxNodes`, `clientId`.
- `get_node_children`: read one node subtree. Pass `id` or `name`; prefer `id` because names can repeat.
- `save_image`: export one node. Useful args: `nodeId`, `format`, `scale`, `filename`, `savePath`, `clientId`.
- `download_icons`: batch export SVG. Useful args: `nodeIds`, `contentsOnly`, `svgOutlineText`, `svgSimplifyStroke`, `clientId`.
- `execute_script`: custom query, batch edit, or canvas creation. Read `references/execute-script.md` before using it.

All tools accept optional `clientId` and `timeoutMs`.

## Read Integrity

`get_selection` and `get_node_children` return `{ nodes, summary }`. Always check `summary.truncated`.

If truncated, do one of these before drawing conclusions:

- Increase `maxDepth` or `maxNodes`.
- Drill into child ids with separate `get_node_children` calls.
- Narrow the task to the required subtree.

Never treat truncated data as the complete design.

## Export Rules

- Use `scale: 2` or higher for PNG/JPG unless the user requested another scale.
- Prefer `savePath` with an absolute path. For temporary exports in this repo, use `temp/snapshots`.
- Use `download_icons` for multiple SVG icons; it returns separate `success` and `failed` arrays.
- After visible layout, style, text, asset, or export-related changes, export the affected node/frame and inspect the image before claiming visual correctness.

## Mutation Rules

- Use dedicated MCP tools for reads and exports.
- Use `execute_script` only when dedicated tools cannot do the operation.
- Before mutating the canvas, state what will change.
- Keep mutation scripts small: discovery, structure, content, assets, styling, and verification should usually be separate calls.

## Canvas Creation

For new visible canvas work, use auto layout and responsive adjustments unless the user explicitly refuses. Avoid building fresh designs from many absolute `x`/`y` placements.

For `execute_script` canvas creation, read `references/execute-script.md` and the relevant gotcha first.

## Gotchas

Read only the relevant file before the operation:

- `references/gotchas/js-jsx-node-operations.md`: JSX creation, imperative creation, parenting, traversal, deletion.
- `references/gotchas/auto-layout-sizing.md`: auto layout, sizing, scaling, layout verification.
- `references/gotchas/responsive-audits.md`: fixed-size leftovers, clipping, responsive repair.
- `references/gotchas/external-resources.md`: SVG/Iconify, bitmap import, rendering, export issues.
- `references/gotchas/styles.md`: text style, font loading, letter spacing, effects.
- `references/gotchas/exports-assets.md`: image export, export settings, asset cleanup.

## Official References

Start at `references/docs-overview.md`. Use Markdown docs for concepts and examples; use typings for exact fields, overloads, and literal values.

- Plugin docs: `references/official-docs/插件 API/`.
- Widget docs: `references/official-docs/小组件 API/`.
- Plugin typings: `references/official-typings/plugin/plugin-api.d.ts` and `references/official-typings/plugin/index.d.ts`.
- Widget typings: `references/official-typings/widget/index.d.ts`.
- Crawl notes: `references/docs-crawl-notes.md`.
