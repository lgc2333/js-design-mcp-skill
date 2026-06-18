声明小组件依赖于某些状态。

## 对应方法

#### useSyncedState\<T\>(name: string, defaultValue: T | (() => T)): [T, (newValue: T | (() => T)) => void]

## 参数

| 参数         | 描述                                                                                                                                                                                              |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name         | 存储此同步状态的存储「密钥」，具有唯一性。                                                                                                                                                        |
| defaultValue | 如果没有找到现有值，则返回默认值，值必须是 JSON 可序列化的。如果 defaultValue 的计算成本很高，或者它是在小组件渲染期间不允许使用的插件 API 方法，这里也可以直接传一个能返回 defaultValue 的方法。 |

## 说明

每当更新状态值时，都会重新渲染相应的小组件以反映小组件的最新状态，渲染小组件时不允许更新状态值。

## 示例

```TypeScript
const { widget } = jsDesign
const { Text, useSyncedState } = widget

function SyncedStateExample() {
  const [count, setCount] = useSyncedState("count", 0)
  return (
    <Text
      onClick={() => {
        // Update the count
        setCount(count + 1)
      }}
    >
      The count is: {count}
    </Text>
  )
}

widget.register(SyncedStateExample)
```

## 惰性初始状态

如果我们的小组件初始状态计算成本很高，或者是使用了在小组件渲染期间不允许使用的插件 API 方法（如`jsDesign.activeUsers`），那我们可以指定一个仅在值不存在时才调用的方法，而不是直接指定一个值。

```TypeScript
function Widget() {
  const [expensiveState, setExpensiveState] = useSyncedState("expensiveState", () => {
    return expensiveStateComputation()
  })

  const [activeUsers, setActiveUsers] = useSyncedState("activeUsers", () => jsDesign.activeUsers)
  ...
}
```

## 通过方法更新

如果我们的小组件的新状态是使用先前状态计算得来的，那我们可以传递一个方法，通过当前的状态值来调用该方法，然后使用方法的返回值，而不是直接使用值来设置状态。

```TypeScript
function Widget() {
  const [count, setCount] = useSyncedState("count", 0)
  return (
    <Text onClick={() => setCount(prevCount => prevCount + 1)}>
     {count}
    </Text>
  )
}
```
