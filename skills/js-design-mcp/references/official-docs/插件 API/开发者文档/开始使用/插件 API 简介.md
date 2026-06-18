「即时设计」现已正式面向全球用户开放插件 API ！

所有开发者可以利用插件 API 来对「即时设计」的能力进行最大程度地扩展，对文件内容进行读取、创建或修改，满足各种各样的特殊需求，实现更丰富的设计创作、协作功能等，全面提升效率！

在正式开发前，你可能需要了解以下内容：

## 插件的运行机制

首先，我们要了解一下插件相关的运行机制，以便更好地实现效果。

插件开发需要使用 JavaScript、HTML 和 CSS 等 Web 技术，这和开发其他 Web 应用本质上没有区别，但为了保证插件和平台的安全稳定， 我们在规则上对某些浏览器 API 及使用方法进行了限制和调整。

### 访问「即时设计」文件的内容

如果你的插件需要访问「即时设计」文件中的内容，可以通过 JavaScript 脚本来实现，出于对性能和安全性的考虑，这个 JavaScript 脚本会在**主线程的沙箱中**运行，并且不会暴露浏览器的 API，详细信息如下：

在沙箱中，你可以正常使用标准 JavaScript ES 库，包括 JSON 和 Promise API、Uint8Array 等二进制类型，但是无法直接获取或使用 XMLHttpRequest 和 DOM 等浏览器 API。

### 创建 GUI 用户图形界面

如果需要访问全部的浏览器 API，可以通过创建 GUI 界面来实现。

GUI 界面运行在`<iframe>`中，本质上是一个独立页面，可以通过 HTML 或 JavaScript 访问任何浏览器 API，但是无法直接访问「即时设计」文件中的内容。

### GUI 界面与主线程脚本之间的信息传递

如果需要同时访问全部的浏览器 API 和「即时设计」文件中的内容，可以将上述两种方式结合起来，让 GUI 和主线程脚本通过双向的请求和返回来实现信息传递，满足更多插件开发需求。

![avatar](https://img.js.design/assets/developer-doc/plugin/images/intro/intro-01.png)

<p class="warn"><b>Tips</b><br>要查看主线程上可用的 JavaScript/浏览器 API 列表，可以将 console.log(this) 作为插件的第一行运行。</p>

### 关闭插件

当插件运行完毕时，须调用`jsDesign.closePlugin()`告诉「即时设计」该插件已经停止或关闭，否则用户的编辑界面会一直显示「此插件正在运行」的提示。

另外，用户也可以在插件运行时通过用户界面的「关闭」按钮手动关闭插件，此时「即时设计」会自行调用`jsDesign.closePlugin()`。

### 重启插件

插件可以通过添加重启按钮`relaunchButtons`更便捷地实现多次运行，同时也允许协作者在同一文件内重新启动插件。

```JavaScript
"relaunchButtons": [
  {"command": "edit", "name": "Edit shape"},
  {"command": "open", "name": "Open Shaper", "multipleSelection": true}
]
```

重新启动的按钮插件将显示在右侧「设计」面板中。

[在插件 API 手册中了解更多信息 →](/developer-doc/plugin/api/reference/intro)

### 插件相关限制

在插件的运行机制中，存在一些与用户相关的规则和限制，如下：

- 插件必须由用户主动运行

- 用户一次只能运行一个插件/一个操作

- 插件无法实现后台运行

- 插件无法实时监控和响应文件中的编辑操作
