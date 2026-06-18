```TypeScript
type Transform = [
  [number, number, number],
  [number, number, number]
]
```

变换矩阵是计算机图形学中表示平移和旋转的标准方式，我们需要 3x3 矩阵的前两行，矩阵的底行被假定为 [0, 0, 1]，这就是仿射变换，足够用来表示平移、旋转和倾斜。

恒等变换为 [[1, 0, 0], [0, 1, 0]]。

平移矩阵通常为：

```TypeScript
[[1, 0, tx],
 [0, 1, ty]]
```

旋转矩阵通常为：

```TypeScript
[[cos(angle), sin(angle), 0],
 [-sin(angle), cos(angle), 0]]
```

使用这种变换的另一种方法是通过三个向量：

- x 轴 (t[0][0], t[1][0])

- y 轴 (t[0][1], t[1][1])

- 平移偏移量 (t[0][2], t[1][2])
