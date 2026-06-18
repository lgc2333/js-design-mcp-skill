传递给 onClick 回调的参数。更多内容可查看 [处理用户事件 →](/developer-doc/widget/guide/development/Handling-User-Events)

```TypeScript
type WidgetClickEvent = {
  canvasX: number
  canvasY: number
  offsetX: number
  offsetY: number
}
```

#### canvasX: number

canvasX 是鼠标相对于画布的 x 位置，与用于定位节点的绝对位置相同。

#### canvasY: number

canvasY 是鼠标相对于画布的 y 位置，与用于定位节点的绝对位置相同。

#### offsetX: number

offsetX 是鼠标相对于被点击组件的 X 坐标。

#### offsetY: number

offsetY 是鼠标相对于被点击组件的 Y 坐标。
