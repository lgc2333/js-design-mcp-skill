主要用于在 useEffect 中进行异步工作（例如数据获取）。它接受一个 Promise 并让小组件保持活动状态，直到 Promise 被解决（或者有明确的`jsDesign.closePlugin`调用）。

## 对应方法

#### waitForTask(task: Promise\<any\>): void

## 参数

参数描述task仅当解决给定任务时，小组件才会终止

## 说明

waitForTask 的主要用例之一是在将小组件插入画布时进行数据获取。

与 useEffect 配合使用时，可以通过 iframe 发出网络请求，并通过响应保持小组件状态。直到给定的 Promise 被解决前，waitForTask 都会让小组件持续处于活动中。

## 示例

```TypeScript
const { widget } = jsDesign
const { Text, useEffect, waitForTask, useSyncedState } = widget

function WaitForTaskExample() {
  const [textContent, setTextContent] = useSyncedState("text", "Initial")

  useEffect(() => {
    waitForTask(new Promise(resolve => {
      // Simulate async work
      setTimeout(() => {
        setTextContent("Final")

        // Resolve the task
        resolve()
      }, 1000)
    }))
  })

  return <Text>{textContent}</Text>
}

widget.register(WaitForTaskExample)
```
