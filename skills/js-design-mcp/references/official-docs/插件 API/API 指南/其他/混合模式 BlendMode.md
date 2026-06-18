图层与图层间的叠加/混合模式，完全按照通用标准，详情见 [Web/CSS/blend-mode](https://developer.mozilla.org/en-US/docs/Web/CSS/blend-mode) 。

```TypeScript
type BlendMode = "NORMAL" | "DARKEN" | "MULTIPLY" | …… | "LUMINOSITY"
```

| A              | B        |
| -------------- | -------- |
| "PASS_THROUGH" | 穿透     |
| "NORMAL"       | 正常     |
| "DARKEN"       | 变暗     |
| "MULTIPLY"     | 正片叠底 |
| "LINEAR_BURN"  | 线性加深 |
| "COLOR_BURN"   | 颜色加深 |
| "LIGHTEN"      | 变亮     |
| "SCREEN"       | 滤色     |
| "LINEAR_DODGE" | 线性减淡 |
| "COLOR_DODGE"  | 颜色减淡 |
| "OVERLAY"      | 叠加     |
| "SOFT_LIGHT"   | 柔光     |
| "HARD_LIGHT"   | 强光     |
| "DIFFERENCE"   | 差集     |
| "EXCLUSION"    | 排除     |
| "HUE"          | 色相     |
| "SATURATION"   | 饱和度   |
| "COLOR"        | 颜色     |
| "LUMINOSITY"   | 明度     |
