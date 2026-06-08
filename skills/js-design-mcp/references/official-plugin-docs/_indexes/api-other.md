# API Other Index

Shared types and settings: user, vectors, blend modes, typography units, prototype actions, overlays, export settings.

- [原型动作 Action](../api/other/Action.md) - 原型中最主要的几种交互方式。 Symbols: Action, Navigation, destinationId, navigation, transition, preserveScrollPosition.
- [混合模式 BlendMode](../api/other/BlendMode.md) - 图层与图层间的叠加/混合模式，完全按照通用标准，详情见 [Web/CSS/blend-mode](https://developer.mozilla.org/en-US/docs/Web/CSS/blend-mode) 。 Symbols: BlendMode.
- [响应式调整 Constraints](../api/other/Constraints.md) - 当图层所在的画板尺寸调整时，图层会进行相应的的自动调整。 Symbols: Constraints, ConstraintType.
- [导出设置 ExportSettings](../api/other/ExportSettings.md) - 「即时设计」 支持三种文件导出类型：图片、SVG 和 PDF 。 Symbols: ExportSettings, ExportSettingsConstraints, contentsOnly, useAbsoluteBounds, suffix, format.
- [字体名称 FontName](../api/other/FontName.md) - 文本节点所使用的字体。 Symbols: Font, FontName.
- [辅助线 Guide](../api/other/Guide.md) - 辅助线是水平（Y 轴）或垂直（X 轴）的直线，对应的偏移量决定了它相对于其父级节点（画布或画板）的位置。 Symbols: Guide.
- [曲线控制 HandleMirroring](../api/other/HandleMirroring.md) - 任意锚点的曲线控制方式。 Symbols: HandleMirroring.
- [超链接 HyperlinkTarget](../api/other/HyperlinkTarget.md) - 表示超链接的目标对象，一般有以下两种类型： Symbols: HyperlinkTarget.
- [字间距 LetterSpacing](../api/other/LetterSpacing.md) - 字间距的数值对应着两种不同的单位，`"PIXELS"` 和`"PERCENT"`分别对应像素和百分比，与 CSS 类似。 Symbols: LetterSpacing.
- [行高 LineHeight](../api/other/LineHeight.md) - 行高的数值对应着两种不同的单位，`"PIXELS"` 和`"PERCENT"`分别对应像素和百分比，与 CSS 类似，同时还可以设置为`AUTO`自动行高。 Symbols: LineHeight.
- [溢出滚动 OverflowDirection](../api/other/OverflowDirection.md) - 溢出滚动相关的设置。 Symbols: OverflowDirection.
- [弹层 Overlay](../api/other/Overlay.md) - 原型交互中，与弹层相关的一些属性。 Symbols: OverlayBackground, OverlayPositionType, OverlayBackgroundInteraction.
- [原型交互 Reaction](../api/other/Reaction.md) - 原型交互的设置中，需要定义交互动作和触发行为，且包含动作时，触发行为不能为空。 Symbols: Reaction.
- [RGB/RGBA](../api/other/RGB.md) - 对应「即时设计」全局的 RGBA 色值，值从 0 到 1 。 Symbols: RGBA, RGB.
- [描边端点 StrokeCap](../api/other/StrokeCap.md) - 线段和描边所存在的端点属性。 Symbols: StrokeCap.
- [描边顶点 StrokeJoin](../api/other/StrokeJoin.md) - 存在拐角和线段和描边，具有顶点属性。 Symbols: StrokeJoin.
- [文本格式 TextCase](../api/other/TextCase.md) - 文本相关的格式设置，一般为大小写。 Symbols: TextCase.
- [文本装饰 TextDecoration](../api/other/TextDecoration.md) - 文本装饰相关的设置，一般为下划线和删除线。 Symbols: TextDecoration.
- [原型交互 - 过渡 Transition](../api/other/Transition.md) - 原型交互中，跳转画板行为所使用的过渡效果。 Symbols: SimpleTransition, DirectionalTransition, Transition, Easing.
- [原型交互 - 触发 Trigger](../api/other/Trigger.md) - 触发交互事件所对应的用户行为。 Symbols: Trigger.
- [用户 User](../api/other/User.md) - 有关用户的详细信息，不涉及活跃用户的操作相关内容。 Symbols: id, name, photoUrl, color, sessionId.
- [矢量网格 VectorNetwork](../api/other/VectorNetwork.md) - 矢量网格是一种较复杂的矢量图形绘制方法，对应`VectorNetwork`API，如需简单方法可查看`VectorPath`定义。 Symbols: vertices, segments, regions, x, y, strokeCap.
- [矢量路径 VectorPath](../api/other/VectorPath.md) - 矢量是一个二维概念，通常用`Vector`来表示单个矢量锚点的位置。 Symbols: Vector, WindingRule, VectorPaths, windingRule, data.
