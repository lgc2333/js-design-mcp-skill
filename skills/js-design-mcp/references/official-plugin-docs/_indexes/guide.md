# Guide Docs Short Index

- [插件 API 简介](../guide/start/Intro.md) - https://js.design/developer-doc/plugin/guide/start/Intro. 「即时设计」现已正式面向全球用户开放插件 API ！ Symbols: GUI.
- [访问及修改文件](../guide/development/AccessingFile.md) - https://js.design/developer-doc/plugin/guide/development/AccessingFile. 所有插件都都可以通过特定的接口访问文件中的内容，并读取或修改，在 API 中每个图层都用节点代表，不同的节点对应不同的属性，详情见 [插件 API 手册](/developer-doc/plugin/API/2.Node-related/1.NodeType)。
- [颜色 Tokens 对照表](../guide/development/ColorTokens.md) - https://js.design/developer-doc/plugin/guide/development/ColorTokens. 当用户设置为浅色模式（即对应`<html>`中使用`jsdesign-light`类）时，按照如下颜色进行适配：
- [GUI 用户界面](../guide/development/GUI.md) - https://js.design/developer-doc/plugin/guide/development/GUI. 如果你的插件需要一个 GUI 用户界面，通过以下方式即可简单地完成创建： Symbols: PluginDrop, DropItem, GUI.
- [基础介绍](../guide/development/Intro.md) - https://js.design/developer-doc/plugin/guide/development/Intro. 为了更好地开始「即时设计」插件开发，建议提前准备好如下内容： Symbols: Visual, Node.js, TypeScript.
- [manifest.json](../guide/development/manifest.json.md) - https://js.design/developer-doc/plugin/guide/development/manifest.json. 每一个「即时设计」插件都必须包含`manifest.json`文件，用以定义插件的各种重要信息。如果通过客户端「创建/添加插件」，会自动生成对应的`manifest.json`文件，只需修改其中各个字段对应的信息即可。 Symbols: Parameter, ManifestMenuItem, ManifestRelaunchButton, PluginPermissionType, name, id, api, main.
- [发送网络请求](../guide/development/NetworkRequests.md) - https://js.design/developer-doc/plugin/guide/development/NetworkRequests. 在「即时设计」插件中发送网络请求的方法与直接在浏览器中运行相应 JavaScript 的方式基本一致，且使用的 API 由浏览器而非「即时设计」提供。
- [插件的参数输入](../guide/development/parameterOnly.md) - https://js.design/developer-doc/plugin/guide/development/parameterOnly. 有些插件可能功能简洁，不需要独立的 GUI 用户界面，但是在一定程度上依然需要用户输入参数来更好地执行插件，此时你可能需要了解这部分内容。
- [主题设置与 CSS 变量](../guide/development/Theme.md) - https://js.design/developer-doc/plugin/guide/development/Theme. 如果插件需要适应「即时设计」的深色和浅色主题，只需在`jsDesign.showUI()`中添加相应设置项，并将插件 CSS 代码中的硬编码色值替换为对应的 CSS 变量即可。 Symbols: Tokens.
- [处理图片](../guide/development/Working-with-Images.md) - https://js.design/developer-doc/plugin/guide/development/Working-with-Images. 在「即时设计」中，图片都是存在于节点的填充属性中，如果需要在文件中查找、解码以及修改图片的话，首先应该查找对应节点的填充属性。
- [处理文本内容](../guide/development/Working-with-Text.md) - https://js.design/developer-doc/plugin/guide/development/Working-with-Text. 在处理文本节点`TextNode`时，要考虑的内容较多（如混合样式、加载字体以及字体缺失），所以单独在这部分进行介绍。
