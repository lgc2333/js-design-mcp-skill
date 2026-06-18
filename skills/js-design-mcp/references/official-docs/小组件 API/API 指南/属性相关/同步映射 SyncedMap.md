对应 useSyncedMap 的返回值。

```TypeScript
interface SyncedMap<T = any> {
  readonly size: number
  has(key: string): boolean
  get(key: string): T | undefined
  set(key: string, value: T): void
  delete(key: string): void
  keys(): string[]
  values(): T[]
  entries(): [string, T][]
}
```

#### size: number [readonly]

返回此映射中`key`的数量。

#### has(key: string): boolean

返回给定的`key`是否存在。

#### get(key: string): T | undefined

如果存在，则返回给定`key`的值。

#### set(key: string, value: T): void

在映射上设定对应的键/值对，值必须是 JSON 可序列化的。

#### delete(key: string): void

如果存在，则从映射中删除给定的`key`及其值。

#### keys(): string[]

返回映射中的键数组。

#### values(): T[]

返回映射中的值数组。

#### entries(): \[string, T\][]

返回映射中的 [key, value] 元数组。
