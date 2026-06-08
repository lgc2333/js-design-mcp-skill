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
- Do not delete nodes while recursively walking their live child tree. First
  collect target node IDs, then fetch each ID and mutate/remove it in a second
  pass. Deleting during traversal can make later `children` reads fail with
  "node ... does not exist".
- When editing text at scale, call `loadFontAsync` for the target font before
  setting `characters`, `fontName`, `textStyleId`, `lineHeight`,
  `letterSpacing`, or `textAutoResize`. Skipping this can leave text layout in a
  stale or visually collapsed state even when node dimensions read back as sane.
- Verify text styles after creating them. In current JiShi MCP runs,
  `TextStyle.lineHeight = { unit: "AUTO" }` and
  `TextStyle.letterSpacing = { unit: "PIXELS", value: 0 }` may read back as
  invalid-looking values such as `PIXELS: 0` or a nested letter-spacing object.
  If applying the style makes text render vertically or disappear, keep the
  named style as a system reference but write `fontName`, `fontSize`,
  `lineHeight`, and `letterSpacing` directly on page text nodes.
- After applying text styles, export or screenshot at least one affected page.
  JSON reads can show nonzero width/height while the rendered text is still
  stacked vertically due to style/layout cache issues.
- Export names can come from source components and ancestor frames, not just the
  visible instance being edited. When normalizing export names, inspect the real
  source page, `mainComponent`, component rows, and every exported node's
  ancestors; verify each ancestor segment is snake_case.
- JiShi may coerce fractional `SCALE` export constraints such as `1 / 3` or
  `2 / 3` to `0` when read back. For Android densities from a 3x artboard, use
  per-node `WIDTH` constraints instead and verify the stored widths.
- Avoid exporting content containers that only group screen UI. If a frame is
  there to organize a page section, clear its `exportSettings`; export only the
  screen, real bitmap/decorative assets, icons, launchers, and other developer
  resources.

## Tiny Pattern

```js
const child = jsDesign.createFrame();
parent.appendChild(child);
child.layoutMode = "HORIZONTAL";
child.paddingLeft =
  child.paddingRight =
  child.paddingTop =
  child.paddingBottom =
    0;
child.resize(354, 44);
return { ok: true, layoutMode: child.layoutMode, width: child.width };
```
