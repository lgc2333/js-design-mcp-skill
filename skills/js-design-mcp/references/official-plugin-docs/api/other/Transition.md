# 原型交互 - 过渡 Transition

原型交互中，跳转画板行为所使用的过渡效果。

```TypeScript
interface SimpleTransition {
  readonly type: "DISSOLVE" | "SMART_ANIMATE" | "SCROLL_ANIMATE"
  readonly easing: Easing
  readonly duration: number
}

interface DirectionalTransition {
  readonly type: "MOVE_IN" | "MOVE_OUT" | "PUSH" | "SLIDE_IN" | "SLIDE_OUT"
  readonly direction: "LEFT" | "RIGHT" | "TOP" | "BOTTOM"
  readonly matchLayers: boolean

  readonly easing: Easing
  readonly duration: number
}

type Transition = SimpleTransition | DirectionalTransition

interface Easing {
  readonly type: "EASE_IN" | "EASE_OUT" | "EASE_IN_AND_OUT" | "LINEAR" | "EASE_IN_BACK" | "EASE_OUT_BACK" | "EASE_IN_AND_OUT_BACK" | "CUSTOM_CUBIC_BEZIER"
  readonly easingFunctionCubicBezier?: { x1: number, y1: number, x2: number, y2: number }
}
```

「即时设计」支持智能动画，当过渡类型`type`为`"SMART_ANIMATE"`或匹配图层`matchLayers`为`true`时，将启用智能动画，自动补全元素从起始到结束位置的动画帧，形成自然过渡。

当过渡的方式设置为`"CUSTOM_CUBIC_BEZIER"`时，将支持用户自定义动画曲线，通过`easingFunctionCubicBezier`定义三次贝塞尔曲线的点，相关值`x1，y1，x2，y2`与界面中的输入框对应。

当前支持的过渡类型如下：

| A                      | B            |
| ---------------------- | ------------ |
| "DISSOLVE"             | 淡入淡出     |
| "SMART_ANIMATE"        | 智能动画     |
| "SCROLL_ANIMATE"       | 鼠标滚动动画 |
| "MOVE_IN"              | 移入         |
| "MOVE_OUT"             | 移出         |
| "PUSH"                 | 推入         |
| "SLIDE_IN"             | 滑入         |
| "SLIDE_OUT"            | 滑出         |
| "EASE_IN"              | 缓入         |
| "EASE_OUT"             | 缓出         |
| "EASE_IN_AND_OUT"      | 缓动         |
| "LINEAR"               | 线性         |
| "EASE_IN_BACK"         | 缓入回弹     |
| "EASE_OUT_BACK"        | 缓出回弹     |
| "EASE_IN_AND_OUT_BACK" | 缓入缓出回弹 |
| "CUSTOM_CUBIC_BEZIER"  | 自定义       |
