「即时设计」支持有四种特殊效果：

![avatar](https://img.js.design/assets/developer-doc/plugin/images/Effect/Effect01.png)

这四种效果又分为 3 种类型：

```TypeScript
type Effect = DropShadowEffect | InnerShadowEffect | BlurEffect
```

## 外阴影 DropShadowEffect

```TypeScript
interface DropShadowEffect {
  type: 'drop-shadow'
  color: HexCode | Color
  offset: Vector
  blur: number
  blendMode?: BlendMode
  spread?: number
  visible?: boolean
  showShadowBehindNode?: boolean
}
```

#### type: 'drop-shadow'

阴影的类型。

#### color: HexCode | Color

阴影的颜色，包括它的不透明度。

#### offset: Vector

阴影相对于其对象的偏移量，使用此属性来模拟光的方向。

#### blur: number

阴影的模糊半径，必须 >= 0，半径越小，阴影越锐利。

#### blendMode?: BlendMode

确定此阴影的颜色如何与其下方的颜色混合。

#### spread?: number

扩展（或收缩）阴影的距离。

对于投影，正值会创建比节点大的阴影，而负值会创建比节点小的阴影；对于内部阴影，正值会收缩阴影。

#### visible?: boolean

此阴影是否可见。

## 内阴影 InnerShadowEffect

```TypeScript
interface InnerShadowEffect {
  type: 'inner-shadow'
  color: HexCode | Color
  offset: Vector
  blur: number
  blendMode?: BlendMode
  spread?: number
  visible?: boolean
}
```

#### type: 'inner-shadow'

阴影的类型。

#### color: HexCode | Color

阴影的颜色，包括它的不透明度。

#### offset: Vector

阴影相对于其对象的偏移量，使用此属性来模拟光的方向。

#### blur: number

阴影的模糊半径，必须 >= 0，半径越小，阴影越锐利。

#### blendMode?: BlendMode

确定此阴影的颜色如何与其下方的颜色混合。

#### spread?: number

扩展（或收缩）阴影的距离。

对于外阴影，正值会创建比节点大的阴影，而负值会创建比节点小的阴影；对于内阴影，正值会收缩阴影。

#### visible?: boolean

此阴影是否可见。

## 模糊 BlurEffect

```TypeScript
interface BlurEffect {
  type: 'layer-blur' | 'background-blur'
  blur: number
  visible?: boolean
}
```

#### type: 'layer-blur' | 'background-blur'

模糊的类型。

#### blur: number

阴影的模糊半径，必须 >= 0，半径越小，阴影越锐利。

#### visible?: boolean

模糊是否可见。
