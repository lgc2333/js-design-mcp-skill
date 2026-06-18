线段和描边所存在的端点属性。

```TypeScript
type StrokeCap = "NONE" | "ROUND" | "SQUARE" | "ARROW_LINES" | "ARROW_EQUILATERAL"
```

当前支持这几种端点类型：

| A                    | B                    |
| -------------------- | -------------------- |
| "NONE"               | 无，默认直角线段端点 |
| "ROUND"              | 半圆形端点           |
| "SQUARE"             | 方形端点             |
| "ARROW_LINES"        | 线型箭头             |
| "ARROW_EQUILATERIAL" | 面型箭头             |
