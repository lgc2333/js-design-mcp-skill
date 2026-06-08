# manifest.json

每一个「即时设计」插件都必须包含`manifest.json`文件，用以定义插件的各种重要信息。如果通过客户端「创建/添加插件」，会自动生成对应的`manifest.json`文件，只需修改其中各个字段对应的信息即可。

```JSON
{
  "name": "MyPlugin",
  "id": "7378052***778092",
  "api": "1.0.0",
  "main": "code.js",
  "ui": "ui.html"
}
```

#### name: string

插件的名称，会显示在插件列表中。

#### id: string

插件的 ID，当前可手动创建，后续会在「创建/添加插件」或者「发布插件」时由我们为你自动分配。

#### api: string

插件所使用的的 API 版本，我们会持续更新和优化 API 相关的内容，建议始终保持最新版，每次迭代的信息都可以在 更新日志 中查看。

#### main: string

插件代码文件的相对路径，用以指定在沙箱中运行的 JavaScript 脚本。

#### ui?: string | { [key: string]: string }

用于指定用户界面所对应的 HTML 文件，可以通过`jsDesign.showUI`显示。

#### parameters?: Parameter[]

用于指定插件所接受的输入参数列表，示例：

```JSON
"parameters": [
  {
    "name": "Color",
    "key": "color",
    "description": "请输入颜色",
    "allowFreeform": true,
    "optional": true
  }
]
```

每个参数具有以下属性：

- `name` ，定义此参数的名称

- `key`，参数的唯一 ID，用于在`ParameterValue`中识别此属性

- `description`，描述信息/输入说明/提示

- `allowFreeform`，允许用户输入任意格式的值

- `optional`，定义当前项为可选项，即可跳过

```TypeScript
interface Parameter {
  name: string
  key: string
  description?: string
  allowFreeform?: boolean
  optional?: boolean
}
```

#### parameterOnly?: boolean

是否只能通过输入参数启动插件。

当此属性为`true`时，运行插件之前会提示用户在快速操作界面输入参数，而不会直接启动插件。

#### menu?: ManifestMenuItem[]

为插件设置子菜单，让插件可以包含多个命令。可以通过`jsDesign.command`属性来确定用户选择的命令。

此属性包含要显示的菜单项、菜单分隔符和子菜单的嵌套列表，结构如下：

```JSON
"menu": [
  {"name": "Create Text", "command": "text"},
  {"name": "Create Frame", "command": "frame"},
  {"separator": true},
  {"name": "Create Shape",
   "menu": [
     {"name": "Create Circle", "command": "circle"},
     {"separator": true},
     {"name": "Create Rectangle", "command": "rectangle"}
   ]
  }
]
```

菜单属性中的每一项都必须是这三种之一，不能有其他情况。

```TypeScript
type ManifestMenuItem =
  // 可点击的菜单项
  { name: string, command: string, parameters?: ParameterList[], parameterOnly?: boolean } |
  // 菜单的分隔符
  { separator: true } |
  // 子菜单
  { name: string, menu: ManifestMenuItem[] }
```

#### relaunchButtons?: ManifestRelaunchButton[]

此属性用以配置通过`setRelaunchData`API 设置的重新启动按钮。

```JSON
"relaunchButtons": [
  {"command": "edit", "name": "Edit shape"},
  {"command": "open", "name": "Open Shaper", "multipleSelection": true}
]
```

每个`relaunchButtons`数组中的重新启动按钮都具有以下属性：

- `command`，指定在按下按钮后运行插件时对应的`jsDesign.command`，且必须与`setRelaunchData`API 中提供的命令匹配；

- `name`，按钮的名称/按钮上显示的文本内容；

- `multipleSelection`，多选属性（可选项，默认为`false`），当选择多个节点时，可以显示重新启动按钮和说明。如果为`true`，重新启动按钮将仅在选择单个节点时出现，或仅显示所有选定的节点相同的部分。

如果要为指定节点添加多个重新启动按钮，按钮的顺序将有 manifest 中的`relaunchButtons`数组元素顺序决定。

```TypeScript
type ManifestRelaunchButton = {
  command: string
  name: string
  multipleSelection?: boolean
}
```

#### enablePrivatePluginApi?: boolean

是否启用专用于私有插件的 API 接口，默认为`false`。

#### permissions?: PluginPermissionType[]

设置插件需要请求的的权限，例如：

```Ada
type PluginPermissionType =
 "currentuser" |
 "activeusers"
```
