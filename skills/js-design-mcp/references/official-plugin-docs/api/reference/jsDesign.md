# jsDesign

在「即时设计」全局对象`jsDesign`上可用的方法和属性。

## 通用属性

#### apiVersion: '1.0.0' [readonly]

当前插件运行的即时设计插件 API 版本，对应`manifest.json`中的`"api"`字段。

#### fileKey: string | undefined [readonly]

当前文件运行某个插件的密钥，**私有插件可用**。如需启用，可在`manifest.json` 中指定`enablePriatePluginApi`。

#### command: string [readonly]

获取当前正在执行的`manifest.json`命令，即`ManifestMenuItem`中对应的命令字符串（详情见 mainfest 介绍）。如果插件没有任何菜单项，则此属性为空。

#### pluginId: string [readonly]

插件 ID，对应`manifest.json`中的`"id"`字段，仅适用于插件，为必填项。

#### skipInvisibleInstanceChildren: boolean

默认为`false`。启用后，所有节点属性和方法将跳过不可见的节点（及其子级），可以提高文件的遍历速度。

#### currentPage: PageNode

获取当前用户正在查看的页面，修改对应的`PageNode`值可以切换页面。

#### root: DocumentNode [readonly]

每个页面的根节点，即文件节点，对应的子级为`PageNode`，用于访问文件内的页面。

## 通用方法

#### showUI(html: string, options?: ShowUIOptions): void

根据指定的 html 文件展示 GUI 用户界面，此方法会用`<iframe>`创建一个模态对话框，让用户更直观地操作插件，同时在可以在`<iframe>`中访问浏览器原生 API 。

在用户界面的设置（即`ShowUIOptions`）中，可以包含如下内容：

- `visible`：是否可见，即是否在一开始就将 GUI 界面展示给用户，默认为`true`，也可以在之后通过`jsDesign.ui.show()`和`jsDesign.ui.hide()`来改变界面的可见性。

- `width`：界面的宽度，默认为 300，最小值为 70，也可以另外通过`jsDesign.ui.resize(width, height)`进行设置。

- `height`：界面的高度，默认为 200，最小值为 0，也可以另外通过`jsDesign.ui.resize(width, height)`进行设置。

- `title`：界面的标题，默认显示插件名称。

- `position`：界面所在的位置，默认是上一个 iframe 的位置或者视口中心。如果需要指定位置，则要给出对应画布中的 X/Y 坐标，即`<PluginNode>.x`和`<PluginNode>.y`返回的值。

- `themeColors`：插件的主题设置，默认为`false`，当开启时，可以通过 CSS 变量来匹配「即时设计」的深色或浅色主题，详情可查看 [主题设置与 CSS 变量](/developer-doc/plugin/Guide/2.Development/9.Theme)。

#### ui: UIAPI [readonly]

通过`jsDesign.showUI（...）`创建的 GUI 用户界面，可以用此属性中的方法实现界面修改或与沙箱中的脚本进行通信等，详情可查看 jsDesign.ui 部分。

#### viewport: ViewportAPI [readonly]

用以读取和设置当前页面内用户可见的画布区域，详情可查看 jsDesign.viewport 部分。

#### clientStorage: ClientStorageAPI [readonly]

用于在用户的本地计算机上长期保存数据，详情可查看 jsDesign.clientStorge 部分。

#### currentUser: User | null [readonly]

当前用户的详细信息，如需访问此属性，必须在`manifest.json`中设定权限。

#### closePlugin(message?: string): void

用于关闭插件，当运行的插件需要完全关闭时，可调用此方法，会关闭所有已开启的对话框，同时取消调用`setTimeout`或`setInterval`等计时器。

#### on(type: ArgFreeEventType, callback: () => void): void

注册一个回调函数，当编辑器中发生指定类型的事件时可执行对应回调。

当前支持判断的事件有：

- `"selectionchange"`，当前页上的选中项发生变化

- `"currentpagechange"`，当前所在页面已更改

- `"drop"`，将「即时设计」之外的元素拖拽进画布

- `"run"`，插件开始运行

- `"close"`，插件关闭

#### once(type: ArgFreeEventType, callback: () => void): void

效果与`jsDesign.on`相同，但回调只会在指定事件首次触发时调用一次。

#### off(type: ArgFreeEventType, callback: () => void): void

移除通过`jsDesign.on`或`jsDesign.once`注册的监听函数。

#### notify(message: string, options?: NotificationOptions): NotificationHandler

在页面内显示 Toast 提示，最长支持 100 个字符，默认停留 4s，可通过`NotificationOptions`进行详细配置。

```TypeScript
interface NotificationOptions {
    timeout?: number;
    error?: boolean;
}
```

#### commitUndo(): void

提交操作到 Undo 撤消历史记录中，但不会触发此操作。

默认情况下，用户在插件中进行的操作不会被平台记录，所以无法进行 Undo 撤销，但是开发者可以通过调用此方法，将用户通过插件进行的操作提交到 Undo 历史记录中，并随时撤销。

例如：

```TypeScript
jsDesign.createRectangle();
jsDesign.createEllipse();
jsDesign.closePlugin();
```

插件通过以上命令创建了一个矩形和一个椭圆，如果用户此时进行撤销操作，将会同时删除矩形和椭圆。

```TypeScript
jsDesign.createRectangle();
jsDesign.commitUndo();
jsDesign.createEllipse();
jsDesign.closePlugin();
```

而当插件像这样通过`jsDesign.commitUndo()`将创建矩形的操作提交到历史记录中后，用户再次进行撤销，则只会撤销掉未提交的椭圆，矩形会保留。

#### triggerUndo(): void

触发撤消操作，将会返回到最后一次`commitUndo()`的状态。

#### saveVersionHistoryAsync(title: string, description?: string): Promise\<VersionHistoryResult\>

保存当前文件并添加到版本历史记录中，返回新版本对应的 ID 。

## 节点相关

获取或创建新节点的相关方法。

#### getNodeById(id: string): BaseNode | null

根据 ID 在当前文件中查找对应节点。每个节点都有一个`id`且唯一，如果 ID 无效或者找不到节点（例如，节点已被删除），则返回`null`。

#### createRectangle(): RectangleNode

创建一个新的矩形。

#### createLine(): LineNode

创建一条新的线段，默认高度为 1 。

#### createEllipse(): EllipseNode

创建一个新的椭圆。

#### createPolygon(): PolygonNode

创建一个新的多边形（默认为三角形）。

#### createStar(): StarNode

创建一个新的星形。

#### createVector(): VectorNode

创建一个新的，没有顶点的矢量路径。

#### createText(): TextNode

创建一个新的空文本节点。

#### createFrame(): FrameNode

创建一个新的画板。

#### createComponent(): ComponentNode

创建一个新的引用组件。

#### createPage(): PageNode

创建一个新页面，并添加到文件节点的子级。

#### createSlice(): SliceNode

创建一个新的切片。

#### createNodeFromSvg(svg: string): FrameNode

通过 SVG 创建画板，相当于导入 SVG 文件。

#### combineAsVariants(nodes: ReadonlyArray\<ComponentNode\>, parent: BaseNode & ChildrenMixin, index?: number): ComponentSetNode

将任意数量的组件合并为变体。

#### group(nodes: ReadonlyArray\<BaseNode\>, parent: BaseNode & ChildrenMixin, index?: number): GroupNode

将任意数量的节点合并为分组。

#### union(nodes: ReadonlyArray\<BaseNode\>, parent: BaseNode & ChildrenMixin, index?: number): BooleanOperationNode

进行「布尔运算 - 并集」操作。

#### subtract(nodes: ReadonlyArray\<BaseNode\>, parent: BaseNode & ChildrenMixin, index?: number): BooleanOperationNode

进行「布尔运算 - 减去顶层」操作。

#### intersect(nodes: ReadonlyArray\<BaseNode\>, parent: BaseNode & ChildrenMixin, index?: number): BooleanOperationNode

进行「布尔运算 - 交集」操作

#### exclude(nodes: ReadonlyArray\<BaseNode\>, parent: BaseNode & ChildrenMixin, index?: number): BooleanOperationNode

进行「布尔运算 - 排除重叠」操作。

#### flatten(nodes: ReadonlyArray\<BaseNode\>, parent?: BaseNode & ChildrenMixin, index?: number): VectorNode

进行「布尔运算 - 拼合路径」操作。

## 样式相关

用于在当前文件中创建和查找现有样式的相关方法，新创建的样式是当前文档的本地样式，不包含默认属性（文本样式除外）。

#### getStyleById(id: string): BaseStyle | null

根据 ID 在当前文件中查找对应样式。如果未找到，则返回`null`。

#### createPaintStyle(): PaintStyle

创建一个新的填充样式，即颜色样式。

#### createTextStyle(): TextStyle

创建一个新的文本样式，默认文本属性（字体：思源黑体，字号：12 ）。

#### createEffectStyle(): EffectStyle

创建新的阴影、模糊样式。

#### createGridStyle(): GridStyle

创建新的网格布局样式。

#### getLocalPaintStyles(): PaintStyle[]

返回本地填充样式的列表。

#### getLocalTextStyles(): TextStyle[]

返回本地文本样式的列表。

#### getLocalEffectStyles(): EffectStyle[]

返回本地阴影、模糊样式的列表。

#### getLocalGridStyles(): GridStyle[]

返回本地网格布局样式的列表。

#### moveLocalPaintStyleAfter(targetNode: PaintStyle, reference: PaintStyle | null): void

调整本地填充样式的顺序，将移动到指定的节点之后，如果未指定，则默认排序到当前文件夹节点的第一位。

#### moveLocalTextStyleAfter(targetNode: TextStyle, reference: TextStyle | null): void

调整本地文本样式的顺序，规则同上。

#### moveLocalEffectStyleAfter(targetNode: EffectStyle, reference: EffectStyle | null): void

调整本地阴影、模糊样式的顺序，规则同上。

#### moveLocalGridStyleAfter(targetNode: GridStyle, reference: GridStyle | null): void

调整本地网格布局样式的顺序，规则同上。

#### moveLocalPaintFolderAfter(targetFolder: string, reference: string | null): void

调整本地填充样式文件夹的顺序，将移动到指定的文件夹节点之后，如果未指定，则默认排序为其父文件夹节点的第一位。移动嵌套文件夹时，须使用完整的文件夹名称（带有 / 分隔的字符串表示路径，且不能为空）。

#### moveLocalTextFolderAfter(targetFolder: string, reference: string | null): void

调整本地文本样式文件夹的顺序，规则同上。

#### moveLocalEffectFolderAfter(targetFolder: string, reference: string | null): void

调整本地阴影、模糊样式文件夹的顺序，规则同上。

#### moveLocalGridFolderAfter(targetFolder: string, reference: string | null): void

调整本地网格布局样式文件夹的顺序，规则同上。

## 团队共享设计库相关

从团队共享设计库中获取组件或样式的方法，需要对应共享设计库的密钥，可以在插件运行时从`component.key`或`style.key`中获取。

#### importComponentByKeyAsync(key: string): Promise\<ComponentNode\>

从团队库导入组件。

#### importComponentSetByKeyAsync(key: string): Promise\<ComponentSetNode\>

从团队库导入变体。

#### importStyleByKeyAsync(key: string): Promise\<BaseStyle\>

从团队库获取样式。

### 发布状态 PublishStatus

可以发布到共享设计库的元素（包括样式和引用组件、变体）的状态。

```TypeScript
type PublishStatus = "UNPUBLISHED" | "CURRENT" | "CHANGED"
```

- `"UNPUBLISHED"`：未发布到团队共享设计库

- `"CURRENT"`：元素已发布，且发布的版本与当前文件一致

- `"CHANGED"`：元素已发布，但本地进行了修改

## 其他

#### listAvailableFontsAsync(): Promise\<Font[]\>

返回当前可用字体的列表，与手动使用字体选择器时看到的结果相同。

#### loadFontAsync(fontName: FontName): Promise\<void\>

加载字体，在创建和修改文本时使用，可通过`.characters`、`.fontSize`、`.fontName`等设置样式。

也可以传入硬编码字体，同时通过通过`listAvailableFontsAsync`加载。

#### createImage(data: Uint8Array): Image

通过 Uint8Array 格式数据创建图片，可用于填充。

#### getImageByHash(hash: string): Image | null

根据 Hash 哈希值查找图片，如果未找到则返回`null`。

#### mixed: unique symbol [readonly]

多选图层节点时获取到的混合属性。

#### base64Encode(data: Uint8Array): string

将 Uint8Array 格式数据编码为 Base64 字符串。

#### base64Decode(data: string): Uint8Array

解码 Base64 字符串并返回 Uint8Array 格式数据。

#### getFileThumbnailNode(): FrameNode | ComponentNode | ComponentSetNode | null

获取当前文件封面缩/略图，如果使用默认缩略图，则返回`null`。

#### setFileThumbnailNodeAsync(node: FrameNode | ComponentNode | ComponentSetNode | null): Promise\<void\>

将当前节点设置为当前文件的封面缩/略图，如果节点为`null`，则使用默认缩略图。
