# 访问及修改文件

所有插件都都可以通过特定的接口访问文件中的内容，并读取或修改，在 API 中每个图层都用节点代表，不同的节点对应不同的属性，详情见 [插件 API 手册](/developer-doc/plugin/API/2.Node-related/1.NodeType)。

插件可以通过两种方式访问文件中节点：

1. 直接获取当前选中项

2. 从文件根节点开始遍历

## 获取当前选中项

如果插件需要对用户当前所选的内容执行某些操作，可通过`jsDesign.currentPage.selection`获取用户在当前页面的选中项，返回结果为节点数组。

例如我们要修改所有选中项的不透明度为 50%，代码可以这样写：

```TypeScript
for (const node of jsDesign.currentPage.selection) {
  if ("opacity" in node) {
    node.opacity *= 0.5
  }
}
jsDesign.closePlugin()
```

如果只需要使用选中项的第一个，可以使用`jsDesign.currentPage.selection[0]`。

在实际操作时，插件需要处理的情况一般有三种：未选中图层、选中单个图层、选中多个图层。

## 遍历所有节点

如果插件需要统一处理整个文件的内容，比如查找替换，样式管理等等，可以直接遍历所有节点，当前页面使用`jsDesign.currentPage`，整个文件则使用`jsDesign.root`。

> 当文件较大页面较多时，建议尽可能减少`jsDesign.root`的使用，因为遍历所有页面的处理时间会很长，而且对非当前页面内容进行的任何操作也无法被用户感知，影响体验。

另外，还可以通过`node.findOne`和`node.findAll`来进行辅助，查找单个或全部符合条件的节点，示例如下：

```TypeScript
 // 查找第一个超过 100 字符的文本节点
 const node = node.findOne(node => node.type === "TEXT" && node.characters.length > 100)

 // 查找所有子级为空的画板节点
 const nodes = node.findAll(node => node.type === "FRAME" && node.children.length === 0)
```

为了更方便地控制遍历节点的方式，可以使用类似的递归函数：

```TypeScript
let count = 0
function traverse(node) {
  if ("children" in node) {
    count++
    if (node.type !== "INSTANCE") { // 忽略实例组件的子图层
      for (const child of node.children) {
        traverse(child)
      }
    }
  }
}
traverse(jsDesign.root) // 从根开始遍历
alert(count)
jsDesign.closePlugin()
```

## 优化遍历

当文件较大时，遍历所有节点会非常耗时，很容易让插件操作延迟甚至卡住，如果不得不遍历文件的所有节点，那么可以通过一些方法对遍历过程进行优化来提高效率。

### 1. **跳过不可见节点**

通过调用`jsDesign.skipInvisibleInstanceChildren`可以实现遍历时跳过所有不可见的节点以及实例组件中的子级，加快遍历速度。

```TypeScript
// 跳过不可见的 node 及其在实例中的后代以获得更快的性能
jsDesign.skipInvisibleInstanceChildren = true
```

### 2. **按类型查找节点**

当插件只需要查找特定类型的节点时，可以使用`node.findAllWithCriteria`，相比`node.findOne`和`node.findAll`会快很多。

```TypeScript
 // 查找所有组件和组件集nodes
const nodes = node.findAllWithCriteria({
  types: ['COMPONENT', 'COMPONENT_SET']
})
```

## 节点类型

因为很多插件都是针对特定内容进行处理，并不需要满足所有类型的节点，所以对于插件来说，明确需要处理的节点类型是非常必要的，这可以帮开发者减少很多不必要的麻烦，同时提高插件的运行效率。

每个节点都对应一个`type`字段，用以区分其类型，每种类型同时有对应着各自不同的属性和方法，需要合理使用，详情可查看 [插件 API 手册](/developer-doc/plugin/API/1.Reference/1.intro)。
