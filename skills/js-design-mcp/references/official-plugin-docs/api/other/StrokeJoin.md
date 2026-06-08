# 描边顶点 StrokeJoin

存在拐角和线段和描边，具有顶点属性。

```TypeScript
type StrokeJoin = "MITER" | "BEVEL" | "ROUND"
```

当前支持以下几种顶点类型：

| A       | B      |
| ------- | ------ |
| "MITER" | 直角   |
| "BEVEL" | 斜切面 |
| "ROUND" | 圆形   |
