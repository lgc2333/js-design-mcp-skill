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
