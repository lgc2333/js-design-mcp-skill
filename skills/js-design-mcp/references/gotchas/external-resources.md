# External Resources Gotchas

## SVG

- For external SVG icons, `fetch()` the SVG text and pass it to `jsDesign.createNodeFromSvg(svg)` when JSX `SVG` or URL image creation is slow or timing out.
- When importing external SVG icons, request or generate the SVG at the final size before calling `createNodeFromSvg`. Shrinking the imported parent frame afterward can leave the internal vector/group at the original size and crop the icon.
- After moving an imported SVG into a smaller icon well, read back both parent and child sizes. If the SVG frame is larger than the well or has negative `x`/`y`, resize the SVG child itself and recenter it; resizing only the well can still render cropped icons.
- Check external icon responses before passing them to `createNodeFromSvg`. Iconify 404 responses can become visible `Not found` text nodes instead of throwing.

## Bitmap

- Remote bitmap fills can read back as `IMAGE` but export as flat color or black through MCP. Verify image renders in PNG; if it does not, use a visible SVG asset or another export-safe fallback.
