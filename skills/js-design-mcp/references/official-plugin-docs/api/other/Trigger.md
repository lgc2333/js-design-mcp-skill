# 原型交互 - 触发 Trigger

触发交互事件所对应的用户行为。

```TypeScript
type Trigger =
  { readonly type: "ON_CLICK" | "ON_HOVER" | "ON_PRESS" | "ON_DRAG" } |
  { readonly type: "AFTER_TIMEOUT", readonly timeout: number } |
  { readonly type: "MOUSE_ENTER" | "MOUSE_LEAVE" | "MOUSE_UP" | "MOUSE_DOWN",
    readonly delay: number,
  }
```

当触发类型为悬停`"ON_HOVER"`和按住`"ON_PRESS"`时，在触发行为结束后，立即恢复到先前的状态。

与之相对的，鼠标移入`"MOUSE_ENTER"`、鼠标移出`"MOUSE_LEAVE"`、鼠标按下`"MOUSE_UP"`和 鼠标松开`"MOUSE_DOWN"`则是单向的永久性操作，行为结束后不会恢复。

较为特殊的定时`delay`触发行为，只会发生在画板与画板之间，或者组件与组件之间，根据设定的延迟，在一定时间后自动触发，以毫秒为单位。

当前支持的触发事件如下：

| A               | B        |
| --------------- | -------- |
| "ON_CLICK"      | 点击     |
| "ON_HOVER"      | 悬停     |
| "ON_PRESS"      | 按下     |
| "ON_DRAG"       | 拖拽     |
| "AFTER_TIMEOUT" | 延时     |
| "MOUSE_ENTER"   | 指针移入 |
| "MOUSE_LEAVE"   | 指针移出 |
| "MOUSE_UP"      | 鼠标按下 |
| "MOUSE_DOWN"    | 鼠标松开 |
