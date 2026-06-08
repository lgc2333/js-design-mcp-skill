# 弹层 Overlay

原型交互中，与弹层相关的一些属性。

#### OverlayBackground

```TypeScript
type OverlayBackground =
  { readonly type: "NONE" } |
  { readonly type: "SOLID_COLOR", readonly color: RGBA }
```

弹层可以设置为无背景或纯色背景，支持修改透明度。

#### OverlayPositionType

```TypeScript
type OverlayPositionType = "CENTER" | "TOP_LEFT" | "TOP_CENTER" | "TOP_RIGHT" | "BOTTOM_LEFT" | "BOTTOM_CENTER" | "BOTTOM_RIGHT" | "MANUAL"
```

弹层在演示设备屏幕所处的位置，其中`"MANUAL"`较为特殊，是相对于触发弹层的元素的位置。

#### OverlayBackgroundInteraction

```TypeScript
type OverlayBackgroundInteraction = "NONE" | "CLOSE_ON_CLICK_OUTSIDE"
```

弹层背景的交互设置，一般设置为`"CLOSE_ON_CLICK_OUTSIDE"`，即支持点击弹层外部区域关闭弹层。
