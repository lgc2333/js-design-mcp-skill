# API Styles Index

Paints, effects, grids, text styles, images, styled text segments, and style objects.

- [基础样式](../api/style/BaseStyle.md) - 样式 ID，具有唯一性。可以分配给`fillStyleId`、`backgroundStyleId`、`strokeStyleId`、`textStyleId`等。 Symbols: id, name, remove(), getPluginData(key: string), setPluginData(key: string, value: string), getPluginDataKeys().
- [特效 Effect](../api/style/Effect.md) - 「即时设计」支持常见的四种特殊效果：外阴影、内阴影、高斯模糊以及背景模糊。 Symbols: Effect, type, color, offset, radius, spread.
- [特效样式 EffectStyle](../api/style/EffectStyle.md) - 将阴影或者模糊创建为对应样式后，所具备的相关内容。 Symbols: type, effects, id, name, remove(), getPluginData(key: string).
- [网格布局样式 GridStyle](../api/style/GridStyle.md) - 将网格布局创建为网格布局样式后，所对应的相关内容。 Symbols: type, layoutGrids, id, name, remove(), getPluginData(key: string).
- [图片 Image](../api/style/Image.md) - 在「即时设计」中，图片都是作为填充属性存在，而非单独的图片图层，每次导入图片都会自动创建一个矩形并将图片设置为该矩形的填充，也可以手动创建一个矩形，并在其填充属性中修改为图片填充。 Symbols: hash, getBytesAsync().
- [网格布局 LayoutGrid](../api/style/LayoutGrid.md) - 网格布局有两种类型，分别为均匀网格和行列式网格。 Symbols: LayoutGrid, visible, color, pattern, alignment, gutterSize.
- [填充 Paint](../api/style/Paint.md) - 「即时设计」支持三种填充类型：纯色、渐变和图片。 Symbols: Paint, ImageFilters, ColorStop, visible, opacity, blendMode.
- [填充样式 PaintStyle](../api/style/PaintStyle.md) - 将填充创建为填充样式后，该样式所对应的相关内容。 Symbols: type, paints, id, name, remove(), getPluginData(key: string).
- [设置样式的文本段 StyledTextSegment](../api/style/StyledTextSegment.md) - 对文本节点中选中的一段文字设置了样式后，其对应的相关属性。 Symbols: characters, start, end, fontSize, fontName, textDecoration.
- [文本样式 TextStyle](../api/style/TextStyle.md) - 将文本节点创建为文本样式后，该样式所对应的相关内容。 Symbols: type, fontSize, textDecoration, fontName, letterSpacing, lineHeight.
- [文本子层 TextSublayer](../api/style/TextSublayer.md) - 文本子层节点是文本节点的精简版本，它具有大多数文本属性，除了文本垂直、文本自动调整大小以及填充，它们在文本子层上不可编辑、不可调整大小或重新定位。 Symbols: toString(), parent, hasMissingFont, paragraphIndent, paragraphSpacing, fontSize.
