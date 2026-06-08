通过网络请求获取异步资源的 API，返回 Promise 对象。

#### **fetch(url: string, init: FetchOptions): Promise\<FetchResponse\>**

发起获取资源的请求。

## **参数类型**

#### **url: string**

请求资源的地址。

#### **init: FetchOptions**

```TypeScript
interface FetchOptions {
  method?: string
  headers?: {[name: string]: string}
  body?: Uint8Array | string
  credentials?: string
  cache?: string
  redirect?: string
  referrer?: string
  integrity?: string
}
```

可选参数，类型如下：

- method：HTTP 请求方法，例如：GET、POST、PUT 等。

- headers：配置 HTTP 请求的标头。 与常规 fetch 不同，Headers 只能为简单对象。

- body：配置 HTTP 请求的请求体。

- creadentials：指定是否发送 Cookie。

- cache：指定请求处理缓存的模式。

- redirect：配置 HTTP 跳转的处理方法。

- referrer：配置 HTTP Referer 标头。

- integrity：指定一个 Hash 值，用于检查 Response 回传数据是否与该值一致。

## 响应类型

```TypeScript
interface FetchResponse {
  headersObject: {[name: string]: string}
  ok: boolean
  redirected: boolean
  status: number
  statusText: string
  type: string
  url: string
  arrayBuffer(): Promise<ArrayBuffer>
  text(): Promise<string>
  json(): Promise<any>
}
```

详细说明：

- headersObject：与响应关联的标头。与常规 fetch 不同，这是一个简单对象。

- ok：返回一个布尔值，表示 HTTP 请求是否成功。

- redirected：返回一个布尔值，表示 HTTP 请求是否发生过跳转。

- status：返回一个数字，表示 HTTP 响应的状态码。

- statusText：返回一个字符串，表示 HTTP 响应的状态信息。

- type：返回 HTTP 请求的类型。

- url：返回 HTTP 请求的资源地址。

- arrayBuffer：返回一个 Promise 实例，并 resolve 一个 `ArrayBuffer` 对象。

- text：返回一个包含文本的 Promise 实例，文本的编码永远是 UTF-8。

- json: 它返回一个 Promise，Promise 的解析 resolve 结果是将文本体解析为 JSON。
