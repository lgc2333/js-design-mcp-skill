正如之前所说，小组件 API 和插件 API 具有很强的关联性，并且在构建小组件时可以一起使用。

通常情况下，可以简单区分理解为：

1. 小组件 API 是用来描述画布上的内容的接口

2. 插件 API 则是在画布上操作内容的接口

因此我们在开发小组件时，代码结构通常会是这样的：

```TypeScript
const { widget } = jsDesign
const { AutoLayout, Text, useWidgetId } = widget

function AverageWidget() {
  const widgetId = useWidgetId()

  return (
    // 使用小组件 API 渲染小组件
    <AutoLayout
      onClick={() => {

        // 使用插件 API 响应用户行为
        const widgetNode = jsDesign.getNodeById(widgetId) as WidgetNode

      }}
    >
      <Text>Hello</Text>
    </AutoLayout>
  )
}

widget.register(AverageWidget)
```
