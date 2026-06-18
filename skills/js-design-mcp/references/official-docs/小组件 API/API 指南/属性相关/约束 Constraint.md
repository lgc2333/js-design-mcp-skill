即响应式调整，确定画板内子级元素适应父级的方式。

## 垂直约束 VerticalConstraint

```TypeScript
type VerticalConstraint =
  | TopConstraint
  | BottomConstraint
  | TopBottomConstraint
  | CenterConstraint
  | VerticalScaleConstraint

export interface TopConstraint {
  type: 'top'
  offset: number
}

export interface BottomConstraint {
  type: 'bottom'
  offset: number
}

export interface TopBottomConstraint {
  type: 'top-bottom'
  topOffset: number
  bottomOffset: number
}

export interface CenterConstraint {
  type: 'center'
  offset: number
}

export interface VerticalScaleConstraint {
  type: 'vertical-scale'
  topOffsetPercent: number
  bottomOffsetPercent: number
}
```

## 水平约束 HorizontalConstraint

```TypeScript
type HorizontalConstraint =
  | LeftConstraint
  | RightConstraint
  | LeftRightConstraint
  | CenterConstraint
  | HorizontalScaleConstraint

export interface LeftConstraint {
  type: 'left'
  offset: number
}

export interface RightConstraint {
  type: 'right'
  offset: number
}

export interface LeftRightConstraint {
  type: 'left-right'
  leftOffset: number
  rightOffset: number
}

export interface CenterConstraint {
  type: 'center'
  offset: number
}

export interface HorizontalScaleConstraint {
  type: 'horizontal-scale'
  leftOffsetPercent: number
  rightOffsetPercent: number
}
```
