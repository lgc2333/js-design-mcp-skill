```TypeScript
interface ArcData {
  startingAngle: number
  endingAngle: number
  innerRadius: number
}
```

此数据控制 Ellipse 组件的「弧」属性：

![avatar](https://img.js.design/assets/developer-doc/plugin/images/EllipseNode/EllipseNode01.png)

圆弧存在起始和结束角度，相对于圆心右侧水平 0° ，圆弧的内半径为从 0 到 1 的数值，当弧度为 360°，内半径为 0 时，当前图形为一个完整的圆。

示例：

```TypeScript
// 半圆
<Ellipse
  arcData={{
    startingAngle: 0,
    endingAngle: Math.PI,
    innerRadius: 0
  }}
/>
// 圆环
<Ellipse
  arcData={{
    startingAngle: 0,
    endingAngle: 2 * Math.PI,
    innerRadius: 0.5
  }}
/>
```
