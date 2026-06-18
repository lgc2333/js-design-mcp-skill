与 GUI 用户界面，即通过`jsDesign.showUI`创建的界面，密切相关的方法和属性。

#### show(): void

当插件界面是通过`jsDesign.showUI(..., { visible: false })`创建，或者之前调用了`jsDesign.ui.hide()`时，可通过此方法显示插件界面。

#### hide(): void

隐藏当前插件的界面，插件将后台运行，但不会展示给用户。

#### resize(width: number, height: number): void

修改插件界面的尺寸，也可以在创建时设置，最小尺寸为 70x0 。

#### close(): void

完全销毁插件界面及其`<iframe>`并停止运行，调用后，`<iframe>` 内的所有代码都将终止，无法再向它发送消息。

#### postMessage(pluginMessage: any, options?: UIPostMessageOptions): void

发送消息到插件的`<iframe>`中，与浏览器的`postMessage`API 相同，详情可查看 [Web APIs](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm) 。

#### onmessage: MessageEventHandler | undefined

为来自插件前端的传入消息注册一个回调函数。

#### on(type: 'message', callback: MessageEventHandler): void

为来自插件前端的传入消息注册一个回调函数。

#### once(type: 'message', callback: MessageEventHandler): void

为来自插件前端的传入消息注册一个单次回调函数，效果和`jsDesign.ui.on("message")`相同，但只执行一次。

#### off(type: 'message', callback: MessageEventHandler): void

移除通过`jsDesign.ui.on`添加的回调函数。
