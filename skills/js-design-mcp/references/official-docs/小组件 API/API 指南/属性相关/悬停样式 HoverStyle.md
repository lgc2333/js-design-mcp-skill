当鼠标悬停在组件上时，组件的状态设置。更多内容可查看 [添加悬停状态 →](/developer-doc/widget/guide/development/Hover)

```TypeScript
interface HoverStyle {
  fill?: HexCode | Color | Paint | (SolidPaint | GradientPaint)[]
  stroke?: HexCode | Color | SolidPaint | GradientPaint | (SolidPaint | GradientPaint)[]
  opacity?: number
}
```
