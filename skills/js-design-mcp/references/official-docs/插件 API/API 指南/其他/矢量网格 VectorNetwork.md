矢量网格是一种较复杂的矢量图形绘制方法，对应`VectorNetwork`API，如需简单方法可查看`VectorPath`定义。

矢量网络本质上是路径的超集，矢量网络可以代表路径可以代表的一切，反之则不行，在矢量路径中，一个点可以连接另外一条路径，而矢量网格中，一个点可以连接两个以上的路径。

矢量网格主要分为三个部分：顶点数组、索引到顶点数组的段数组以及索引到段数组的区域数组。

## 矢量网格属性

#### vertices: ReadonlyArray\<VectorVertex\> [readonly]

锚点，即画布中所有已添加的点。

#### segments: ReadonlyArray\<VectorSegment\> [readonly]

线段，即锚点连接成的线段。

#### regions?: ReadonlyArray\<VectorRegion\> [readonly]

区域，由任意个线段所定义的边界内区域。

## 矢量锚点 VectorVertex

每个锚点都是画布中的一个点，由它的位置定义。

#### x: number [readonly]

锚点相对于节点的 x 轴位置。

#### y: number [readonly]

锚点相对于节点的 y 轴位置。

#### strokeCap?: StrokeCap [readonly]

端点（路径起始和结束的位置）的外观。

#### strokeJoin?: StrokeJoin [readonly]

顶点（两个线段相连处，即线段拐点）的外观。

#### cornerRadius?: number [readonly]

端点处对应的圆角半径，「即时设计」支持修改任意单个锚点处的圆角值。

#### handleMirroring?: HandleMirroring [readonly]

曲线对应的控制方式。

## 矢量线段 VectorSegment

每个线段对应一个起始和结束的锚点，通过索引引用。

#### start: number [readonly]

线段起始点对应的索引。

#### end: number [readonly]

线段结束点对应的索引。

#### tangentStart?: Vector [readonly]

线段起始侧的切线，默认为 {x： 0，y： 0} 。

#### tangentEnd?: Vector [readonly]

线段结束侧的切线，默认为 {x： 0，y： 0}。

## 矢量区域 VectorRegion

矢量区域与矢量路径的数据基本相同，并且矢量网格不一定要包含区域，而当矢量网格存在区域时，那么每个区域必须包含至少一个闭合路径，此闭合路径内部将被填充，填充部分可以是数值，也可以是填充样式。

#### windingRule: WindingRule [readonly]

当前区域内的缠绕规则。

#### loops: ReadonlyArray<ReadonlyArray\<number\>> [readonly]

循环列表，对应矢量线段`VectorSegment`的索引列表。

#### fills?: ReadonlyArray\<Paint\> [readonly]

应用于区域内的填充属性数组。

#### fillStyleId?: string [readonly]

应用于区域内的填充样式 ID 。

## 示例

与矢量路径部分的示例`M 0 100 L 100 L 50 0 Z`相同，以矢量网络表示：

```TypeScript
node.vectorNetwork = {
  // 三角形的顶点
  vertices: [
    { x: 0, y: 100 },
    { x: 100, y: 100 },
    { x: 50, y: 0 },
  ],

  // 三角形的边
  segments: [
    {
      start: 0,
      tangentStart: { x: 0, y: 0 }, // 可选
      end: 1,
      tangentEnd: { x: 0, y: 0 }, // 可选
    },
    {
      start: 1,
      end: 2,
    },
    {
      start: 2,
      end: 0,
    },
  ],

  // 形成三角形的循环。每个循环都是进入线段数组的索引序列。
  regions: [
    { windingRule: "NONZERO", loops: [[0, 1, 2]] }
  ],
}
```
