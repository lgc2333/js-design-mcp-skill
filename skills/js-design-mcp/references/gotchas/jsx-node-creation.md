# JSX Node Creation Gotchas

- `jsDesign.createNodeFromJSXAsync(jsx)` creates normal canvas `SceneNode` objects such as `FRAME`, `TEXT`, and `RECTANGLE`; it does not leave behind a live widget node.
- In `execute_script`, write declarative nodes with `jsDesign.widget.h(Component, props, ...children)`. TSX literals such as `<AutoLayout />` are not compiled in the MCP script body.
- `createNodeFromJSXAsync` roots are automatically parented to `jsDesign.currentPage`. If the node belongs elsewhere, create it first, then `parent.appendChild(node)` and set local `x`/`y`.
- Prefer one concrete JSX root such as `AutoLayout` or `Frame`. A `Fragment` with multiple roots timed out in MCP testing and did not add nodes to the page.
- Use JSX generation for complete auto-layout subtrees when possible; it reduces intermediate `appendChild` layout recalculation surprises.
- `createNodeFromJSXAsync` can time out at the MCP broker while the plugin later creates the node. After a timeout, inspect the page before retrying so you do not create duplicates.
