# 插件 API 概述

## 全局变量 jsDesign

在开发插件时，会经常用到全局变量`jsDesign`，通过它可以访问大多数「即时设计」插件 API，实现对节点的增删改查、访问当前选中、打开模态等功能。

例如：

```TypeScript
jsDesign.createRectangle()
jsDesign.closePlugin()
```

## 开发人员调试

为了方便开发和调试，我们为每个「即时设计」编辑窗口中都添加了`jsDesign`全局对象，你可以在客户端的开发人员工具中，通过插件 > 开发者 > 控制台打开开发人员工具后，直接使用该全局对象调用「即时设计」的插件 API，进行调试和开发。

![avatar](https://img.js.design/assets/developer-doc/plugin/images/Developement/devtools.png)

## \_\_html\_\_

如果你的插件拥有 GUI 用户界面，可以直接在单独的 HTML 文件中开发，在 manifest.json 中指定 ui 文件路径，在插件代码中通过`__html__`进行访问，不需要在 JavaScript 中额外添加 HTML 代码，降低维护成本。

## \_\_uiFiles\_\_

如果你的插件有多个用户界面，也可以直接为`"ui"`字段分配多个 HTML 文件：

```Bash
"ui": {
  "main": "main.html",
  "secondary": "secondary.html"
}
```

此时，可通过全局变量`jsDesign.showUI(__uiFiles__.main)`访问指定文件。

## 在插件中区分即时设计与 Figma

即时设计同时兼容 Figma 插件，可以直接导入 Figma 插件代码运行，如果开发者需要在代码中对即时设计与 Figma 进行区分，可添加以下内容：

### UI 侧

```JavaScript
<script>
    const isJsDesign = location.ancestorOrigins[0] === "https://js.design";
</script>
```

#### Code 侧

```TypeScript
let isJsDesign = false;

try {
    if (jsDesign) {
        isJsDesign = true;
    }
} catch {
    isJsDesign = false;
}
```
