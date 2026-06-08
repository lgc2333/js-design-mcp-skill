# 布尔运算节点 BooleanOperationNode

布尔运算是设计中非常常用的功能，通过对多个图层进行并集、交集、减去顶层以及排除重叠等四种方式合并为一个新的节点，而对应的图层则成为其子节点。

当添加或调整子节点时，布尔运算节点的位置和大小可能会发生改变。

布尔运算相关的操作，可以查看 帮助文档。

## 布尔运算的属性

#### type: 'BOOLEAN_OPERATION' [readonly]

布尔运算的节点类型，由字符串`'BOOLEAN_OPERATION'`表示。

#### clone(): BooleanOperationNode

复制布尔运算节点。默认情况下，复制的节点将成为`jsDesign.currentPage`的子节点。

#### booleanOperation: 'UNION' | 'INTERSECT' | 'SUBTRACT' | 'EXCLUDE'

布尔运算对应的四种操作：并集、交集、减去顶层以及排除重叠。

#### expanded: boolean

是否在图层面板中展开当前节点。

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

## 混合相关属性

#### opacity: number

节点的不透明度，须在 0 到 1 之间。

#### blendMode: 'NORMAL' | BlendMode

节点的混合模式，如正常、变暗、正片叠底等。

#### isMask: boolean

节点是否为蒙版。

#### isHideMaskLayer: boolean

创建为蒙版后，是否隐藏蒙版层，同时保持蒙版生效。

#### effects: ReadonlyArray\<Effect\>

节点的特效，即阴影、模糊效果。

#### effectStyleId: string

阴影或模糊样式 ID 。

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

## 布局相关属性

#### absoluteTransform: Transform [readonly]

节点相对于包含它的页面的位置，返回对应的变换矩阵。

#### relativeTransform: Transform

节点相对于其父节点的位置，返回对应的变换矩阵。

#### x: number

节点的 x 轴位置，等价于`relativeTransform[0][2]`。

#### y: number

节点的 y 轴位置，等价于`relativeTransform[1][2]`。

#### rotation: number

节点的旋转角度，以度为单位，返回 -180 到180 之间的值。

#### width: number [readonly]

节点的宽度。

#### height: number [readonly]

节点的高度。

#### absoluteRenderBounds: Rect | null [readonly]

节点的实际边界，受阴影、模糊等属性影响。

#### constrainProportions: boolean

是否固定图层的宽高比例。

#### layoutAlign: 'MIN' | 'CENTER' | 'MAX' | 'STRETCH' | 'INHERIT'

自动布局相关属性，确定对齐方式。

#### layoutGrow: number

自动布局相关属性，确定拉伸方式，0 为固定，1 为自适应。

#### resize(width: number, height: number): void

调整节点尺寸的方法，会影响子级。

#### resizeWithoutConstraints(width: number, height: number): void

调整节点尺寸的方法， 不会影响子级。

#### rescale(scale: number): void

重新缩放节点，对应缩放工具。

## 导出相关属性

#### exportSettings: ReadonlyArray\<ExportSettings\>

节点的导出设置。

#### exportAsync(settings?: ExportSettings): Promise\<Uint8Array\>

将节点导出为对应编码的图片。

## 原型交互相关属性

#### reactions: ReadonlyArray\<Reaction\>

原型中与当前节点交互的方式及动作。

## 画板相关的原型属性

#### overflowDirection: OverflowDirection

溢出滚动设置。

#### numberOfFixedChildren: number

滚动时固定位置的子级。

#### overlayPositionType: OverlayPositionType [readonly]

弹层打开的位置。

#### overlayBackground: OverlayBackground [readonly]

弹层的背景遮罩设置。

#### overlayBackgroundInteraction: OverlayBackgroundInteraction [readonly]

弹层的交互方式。
