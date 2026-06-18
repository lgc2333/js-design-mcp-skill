在「即时设计」中，画板主要用于定义布局层级关系，其与自动布局的差异是，它的子节点仅使用 x 和 y 来约束位置。

如果你需要使用自动布局，请使用 AutoLayout 代替。

## 基础属性

#### name?: string

组件的名称。在搜索小组件的子层时，可以指定图层名称，便于调试。

#### hidden?: boolean

是否显示此组件。

#### onClick?: (event: WidgetClickEvent) => Promise\<any\> | void

在指定节点上添加点击事件。如果给定方法是异步的或返回一个 Promise，则小组件仅在异步方法完成并且 Promise 已解决时才会终止。点击事件还会传递一个 WidgetClickEvent 对象，该对象包含有关单击的附加信息。

更多内容可查看 [处理用户事件 →](/developer-doc/widget/guide/development/Handling-User-Events)

#### key?: string | number

组件的键。

#### hoverStyle?: HoverStyle

当鼠标悬停在组件上时对应的样式。

#### tooltip?: string

当鼠标悬停在组件上时，需要向用户显示的工具提示。

#### positioning?: 'auto' | 'absolute'

除非节点是自动布局画板的直接子节点，否则将忽略此值。

| 值         | 描述                                                                                                       |
| ---------- | ---------------------------------------------------------------------------------------------------------- |
| 'auto'     | 将当前节点设置为自动宽度/高度。                                                                            |
| 'absolute' | 让当前节点不再跟随自动布局调整位置，但仍在自动布局画板内，同时支持单独设置 X、Y 及宽高的值（即绝对定位）。 |

## 混合相关属性

#### blendMode?: BlendMode

组件的混合模式。

#### opacity?: number

组件的不透明度。

#### effect?: Effect | Effect[]

组件的特效。

## 约束相关属性

#### x?: number | HorizontalConstraint

节点的 x 轴位置。

如果节点为自动布局画板的子节点，并且 positioning 设置为「自动」时，忽略此值。

#### y?: number | VerticalConstraint

节点的 y 轴位置。

如果节点为自动布局画板的子节点，并且 positioning 设置为「自动」时，忽略此值。

#### overflow?: 'visible' | 'hidden' | 'scroll'

组件的溢出内容处理（可见、隐藏或溢出滚动）。

## 尺寸属性（必须）

#### width: Size

组件的宽度，必须存在该值。

#### height: Size

组件的高度，必须存在该值。

#### rotation?: number

节点的旋转度数，期望值从 -180 到 180。

旋转相对于对象的左上角，与物体的位置无关。

## 圆角相关属性

#### cornerRadius?: CornerRadius

圆角半径。

该值必须是非负的并且可以是小数。如果边长小于拐角半径的两倍，则边的每个顶点的拐角半径将被限制为边长的一半。

矩形节点的四个角可以有不同的角半径。

## **图形相关属性**

#### fill?: HexCode | Color | Paint | Paint[]

节点的填充颜色。

#### stroke?: HexCode | Color | SolidPaint | GradientPaint | (SolidPaint | GradientPaint)[]

节点的描边颜色。

#### strokeWidth?: number

描边的粗细，以像素为单位，该值必须是非负的并且可以是小数。

#### strokeAlign?: StrokeAlign

描边相对于节点边界的对齐方式（居中、内部或外部）。

#### strokeDashPattern?: number[]

虚线描边的间隙长度，以像素为单位，为空时，描边为实线。

## 默认属性

| 属性         | 默认值         |
| ------------ | -------------- |
| name         | ""             |
| hidden       | FALSE          |
| x            | 0              |
| y            | 0              |
| blendMode    | "pass-through" |
| opacity      | 1              |
| effect       | []             |
| fill         | []             |
| stroke       | []             |
| strokeWidth  | 1              |
| strokeAlign  | "inside"       |
| rotation     | 0              |
| cornerRadius | 0              |
| overflow     | "scroll"       |
