# 插件的参数输入

有些插件可能功能简洁，不需要独立的 GUI 用户界面，但是在一定程度上依然需要用户输入参数来更好地执行插件，此时你可能需要了解这部分内容。

要支持参数输入，首先需要如下一些配置：

1. 添加一个 **参数列表** 到插件的 manifest.json 中。

2. 添加`jsDesign.parameters.on('input')`方法用来提供参数建议。

3. 添加`jsDesign.on('run')`方法用来运行插件。

此类插件，可以通过编辑页的「全局搜索」来实现插件调用和参数输入，快速使用插件功能。

## 参数列表

为了接收参数，插件必须在 manifest.json 中定义如下参数列表，可以根级定义一个参数列表，在可以创建多个子菜单项 ，每项对应各自的参数列表。

参数列表是一个参数数组，示例如下：

```JSON
parameters: [
    {
      "name": "图标名称",
      "key": "icon-name"
    },
    {
      "name": "尺寸",
      "key": "size",
      "allowFreeform": true
    },
    {
      "name": "颜色",
      "key": "color",
      "allowFreeform": true,
      "optional": true
    }
]
```

每个参数都必须有对应的`name`和`key`属性，对应用户看到的文本和插件的唯一标识。

另外还有参数的可选属性：

- `allowFreeform`，表示该项支持输入任意格式参数
- `optional`，表示该项为可选项，不输入也可运行

## parameterOnly: boolean

对于此类插件很重要的一个属性，在 manifest.json 中设定，即插件是否为仅支持输入参数运行，当`"parameterOnly"`为`false`时，将允许部分用户通过快速输入参数值运行插件，同时允许其他用户使用 GUI 用户界面运行。

## 输入建议

插件可以在用户输入参数值时动态提供建议，如果启用此功能，插件需要以「查询模式」启动。在查询模式中插件能够读取文件以及生成网络请求 ，但无法修改文件内容或展示用户界面。

示例：

```TypeScript
jsDesign.parameters.on('input', ({ parameters, key, query, result }: ParameterInputEvent) => {
  switch (key) {
    case 'icon':
      const icons = ['menu', 'settings', 'search', 'angle', 'checkbox', 'logout']
      result.setSuggestions(icons.filter(s => s.includes(query)))
      break
    ...
    default:
      return
  }
})
```

有关输入建议 API 相关的详细内容，可查看 [插件 API 手册](/developer-doc/plugin/API/1.Reference/5.jsDesign-parameters)。

## 运行

参数输入完成后，插件将可以通过`jsDesign.on('run')`事件运行，用户输入的参数会传递给对应的函数。

```TypeScript
jsDesign.on('run', ({ command, parameters }: RunEvent) => {
  switch (command) {
    case "resize":
      handleResize(parameters.width, parameters.height)
      break
    case "move":
      handleMove(parameters.dx, parameters.dy)
      break
    ...
  }
})
```

`'run'` 事件运行则代表「查询模式」结束，此时可以正常使用所有插件 API 。

<p class="warn"><b>Tips</b></br>首次启动插件时也会触发 'run' 事件，但如果此时用户还未输入参数，则 parameters 属性为为 undefined 。<p>
