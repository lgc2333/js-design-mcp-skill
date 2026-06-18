# Plugin API and Docs Mismatch Gotchas

- Do not use MCP to change `TextStyle.letterSpacing` for now. The current JiShi plugin API can turn font-style spacing into `[object Object]`; leave existing/default spacing untouched and adjust it manually until this API path is proven safe.
- Do not fully trust `node.exportSettings[*].constraint.value` for `SCALE`. JiShi can apply fractional export scales such as `0.3x`, but PluginAPI reads may truncate the stored value to an integer (`0.3` reads as `0`, `1.5` as `1`). To verify the real scale, export with an explicit `exportAsync({ constraint: { type: 'SCALE', value } })` setting and inspect the output image dimensions. For Android densities, prefer per-node `WIDTH` constraints when a directly verifiable stored value matters.
