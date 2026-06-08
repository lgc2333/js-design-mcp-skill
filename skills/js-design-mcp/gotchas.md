# JiShi MCP Gotchas

Keep this file short. Add only reusable rules. Put probes, long examples, and
session details in `tests/pressure-scenarios.md` instead.

## Quick Rules

- `createFrame()`, `createRectangle()`, and `createText()` usually create nodes
  under `jsDesign.currentPage`. Do not append a new top-level node back to the
  page; only `appendChild` when moving it into another container.
- Reparenting can reset a frame's own auto-layout fields. Append to the final
  parent first, then set `layoutMode`, sizing, alignment, padding, and spacing.
- Enabling or changing auto layout can recalculate size. If exact dimensions
  matter, set layout fields, call `resize()`, then read back `width`/`height`.
- Auto-layout frames may get default padding. Set all four padding fields
  explicitly when spacing matters.
- `SPACE_BETWEEN` may normalize back to `MIN` in some runs. For critical left/right
  separation, insert a transparent spacer frame with `layoutGrow = 1` and verify
  child positions.
- Child rows can look correct in data but still clip visually after parent
  padding/resize changes. Export or screenshot important frames and check for
  clipped edges, overlapped text, and stuck-together labels.
- `save_image` may fail if the MCP plugin's debug path is missing, for example
  `C:\tmp\mcp-debug.log`. Create the missing directory, then retry the export.
- Treat layout writes as untrusted until verified. Return JSON-safe projections
  or use `get_node_children` to confirm final `layoutMode`, alignment, size, and
  child count.

## Tiny Pattern

```js
const child = jsDesign.createFrame();
parent.appendChild(child);
child.layoutMode = "HORIZONTAL";
child.paddingLeft = child.paddingRight = child.paddingTop = child.paddingBottom = 0;
child.resize(354, 44);
return { ok: true, layoutMode: child.layoutMode, width: child.width };
```
