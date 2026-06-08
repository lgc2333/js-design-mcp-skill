# 响应式调整 Constraints

当图层所在的画板尺寸调整时，图层会进行相应的的自动调整。

```TypeScript
interface Constraints {
  readonly horizontal: ConstraintType
  readonly vertical: ConstraintType
}
```

响应式调整对应的几种设置类型如下：

- `"MIN"`：与画板的左或上边界间距固定

- `"MAX"`：与画板的右或下边界间距固定

- `"CENTER"`：固定在画板的中心位置

- `"STRETCH"`：随画板拉伸，与画板的左右或上下边界间距固定

- `"SCALE"`：随画板缩放，与画板所有边界间距固定

```TypeScript
type ConstraintType = "MIN" | "CENTER" | "MAX" | "STRETCH" | "SCALE"
```
