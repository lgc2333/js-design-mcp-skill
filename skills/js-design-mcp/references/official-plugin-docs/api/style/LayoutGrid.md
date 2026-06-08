# 网格布局 LayoutGrid

网格布局有两种类型，分别为均匀网格和行列式网格。

```TypeScript
type LayoutGrid = RowsColsLayoutGrid | GridLayoutGrid
```

## 通用属性

#### visible?: boolean [readonly]

网格布局是否可见。默认为`true`。

#### color?: RGBA [readonly]

网格布局的颜色。

## 行列式网格布局属性

#### pattern: 'ROWS' | 'COLUMNS' [readonly]

网格布局的模式设置，字符串为`'ROWS' | 'COLUMNS'`，对应行（横向）和列（纵向）两种，在读取其他属性之前，请务必检查`pattern`。

#### alignment: 'MIN' | 'MAX' | 'STRETCH' | 'CENTER' [readonly]

网格布局的对齐方式。

- `"MIN"：与画板的左或上边界对齐`

- `"MAX"：与画板的右或下边界对齐`

- `"CENTER"：与画板的中心位置`对齐

- `"STRETCH"：随画板拉伸，与画板的左右或上下两端对齐`

#### gutterSize: number [readonly]

各个网格之间的间距。

#### count: number [readonly]

网格的行/列数量，值可以设置为`Infinity`，即自动适应。

#### sectionSize?: number [readonly]

网格每一段的尺寸，当`alignment == "STRETCH"`时忽略。

#### offset?: number [readonly]

网格与画板边界的间距，当`alignment == "CENTER"`时忽略。

## 均匀网格布局

#### pattern: 'GRID' [readonly]

网格布局的模式设置，字符串为`'GRID'`，在读取其他属性之前，请务必检查`pattern`。

#### sectionSize: number [readonly]

网格单元格的尺寸。
