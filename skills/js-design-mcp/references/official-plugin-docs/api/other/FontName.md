# 字体名称 FontName

文本节点所使用的字体。

例如，默认字体为`{Family："Roboto"， style："Regular"}`。

```TypeScript
interface Font {
  fontName: FontName
}

interface FontName {
  readonly family: string
  readonly style: string
}
```
