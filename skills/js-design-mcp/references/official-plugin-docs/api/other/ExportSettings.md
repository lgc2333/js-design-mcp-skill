# 导出设置 ExportSettings

「即时设计」 支持三种文件导出类型：图片、SVG 和 PDF 。

```TypeScript
type ExportSettings = ExportSettingsImage | ExportSettingsSVG | ExportSettingsPDF
```

## 通用属性

#### contentsOnly?: boolean [readonly]

是否只导出节点的内容，默认为`true`。当值为`false`时导出，将包含重叠层。

#### useAbsoluteBounds?: boolean [readonly]

导出时是否使用绝对边界，默认为`false`。当值为`true`时导出，将忽略图层可见内容之外的空白区域，只导出可见内容。

#### suffix?: string [readonly]

设置导出时的文件名后缀，默认为空字符串。

## 图片导出设置

#### format: 'JPG' | 'PNG' | 'Webp' [readonly]

导出图片的格式设置，对应三种图片格式，在读取其他属性之前，请务必检查`format`。

#### constraint?: ExportSettingsConstraints [readonly]

导出时的图片的约束设置，通过`"SCALE"`设置导出倍率，默认为 1x（100%），也可通过`"WIDTH"`或`"HEIGHT"`设定一个固定的宽度或高度值，按照比例导出。

```TypeScript
interface ExportSettingsConstraints {
  type: "SCALE" | "WIDTH" | "HEIGHT"
  value: number
}
```

## SVG 导出设置

#### format: 'SVG' [readonly]

导出 SVG 对应的格式设置，在读取其他属性之前，请务必检查`format`。

#### svgOutlineText?: boolean [readonly]

文本是否轮廓化，默认为`true`。

#### svgIdAttribute?: boolean [readonly]

是否在 SVG 中把图层名称保存为 ID 属性，默认为`false` 。

可用于引用特定元素，但会增加 SVG 的体积，蒙版和渐变等需要 ID 才能生效的特性会自带 ID 。

#### svgSimplifyStroke?: boolean [readonly]

是否在导出 SVG 时合并内外描边，默认为`true`，不建议关闭，因为 SVG 只支持居中描边。

## PDF 导出设置

#### format: 'PDF' [readonly]

导出 PDF 对应的格式设置，在读取其他属性之前，请务必检查`format`。
