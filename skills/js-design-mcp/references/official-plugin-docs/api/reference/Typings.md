# 插件开发工具

为了提高开发效率，我们提供了封装好的「即时设计」插件 API 代码类型提示包，通过 NPM 安装后，可以配合 VSCode 等编辑器使用，在输入全局变量或调用接口时，直接提示或一键补全当前可用的 API 及节点建议，快速实现预期效果。

### 安装代码类型提示包

```
npm i --save-dev @jsdesigndeveloper/plugin-typings
# or
yarn add -D @jsdesigndeveloper/plugin-typings
```

### 添加代码类型提示包

默认创建的插件目录中已经自动添加了相关配置，你也可以手动将代码提示包的目录添加到`typeRoots`中。

```JSON
{
   "compilerOptions": {
       "typeRoots": [
           "./node_modules/@types",
           "./node_modules/@jsdesigndeveloper"
       ]
   }
}
```

### 启用严格模式

为了得到更好的开发体验，建议开启严格模式，这样可以借助 TypeScript 的特性，不仅能更准确地进行代码提示和补全示，还可以实时检测出代码语法错误。

如果需要启用，在`tsconfig.json`中添加以下内容即可：

```JSON
{
  "compilerOptions": {
    ...
    "strict": true
  }
}
```
