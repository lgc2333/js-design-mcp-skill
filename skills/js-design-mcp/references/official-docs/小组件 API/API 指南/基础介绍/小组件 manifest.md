和插件一样，每个小组件也必须定义一个`manifest.json`文件，如果你在客户端中使用了「创建小组件」，我们会自动创建一个简单的 manifest 文件。

示例：

```JSON
{
  "name": "MyWidget",
  "id": "737805260747778093",
  "api": "1.0.0",
  "widgetApi": "1.0.0",
  "containsWidget": true
  "main": "code.js",
  "ui": "ui.html"
}
```

类似于插件 manifest，但是增加了`containsWidget`和`widgetApi`属性，同时没有特定于插件的菜单和重新启动按钮。

#### name: string

小组件的名称，会显示在小组件列表中。

#### id?: string

小组件 ID，当前可手动创建，后续会在「创建/添加小组件」或者「发布小组件」时由我们为你自动分配。

#### widgetApi: string

小组件使用的 API 接口版本。当前的小组件 API 版本统一为`"1.0.0"`。后续在更新重大功能时，可能会需要通过区分版本来保证小组件的兼容性，以正常运行。有关 API 更新的更多信息，可查看 [版本更新历史 →](/developer-doc/widget/VersionHistory)

**建议尽可能地升级到最新版本**，以应用最新的功能与 BUG 修复。

#### containsWidget: true

是否包含小组件，所有小组件都应将此项设置为 true。

#### main: string

小组件的 JavaScript 代码的相对文件路径。

#### ui?: string | { [key: string]: string }

用于指定与小组件相关联的 HTML 文件，可以通过`jsDesign.showUI`在 iframe 模式中使用，与插件一致，可以指定单个 html，也可以分配多个。

#### build?: string

**实验属性！**在加载`main`和`ui`中指定的文件之前运行的 shell 命令，可用于调用 build 命令，例如使用 TypeScript 编译、运行 Webpack 等。

## 插件 API 相关的特定选项

以下是一些也适用于小组件的插件特定选项：

#### api: string

小组件所使用的插件 API 版本，同样建议尽可能更新到最新版本。

#### permissions?: PermissionType[]

用于设定小组件需要访问的用户权限（当前用户或协作用户）。

```Plain
type PermissionType = "currentuser" | "activeusers"
```

如果你的小组件使用`jsDesign.activeUser`，则`activeuser`必须被指定，如果你的小组件使用`jsDesign.currentUser`，则`currentuser`必须被指定。
