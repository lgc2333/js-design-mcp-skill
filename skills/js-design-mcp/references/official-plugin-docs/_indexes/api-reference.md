# API Foundation Index

Core PluginAPI globals and host APIs: jsDesign, UI messaging, parameters, viewport, storage, fetch, typings.

- [fetch](../api/reference/fetch.md) - 通过网络请求获取异步资源的 API，返回 Promise 对象。 Symbols: FetchOptions, FetchResponse, fetch(url: string, init: FetchOptions), url, init.
- [插件 API 概述](../api/reference/intro.md) - 在开发插件时，会经常用到全局变量`jsDesign`，通过它可以访问大多数「即时设计」插件 API，实现对节点的增删改查、访问当前选中、打开模态等功能。 Symbols: UI, Code.
- [jsDesign](../api/reference/jsDesign.md) - 在「即时设计」全局对象`jsDesign`上可用的方法和属性。 Symbols: NotificationOptions, PublishStatus, apiVersion, fileKey, command, pluginId.
- [jsDesign.clientStorage](../api/reference/jsDesign-clientStorage.md) - 如果你需要在用户设备本地保存数据，需使用`jsDesign.clientStorage`API，类似于Window.localStorge API，此数据不会跨用户同步。 Symbols: getAsync(key: string), setAsync(key: string, value: any), deleteAsync(key: string), keysAsync().
- [jsDesign.parameters](../api/reference/jsDesign-parameters.md) - 与参数输入相关的方法和属性。 Symbols: ParameterInputEvent, ParameterValues, on(type: 'input', callback: (event: ParameterInputEvent) => void), once(type: 'input', callback: (event: ParameterInputEvent) => void), off(type: 'input', callback: (event: ParameterInputEvent) => void), setSuggestions(suggestions: Array<string | { name: string; data?: any; icon?: string | Uint8Array; iconUrl?: string }>).
- [jsDesign.ui](../api/reference/jsDesign-ui.md) - 与 GUI 用户界面，即通过`jsDesign.showUI`创建的界面，密切相关的方法和属性。 Symbols: show(), hide(), resize(width: number, height: number), close(), postMessage(pluginMessage: any, options?: UIPostMessageOptions), onmessage.
- [jsDesign.viewport](../api/reference/jsDesign-viewport.md) - 当前在屏幕上可见的画布区域中可用的属性和方法，视窗的位置通过其中心坐标和缩放比例来表示。 Symbols: center, zoom, scrollAndZoomIntoView(nodes: ReadonlyArray\<BaseNode\>), bounds.
- [插件开发工具](../api/reference/Typings.md) - 为了提高开发效率，我们提供了封装好的「即时设计」插件 API 代码类型提示包，通过 NPM 安装后，可以配合 VSCode 等编辑器使用，在输入全局变量或调用接口时，直接提示或一键补全当前可用的 API 及节点建议，快速实现预期效果。
