小组件 API 接口让开发者可以通过在画板中创建自定义的可交互对象，来扩展「即时设计」的设计文件内容和「即时设计」的功能。

在构建小组件时，你可能会同时使用到小组件 API 和插件 API 。

- 小组件 API：主要用于定义小组件本身以及用户如何与其交互

- 插件 API：主要用于访问外部资源或操作文件中的其他节点

小组件 API 和核心内容包含三种：组件、方法和 Hook ，三者共同控制着小组件的状态及交互方式。

如果你已经使用过「即时设计」的插件 API，那你肯定已经熟悉了`jsDesign`全局对象，对应地，在小组件中，我们可以通过`jsDesign.widget`访问小组件 API 。

## 组件 Components

组件是小组件的基本构成，我们需要通过组件来构建小组件。

每个组件都支持一系列属性，我们可以使用这些属性来自定义它们的外观，有些属性是不同组件共有的，而有些属性是某组件特有的。

以下是我们当前已经支持的基于图层或节点类型的组件：

- 自动布局`AutoLayout`

- 画板`Frame`

- 文字`Text`

- 矩形`Rectangle`

- 图片`Image`

- 椭圆`Ellipse`

- 线`Line`

- SVG

还有其他三个不基于图层的组件：

- `Input`：让文本组件可编辑，一般用于在小组件中输入或修改文本。

- `Fragment`：让子节点可以在未分组到父节点中时渲染，但无法向它传递属性。

- `Span`：可以在文本组件内为指定范围的文本设置样式。

## 方法

在小组件 API 中，目前只定义了两个主要方法：

- `register`：使用小组件的主要方法，用于注册小组件。这个方法需要一个描述小组件的小组件方法，并返回由我们上面提到的组件组成的小组件节点。

- `waitForTask`：此方法可以实现异步运行，常用于数据获取。它接受一个 Promise，只有在该 Promise 被解决时才终止。

## Hooks

一些特定类型的方法，可以通过它们的`use`前缀来识别。

- `useEffects`：可以在小组件状态发生变化的时候运行。它允许我们执行异步任务、捆绑调用等等。

- `usePropertyMenu`：定义一个交互式属性菜单，该菜单在选中小组件时显示。

- `useSyncedState`：声明小组件的渲染依赖于某些可变的状态。可以给定一个键值，然后在不同的状态下使用和更新它。

- `useSyncedMap`：用于管理小组件状态。我们给定多个键值，并根据单个值的更改而非整个映射，来更新小组件的状态。主要用于多人协作时。

- `useWidgetId`：引用当前活动的小组件。它返回一个唯一的`id`，允许你在插件 API 中引用对应的小组件节点。

## 全局解构

我们建议在小组件代码的开头[解构](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#object_destructuring)组件、Hook 和方法，这可以让我们不必通过像`jsDesign.widget.AutoLayout`这样的方式去引用这些组件。

```TypeScript
const { widget } = jsDesign
const {
  // Components
  AutoLayout,
  Frame,
  Text,
  Input,
  Rectangle,
  Image,
  SVG,
  Ellipse,
  Line,
  Fragment,

  // Hooks
  useSyncedState,
  useSyncedMap,
  usePropertyMenu,
  useEffect,
  useStickable,
  useStickableHost,
  useWidgetId,

  // Functions
  register,
  waitForTask
} = widget
```

在我们的示例小组件中，我们已经对`jsDesign.widget`以及其中使用的 Hook（`useSyncedState`和`usePropertyMenu`）和组件（`AutoLayout`、`Text`、`SVG`）做了类似的处理，如下：

```TypeScript
const { widget } = jsDesign
const { useSyncedState, usePropertyMenu, AutoLayout, Text, SVG } = widget
```
