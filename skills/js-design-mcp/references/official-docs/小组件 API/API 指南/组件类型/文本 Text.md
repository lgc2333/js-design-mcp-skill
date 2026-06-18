文本组件支持绝大多数可应用于「即时设计」中文本的属性，并且是在小组件中包含文本的主要方式。

## 示例

```TypeScript
<Text fontFamily="Inter" fontSize={20}>
  Hello Widget
</Text>
```

## 文本样式属性

#### href?: string

如果指定该值，则为文本添加跳转到指定地址的超链接。

#### fontFamily?: string

文本使用的字族，如思源黑体，支持所有官方字体。

#### letterSpacing?: number

文本的字间距。

#### textDecoration?: 'none' | 'strikethrough' | 'underline'

文本装饰，是否带有下划线或删除线。

#### fontSize?: number

字体的大小，最小值为 1。

#### textCase?: 'upper' | 'lower' | 'title' | 'original' | 'small-caps' | 'small-caps-forced'

覆盖文本节点中原始字符的大小写。

#### fontWeight?: FontWeight

字重，即字体粗细，如 400、500，如 'Medium'（中等）、'Bold'（粗体），默认显示字重为 ' Regular'（常规）。

#### fill?: HexCode | Color | Paint | (SolidPaint | GradientPaint)[]

文本填充颜色。

#### paragraphSpacing?: number

文本的段间距（段落之间的垂直距离）。

#### horizontalAlignText?: 'left' | 'right' | 'center' | 'justified'

文本相对于 Text 节点的水平对齐方式。

#### verticalAlignText?: 'top' | 'center' | 'bottom'

文本相对于 Text 节点的垂直对齐方式。

#### lineHeight?: number | string | 'auto'

一段文本中的行间距。

#### stroke?: HexCode | Color | SolidPaint | GradientPaint | (SolidPaint | GradientPaint)[]

文本的描边颜色。

#### strokeWidth?: number

文本的描边粗细，以像素为单位，该值必须是非负的并且可以是小数。

#### strokeAlign?: StrokeAlign

描边相对于节点边界的对齐方式（居中、内部或外部）。

## 尺寸属性

#### width: Size

组件的宽度，必须存在该值。

#### height: Size

组件的高度，必须存在该值。

#### rotation?: number

节点的旋转度数，期望值从 -180 到 180。

旋转相对于对象的左上角，与物体的位置无关。

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

## 默认属性

| 属性                | 默认值         |
| ------------------- | -------------- |
| name                | ""             |
| hidden              | FALSE          |
| x                   | 0              |
| y                   | 0              |
| blendMode           | "pass-through" |
| opacity             | 1              |
| effect              | []             |
| width               | "hug-contents" |
| height              | "hug-contents" |
| rotation            | 0              |
| fontFamily          | "Inter"        |
| horizontalAlignText | "left"         |
| verticalAlignText   | "top"          |
| letterSpacing       | 0              |
| lineHeight          | "auto"         |
| textDecoration      | "none"         |
| textCase            | "original"     |
| fontSize            | 16             |
| italic              | FALSE          |
| fill                | "#000000"      |
| blendMode           | "normal"       |
| fontWeight          | 400            |
| paragraphIndent     | 0              |
| paragraphSpacing    | 0              |
