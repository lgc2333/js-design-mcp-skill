# Text and Style Gotchas

- When editing text at scale, call `loadFontAsync` for the target font before setting `characters`, `fontName`, `textStyleId`, `lineHeight`, `letterSpacing`, or `textAutoResize`. Skipping this can leave text layout in a stale or visually collapsed state even when node dimensions read back as sane.
- For existing text nodes, `node.textStyleId = style.id` may silently read back as an empty string. Use `setRangeTextStyleId(0, node.characters.length, style.id)` after loading fonts, and apply it after any direct `fontName`/`fontSize`/`lineHeight` writes because those direct writes can clear the text style link.
- Fixed-size text nodes do not auto-fit long copy. For headings, buttons, and CTAs, size the text box generously and verify by PNG export for wrapping, clipping, and overlap.
- Calling `resizeWithoutConstraints(width, height)` on text can leave `textAutoResize` as `NONE`. If the text should wrap to height, set `textAutoResize = 'HEIGHT'` after the resize and confirm the rendered height by export.
