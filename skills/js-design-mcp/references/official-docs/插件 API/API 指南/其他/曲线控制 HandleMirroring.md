任意锚点的曲线控制方式。

```TypeScript
type HandleMirroring = "NONE" | "ANGLE" | "ANGLE_AND_LENGTH"
```

对应的值有：

- `"NONE"`：不对称，即两个曲线控制杆相互独立

- `"ANGLE"`：角度对称，两个曲线控制杆形成一条切线，但每个手柄的长度是独立的

- `"ANGLE_AND_LENGTH"`：完全对称，两个曲线控制杆形成一条切线，且与顶点距离相同。
