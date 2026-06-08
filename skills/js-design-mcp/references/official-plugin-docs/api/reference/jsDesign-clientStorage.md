# jsDesign.clientStorage

如果你需要在用户设备本地保存数据，需使用`jsDesign.clientStorage`API，类似于Window.localStorge API，此数据不会跨用户同步。

<p class="warn"><b>Tips</b></br>当用户清除浏览器缓存时，会清除所有本地保存的数据。<p>

每个插件都会分配 1MB 的存储空间，对应的本地数据会与你的插件 ID 完全对应，插件 ID 更改及其他 ID 的插件，都无法读取相关数据。

#### getAsync(key: string): Promise\<any | undefined\>

通过指定的`key`从客户端保存的数据中读取对应值。如果没有找到，则返回`undefined`。

#### setAsync(key: string, value: any): Promise\<void\>

使用指定的`key`为客户端中保存的数据设置一个值。

#### deleteAsync(key: string): Promise\<void\>

根据指定的`key`删除客户端保存数据中对应的键/值对。如果未找到对应的值，则返回`void`，不执行任何操作。

#### keysAsync(): Promise\<string[]\>

查找客户端保存数据中所有`key`，用以枚举 clientStorage API 的全部内容。
