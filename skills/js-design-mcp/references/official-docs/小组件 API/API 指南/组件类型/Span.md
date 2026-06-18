Span 组件用于设置 Text 组件内的字符范围，支持 Text 组件上存在的所有文本样式属性。

Span 组件只能是 Text 组件或另一个 Span 组件的子组件。

## 示例

```TypeScript
<Text
  fill="#0F0"
  fontSize={20}
  fontFamily="Roboto"
  fontWeight={400}
  textCase="upper"
  textDecoration="underline"
>
  Hello{' '}
  <Span
    fontSize={50}
    fontFamily="Poppins"
    fontWeight={800}
    textCase="original"
    textDecoration="none"
  >
    Worl
    <Span fontSize={30} fill="#F00" italic>
      d
    </Span>
  </Span>
</Text>
```

## 文本样式属性

#### href?: string

如果指定该值，则为文本添加跳转到指定地址的超链接。

#### fontFamily?: string

文本使用的字族，如思源黑体，支持所有官方字体。

#### letterSpacing?: number

文本的字间距。

#### textDecoration?: 'none' | 'strikethrough' | 'underline'

文本装饰，是否带有下划线或删除线。

#### fontSize?: number

字体的大小，最小值为 1。

#### textCase?: 'upper' | 'lower' | 'title' | 'original' | 'small-caps' | 'small-caps-forced'

覆盖文本节点中原始字符的大小写。

#### fontWeight?: FontWeight

字重，即字体粗细，如 400、500，如 'Medium'（中等）、'Bold'（粗体），默认显示字重为 ' Regular'（常规）。

#### fill?: HexCode | Color | Paint | (SolidPaint | GradientPaint)[]

文本填充颜色。

## 默认属性

Span 组件没有默认属性，而是从父组件继承其属性。

在下面的示例中，Span 将从其父级继承 20 的 fontSize，但填充颜色为#F00，而其父级的填充颜色为#000。

```TypeScript
<Text fontSize={20} fill="#000">
  Widgets <Span fill="#F00">are fun\</Span\>
</Text>
```
