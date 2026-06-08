# 原型交互 Reaction

原型交互的设置中，需要定义交互动作和触发行为，且包含动作时，触发行为不能为空。

```TypeScript
type Reaction = { action: Action | null, trigger: Trigger | null }
```
