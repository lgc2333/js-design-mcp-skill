切片是一个带有边界框的不可见对象，在编辑器中展示为虚线，用以导出画布中的特定部分，一般只需要为切片添加一个`exportSetings`，并通过`exportAsync`导出其内容即可。

## 切片属性

#### type: 'SLICE' [readonly]

切片的节点类型，由字符串`'SLICE'`表示。

#### clone(): SliceNode

复制切片节点。默认情况下，复制的节点将成为`jsDesign.currentPage`的子节点。

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
