表示超链接的目标对象，一般有以下两种类型：

- `"URL"`，对应的 value 值为一个 URL 地址，可跳转到任意地址，当 URL 指向的是当前文件中的有效节点，其类型会自动转换为`"NODE"`。

- `"NODE"`: 对应的 value 值是当前文件中有效节点的`id`，注意该节点不能是实例组件的子级。

```TypeScript
type HyperlinkTarget = {
    type: "URL" | "NODE"
    value: string
}
```
