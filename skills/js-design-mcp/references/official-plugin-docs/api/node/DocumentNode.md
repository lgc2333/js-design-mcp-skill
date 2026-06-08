# 文件节点 DocumentNode

文件节点是每个文件根节点。每个浏览器标签页有且仅有一个文件节点，其子节点必须是`PageNode`。

一般情况下插件不会用到此节点，除非需要执行创建新页面或文件相关的操作，在执行文件相关操作时，建议只读不写，避免进行了用户无法感知的设置而影响到使用。

## 文件节点属性

#### type: 'DOCUMENT' [readonly]

文件对应的节点类型，由字符串`'DOCUMENT'`表示。

#### children: ReadonlyArray\<PageNode\> [readonly]

子节点列表。对于`DocumentNode`来说，子节点应始终为`PageNode`。

#### appendChild(child: PageNode): void

将新节点插入子节点列表数组的末尾，即添加新页面到文件页面最后的位置。

#### insertChild(index: number, child: PageNode): void

在指定位置处插入子节点，即添加新页面到指定排序的位置。

#### findChildren(callback?: (node: PageNode) => boolean): Array\<PageNode\>

遍历当前节点的直接子节点（即不包括子节点的子节点），返回所有回调结果为`true`的节点。

#### findChild(callback: (node: PageNode) => boolean): PageNode | null

遍历当前节点的直接子节点（即不包括子节点的子节点），返回第一个回调结果为`true`的节点。

#### findAll(callback?: (node: PageNode | SceneNode) => boolean): Array<PageNode | SceneNode>

遍历当前节点树（当前节点的子节点、子节点的子节点等），返回所有回调结果为`true`的节点。

#### findOne(callback: (node: PageNode | SceneNode) => boolean): PageNode | SceneNode | null

遍历当前节点树（当前节点的子节点、子节点的子节点等），返回第一个回调结果为`true`的节点。

#### findAllWithCriteria<T extends NodeType[]>(criteria: { types: T }): Array<{ type: T[number] } & (PageNode | SceneNode)>

遍历当前节点树（当前节点的子节点、子节点的子节点等），返回所有指定类型的节点。

## 基础节点属性

#### id: string [readonly]

节点的 id，具有唯一性，插件一般需要通过 id 即可直接访问到节点。

#### parent: (BaseNode & ChildrenMixin) | null [readonly]

获取当前节点的父节点，如果不存在则返回`null`。

#### name: string

当前节点在图层面板中所显示的名称。

#### removed: boolean [readonly]

判断节点是否已被删除。

#### toString(): string

获取节点的字符串表示形式。

#### remove(): void

删除当前节点**及其所有子节点**。

#### setRelaunchData(data: { [command: string]: string }): void

设置重启插件相关数据，在选择节点时显示按钮和说明。

#### getRelaunchData(): { [command: string]: string }

获取当前节点上设置的`setRelaunchData`数据。

#### setPluginData(key: string, value: string): void

通过设置`key`在节点或样式上保存自定义信息，**完全私有，仅对你的插件生效**。

#### getPluginData(key: string): string

获取当前节点或样式上保存的自定义信息。

#### getPluginDataKeys(): string[]

获取当前节点或样式上的所有自定义信息对应`key`的列表。

#### setSharedPluginData(namespace: string, key: string, value: string): void

通过设置`key`在节点或样式上保存自定义信息，**公开给所有插件**。

#### getSharedPluginData(namespace: string, key: string): string

获取当前节点或样式上保存的公开的自定义信息。

#### getSharedPluginDataKeys(namespace: string): string[]

获取当前节点或样式上的所有公开的自定义信息对应`key`的列表。

## 画面节点属性

#### visible: boolean

设置节点是否可见（显示/隐藏），不影响插件访问节点。

#### locked: boolean

设置节点是否被锁定，防止用户在画布上的某些交互，如选择和拖动。不影响插件修改节点属性。
