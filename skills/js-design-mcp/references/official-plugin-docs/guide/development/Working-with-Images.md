# 处理图片

在「即时设计」中，图片都是存在于节点的填充属性中，如果需要在文件中查找、解码以及修改图片的话，首先应该查找对应节点的填充属性。

示例：

```TypeScript
async function invertImages(node) {
  const newFills = []
  for (const paint of node.fills) {
    if (paint.type === 'IMAGE') {
      // 通过哈希值获取图片对象
      const image = jsDesign.getImageByHash(paint.imageHash)
      // 获取图片数据
      const bytes = await image.getBytesAsync()

      // TODO: 对图片数据进行处理
    }
  }
  node.fills = newFills
}

const selected = jsDesign.currentPage.selection[0] as GeometryMixin
invertImages(selected)
```

调用`getBytesAsync()`可以返回图片的原始数据，可以用来下载或将图片上传到其他地方，而如果需要对图片进行更精细的处理，比如对图片逐个像素进行操作，则需要 **解码** 图片来获取 RGBA 数据。

例如，现在我们要对一张图片进行颜色反转，除了需要获取图片数据外，还需要调用解码库来实现图片解码，而这部分需要在`<iframe>`中实现。

对应的主线程代码为：

```TypeScript
async function invertImages(node) {
  const newFills = []
  for (const paint of node.fills) {
    if (paint.type === 'IMAGE') {
      const image = jsDesign.getImageByHash(paint.imageHash)
      const bytes = await image.getBytesAsync()

      // 创建一个不可见的 <iframe>
      jsDesign.showUI(__html__, { visible: false })

      // 发送图片数据
      jsDesign.ui.postMessage(bytes)

      // 等待 <iframe> 响应
      const newBytes = await new Promise((resolve, reject) => {
        jsDesign.ui.onmessage = value => resolve(value)
      })

      // 使用返回的新图片创建填充
      const newPaint = JSON.parse(JSON.stringify(paint))
      newPaint.imageHash = jsDesign.createImage(newBytes).hash
      newFills.push(newPaint)
    }
  }
  node.fills = newFills
}
```

对应的不可见的`<iframe>`中，主要处理图片解码、编码以及修改相关内容，我们可以创建一个`<canvas>`对象，并通过`canvas.getContext('2d')`获取图片的`ImageData`。

`ImageData` 中的`data`字段包含了图片中每个样本（或像素）的颜色顺序，保存为`[R, G, B, A, R, G, B, A , ...]`，如果要反转图像中的颜色，将每个颜色通道的值替换为`255 - value`即可，代码如下：

```HTML
<script>
  window.onmessage = async (event) => {
    // 获取插件发来的消息
    const bytes = event.data.pluginMessage

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    const imageData = await decode(canvas, ctx, bytes)
    const pixels = imageData.data

    // 对图片进行颜色反转
    for (let i = 0; i < pixels.length; i += 4) {
      pixels[i + 0] = 255 - pixels[i + 0]
      pixels[i + 1] = 255 - pixels[i + 1]
      pixels[i + 2] = 255 - pixels[i + 2]
      // 不需要修改 alpha 通道
    }

    const newBytes = await encode(canvas, ctx, imageData)
    window.parent.postMessage({pluginMessage: newBytes}, '*')
  }
</script>
```

最后，上面调用的编码`encode`及解码`decode`函数如下，一般不需要自行编写：

```TypeScript
async function encode(canvas, ctx, imageData) {
  ctx.putImageData(imageData, 0, 0)
  return await new Promise((resolve, reject) => {
    canvas.toBlob(blob => {
      const reader = new FileReader()
      reader.onload = () => resolve(new Uint8Array(reader.result))
      reader.onerror = () => reject(new Error('Could not read from blob'))
      reader.readAsArrayBuffer(blob)
    })
  })
}

async function decode(canvas, ctx, bytes) {
  const url = URL.createObjectURL(new Blob([bytes]))
  const image = await new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject()
    img.src = url
  })
  canvas.width = image.width
  canvas.height = image.height
  ctx.drawImage(image, 0, 0)
  const imageData = ctx.getImageData(0, 0, image.width, image.height)
  return imageData
}
```
