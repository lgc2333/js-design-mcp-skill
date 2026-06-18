在 onClick 等事件中引用小组件节点的方法。它会返回一个节点 ID，可用于通过插件 API（例如 jsDesign.getNodeById）检索和识别正处于活动状态的小组件节点。

## 对应方法

#### useWidgetId(): string

## 说明

渲染小组件时不能调用 jsDesign.getNodeById，需要在允许使用插件 API 的事件方法中调用。

## 示例

```TypeScript
const { widget } = jsDesign
const { Text, useWidgetId } = widget

function UseWidgetIdExample() {
  const widgetId = useWidgetId()

  return (
    <Text
      onClick={() => {
        const widgetNode = jsDesign.getNodeById(widgetId) as WidgetNode;
        const clonedWidget = widgetNode.clone();

        // Position the cloned widget beside this widget
        widgetNode.parent!.appendChild(clonedWidget);
        clonedWidget.x = widgetNode.x + widgetNode.width + 50;
        clonedWidget.y = widgetNode.y;
      }}
    >
      Make a copy
    </Text>
  )
}

widget.register(UseWidgetIdExample)
```
