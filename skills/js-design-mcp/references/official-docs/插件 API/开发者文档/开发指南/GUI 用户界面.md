如果你的插件需要一个 GUI 用户界面，通过以下方式即可简单地完成创建：

1. 使用任意方式创建好用户界面对应的 HTML 文件；

2. 更改`manifest.json`中的`"ui": "ui.html"`，将`"ui.html"`替换为你的 HTML 文件路径。

3. 在插件代码里通过`jsDesign.showUI(__html__) `打开界面，会以`<iframe>`的形式展示在「即时设计」中。

<p class="warn"><b>Tips</b></br>可以在 jsDesign.showUI() 中启用 themeColors，并在 html 文件中使用我们提供的 CSS 变量来支持浅色和深色主题。<p>

## GUI 界面与主线程脚本的信息传递

在之前的「插件运行机制」中，已经提到过我们 GUI 界面和主线程脚本的关系。当通过`jsDesign.showUI()`打开用户界面后，你可能可能会需要从插件代码发送有关当前文档的信息以显示在用户界面中，或者是在执行某些操作之前将用户输入发送到插件代码，这时就会用到以下内容：

### GUI 界面发送消息

```HTML
<script>
...
parent.postMessage({ pluginMessage: '这是一条消息' }, '*')
...
</script>
```

### 主线程脚本接收消息

```TypeScript
jsDesign.ui.onmessage = (message) => {
  console.log("收到来自前端的消息", message)
}
```

### 主线程脚本发送消息

```TypeScript
 jsDesign.ui.postMessage(42)
```

### GUI 界面接收消息

```HTML
<script>
...
onmessage = (event) => {
  console.log("收到来自主线程脚本的消息", event.data.pluginMessage)
}
...
</script>
```

<p class="warn"><b>Tips</b></br>可以向任一方向发送各种结构化数据，包括对象、数组、数字、字符串、布尔值、null、undefined、Date 对象和 Uint8Array 对象，但目前无法发送 Blob 对象、ArrayBuffer 或 Uint8Array 以外的 TypedArray 对象。<p>

## 非空源 iframe

另外，你还可以通过以下方式将`<iframe>`链接到自定义的 URL 地址：

```TypeScript
jsDesign.showUI(`<script>window.location.href = "https://..."`)
```

在使用这种形式时，如果你传递的数据比较敏感，那就还需要指定一个`pluginId`作为消息的一部分，用以确保消息传给指定的插件，防止其他插件将其`<iframe>`链接到相同的 URL 地址来接收消息。

同时，还要在`parent.postMessage`的第二个参数中传入 ' https://js.design ' 以防止其他网站嵌入你的`<iframe>`并拦截 postMessage 信息。

```HTML
<script>
...
// 只有 ID 是 123456 的插件和 https://js.design 可以接受这条消息
parent.postMessage(
  { pluginMessage: 'anything here', pluginId: '123456' },
  'https://js.design'
)

// 任何插件都可以接收这条消息
parent.postMessage({ pluginMessage: 'anything here', pluginId: '*' }, '*')
...
</script>
```

## 触发 Drop 放置事件

由于跨域 iframe 的限制，画布无法直接响应从 GUI 界面拖拽元素的 Drop 放置事件，但我们可以使用消息传递来让插件告诉「即时设计」放置的位置和有效信息。

要触发可以被主线程脚本接收到的放置事件，需要包含以下代码：

```JavaScript
parent.postMessage({ pluginDrop: PluginDrop }, '*')
```

其中`pluginDrop`属性支持以下接口：

```TypeScript
interface PluginDrop {
  clientX: number // clientX 和 clientY 与浏览器的 DragEvent 对应
  clientY: number
  items?: DropItem[]
  // 文件对象数组 (https://developer.mozilla.org/en-US/docs/Web/API/File)
  files?: File[]
  dropMetadata?: any // 传递额外信息
}

interface DropItem {
  type: string
  data: string
}
```
