可以设定在选中小组件时显示的属性菜单。

## 对应方法

#### usePropertyMenu(items: WidgetPropertyMenuItem[], onChange: (event: WidgetPropertyEvent) => void | Promise\<void\>): void

## 参数

| 参数     | 描述                                                                         |
| -------- | ---------------------------------------------------------------------------- |
| items    | 单击小组件时要展示的 WidgetPropertyMenuItems 列表                            |
| onChange | 单击菜单项时调用的方法。使用包含被单击项目的 propertyName 的对象调用此方法。 |

## 说明

在构建小组件时，属性菜单是为小组件提供菜单的一种方式，当用户点击属性菜单时，会触发相应的事件。

![avatar](https://img.js.design/assets/developer-doc/widget/images/usePropertyMenu/propertyMenu.png)

## 示例

```TypeScript
const { widget } = jsDesign
const { useSyncedState, usePropertyMenu, AutoLayout, Text } = widget

function PropertyMenuWidget() {
  const [color, setColor] = useSyncedState("theme", "#e06666")
  const [fruit, setFruit] = useSyncedState("fruit", "mango")
  const fruitOptions = [{option: "mango", label: "Mango"}, {option: "apple", label: "Apple"}]
  usePropertyMenu(
    [
     {
        itemType: 'action',
        tooltip: 'Action',
        propertyName: 'action',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16" viewBox="0 0 16 16" fill="none"><defs><rect id="path_0" x="0" y="0" width="16" height="16" /></defs><g opacity="1" transform="translate(0 0)  rotate(0 8 8)"><mask id="bg-mask-0" fill="white"><use xlink:href="#path_0"></use></mask><g mask="url(#bg-mask-0)" ><path  id="路径 1" style="stroke:#FFFFFF; stroke-width:1.0666666666666667; stroke-opacity:1; stroke-dasharray:0 0" transform="translate(4.0000000000000755 5.333333333333333)  rotate(0 4 2.666666666666666)" d="M0,2.67L2.67,5.33L8,0 " /></g></g></svg>',
        name: 'action',
      },
      {
        itemType: 'separator',
      },
      {
        itemType: 'color-selector',
        propertyName: 'colors',
        tooltip: 'Color selector',
        selectedOption: color,
        options: [{option: "#e06666", tooltip: "Red"}, {option: "#ffe599", tooltip: "Yellow"} ],
        useColorPicker: true,
      },
      {
        itemType: 'dropdown',
        propertyName: 'fruits',
        tooltip: 'Fruit selector',
        selectedOption: fruit,
        options: fruitOptions,
        icon: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16" viewBox="0 0 16 16" fill="none"><g opacity="1" transform="translate(0 0)  rotate(0 8 7.999999999999998)"><path id="路径 1 (轮廓)" fill-rule="evenodd" style="fill:#FFFFFF" transform="translate(4 5.749999999999998)  rotate(0 4 2.2499999999999996)" opacity="0.8" d="M7.85,0.85C7.88,0.83 7.9,0.81 7.92,0.78C7.93,0.75 7.95,0.72 7.96,0.69C7.97,0.66 7.98,0.63 7.99,0.6C8,0.57 8,0.53 8,0.5C8,0.47 8,0.43 7.99,0.4C7.98,0.37 7.97,0.34 7.96,0.31C7.95,0.28 7.93,0.25 7.92,0.22C7.9,0.19 7.88,0.17 7.85,0.15C7.81,0.1 7.75,0.06 7.69,0.04C7.63,0.01 7.57,0 7.5,0C7.43,0 7.37,0.01 7.31,0.04C7.25,0.06 7.19,0.1 7.15,0.15L4,3.29L0.85,0.15C0.83,0.12 0.81,0.1 0.78,0.08C0.75,0.07 0.72,0.05 0.69,0.04C0.66,0.03 0.63,0.02 0.6,0.01C0.57,0 0.53,0 0.5,0C0.47,0 0.43,0 0.4,0.01C0.37,0.02 0.34,0.03 0.31,0.04C0.28,0.05 0.25,0.07 0.22,0.08C0.19,0.1 0.17,0.12 0.15,0.15C0.12,0.17 0.1,0.19 0.08,0.22C0.07,0.25 0.05,0.28 0.04,0.31C0.03,0.34 0.02,0.37 0.01,0.4C0,0.43 0,0.47 0,0.5C0,0.53 0,0.57 0.01,0.6C0.02,0.63 0.03,0.66 0.04,0.69C0.05,0.72 0.07,0.75 0.08,0.78C0.1,0.81 0.12,0.83 0.15,0.85L3.65,4.35C3.67,4.38 3.69,4.4 3.72,4.42C3.75,4.43 3.78,4.45 3.81,4.46C3.84,4.47 3.87,4.48 3.9,4.49C3.93,4.5 3.97,4.5 4,4.5C4.03,4.5 4.07,4.5 4.1,4.49C4.13,4.48 4.16,4.47 4.19,4.46C4.22,4.45 4.25,4.43 4.28,4.42C4.31,4.4 4.33,4.38 4.35,4.35L7.85,0.85Z " /></g></svg>'
      },
      {
        itemType: 'link',
        propertyName: 'fruitLink',
        tooltip: 'Learn about fruit!',
        icon: null
        href: 'https://en.wikipedia.org/wiki/Fruit',
      },
    ],
    ({propertyName, propertyValue}) => {
      if (propertyName === "colors") {
        setColor(propertyValue)
      } else if (propertyName === "fruits") {
        setFruit(propertyValue)
      } else if (propertyName === "action") {
        console.log(propertyName)
      }
    },
  )
  return (
    <AutoLayout
      verticalAlignItems={'center'}
      padding={16}
    >
      <Text fontSize={32} width={200} horizontalAlignText={'center'} fill={color}>
        {fruitOptions.find(f => f.option === fruit).label}
      </Text>
    </AutoLayout>
  )
}

widget.register(PropertyMenuWidget)
```
