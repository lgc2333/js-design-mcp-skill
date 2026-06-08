# 节点类型

在「即时设计」中，节点是显示层的基础，有许多不同类型的节点，各自都有对应的基础和特定属性。

当前支持的节点类型如下：

- 文件节点`DocumentNode`

- 页面节点`PageNode`

- 画板节点`FrameNode`

- 分组节点`GroupNode`

- 矩形节点`RectangleNode`

- 椭圆节点`EllipseNode`

- 直线节点`LineNode`

- 多边形节点`PolygonNode`

- 星形节点`StarNode`

- 文本节点`TextNode`

- 切片节点`SliceNode`

- 矢量节点`VectorNode`

- 布尔运算节点`BooleanOperationNode`

- 引用组件节点`ComponentNode`

- 实例组件节点`InstanceNode`

- 变体/组件集节点`ComponentSetNode`

在我们提供的开发工具中，对不同类型的节点进行了更精细地划分。

每个文件都不可或缺的重要节点定义为`BaseNode`，其中包含了文件节点、页面节点和画面节点：

```TypeScript
type BaseNode = DocumentNode | PageNode | SceneNode
```

所有在画面中处理的节点，则被划分到`SceneNode`里：

```TypeScript
type SceneNode =
    FrameNode |
    GroupNode |
    RectangleNode |
    EllipseNode |
    LineNode |
    PolygonNode |
    StickyNode |
    TextNode |
    SliceNode |
    VectorNode |
    BooleanOperationNode |
    ComponentNode |
    InstanceNode |
    ComponentSetNode
```

你可以通过`node.type`来快速获取任意一个节点所属的类型。
