# 溢出滚动 OverflowDirection

溢出滚动相关的设置。

```TypeScript
type OverflowDirection = "NONE" | "HORIZONTAL" | "VERTICAL" | "BOTH"
```

支持类型如下：

- `"NONE"`：不添加溢出滚动效果

- `"HORIZONTAL"`：如果内容在水平方向上超出画板的边界，则支持水平方向滚动

- `"VERTICAL"`：如果内容在垂直方向上超过画板的边界，则支持垂直方向滚动

- `"BOTH"`：如果内容超出画板的边界，则支持任意方向滚动

当`OverflowDirection`为`"NONE"`时，一级画板依然可以滚动。
