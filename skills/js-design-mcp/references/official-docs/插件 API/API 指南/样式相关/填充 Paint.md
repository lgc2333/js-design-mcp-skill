「即时设计」支持三种填充类型：纯色、渐变和图片。

```TypeScript
type Paint = SolidPaint | GradientPaint | ImagePaint
```

## 通用属性

#### visible?: boolean [readonly]

填充是否可见，默认为`true`。

#### opacity?: number [readonly]

填充的不透明度，必须是 0 到 1 之间的值，默认为 1 。

#### blendMode?: BlendMode [readonly]

填充的混合模式，默认为`"NORMAL"`。

## 纯色填充

#### type: 'SOLID' [readonly]

填充的类型设置，对应字符串为`'SOLID'`，在读取其他属性之前，请务必检查`type`。

#### color: RGB [readonly]

填充的颜色，没有 alpha 属性，如果需要可以修改不透明度。

## 渐变填充

#### type: 'GRADIENT_LINEAR' | 'GRADIENT_RADIAL' | 'GRADIENT_ANGULAR' [readonly]

填充的类型设置，分别对应线性渐变、径向渐变、角度渐变和菱形渐变，在读取其他属性之前，请务必检查`pattern`。

#### gradientTransform: Transform [readonly]

渐变对应的梯度。

#### gradientStops: ReadonlyArray\<ColorStop\> [readonly]

渐变数值对应的色标。

## 图片填充

#### type: 'IMAGE' [readonly]

填充的类型设置，对应字符串为`'IMAGE'`，在读取其他属性之前，请务必检查`type`。

#### scaleMode: 'FILL' | 'FIT' | 'CROP' | 'TILE' [readonly]

图片的缩放模式，分别对应填充、适应、裁切以及平铺。

#### imageHash: string | null [readonly]

图片对应的哈希值，可通过`jsDesign.getImageByHash`获取图像。

#### imageTransform?: Transform [readonly]

图片变形，仅适用于裁切模式`scaleMode == "CROP"`。

#### scalingFactor?: number [readonly]

图片的缩放比例，仅适用于平铺模式`scaleMode == "TILE"`。

#### rotation?: number [readonly]

图片的旋转角度，适用于填充、适应及平铺模式。

#### filters?: ImageFilters [readonly]

图片滤镜设置，所有值默认为 0.0，范围为 -1.0 到 +1.0 。

## 图片滤镜

```TypeScript
interface ImageFilters {
  exposure?: number
  contrast?: number
  saturation?: number
  temperature?: number
  tint?: number
  highlights?: number
  shadows?: number
}
```

图片滤镜对应的参数类型，如下：

exposure?: number 曝光contrast?: number 对比度saturation?: number 饱和度temperature?: number 色温tint?: number 色调highlights?: number 高光shadows?: number 阴影

## 渐变色标

渐变设置中需要用到多个颜色，各个颜色对应色标的相关设置。

```TypeScript
interface ColorStop {
  readonly position: number
  readonly color: RGBA
}
```

#### position: number

色标的位置。

#### color: RGBA

色标对应的颜色色值，为 RGBA。
