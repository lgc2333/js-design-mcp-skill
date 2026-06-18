# Effect Style Gotchas

- `DROP_SHADOW` effects must include `blendMode`, for example `blendMode: 'NORMAL'`; omitting it can fail `EffectStyle.effects` writes.
