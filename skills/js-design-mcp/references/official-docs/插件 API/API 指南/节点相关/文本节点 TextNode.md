文本节点中，整个节点或特定的字符范围都可以具有颜色（填充）、字体大小、字体名称等属性。

当使用文本节点时，需要考虑字体加载、字体缺失以及文本段中的混合样式等内容。

## 文本节点属性

#### type: 'TEXT' [readonly]

文本的节点类型，由字符串`'TEXT'`表示

#### clone(): TextNode

复制文本节点。默认情况下，复制的节点将成为`jsDesign.currentPage`的子节点。

#### hasMissingFont: boolean [readonly]

是否存在缺失字体。

#### textAlignHorizontal: 'LEFT' | 'CENTER' | 'RIGHT' | 'JUSTIFIED'

文本的水平对齐方式。

#### textAlignVertical: 'TOP' | 'CENTER' | 'BOTTOM'

文本的垂直对齐方式。

#### textAutoResize: 'WIDTH_AND_HEIGHT' | 'HEIGHT' | 'NONE' | 'TRUNCATE'

文本框适应文字内容的方式，具体如下：

• `WIDTH_AND_HEIGHT`，图层宽高均由文本决定，对应文本设置中的「自动宽度」选项；

• `HEIGHT`，图层高度由文本决定，宽度可以自定义固定数值，对应「自动高度」选项；

• `NONE`，图层宽高均可自定义固定数值，对应「固定尺寸」选项；

• `TRUNCATE`，效果同「固定尺寸」，但在文本框外的文字会以省略号显示，对应「省略文本」选项。

#### paragraphIndent: number

段落缩进字符数的设置（段落第一行偏移字符数），设置此属性需要加载字体。

#### paragraphSpacing: number

段间距设置，需加载字体。

#### autoRename: boolean

修改文本内容时，是否重命名节点名称。

## 文本内容

#### characters: string

文本中的字符内容，设置此属性需要加载字体。

#### insertCharacters(start: number, characters: string, useStyle?: 'BEFORE' | 'AFTER'): void

插入特定文本内容。

#### deleteCharacters(start: number, end: number): void

删除特定文本内容。

## 文本段属性

这些属性可以应用于整个文本节点，或特定字符范围的部分文本内容。

#### fontSize: number | PluginAPI['mixed'\]

字体的大小，最小值为 1 。

#### fontName: FontName | PluginAPI['mixed'\]

字体名称（字族和字重）设置，修改此属性需加载对应字体。

#### textCase: TextCase | PluginAPI['mixed'\]

文本格式设置，需加载字体。

#### textDecoration: TextDecoration | PluginAPI['mixed'\]

文本下划线或删除线等，需加载字体。

#### letterSpacing: LetterSpacing | PluginAPI['mixed'\]

字间距，需加载字体。

#### lineHeight: LineHeight | PluginAPI['mixed'\]

行间距，需加载字体。

#### textStyleId: string | PluginAPI['mixed'\]

当前使用的文本样式 ID，需加载字体。

#### hyperlink: HyperlinkTarget | null | PluginAPI['mixed'\]

文本超链接设置，如果节点没有超链接，则返回`null`。

## 文本段相关方法

用户获取和设置部分文本属性的方法。

#### getStyledTextSegments<StyledTextSegmentFields extends (keyof Omit< StyledTextSegment, 'characters' | 'start' | 'end' >)]>(fields: StyledTextSegmentFields, start?: number, end?: number): Array<Pick<[StyledTextSegment, StyledTextSegmentFields[number] | 'characters' | 'start' | 'end'>>

获取文本段以及对应的文本属性（字体大小，格式等）。

#### getRangeFontSize(start: number, end: number): number | PluginAPI['mixed'\]

获取文本段的字号。

#### setRangeFontSize(start: number, end: number, value: number): void

设置文本段的字号，需加载字体。

#### getRangeFontName(start: number, end: number): FontName | PluginAPI['mixed'\]

获取文本段所用字体名称。

#### setRangeFontName(start: number, end: number, value: FontName): void

为文本段设置字体，需加载对应字体。

#### getRangeAllFontNames(start: number, end: number): FontName[]

获取文本段内所有字体名称。

#### getRangeTextCase(start: number, end: number): TextCase | PluginAPI['mixed'\]

获取文本段的文本格式。

#### setRangeTextCase(start: number, end: number, value: TextCase): void

设置文本段的文本格式，需加载字体。

#### getRangeTextDecoration(start: number, end: number): TextDecoration | PluginAPI['mixed'\]

获取文本段的文字下划线、删除线。

#### setRangeTextDecoration(start: number, end: number, value: TextDecoration): void

设置文本段的文字下划线、删除线，需加载字体。

#### getRangeLetterSpacing(start: number, end: number): LetterSpacing | PluginAPI['mixed'\]

获取文本段的字间距。

#### setRangeLetterSpacing(start: number, end: number, value: LetterSpacing): void

设置文本段的字间距，需加载字体。

#### getRangeLineHeight(start: number, end: number): LineHeight | PluginAPI['mixed'\]

获取文本段的行高。

#### setRangeLineHeight(start: number, end: number, value: LineHeight): void

设置文本段的行高，需加载字体。

#### getRangeHyperlink(start: number, end: number): HyperlinkTarget | null | PluginAPI['mixed'\]

获取文本段的文本超链接。

#### setRangeHyperlink(start: number, end: number, value: HyperlinkTarget | null): void

为文本段设置文本超链接。如果`value`为`null`，则删除已设置的超链接。

#### getRangeFills(start: number, end: number): Paint] | [PluginAPI['mixed'\]

获取文本段的颜色填充。

#### setRangeFills(start: number, end: number, value: Paint[]): void

设置文本段的颜色填充。

#### getRangeTextStyleId(start: number, end: number): string | PluginAPI['mixed'\]

获取文本段的文本样式 ID 。

#### setRangeTextStyleId(start: number, end: number, value: string): void

为文本段设置文本样式 ID，需加载字体。

#### getRangeFillStyleId(start: number, end: number): string | PluginAPI['mixed'\]

获取文本段的填充样式 ID 。

#### setRangeFillStyleId(start: number, end: number, value: string): void

为文本段设置填充样式 ID 。

## 基础节点属性

#### id: string [readonly]

节点的 id，具有唯一性，插件一般需要通过 id 即可直接访问到节点。

#### parent: (BaseNode & ChildrenMixin) | null [readonly]

获取当前节点的父节点，如果不存在则返回`null`。

#### name: string

当前节点在图层面板中所显示的名称。

#### removed: boolean [readonly]

判断节点是否已被删除。

#### toString(): string

获取节点的字符串表示形式。

#### remove(): void

删除当前节点**及其所有子节点**。

#### setRelaunchData(data: { [command: string]: string }): void

设置重启插件相关数据，在选择节点时显示按钮和说明。

#### getRelaunchData(): { [command: string]: string }

获取当前节点上设置的`setRelaunchData`数据。

#### setPluginData(key: string, value: string): void

通过设置`key`在节点或样式上保存自定义信息，**完全私有，仅对你的插件生效**。

#### getPluginData(key: string): string

获取当前节点或样式上保存的自定义信息。

#### getPluginDataKeys(): string[]

获取当前节点或样式上的所有自定义信息对应`key`的列表。

#### setSharedPluginData(namespace: string, key: string, value: string): void

通过设置`key`在节点或样式上保存自定义信息，**公开给所有插件**。

#### getSharedPluginData(namespace: string, key: string): string

获取当前节点或样式上保存的公开的自定义信息。

#### getSharedPluginDataKeys(namespace: string): string[]

获取当前节点或样式上的所有公开的自定义信息对应`key`的列表。

## 画面节点属性

#### visible: boolean

设置节点是否可见（显示/隐藏），不影响插件访问节点。

#### locked: boolean

设置节点是否被锁定，防止用户在画布上的某些交互，如选择和拖动。不影响插件修改节点属性。

## 混合相关属性

#### opacity: number

节点的不透明度，须在 0 到 1 之间。

#### blendMode: 'NORMAL' | BlendMode

节点的混合模式，如正常、变暗、正片叠底等。

#### isMask: boolean

节点是否为蒙版。

#### isHideMaskLayer: boolean

创建为蒙版后，是否隐藏蒙版层，同时保持蒙版生效。

#### effects: ReadonlyArray\<Effect\>

节点的特效，即阴影、模糊效果。

#### effectStyleId: string

阴影或模糊样式 ID 。

## 图形相关属性

#### fills: ReadonlyArray\<Paint\> | PluginAPI['mixed']

图形的填充属性。

#### fillStyleId: string | PluginAPI['mixed']

填充样式 ID 。

#### fillGeometry: VectorPaths

填充对应的矢量路径。

#### strokes: ReadonlyArray\<Paint\>

图形的描边属性。

#### strokeStyleId: string

描边样式 ID 。

#### strokeWeight: number

描边的粗细数值。

#### strokeJoin: StrokeJoin | PluginAPI['mixed']

描边的顶点。

#### strokeAlign: 'CENTER' | 'INSIDE' | 'OUTSIDE'

描边的对齐方式，居中、内部、外部。

#### dashPattern: ReadonlyArray\<number\>

虚线描边对应的间隙数值。

#### strokeGeometry: VectorPaths

描边对应的矢量路径。

#### strokeCap: StrokeCap | PluginAPI['mixed']

描边的端点。

#### outlineStroke(): VectorNode | null

描边轮廓化的方法。

## 布局相关属性

#### absoluteTransform: Transform [readonly]

节点相对于包含它的页面的位置，返回对应的变换矩阵。

#### relativeTransform: Transform

节点相对于其父节点的位置，返回对应的变换矩阵。

#### x: number

节点的 x 轴位置，等价于`relativeTransform[0][2]`。

#### y: number

节点的 y 轴位置，等价于`relativeTransform[1][2]`。

#### rotation: number

节点的旋转角度，以度为单位，返回 -180 到180 之间的值。

#### width: number [readonly]

节点的宽度。

#### height: number [readonly]

节点的高度。

#### absoluteRenderBounds: Rect | null [readonly]

节点的实际边界，受阴影、模糊等属性影响。

#### constrainProportions: boolean

是否固定图层的宽高比例。

#### layoutAlign: 'MIN' | 'CENTER' | 'MAX' | 'STRETCH' | 'INHERIT'

自动布局相关属性，确定对齐方式。

#### layoutGrow: number

自动布局相关属性，确定拉伸方式，0 为固定，1 为自适应。

#### resize(width: number, height: number): void

调整节点尺寸的方法，会影响子级。

#### resizeWithoutConstraints(width: number, height: number): void

调整节点尺寸的方法， 不会影响子级。

#### rescale(scale: number): void

重新缩放节点，对应缩放工具。

#### constraints: Constraints

当前节点相对于包含其的画板节点`FrameNode`的响应式调整/约束设置。

## 导出相关属性

#### exportSettings: ReadonlyArray\<ExportSettings\>

节点的导出设置。

#### exportAsync(settings?: ExportSettings): Promise\<Uint8Array\>

将节点导出为对应编码的图片。

## 原型交互相关属性

#### reactions: ReadonlyArray\<Reaction\>

原型中与当前节点交互的方式及动作。

## 画板相关的原型属性

#### overflowDirection: OverflowDirection

溢出滚动设置。

#### numberOfFixedChildren: number

滚动时固定位置的子级。

#### overlayPositionType: OverlayPositionType [readonly]

弹层打开的位置。

#### overlayBackground: OverlayBackground [readonly]

弹层的背景遮罩设置。

#### overlayBackgroundInteraction: OverlayBackgroundInteraction [readonly]

弹层的交互方式。
