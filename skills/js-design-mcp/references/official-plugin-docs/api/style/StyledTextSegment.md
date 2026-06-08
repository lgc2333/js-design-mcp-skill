# 设置样式的文本段 StyledTextSegment

对文本节点中选中的一段文字设置了样式后，其对应的相关属性。

#### characters: string

具有相同样式的文本段内的字符。

#### start: number

文本段的起始位置（包括此字符）。

#### end: number

文本段的结束位置（不包括此字符）。

#### fontSize: number

字体的大小，即字号，最小值为 1 。

#### fontName: FontName

字体名称，包括字族和字重。

#### textDecoration: TextDecoration

文本是否有下划线或删除线。

#### textCase: TextCase

文本的格式（如字符大小写）。

#### lineHeight: LineHeight

文本段的行高。

#### letterSpacing: LetterSpacing

文本段的字间距。

#### fills: Paint[]

文本段的填充。

#### textStyleId: string

文本段对应的文本样式 ID 。

#### fillStyleId: string

文本段对应的填充样式 ID 。

#### listOptions: TextListOptions

文本段的列表设置。

#### indentation: number

文本段的首行缩进设置。

#### hyperlink: HyperlinkTarget | null

如果文本节点正好有一个超链接，则为超链接目标；如果节点没有超链接，则为`null`。
