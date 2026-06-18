确定自动布局的子级应如何在主轴/反轴方向上对齐。

```TypeScript
type AlignItems = 'center' | 'start' | 'end' | 'baseline'
```

## 说明

- `"start"`和`"end"`分别对应：
  - left 和 right 分别用于「水平」方向的自动布局属性。
  - top 和 bottom 分别用于具有「垂直」方向的自动布局属性。

- `"baseline"`只能在水平自动布局框架上设置，并沿文本基线对齐所有子级。
