# 页面节点 PageNode

页面节点始终为文件节点`DocumentNode`的子节点。

大多数插件只需要通过`jsDesign.currentPage`即可访问的当前页面。

## 页面属性

#### type: 'PAGE' [readonly]

页面的节点类型，由字符串`'PAGE'`表示。

#### clone(): PageNode

复制当前页面，并添加`jsDesign.root`为父级，原型连线也会被复制，引用组件将复制为实例组件。

#### guides: ReadonlyArray\<Guide\>

当前页面的辅助/参考线。

#### selection: ReadonlyArray\<SceneNode\>

当前页面被选中的节点，每个页面各自独立，无法判断选择顺序。

#### selectedTextRange: { node: TextNode; start: number; end: number } | null

当前正在编辑的文本节点（如果有），以及当前选中的文本段落。

#### flowStartingPoints: ReadonlyArray<{ nodeId: string; name: string }>

预览时显示的第一个页面（默认第一个画板或手动选中的画板）。

#### backgrounds: ReadonlyArray\<Paint\>

当前页面的画布背景色（目前只支持纯色）。

#### prototypeBackgrounds: ReadonlyArray\<Paint\>

原型的背景色（目前只支持纯色）。

#### prototypeStartNode: FrameNode | GroupNode | ComponentNode | InstanceNode | null [readonly]

原型起始节点。有起始节点的原型包含从该节点可到达的所有帧。没有起始节点的原型包含当前页面上的所有帧，原型是每页相互独立的。

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

## 子级相关属性

#### children: ReadonlyArray\<SceneNode\> [readonly]

当前节点的子级列表，按层级从最底层到最顶层排序。

#### appendChild(child: SceneNode): void

新增一个子节点，且置于最顶层。

#### insertChild(index: number, child: SceneNode): void

在指定位置插入一个子节点。

#### findChildren(callback?: (node: SceneNode) => boolean): SceneNode[]

遍历当前节点的直接子节点（即不包括子节点的子节点），返回所有回调结果为`true`的节点。

#### findChild(callback: (node: SceneNode) => boolean): SceneNode | null

遍历当前节点的直接子节点（即不包括子节点的子节点），返回第一个回调结果为`true`的节点。

#### findAll(callback?: (node: SceneNode) => boolean): SceneNode[]

遍历当前节点树（当前节点的子节点、子节点的子节点等），返回所有回调结果为`true`的节点。

#### findOne(callback: (node: SceneNode) => boolean): SceneNode | null

遍历当前节点树（当前节点的子节点、子节点的子节点等），返回第一个回调结果为`true`的节点。

#### findAllWithCriteria<T extends NodeType[]>(criteria: { types: T }): Array<{ type: T[number] } & SceneNode>

遍历当前节点树（当前节点的子节点、子节点的子节点等），返回所有指定类型的节点。

## 导出相关属性

#### exportSettings: ReadonlyArray\<ExportSettings\>

节点的导出设置。

#### exportAsync(settings?: ExportSettings): Promise\<Uint8Array\>

将节点导出为对应编码的图片。
