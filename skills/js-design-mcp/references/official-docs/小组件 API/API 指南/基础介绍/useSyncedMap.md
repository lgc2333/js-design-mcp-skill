useSyncedMap 的工作方式与 useSyncedState 类似，但映射中的每个值都会更新 last-writer-wins，而不是覆盖整个映射 last-writer-wins。

## 对应方法

#### useSyncedMap\<T\>(name: string): SyncedMap\<T\>

## 参数

| 参数 | 描述                                                                       |
| ---- | -------------------------------------------------------------------------- |
| name | 分配给此 syncedMap 的存储名称。小组件中使用多个 syncedMap 时，具有唯一性。 |

## 说明

useSyncedMap 的主要用例是支持多个客户端同时更新小组件数据。发生这种情况时，同步的映射将按照服务器接收到的顺序合并更改，添加/更新/删除键。相比之下，useSyncedState 中的类似值将被最后一个上传的客户端破坏。

useSyncedMap 的返回值是一个类似于 Map 的 JavaScript 对象，它实现了 get、set、delete、keys() 等方法。

## 示例

```TypeScript
const { widget } = jsDesign
const { useSyncedMap, Rectangle } = widget

function SyncedMapExample() {
  const voteMap = useSyncedMap<number>("sessionIdToVotes")

  return (
    <Rectangle
      onClick={() => {
        const sessionId = jsDesign.activeUsers[0].sessionId
        if (!voteMap.get(sessionId)) {
          voteMap.set(sessionId, 1)
        }
      }}
    />
  )
}

widget.register(SyncedMapExample)
```
