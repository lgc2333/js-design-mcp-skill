# 图片 Image

在「即时设计」中，图片都是作为填充属性存在，而非单独的图片图层，每次导入图片都会自动创建一个矩形并将图片设置为该矩形的填充，也可以手动创建一个矩形，并在其填充属性中修改为图片填充。

插件可以通过`jsDesign.createImage`和对应的`Uint8Array`数据在画布中创建新图片，现有图片也可以通过`jsDesign.getImageByHash`来获取。

当前「即时设计」支持 PNG、JPEG、Webp 和 GIF 等多种常见的图片格式，图像的宽度和高度最高支持 4096px（即 4K 分辨率），超出尺寸的图片将被压缩。

## 图片相关属性和方法

#### hash: string [readonly]

图片的哈希值，具有唯一性。

#### getBytesAsync(): Promise\<Uint8Array\>

获取图片数据的方法。在「即时设计」中，图片与文件数据是分开加载的。
