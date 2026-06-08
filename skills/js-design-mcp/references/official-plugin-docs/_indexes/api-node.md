# API Nodes Index

Document tree and scene node types: pages, frames, shapes, text, vectors, components, instances, variants.

- [布尔运算节点 BooleanOperationNode](../api/node/BooleanOperationNode.md) - 布尔运算是设计中非常常用的功能，通过对多个图层进行并集、交集、减去顶层以及排除重叠等四种方式合并为一个新的节点，而对应的图层则成为其子节点。 Symbols: type, clone(), booleanOperation, expanded, id, parent.
- [引用组件节点 ComponentNode](../api/node/ComponentNode.md) - 引用组件是「即时设计」中非常重要的一类元素，它具有极高的复用性，且除了在当前文件中使用外，也经常用于团队共享设计库，更多相关操作可以查看 帮助文档 。 Symbols: type, clone(), createInstance(), expanded, description, remote.
- [变体节点 ComponentSetNode](../api/node/ComponentSetNode.md) - 变体就是引用组件的集合，它的所有子节点都是`ComponentNode`，且必须存在子节点。 Symbols: type, clone(), defaultVariant, variantGroupProperties, expanded, description.
- [文件节点 DocumentNode](../api/node/DocumentNode.md) - 文件节点是每个文件根节点。每个浏览器标签页有且仅有一个文件节点，其子节点必须是`PageNode`。 Symbols: type, children, appendChild(child: PageNode), insertChild(index: number, child: PageNode), findChildren(callback?: (node: PageNode) => boolean), findChild(callback: (node: PageNode) => boolean).
- [椭圆节点 EllipseNode](../api/node/EllipseNode.md) - 基本形状椭圆所对应的节点，当「宽度 = 高度」时即为圆。 Symbols: ArcData, type, clone(), arcData, id, parent.
- [画板节点 FrameNode](../api/node/FrameNode.md) - 画板节点是非常重要的一种类型，用于定义布局结构，类似于 HTML 中的`<div>` 。 Symbols: type, clone(), expanded, id, parent, name.
- [分组节点 GroupNode](../api/node/GroupNode.md) - 分组节点用来对相关节点进行分组，可以把它看作是图层面板中的一个文件夹。 Symbols: type, clone(), expanded, id, parent, name.
- [实例组件节点 InstanceNode](../api/node/InstanceNode.md) - 实例组件是引用组件的副本，当引用组件被修改时，实例组件中对应的属性将自动更新，详情见 引用组件节点 ComponentNode 。 Symbols: type, clone(), mainComponent, swapComponent(componentNode: ComponentNode), setProperties(properties: { [property: string]: string }), detachInstance().
- [线段节点 LineNode](../api/node/LineNode.md) - 线段节点是一维对象，自带描边属性，其余的主要属性是它的长度和旋转角度，对应「即时设计」API 中的`width`和`rotation`，线段的高度始终为 0 。 Symbols: type, clone(), id, parent, name, removed.
- [节点类型](../api/node/NodeType.md) - 在「即时设计」中，节点是显示层的基础，有许多不同类型的节点，各自都有对应的基础和特定属性。 Symbols: BaseNode, SceneNode.
- [页面节点 PageNode](../api/node/PageNode.md) - 页面节点始终为文件节点`DocumentNode`的子节点。 Symbols: type, clone(), guides, selection, selectedTextRange, flowStartingPoints.
- [多边形节点 PolygonNode](../api/node/PolygonNode.md) - 具有三条及以上边的规则凸多边形。 Symbols: type, clone(), pointCount, id, parent, name.
- [矩形节点 RectangleNode](../api/node/RectangleNode.md) - 矩形是「即时设计」中最常用的形状之一。 Symbols: type, clone(), id, parent, name, removed.
- [切片节点 SliceNode](../api/node/SliceNode.md) - 切片是一个带有边界框的不可见对象，在编辑器中展示为虚线，用以导出画布中的特定部分，一般只需要为切片添加一个`exportSetings`，并通过`exportAsync`导出其内容即可。 Symbols: type, clone(), id, parent, name, removed.
- [星形节点 StarNode](../api/node/StarNode.md) - 具有任意数量顶点的星形。 Symbols: type, clone(), pointCount, innerRadius, id, parent.
- [文本节点 TextNode](../api/node/TextNode.md) - 文本节点中，整个节点或特定的字符范围都可以具有颜色（填充）、字体大小、字体名称等属性。 Symbols: type, clone(), hasMissingFont, textAlignHorizontal, textAlignVertical, textAutoResize.
- [矢量节点 VectorNode](../api/node/VectorNode.md) - 矢量节点通常有钢笔或铅笔工具创建，在用来绘制特定形状的元素时十分常用，既可以绘制单个顶点，也可以绘制不规则的线段和区域。 Symbols: type, clone(), vectorNetwork, vectorPaths, handleMirroring, id.
