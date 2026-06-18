# JS Node Operation Gotchas

- `createFrame()`, `createRectangle()`, and `createText()` usually create nodes under `jsDesign.currentPage`. Do not append a new top-level node back to the page; only `appendChild` when moving it into another container.
- Reparenting can reset a frame's own auto-layout fields. Append to the final parent first, then set `layoutMode`, sizing, alignment, padding, and spacing.
- For spacer frames, initialize the frame with fills/strokes and a small `resizeWithoutConstraints()` before inserting it into an auto-layout parent. Inserting a raw `createFrame()` and immediately reading layout fields can produce `layoutGrow`/`layoutAlign` getter errors.
- Do not delete nodes while recursively walking their live child tree. First collect target node IDs, then fetch each ID and mutate/remove it in a second pass. Deleting during traversal can make later `children` reads fail with "node ... does not exist".
