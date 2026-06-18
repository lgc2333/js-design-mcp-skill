行高的数值对应着两种不同的单位，`"PIXELS"` 和`"PERCENT"`分别对应像素和百分比，与 CSS 类似，同时还可以设置为`AUTO`自动行高。

```TypeScript
type LineHeight = {
  readonly value: number
  readonly unit: "PIXELS" | "PERCENT"
} | {
  readonly unit: "AUTO"
}
```
