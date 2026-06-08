# jsDesign.parameters

与参数输入相关的方法和属性。

```TypeScript
type ParameterInputEvent<T = ParameterValues> = {
  query: string,
  key: string,
  parameters: Partial<T>,
  result: SuggestionResults,
}
```

当用户在插件中输入参数时，每次按键都会触发`input`事件，插件可以通过调用 API 来进行响应。

#### on(type: 'input', callback: (event: ParameterInputEvent) => void): void

为 input 输入事件注册一个回调函数。

#### once(type: 'input', callback: (event: ParameterInputEvent) => void): void

为 input 输入事件注册一个单次回调函数。

#### off(type: 'input', callback: (event: ParameterInputEvent) => void): void

移除为 input 输入事件注册的回调函数。

## 输入建议

在`'input'`事件对应的`result`对象中包含了 UI 相关的 API，用户输入参数时，可以实现自动展示输入建议并点击选择等操作，以及显示错误信息和加载状态等。

#### setSuggestions(suggestions: Array<string | { name: string; data?: any; icon?: string | Uint8Array; iconUrl?: string }>): void

设置输入建议的列表。如果只需要提供字符串建议，而不需要其他元数据或图标，可以使用简单字符串数组：

```TypeScript
jsDesign.parameters.on('input', ({ query, results }) => {
  result.setSuggestions(
    ["Armadillo", "Baboon", "Cacatua", "Dolphin"]
    .filter(s => s.includes(query)))
})
```

另外，对应的 API 还允许为每条建议添加更多信息，包括：

- 要显示给用户的文本

- 一个图标（可选）

- 隐藏的元数据，如果用户选择此建议（可选），则将其传回插件

```TypeScript
result.setSuggestions([
  { name: node1.name, data: node1.id, icon: node1Preview },
  { name: node2.name, data: node2.id, icon: node2Preview },
  ...
])
```

属性`name`是必需的，其中包含在自动填写建议时展示给用户的文本内容。

属性`data`允许将隐藏的元数据与给定的自动填写建议相关联。如果用户选择此选项，该数据将作为参数值传回插件。如果没有提供`data` 属性，将默认为`name`属性的值。

图标则通过`icon`或`iconUrl`属性提供，可以是`Uint8Array`形式的图像数据，也可以是字符串形式的 SVG 图像，或者直接提供图像的 URL，但目标服务器须支持 CORS。

#### setError(message: string): void

向用户显示错误信息，而不是自动填写建议的列表，用于向用户提示无效输入并说明正确方式。

#### setLoadingMessage(message: string): void

修改默认的输入建议提示文案，直到插件调用`setSuggestions`。可以有效减少用户等待的焦虑，支持多次调用以更新文案。

## 参数值

```TypeScript
interface ParameterValues {
  [key: string]: any
}
```

用于将参数值传递到插件，建立与`manifest`的映射，根据插件调用`setSuggestions`时指定的方式，将值解析为：

- 建议的`data`属性（如果指定）

- 建议的`name`属性

- 建议本身（为纯字符串时）

- 任意格式参数对应的字符串

- 可跳过的`undefined`可选参数
