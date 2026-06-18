用于注册你的小组件，这是小组件的主要入口。

## 对应方法

#### register(component: FunctionalWidget\<any\>): void

## 说明

每当插入小组件以及更新小组件的状态时，都会调用提供的方法。

`widget.register`方法只应在 manifest.main 文件运行时调用一次。

## 示例

```TypeScript
const { widget } = jsDesign
const { Text } = widget

function MyFirstWidget() {
  return <Text>Hello Widget</Text>
}

widget.register(MyFirstWidget)
```
