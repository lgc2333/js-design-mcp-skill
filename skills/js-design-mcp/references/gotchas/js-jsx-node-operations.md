# JS/JSX Node Creation/Operation Gotchas

## JS

- `createFrame()`, `createRectangle()`, and `createText()` usually create nodes under `jsDesign.currentPage`. Do not append a new top-level node back to the page; only `appendChild` when moving it into another container.
- Reparenting can reset a frame's own auto-layout fields. Append to the final parent first, then set `layoutMode`, sizing, alignment, padding, and spacing.
- For spacer frames, initialize the frame with fills/strokes and a small `resizeWithoutConstraints()` before inserting it into an auto-layout parent. Inserting a raw `createFrame()` and immediately reading layout fields can produce `layoutGrow`/`layoutAlign` getter errors.
- `get_node_children` can fail while serializing layout fields such as `layoutAlign` on some generated auto-layout trees. Use a small `execute_script` walker that returns only JSON-safe fields like id, name, type, width, height, and child counts.
- Do not delete nodes while recursively walking their live child tree. First collect target node IDs, then fetch each ID and mutate/remove it in a second pass. Deleting during traversal can make later `children` reads fail with "node ... does not exist".

## JSX

- `jsDesign.createNodeFromJSXAsync(jsx)` creates normal canvas `SceneNode` objects such as `FRAME`, `TEXT`, and `RECTANGLE`; it does not leave behind a live widget node.
- In `execute_script`, write declarative nodes with `jsDesign.widget.h(Component, props, ...children)`. TSX literals such as `<AutoLayout />` are not compiled in the MCP script body.
- `createNodeFromJSXAsync` roots are automatically parented to `jsDesign.currentPage`. If the node belongs elsewhere, create it first, then `parent.appendChild(node)` and set local `x`/`y`.
- Prefer one concrete JSX root such as `AutoLayout` or `Frame`. A `Fragment` with multiple roots timed out in MCP testing and did not add nodes to the page.
- Use JSX generation for complete auto-layout subtrees when possible; it reduces intermediate `appendChild` layout recalculation surprises.
- `createNodeFromJSXAsync` can time out at the MCP broker while the plugin later creates the node. After a timeout, inspect the page before retrying so you do not create duplicates.
