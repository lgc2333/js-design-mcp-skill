字间距的数值对应着两种不同的单位，`"PIXELS"` 和`"PERCENT"`分别对应像素和百分比，与 CSS 类似。

```TypeScript
type LetterSpacing = {
  readonly value: number
  readonly unit: "PIXELS" | "PERCENT"
}
```
