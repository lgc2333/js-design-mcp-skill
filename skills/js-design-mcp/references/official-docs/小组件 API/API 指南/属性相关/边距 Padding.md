```TypeScript
type Padding = number | FullPadding | VerticalHorizontalPadding;

type FullPadding = {
  top?: number
  left?: number
  bottom?: number
  right?: number
}

type VerticalHorizontalPadding = {
  vertical?: number
  horizontal?: number
}
```
