# 原型动作 Action

原型中最主要的几种交互方式。

```TypeScript
type Action =
  { readonly type: "BACK" | "CLOSE" } |
  { readonly type: "URL", url: string } |
  { readonly type: "NODE",
    readonly destinationId: string | null,
    readonly navigation: Navigation,
    readonly transition: Transition | null,
    readonly preserveScrollPosition: boolean,
    readonly overlayRelativePosition?: Vector,
  }

type Navigation = "NAVIGATE" | "SWAP" | "OVERLAY" | "CHANGE_TO"
```

## 返回上一级 "BACK"

返回上一级，可以跳转到进入当前页面的前一帧。

## 关闭 "CLOSE"

关闭动作，一般指关闭弹层。

## 打开外链 "URL"

用来跳转到外部 URL，通过`url: string`参数指定。

## 跳转画板 "NODE"

根据指定的目标节点 ID 进行画板跳转。

#### destinationId: string | null

跳转到的目标节点 ID，可能为`null`（例如指向已删除的节点）。

#### navigation: Navigation

跳转画板对应的方式，根据不同的目标图层和交互，做如下区分：

- 跳转画板`"NAVIGATE"`：直接用目标画板替换当前页面，同时关闭所有弹层。

- 打开弹层`"OVERLAY"`：将目标画板设置为弹层，在当前所显示的页面上打开，关闭弹层后恢复为当前内容。

- 交换弹层`"SWAP"`：将现有弹层替换为新弹层，针对弹层来说与`"NAVIGATE"`形式相同。

- 切换变体`"CHANGE_TO"`：将当前实例组件节点切换为其变体中的任意一种状态。

#### transition: Transition | null

跳转画板时的动画过渡效果，详情见 原型交互 - 过渡。

#### preserveScrollPosition: boolean

滚动时是否固定位置。启用后，对应的图层将固定在屏幕中对应的起始位置，滚动画板时只会滚动其余的画板内容。

#### overlayRelativePosition?: Vector

自定义弹层出现的位置时使用此方法。
