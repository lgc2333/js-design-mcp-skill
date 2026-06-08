# 矢量路径 VectorPath

矢量是一个二维概念，通常用`Vector`来表示单个矢量锚点的位置。

```TypeScript
interface Vector {
  readonly x: number
  readonly y: number
}
```

推荐使用`VectorPath`API 来更改矢量对象的几何形状，相比矢量网格更简单基础，易于理解和使用。创建矢量路径的方式如下：

```TypeScript
// 创建一个三角形
node.vectorPaths = [{
  windingRule: "EVENODD",
  data: "M 0 100 L 100 100 L 50 0 Z",
}]
```

## 矢量路径属性

#### windingRule: WindingRule | 'NONE' [readonly]

路径的缠绕规则（与 SVG 相同），决定了空间中给定的点是在路径内部还是外部。

```TypeScript
type WindingRule = "NONZERO" | "EVENODD"
```

缠绕规则的工作原理是一个叫做缠绕数的概念，它告诉你对于一个给定的点，路径围绕这个点缠绕了多少次，这个字段可以有三个可能的值：

- `"NONZERO"`：如果缠绕次数非零，则认为该点在路径内。

- `"EVENODD"`：如果绕组数是奇数，则认为该点在路径内。

- `"NONE"`：开放路径。

#### data: string [readonly]

一系列的路径命令，用于绘制路径。

路径命令必须按顺序连接成一个字符串，用空格隔开，具体规则如下：

- `M x y`：移动到对应位置。
- `L x y`：连线到对应点。
- `Q x0 y0 x y`： 二次样条函数。支持其作为输入，但不会生成它。所有的二次样条在内部被转换为三次样条。
- `C x0 y0 x1 y1 x y`：三次样条函数。
- Z：闭合路径。

## VectorPaths

一个矢量节点可以由多个矢量路径`VectorPath`组成。

```TypeScript
type VectorPaths = ReadonlyArray\<VectorPath\>
```
