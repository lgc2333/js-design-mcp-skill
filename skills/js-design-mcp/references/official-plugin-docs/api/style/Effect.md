# 特效 Effect

「即时设计」支持常见的四种特殊效果：外阴影、内阴影、高斯模糊以及背景模糊。

![avatar](https://img.js.design/assets/developer-doc/plugin/images/Effect/Effect01.png)

这四种效果又被分为三种类型：`DropShadowEffect`、`InnerShadowEffect` 和`BlurEffect`。

```TypeScript
type Effect = DropShadowEffect | InnerShadowEffect | BlurEffect
```

## 外阴影

#### type: 'DROP_SHADOW' [readonly]

外阴影的特效类型，对应字符串`'DROP_SHADOW'`，在读取其他属性之前，需始终检查`type`。

#### color: RGBA [readonly]

阴影的颜色，包括不透明度。

#### offset: Vector [readonly]

阴影的偏移数值，用于模拟光线的方向。

#### radius: number [readonly]

阴影的模糊半径，必须 >= 0 。

#### spread?: number [readonly]

阴影的扩展数值。当数值为正时，阴影会扩大；数值为负时，阴影会收缩；内阴影相反。当不指定时此数值时默认为 0 。

#### visible: boolean [readonly]

阴影是否可见。

#### blendMode: BlendMode [readonly]

阴影的混合模式，默认为`"NORMAL"`。

## 内阴影

#### type: 'INNER_SHADOW' [readonly]

内阴影的特效类型，对应字符串`'INNER_SHADOW'`，在读取其他属性之前，需始终检查`type`。

#### color: RGBA [readonly]

阴影的颜色，包括不透明度。

#### offset: Vector [readonly]

阴影的偏移数值，用于模拟光线的方向。

#### radius: number [readonly]

阴影的模糊半径，必须 >= 0 。

#### spread?: number [readonly]

阴影的扩展数值。当数值为正时，阴影会收缩；数值为负时，阴影会扩大；外阴影相反。当不指定时此数值时默认为 0 。

#### visible: boolean [readonly]

阴影是否可见。

#### blendMode: BlendMode [readonly]

阴影的混合模式，默认为`"NORMAL"`。

## 模糊效果

#### type: 'LAYER_BLUR' | 'BACKGROUND_BLUR' [readonly]

内阴影的特效类型，对应字符串`'LAYER_BLUR' | 'BACKGROUND_BLUR'`，分别对应高斯模糊和背景模糊，在读取其他属性之前，需始终检查`type`。

#### radius: number [readonly]

模糊半径，必须 >=0，数值越小越清晰。

#### visible: boolean [readonly]

效果是否可见。
