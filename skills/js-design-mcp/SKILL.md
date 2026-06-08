---
name: js-design-mcp
description: Use when controlling JiShi Design through js-design MCP, especially writing execute_script code, reading jsDesign plugin API docs, or interpreting MCP tool return shapes
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
  };
} catch (error) {
  return {
    ok: false,
    name: error && error.name,
    message: error && error.message,
  };
}
```

Avoid raw nodes and non-JSON values:

```js
return jsDesign.currentPage.children[0]; // bad: often serializes poorly
```

Return only strings, numbers, booleans, null, arrays, and plain objects. Avoid `undefined`, no-return scripts, functions, symbols, BigInt, Date, cyclic objects, and raw node objects. Promise returns are supported; `console.log` is not returned to the caller.

Use `{ ok: true, ... }` for success and `{ ok: false, name, message }` for failures so callers can distinguish script errors from MCP transport errors.

## Official API Docs

Start at `references/official-plugin-docs/README.md`. The docs are arranged as:

- Machine metadata: `references/official-plugin-docs/index.json`.
- Short AI map: `references/official-plugin-docs/_indexes/README.md`.
- Full docs: `references/official-plugin-docs/api/` and `references/official-plugin-docs/guide/`.

Common entries:

- Current page/selection: `jsDesign.currentPage`, `jsDesign.currentPage.selection`.
- Find/traverse: `jsDesign.getNodeById(id)`, `findOne`, `findAll`.
- Create/edit: `createRectangle`, `createFrame`, `createText`, `appendChild`, `resize`; append visible new nodes to `jsDesign.currentPage` or a specified parent before returning fields.
- Export/storage/UI: `exportAsync`, `clientStorage`, `showUI`, `ui.postMessage`.

Prefer `jsDesign`, not `figma`. The typings expose `figma` as a compatibility alias, but JiShi docs and MCP prompts should use `jsDesign`.

## Other MCP Tools

Keep these concise unless you have an observed result:

- `list_plugin_clients`: check connection first.
- `get_page_nodes`, `get_selection`, `get_node_children`: discovery and IDs; no selection may return `"No selection"`.
- `save_image`, `download_icons`: export tools; environment-sensitive.

Do not invent universal fields like `{ success, data }`. Tools return MCP text content, but the JSON or text inside depends on the specific tool, plugin state, and plugin version.

## Tool Return Types

All tools return MCP `content` text. Parse or describe the text payload from the observed call.

- `list_plugin_clients`: JSON array of connected clients; each observed client has `clientId`, `connectedAt`, and `info`.
- `get_page_nodes`: JSON object like `{ pageName, pageId, nodeCount, nodes }`; `nodes` are top-level summaries.
- `get_selection`: either `"No selection"` or a JSON array of selected node summaries/details.
- `get_node_children`: observed as a JSON array of child node summaries/details for the requested node.
- `execute_script`: whatever the script returns; by this skill it must be `{ ok: true, ... }` or `{ ok: false, name, message }`.
- `save_image`: text status or error text; can fail for environment/path reasons.
- `download_icons`: SVG/download/status/error text depending on selection, node IDs, and environment.

## References

- `references/crawl-notes.md` - official entry points and crawl findings.
- `references/official-plugin-docs/` - 70 official docs: 59 API pages and 11 guide pages.
