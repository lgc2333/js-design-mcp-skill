Fragment 组件不接受任何子元素之外的属性和可选的 key 属性，这个组件只是简单地渲染它的子组件，其行为类似于 React 中的 Fragments。

> **该组件不能用作小组件的根组件。**

要进行设置，请确保将以下行添加到 tsconfig.json 。

```JSON
{
  "compilerOptions": {
    "jsxFactory": "jsDesign.widget.h",

    // Add this line
    "jsxFragmentFactory": "jsDesign.widget.Fragment",

    ...
  }
}
```

在编写 JSX 时，我们可以使用以下语法：

```TypeScript
const { widget } = jsDesign
const { Text } = widget

function NameList({ names }: { names: string[] }) {
  return (
    <>
      {names.map(name => <Text key={name}>{name}</Text>)}
    </>
  )
}
```

或者，我们也可以直接引用 Fragment 组件，便于在使用列表时指定 key 属性：

```TypeScript
const { widget } = jsDesign
const { Text, Fragment } = widget

function NameList({ names }: { names: string[] }) {
  return (
    <Fragment>
      {names.map(name => <Text key={name}>{name}</Text>)}
    </Fragment>
  )
}
```
