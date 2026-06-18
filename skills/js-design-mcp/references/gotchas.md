# JiShi MCP Gotchas

Keep this file short. Add only reusable rules. Put probes, long examples, and session details as references.

## Plugin API and Docs Mismatches

- Do not use MCP to change `TextStyle.letterSpacing` for now. The current JiShi plugin API can turn font-style spacing into `[object Object]`; leave existing/default spacing untouched and adjust it manually until this API path is proven safe.
- Do not fully trust `node.exportSettings[*].constraint.value` for `SCALE`. JiShi can apply fractional export scales such as `0.3x`, but PluginAPI reads may truncate the stored value to an integer (`0.3` reads as `0`, `1.5` as `1`). To verify the real scale, export with an explicit `exportAsync({ constraint: { type: 'SCALE', value } })` setting and inspect the output image dimensions. For Android densities, prefer per-node `WIDTH` constraints when a directly verifiable stored value matters.

## Node Creation and Parenting

- `jsDesign.createNodeFromJSXAsync(jsx)` creates normal canvas `SceneNode` objects such as `FRAME`, `TEXT`, and `RECTANGLE`; it does not leave behind a live widget node.
- In `execute_script`, write declarative nodes with `jsDesign.widget.h(Component, props, ...children)`. TSX literals such as `<AutoLayout />` are not compiled in the MCP script body.
- `createNodeFromJSXAsync` roots are automatically parented to `jsDesign.currentPage`. If the node belongs elsewhere, create it first, then `parent.appendChild(node)` and set local `x`/`y`.
- Prefer one concrete JSX root such as `AutoLayout` or `Frame`. A `Fragment` with multiple roots timed out in MCP testing and did not add nodes to the page.
- Use JSX generation for complete auto-layout subtrees when possible; it reduces intermediate `appendChild` layout recalculation surprises.
- `createFrame()`, `createRectangle()`, and `createText()` usually create nodes under `jsDesign.currentPage`. Do not append a new top-level node back to the page; only `appendChild` when moving it into another container.
- Reparenting can reset a frame's own auto-layout fields. Append to the final parent first, then set `layoutMode`, sizing, alignment, padding, and spacing.
- Do not delete nodes while recursively walking their live child tree. First collect target node IDs, then fetch each ID and mutate/remove it in a second pass. Deleting during traversal can make later `children` reads fail with "node ... does not exist".

## Auto Layout and Sizing

- Enabling or changing auto layout can recalculate size. If exact dimensions matter, set layout fields, call `resize()`, then read back `width`/`height`.
- Auto-layout frames may get default padding. Set all four padding fields explicitly when spacing matters.
- `SPACE_BETWEEN` may normalize back to `MIN` in some runs. For critical left/right separation, insert a transparent spacer frame with `layoutGrow = 1` and verify child positions.
- Avoid setting `layoutPositioning = 'ABSOLUTE'` on newly created nodes inside auto-layout frames unless it has been probed in the current plugin version. In one JiShi MCP run it threw `Cannot read properties of null (reading 'isSymbolInstance')`; use explicit x/y sizing outside auto layout or a wrapper frame instead.
- For breakpoint artboards, do not use `rescale()` on mixed text/vector screens without visual export checks. In one run it made text font sizes read back near `0.1` and made small vector icons vanish or distort. For nested vector icon frames, scaling the parent with `relativeTransform = [[scale, 0, x], [0, scale, y]]` preserved rendering better than resizing child vectors.
- Be careful setting auto-layout properties on component instances such as bottom navigation. In one run, changing `layoutMode`/alignment on the instance recalculated its width from the artboard width to the internal content width; restore with `resizeWithoutConstraints(parent.width, height)` and verify by export.
- When adapting the status/search component, inspect nested frames before changing dimensions. In one run, the internal search background frame named `画板 4` kept a fixed height while the surrounding status/search area was scaled, so the search bar's rounded shape rendered incorrectly. Keep that nested frame's height matched to the responsive status/search layout instead of leaving it at a copied pixel height.
- Return JSON-safe projections or use `get_node_children` to confirm final `layoutMode`, alignment, size, and child count after layout writes.
- Child rows can look correct in data but still clip visually after parent padding/resize changes. Export or screenshot important frames and check for clipped edges, overlapped text, and stuck-together labels.

## Text and Styles

- When editing text at scale, call `loadFontAsync` for the target font before setting `characters`, `fontName`, `textStyleId`, `lineHeight`, `letterSpacing`, or `textAutoResize`. Skipping this can leave text layout in a stale or visually collapsed state even when node dimensions read back as sane.
- For existing text nodes, `node.textStyleId = style.id` may silently read back as an empty string. Use `setRangeTextStyleId(0, node.characters.length, style.id)` after loading fonts, and apply it after any direct `fontName`/`fontSize`/`lineHeight` writes because those direct writes can clear the text style link.

## Exports and Assets

- `save_image` may fail if the MCP plugin's debug path is missing, for example `C:\tmp\mcp-debug.log`. Create the missing directory, then retry the export.
- Export names can come from source components and ancestor frames, not just the visible instance being edited. When normalizing export names, inspect the real source page, `mainComponent`, component rows, and every exported node's ancestors; verify each ancestor segment is snake_case.
- Avoid exporting content containers that only group screen UI. If a frame is there to organize a page section, clear its `exportSettings`; export only the screen, real bitmap/decorative assets, icons, launchers, and other developer resources.
