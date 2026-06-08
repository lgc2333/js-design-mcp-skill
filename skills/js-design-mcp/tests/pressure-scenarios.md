# Pressure Scenarios

Use these scenarios to test whether an agent can use this skill instead of guessing JiShi MCP behavior.

## Scenario 1: execute_script Return Layers

Prompt:

> Use js-design MCP `execute_script` to list current page top-level node names and IDs. Explain the returned structure and identify which fields come from JiShi Design API.

Expected failure without skill:

- Invents a DevTools-like result shape such as `{ result: { value } }`.
- Relies on `console.log` instead of `return`.
- Mixes MCP `content[0].text` with the script return value.
- Returns raw nodes instead of JSON-safe projections.
- Omits `try/catch` and returns a bare array/object.

Expected success with skill:

- Wraps the whole script in `try/catch`.
- Returns `{ ok: true, nodes: ... }` or `{ ok: false, name, message }`.
- Returns JSON-safe fields only.
- Explains MCP text wrapper versus plugin API data.

## Scenario 2: jsDesign Global Object

Prompt:

> Explain why `jsDesign` is available inside js-design MCP `execute_script`, then create a rectangle, set size and fill, and return key fields.

Expected failure without skill:

- Uses `figma.createRectangle()`, `document.createElement()`, or `jsDesign.execute_script()`.
- Treats `jsDesign` as a Node.js object or MCP client.
- Returns a raw node.

Expected success with skill:

- Explains `execute_script` sends code into JiShi plugin context.
- Uses `jsDesign.createRectangle()` and appends the node where appropriate.
- Returns `{ ok: true, id, name, type, width, height, fills }` or another wrapped JSON-safe projection.

## Scenario 3: Other Tool Return Structures

Prompt:

> Compare `get_selection`, `get_page_nodes`, `get_node_children`, `save_image`, `download_icons`, and `execute_script`. Describe reliable usage and which structures can be trusted.

Expected failure without skill:

- Invents a universal `{ success, data }` or `{ nodes }` result for every tool.
- Treats all MCP tools as raw JiShi API returns.
- Over-expands export tools without mentioning environment risks.

Expected success with skill:

- States most tools use an MCP text wrapper.
- Keeps non-`execute_script` tools concise and cites observed or source-derived behavior.
- Flags export tools as environment-sensitive.

## Scenario 4: Tool Return Type Summary

Prompt:

> Selection exists now. Add a concise return type summary for every js-design MCP tool.

Expected failure before doc change:

- No `## Tool Return Types` section exists.
- Claims a universal `{ success, data }` return type.
- Describes `get_selection` only as `"No selection"` and misses the selected-node array case.
- Treats export tools as stable JSON schemas.

Expected success with skill:

- States all tools return MCP `content` text.
- Lists observed payload shapes for `list_plugin_clients`, `get_page_nodes`, `get_selection`, `get_node_children`, and `execute_script`.
- Marks `save_image` and `download_icons` as text/status/error and environment-sensitive.

## TDD Run 2026-06-08

RED baseline without reading the skill failed as expected:

- Used bare `return nodes.map(...)` for `execute_script`.
- Returned rectangle fields without `{ ok: true, ... }`.
- Omitted `try/catch` wrappers.

GREEN verifier after reading the skill passed:

- Required `list_plugin_clients` before plugin calls.
- Wrapped every `execute_script` body in `try/catch`.
- Used `{ ok: true, ... }` and `{ ok: false, name, message }`.
- Avoided universal return-shape claims for non-`execute_script` tools.

Observed real MCP GREEN:

- `list_plugin_clients` returned one connected client.
- Wrapped read script returned `{ ok: true, pageName, pageId, childCount, nodes }`.
- Wrapped create script created a rectangle and returned a JSON-safe projection.
- Cleanup script removed the temporary rectangle with `{ ok: true, removed }`.

Tool return type RED/GREEN:

- RED check failed before the docs had a `## Tool Return Types` section.
- With active selection, `get_selection` returned an array containing selected `FRAME` node details.
- `get_node_children` for the selected frame returned an array of child node details.
- Wrapped `execute_script` returned `{ ok: true, currentPage, selection }`.
- `save_image` returned error text from an environment/path issue, confirming export tools should not claim a stable JSON schema.
