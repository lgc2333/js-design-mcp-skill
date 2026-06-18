「即时设计」当前支持有三种填充类型：纯色、渐变和图像。

```TypeScript
type Paint = SolidPaint | GradientPaint | ImagePaint
```

## 通用属性

```TypeScript
interface PaintProps {
  type: PaintType
  blendMode?: BlendMode
  visible?: boolean
  opacity?: number
}

type PaintType =
  | 'image'
  | 'solid'
  | 'gradient-linear'
  | 'gradient-radial'
  | 'gradient-angular'
```

#### type: PaintType

填充类型（ '图片' | '纯色' | '线性渐变' | '径向渐变' | '角度渐变' ）。

#### blendMode?: BlendMode

确定此填充的颜色如何与其下方的颜色混合，默认为「正常」。

#### visible?: boolean

填充是否可见。默认为 true 。

#### opacity?: number

填充的不透明度，必须是介于 0 和 1 之间的值，默认为 1。

## 纯色填充

```TypeScript
interface SolidPaint extends PaintProps {
  type: 'solid'
  color: Color | HexCode
}
```

#### type: 'solid'

填充的类型。

#### color: Color | HexCode

纯色填充的色值，使用 Hex 格式。

## 图片填充

```TypeScript
interface ImagePaint extends PaintProps {
  type: 'image'
  src: string
  imageSize?: { width: number; height: number }
  scaleMode?: ScaleMode
  imageTransform?: Transform
  scalingFactor?: number
  rotation?: number
}

type ScaleMode = 'fill' | 'fit' | 'tile' | 'crop'

type Transform = [[number, number, number], [number, number, number]]
```

#### type: 'image'

填充的类型。

#### src: string

对图片进行编码的图像 URL 或 DataURI。

#### imageSize?: { width: number; height: number }

图片的尺寸。

#### scaleMode?: ScaleMode

图片在图层中定位和缩放方式。

#### imageTransform?: Transform

仅适用于 scaleMode == 'crop'（裁剪）时，确定图像在图层中的定位方式。

#### scalingFactor?: number

仅适用于 scaleMode == 'tile'（平铺）时，确定图层内图像的缩放比例。

#### rotation?: number

仅适用于 scaleMode == 'tile' | 'fill' | 'fit'（平铺、填充、适应）时，确定图层内图片的旋转。

## 渐变填充

```TypeScript
interface GradientPaint extends PaintProps {
  type: 'gradient-linear' |
        'gradient-radial' |
        'gradient-angular' |
        'gradient-diamond'

  gradientHandlePositions: [Vector, Vector, Vector]
  gradientStops: ColorStop[]
}

interface ColorStop {
  position: number
  color: Color
}

interface Vector {
  x: number
  y: number
}
```

#### type: 'gradient-linear' | 'gradient-radial' | 'gradient-angular' | 'gradient-diamond'

渐变的类型。

#### gradientHandlePositions: [Vector, Vector, Vector]

图层内渐变的位置。

该字段包含三个向量，每个向量都是归一化对象空间中的一个位置（归一化对象空间是如果对象的边界框的左上角为(0, 0)，右下角为(1,1)） 。

1. 第一个位置对应于梯度的开始（值 0 用于计算梯度停止）

1. 第二个位置是渐变的末端（值 1）

1. 第三个位置决定了渐变的宽度。

#### gradientStops: ColorStop[]

颜色数组及其在渐变中的位置。

## 示例

### 线性渐变 Gradient Linear

```JavaScript
  <Rectangle
    width={100}
    height={100}
    fill={{
      type: "gradient-linear",
      gradientHandlePositions: [
        { x: 0, y: 0.5 },
        { x: 1, y: 1 },
        { x: 0, y: 0 }
      ],
      gradientStops: [
        { position: 0, color: { r: 1, g: 0.4, b: 0.4, a: 1 } },
        { position: 1, color: { r: 1, g: 0.7, b: 0.4, a: 1 } }
      ]
    }}
    cornerRadius={8}
  />
```

### 径向渐变 Gradient Radial

```JavaScript
  <Rectangle
    width={100}
    height={100}
    fill={{
      type: "gradient-radial",
      gradientHandlePositions: [
        { x: 0.5, y: 0.5 },
        { x: 0.5, y: 1 },
        { x: 1, y: 0.5 }
      ],
      gradientStops: [
        { position: 0, color: { r: 1, g: 0.4, b: 0.4, a: 1 } },
        { position: 1, color: { r: 1, g: 0.7, b: 0.4, a: 1 } }
      ]
    }}
    cornerRadius={8}
  />
```

### 角度渐变 Gradient Angular

```JavaScript
  <Rectangle
    width={100}
    height={100}
    fill={{
      type: "gradient-angular",
      gradientHandlePositions: [
        { x: 0.5, y: 0.5 },
        { x: 1, y: 0.5 },
        { x: 0.5, y: 1 }
      ],
      gradientStops: [
        { position: 0, color: { r: 1, g: 0.4, b: 0.4, a: 1 } },
        { position: 1, color: { r: 1, g: 0.7, b: 0.4, a: 1 } }
      ]
    }}
    cornerRadius={8}
  />
```
