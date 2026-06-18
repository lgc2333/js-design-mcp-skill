输入组件支持直接在小组件内键入或编辑文本。更多内容可查看 [文本编辑 →](/developer-doc/widget/guide/development/TextEdit)

## 输入属性

#### onTextEditEnd: ({ characters: string }: TextEditEvent) => void

当用户退出文本编辑模式时调用的方法。使用包含可编辑文本字段中的字符的对象调用此方法。

onTextEditEnd 事件始终可以通过单击元素外、按 Escape 或 Cmd + Enter 来触发。

#### value: string | null

可编辑文本的值，通常，此值将是一个同步的变量，将在 onTextEditEnd 回调中设置。

#### placeholder?: string

每当值为 null 或空字符串时显示的占位符文本。

#### placeholderProps?: PlaceholderProps

用于自定义文本占位符的属性，

Input 组件上的所有相关属性将自动应用于可编辑文本和占位符，此处指定的其他属性后，将仅应用于占位符文本。

#### inputFrameProps?: Omit\<AutoLayoutProps, 'width'\>

用于自定义作为可编辑文本和占位符父级的 Autolayout 框架的属性。

#### width?: Size

可编辑文本的宽度，默认为 200。如果用户输入超出宽度，文本将自动换行。

#### inputBehavior?: 'wrap' | 'truncate' | 'multiline'

允许你指定 Input 组件的一些交互和调整大小的行为。

| 值               | 描述                                                                                              |
| ---------------- | ------------------------------------------------------------------------------------------------- |
| "wrap" (default) | 键入 Enter 会结束输入并触发 onTextEditEnd。溢出时，文本将换行到下一行，输入的高度将自动调整大小。 |
| "truncate"       | 键入 Enter 会结束输入并触发 onTextEditEnd。溢出时，文本将被截断。                                 |
| "multiline"      | 键入 Enter 将创建一个新行。溢出时，文本将换行到下一行，输入的高度将自动调整大小。                 |

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

| 属性                | 默认值           |
| ------------------- | ---------------- |
| name                | ""               |
| hidden              | FALSE            |
| x                   | 0                |
| y                   | 0                |
| blendMode           | "pass-through"   |
| opacity             | 1                |
| effect              | []               |
| width               | 200              |
| height              | "hug-contents"   |
| rotation            | 0                |
| flipVertical        | FALSE            |
| fontFamily          | "Inter"          |
| horizontalAlignText | "left"           |
| verticalAlignText   | "top"            |
| letterSpacing       | 0                |
| lineHeight          | "auto"           |
| textDecoration      | "none"           |
| textCase            | "original"       |
| fontSize            | 16               |
| italic              | FALSE            |
| fill                | "#000000"        |
| blendMode           | "normal"         |
| fontWeight          | 400              |
| paragraphIndent     | 0                |
| paragraphSpacing    | 0                |
| placeholderProps    | { opacity: 0.3 } |
