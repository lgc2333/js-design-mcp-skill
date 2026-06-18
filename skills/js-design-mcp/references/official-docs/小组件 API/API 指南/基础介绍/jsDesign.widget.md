小组件的主要 API，用来调用相关方法和属性。

#### register(component: FunctionalWidget\<any\>): void

用于注册小组件，这是小组件的主要入口。

此方法需要一个描述小组件的方法，并会返回「即时设计」的元素节点（例如，AutoLayout、Frame、Text 等组件之一）。

[查看更多 →](/developer-doc/widget/api/reference/register)

#### useWidgetId(): string

在 onClick 等事件中引用小组件节点的方法，它会返回一个节点 ID，可用于通过插件 API（如`jsDesign.getNodeById`）检索和识别正在活动的小组件节点。

[查看更多 →](/developer-doc/widget/api/reference/useWidgetId)

#### useSyncedState\<T\>(name: string, defaultValue: T | (() => T)): [T, (newValue: T | (() => T)) => void]

声明小组件依赖于某些状态，给`useSyncedState`赋一个存储键和默认值，它返回存储的当前值和更新值的方法。

[查看更多 →](/developer-doc/widget/api/reference/useSyncedState)

#### useSyncedMap\<T\>(name: string): SyncedMap\<T\>

与 useSyncedState 类似，但映射中的每个值都会更新 last-writer-wins，而不是覆盖整个映射 last-writer-wins。

[查看更多 →](/developer-doc/widget/api/reference/useSyncedMap)

#### usePropertyMenu(items: WidgetPropertyMenuItem[], onChange: (event: WidgetPropertyEvent) => void | Promise\<void\>): void

可以设定在选中小组件时显示的属性菜单。

[查看更多 →](/developer-doc/widget/api/reference/usePropertyMenu)

#### useEffect(effect: () => (() => void) | void): void

用于运行应在小组件状态更改或与小组件交互时运行的代码。可以在组件加载时使用它来获取数据（通过将其与 waitForTask 一起使用）或在 iframe 和小组件之间保持状态同步。

[查看更多 →](/developer-doc/widget/api/reference/useEffect)

#### waitForTask(task: Promise\<any\>): void

在 useEffect 中进行异步工作（例如数据获取）很有用，它接受一个 Promise 并让小组件保持活动状态，直到 Promise 被解决（或者有明确的`jsDesign.closePlugin`调用）。

[查看更多 →](/developer-doc/widget/api/reference/waitForTask)
