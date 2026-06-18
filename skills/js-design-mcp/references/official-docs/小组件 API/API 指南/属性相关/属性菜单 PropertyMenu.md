与小组件属性菜单相关的配置项说明。

![avatar](https://img.js.design/assets/developer-doc/widget/images/usePropertyMenu/propertyMenu.png)

## WidgetPropertyMenuItem

小组件属性菜单对应的默认项。

```TypeScript
type WidgetPropertyMenuItem =
  | WidgetPropertyMenuActionItem
  | WidgetPropertyMenuSeparatorItem
  | WidgetPropertyMenuColorItem
  | WidgetPropertyMenuDropdownItem
  | WidgetPropertyMenuToggleItem
  | WidgetPropertyMenuLinkItem

type WidgetPropertyMenu = WidgetPropertyMenuItem[]
```

## WidgetPropertyMenuActionItem

小组件属性菜单操作项，可在属性菜单中添加一个简单的操作按钮，点击后，将使用项目的相应 propertyName 调用属性菜单的回调。

```TypeScript
interface WidgetPropertyMenuActionItem {
  itemType: 'action'
  tooltip: string
  propertyName: string
  icon?: string
}
```

#### itemType: 'action'

指定操作项类型。

#### tooltip: string

按钮的工具提示。

如果未指定图标，则用作按钮标签。

#### propertyName: string

标识菜单项，用于指示在回调中单击了哪个项目。

#### icon?: string

如果指定图标，则用图标渲染按钮；否则将使用工具提示作为按钮的标签。

提供的 svg 应包含有效属性：xmlns='http://www.w3.org/2000/svg'

## WidgetPropertyMenuSeparatorItem

小组件属性菜单分隔，这是非交互元素，无法对其进行操作，但可以通过分隔符将相关的属性菜单项组合在一起，优化菜单结构。

![avatar](https://img.js.design/assets/developer-doc/widget/images/usePropertyMenu/separatorItem.png)

```TypeScript
interface WidgetPropertyMenuSeparatorItem {
  itemType: 'separator'
}
```

#### itemType: 'separator'

指定分隔类型。

## WidgetPropertyMenuColorItem

小组件属性菜单颜色选择项，这是小组件为用户提供选择颜色的一种方式，例如，可以用来更改小组件主题。

![avatar](https://img.js.design/assets/developer-doc/widget/images/usePropertyMenu/colorItem.png)

```TypeScript
interface WidgetPropertyMenuColorSelectorOption {
  tooltip: string
  option: HexCode
}

interface WidgetPropertyMenuColorItem {
  itemType: 'color-selector'
  tooltip: string
  propertyName: string
  options: WidgetPropertyMenuSelectorOption[]
  selectedOption: string
}
```

#### itemType: 'color-selector'

指定颜色选择器项类型。

#### tooltip: string

选择器的工具提示。

#### propertyName: string

标识菜单项，用于指示在回调中单击了哪个项目。

#### options: WidgetPropertyMenuColorSelectorOption[]

选择时向用户显示的颜色选项数组，该数组不能为空。

#### selectedOption: string

当前选择的颜色，此选项字符串应匹配选项中指定的选项值之一。

## WidgetPropertyMenuDropdownItem

小组件属性菜单下拉项，下拉项允许用户从 WidgetPropertyMenuDropdownOption 数组中进行选择，其中的`label`字段会展示给用户。

```TypeScript
interface WidgetPropertyMenuDropdownOption {
  option: string
  label: string // 显示在下拉菜单中
}

interface WidgetPropertyMenuDropdownItem {
  itemType: 'dropdown'
  tooltip: string
  propertyName: string
  options: WidgetPropertyMenuDropdownOption[]
  selectedOption: string
}
```

#### itemType: 'dropdown'

指定下拉项类型。

#### tooltip: string

下拉组件的工具提示。

#### propertyName: string

标识菜单项，用于指示在回调中单击了哪个项目。

#### options: WidgetPropertyMenuDropdownOption[]

下拉菜单的选项列表，该数组不能为空。

#### selectedOption: string

当前选择的选项，此项字符串应匹配`options`中给到的选项。

## WidgetPropertyMenuToggleItem

小组件属性菜单切换项，可以在菜单中设置一个按钮，让用户在属性菜单中切换布尔值，选择后，将使用项目的 propertyName 调用属性菜单回调。

isToggled 设置为 true 时按钮突出显示。

```TypeScript
interface WidgetPropertyMenuToggleItem {
  itemType: 'toggle'
  tooltip: string
  propertyName: string
  isToggled: boolean
  icon?: string
}
```

#### itemType: 'toggle'

指定切换项类型。

#### tooltip: string

按钮的工具提示。

如果未指定图标，则用作按钮标签。

#### propertyName: string

标识菜单项，用于指示在回调中单击了哪个项目。

#### isToggled: boolean

切换的状态。

#### icon?: string

如果指定图标，则用图标渲染按钮；否则将使用工具提示作为按钮的标签。

提供的 svg 应包含有效属性：xmlns='http://www.w3.org/2000/svg'

## WidgetPropertyMenuLinkItem

小组件属性菜单链接项，链接项允许用户在当前浏览器/电脑中的默认浏览器中打开第三方网页链接。通过这种方式打开链接时：

- 该链接可在新标签页打开。

- 链接项类型比使用 iFrame 打开链接更容易。

- 该链接使用 \<a\> 标签，可防止用户操作被浏览器阻止。

- 链接项类型不会触发属性菜单回调。

```TypeScript
interface WidgetPropertyMenuLinkItem {
  itemType: 'link'
  tooltip: string
  propertyName: string
  href: string
  icon?: string
}
```

#### itemType: 'link'

指定链接项类型。

#### tooltip: string

链接组件的工具提示。

#### propertyName: string

标识菜单项。

#### href: string

当用户单击链接项时打开的 URL。

#### icon?: string | null

如果指定图标，则用图标渲染按钮；否则将使用官方默认图标。

提供的 svg 应包含有效属性：xmlns='http://www.w3.org/2000/svg'

## WidgetPropertyEvent

小组件属性事件，事件会被传递到 onChange 方法中，以下是每个类型 itemType 对应的属性说明（「分隔符」和「链接」类型不会触发 onChange 方法）。

| 类型 itemType    | 属性名 propertyName | 属性值 propertyValue     |
| ---------------- | ------------------- | ------------------------ |
| "action"         | Yes                 | undefined                |
| "color-selector" | Yes                 | 对应选中颜色的 hex 值    |
| "dropdown"       | Yes                 | 对应下拉菜单子项的字符串 |
| "toggle"         | Yes                 | undefined                |
| "separator"      | N/A                 | N/A                      |
| "link"           | N/A                 | N/A                      |

```TypeScript
type WidgetPropertyEvent = {
  propertyName: string
  propertyValue?: string | undefined
}
```

#### propertyName: string

点击项的属性名称。

#### propertyValue?: string | undefined

所选项目的 propertyValue，该值将是「下拉菜单」和「颜色选择器」项目类型的字符串值。
