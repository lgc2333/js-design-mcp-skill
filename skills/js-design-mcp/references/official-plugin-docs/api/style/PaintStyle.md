# 填充样式 PaintStyle

将填充创建为填充样式后，该样式所对应的相关内容。

## 特有属性

#### type: 'PAINT'

填充样式的类型，对应字符串为`'PAINT'`，在读取其他属性之前，请务必检查`type`。

#### paints: ReadonlyArray\<Paint\>

填充样式列表，用于替换填充、描边等属性中的颜色样式。

## 通用样式属性

#### id: string [readonly]

样式 ID，具有唯一性。可以分配给`fillStyleId`、`backgroundStyleId`、`strokeStyleId`、`textStyleId`等。

#### name: string

样式的名称。如果在文本节点`TextNode`上设置此属性，会将自动重命名`autoRename`设置为`false`。

#### remove(): void

删除本地样式。

#### getPluginData(key: string): string

获取当前节点或样式上保存的自定义信息。如果未设置，则返回空字符串。

#### setPluginData(key: string, value: string): void

通过设置`key`在节点或样式上保存自定义信息，**完全私有，仅对你的插件生效**。

#### getPluginDataKeys(): string[]

获取当前节点或样式上的所有自定义信息对应`key`的列表。

#### getSharedPluginData(namespace: string, key: string): string

获取当前节点或样式上保存的公开的自定义信息。如果未设置，则返回空字符串。

#### setSharedPluginData(namespace: string, key: string, value: string): void

通过设置`key`在节点或样式上保存自定义信息，**公开给所有插件**。

#### getSharedPluginDataKeys(namespace: string): string[]

获取当前节点或样式上的所有公开的自定义信息对应`key`的列表。

## 可发布属性

#### description: string

针对当前引用组件/样式的文字描述。

#### remote: boolean [readonly]

当前引用组件/样式是否为团队共享设计库的内容。

#### key: string [readonly]

用于从团队共享设计库导入引用组件/样式的`key` 。

#### getPublishStatusAsync(): Promise\<PublishStatus\>

获取当前引用组件/样式在团队共享设计库中的状态。

## 文件夹

样式通过嵌套文件夹进行整理分类，在代码中，将样式的名称设置为分隔的路径名称即可。

例如，将名为`样式 1`的填充样式移动到名为`b`的嵌套文件夹中，文件夹`b`位于文件夹`a`中。

```TypeScript
const style = jsDesign.createPaintStyle()
style.name = "a/b/样式 1"
```

文件夹名称不能为空字符串，并且它的层级结构是唯一的。

通过函数`getNamePrefix`可获取给定样式名称的绝对文件夹名称：

```TypeScript
const getNameParts = (name: string) => {
  const nameParts = name.split('/').filter((part: string) => !!part)
  return nameParts.map((part: string) => part.trim())
}

const getNamePrefix = (name: string): string => {
  const pathParts = getNameParts(name)
  pathParts.pop()
  return pathParts.join('/')
}
```
