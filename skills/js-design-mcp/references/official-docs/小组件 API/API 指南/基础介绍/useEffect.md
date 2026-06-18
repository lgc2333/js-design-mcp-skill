用于运行应在小组件状态更改或与小组件交互时运行的代码，你可以在组件加载时使用它来获取数据（通过将其与 waitForTask 一起使用）或在 iframe 和小组件之间保持状态同步。

## 对应方法

#### useEffect(effect: () => (() => void) | void): void

## 参数

参数描述effect每当小组件的状态更新时执行的方法。如果此方法返回一个方法，则返回的方法将在再次展示运行效果之前被调用。

注意：由于小组件的运行方式，此方法应该要考虑在相同状态下被多次调用的情况。

## 说明

useEffect 的三个主要用例：

**初始化网络或插件** **API** **相关的小组件状态**

渲染代码是同步的，并且应该只依赖于小组件状态，如果我们需要使用来自网络的信息（例如 iframe 中的 HTTP 请求）或使用有关文件的信息（例如，使用`jsDesign.currentPage.selection`），可以在 useEffect 中执行此操作。小组件第一次渲染后，将执行对 useEffect 的回调，传递给 useEffect 的方法中的代码能够更新小组件状态并执行异步任务（与 waitForTask 配对时）。

**设置 jsDesign.ui.onmessage 处理程序**

我们可能在各种事件中多次调用`jsDesign.showUI`（例如，在各种节点上的 onClick 或通过 usePropertyMenu 操作）并希望将消息处理合并到一个地方， useEffect 就能保证在每一个事件执行之前和小组件重新渲染之后（例如，响应状态更改）运行。

注意：每次更改小组件的状态时都会调用 useEffect，如果我们使用`jsDesign.on`设置了事件监听，那就需要确保在 useEffect 回调返回的方法中使用`jsDesign.off`删除监听。

```TypeScript
const { widget } = jsDesign
const { Text, useEffect } = widget

function EventHandlerExample() {
  useEffect(() => {
    const logSelection = () => {
      console.log(jsDesign.currentPage.selection)
    }
    jsDesign.on('selectionchange', logSelection)
    return () => jsDesign.off('selectionchange', logSelection)
  })

  return <Text>Event handler example</Text>
}

widget.register(EventHandlerExample)
```

**整合状态更新的效果**

因为每当小组件状态发生变化时都会运行 useEffect 回调，所以如果小组件中有多个功能可能会更新小组件的状态时，它可以保证我们始终都能根据最终的小组件状态触发相同的效果。

## 示例

```TypeScript
const { widget } = jsDesign
const { Text, useEffect } = widget

function UseEffectExample() {
  useEffect(() => {
    console.log("useEffect callback called")
  })

  return <Text>useEffect example</Text>
}

widget.register(UseEffectExample)
```
