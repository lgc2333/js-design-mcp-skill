# RGB/RGBA

对应「即时设计」全局的 RGBA 色值，值从 0 到 1 。

```TypeScript
interface RGBA {
  // "红"
  readonly r: number
  // "绿"
  readonly g: number
  // "蓝"
  readonly b: number
  // "alpha 值 或 不透明度"
  readonly a: number
}
```

当没有 alpha 值时，对应 RGB 色值，仅适用于纯色填充。

```TypeScript
interface RGB {
  readonly r: number
  readonly g: number
  readonly b: number
}
```

所有颜色都在同一个颜色空间中指定，该颜色空间在浏览器中默认为 sRGB，在「即时设计」桌面客户端中可以自定义设置为 sRGB 或非托管方式，非托管意味着颜色空间为显示器的当前颜色空间。
