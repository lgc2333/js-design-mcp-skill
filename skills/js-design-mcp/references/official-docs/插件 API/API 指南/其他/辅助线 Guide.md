辅助线是水平（Y 轴）或垂直（X 轴）的直线，对应的偏移量决定了它相对于其父级节点（画布或画板）的位置。

```TypeScript
interface Guide {
  readonly axis: "X" | "Y"
  readonly offset: number
}
```
