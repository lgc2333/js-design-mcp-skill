```TypeScript
interface Color {
  r: number
  g: number
  b: number
  a: number
}
```

表示完整的颜色值，值从 0 到 1，例如黑色是`{r: 0, g: 0, b: 0, a: 1}`，白色是`{r: 1, g: 1, b: 1, a: 1}`。

所有颜色都在相同的颜色空间中指定。

## HexCode

小组件的色值使用 Hex 格式。

```TypeScript
type HexCode = string
```
