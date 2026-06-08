# 文本子层 TextSublayer

文本子层节点是文本节点的精简版本，它具有大多数文本属性，除了文本垂直、文本自动调整大小以及填充，它们在文本子层上不可编辑、不可调整大小或重新定位。

您可以像设置任何其他文本节点一样设置文本内容，与「即时设计」中的所有其他文本操作一样，需要确保字体已加载。

## 基础特性

#### toString(): string

获取节点的字符串表示形式。

#### parent: (BaseNode & ChildrenMixin) | null [readonly]

获取当前节点的父节点，如果不存在则返回`null`。

## 文本节点相关属性及方法

#### hasMissingFont: boolean [readonly]

是否存在缺失字体。

#### paragraphIndent: number

段落缩进字符数的设置（段落第一行偏移字符数），设置此属性需要加载字体。

#### paragraphSpacing: number

段间距设置，需加载字体。

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

#### characters: string

文本中的字符内容，设置此属性需要加载字体。

#### insertCharacters(start: number, characters: string, useStyle?: 'BEFORE' | 'AFTER'): void

插入特定文本内容。

#### deleteCharacters(start: number, end: number): void

删除特定文本内容。

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

#### fills: ReadonlyArray\<Paint\> | PluginAPI['mixed']

图形的填充属性。

#### fillStyleId: string | PluginAPI['mixed']

填充样式 ID 。

#### fillGeometry: VectorPaths

填充对应的矢量路径。
