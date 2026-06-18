如果插件需要适应「即时设计」的深色和浅色主题，只需在`jsDesign.showUI()`中添加相应设置项，并将插件 CSS 代码中的硬编码色值替换为对应的 CSS 变量即可。

<p class="warn"><b>Tips</b></br>为了方便 Figma 插件开发者测试自己的插件，我们同时兼容了 Figma 的主题设置和 CSS 变量，直接导入 Figma 插件后也可正常适配，但更建议修改为「即时设计」的变量，方便后续迭代。<p>

## 详细设置方式

插件在调用`jsDesign.showUI()`时将`themeColors`设置为`true`，打开的 GUI 用户界面即可实现访问 CSS 变量并自适应主题：

```JavaScript
jsDesign.showUI(__html__, { themeColors: true, /* other options */ })
```

启用主题设置后，插件的`<iframe>`界面将发生以下变化:

- 对应的`<html>`中，会自动添加一个`jsdesign-light`或`jsdesign-dark`类；

- iframe 中也会添加一个`<style id="jsdesign-style">`元素，里面包含了一组 CSS 变量，如`--jsdesign-color-bg`、`--jsdesign-color-text`等。

你可以直接通过`var()`在 CSS 中使用这些变量，以适配「即时设计」的主题色：

```CSS
body {
  background-color: var(--jsdesign-color-bg);
  color: var(--jsdesign-color-text);
}
```

另外，你也可以在`<html>`元素中使用`jsdesign-light`或`jsdesign-dark`类来设置你自己的深/浅模式主题色：

```CSS
.jsdesign-light body {
  background-color: white;
  color: blue;
}

.jsdesign-dark body {
  background-color: black;
  color: red;
}
```

在自定义后，iframe 中的 CSS 变量也会更新为你设置的色值，并自动识别和匹配对应主题。

## 语义化的颜色 Tokens

为了方便设计师与开发同步规范，我们所有的颜色变量都提供了对应的 Tokens，可以帮助开发者更快速地理解和使用。

### Tokens 简介

Tokens 一般翻译为「令牌」，是用来统一设计师和开发工作思维及方法的概念，对应的就是开发所使用的「变量」，例如当我们要将背景色、文本色、描边等定义成 Token 时，可以用下面这种代码化的语言对组件属性进行命名：

- 背景色`--jsdesign-color-bg`

- 文本色`--jsdesign-color-text`

- 描边色`--jsdesign-color-border`

在此基础上，还可以针对不同的状态进行分类命名，比如继续在后面添加`-hover`、`-selected`、 `-disabled`等，这样的命名，可以让开发更清楚地知道每一种样式什么时候用以及用在哪里。

我们的 Tokens 格式规范如下：

```Plaintext
--jsdesign-color-{type}-{color role}-{prominence}-{interaction}
```

#### 类型 Type（必须）

这是 Token 中必须要有的参数，他用来区分这个颜色会用到哪些类型的元素中，当前支持的类型有：背景`bg`、文本`text`、图标`icon`，以及描边`border`。

示例：

- `--jsdesign-color-bg`

- `--jsdesign-color-text`

#### 用途 Color Role（可选）

根据场景和使用情况的不同，通常会用到不同的颜色，这时候我们可以设置每个颜色的用途，方便区分，例如，品牌色、警告色等等。

示例：

- `--jsdesign-color-bg-brand`

- `--jsdesign-color-bg-warning`

#### 特性 Prominence（可选）

不同类型的颜色通常会有不同的属性和层级结构，可以通过特性来进行区分，例如背景、文本颜色的次级`-secondary`或三级`-tertiary`颜色，以及描边的选中态`selected`等。

示例：

- `--jsdesign-color-text-secondary`

- `--jsdesign-color-border-selected`

#### 交互 Interaction（可选）

部分 Tokens 还支持悬停`-hover`、按下`-pressed`等交互状态，也可以通过命名来区分。

示例：

- `--jsdesign-color-bg-brand-pressed`

- `--jsdesign-color-icon-danger-hover`

### 适用场景

在我们已经提供的颜色 Tokens 中，已经对不同颜色进行了细致地划分，优先建议按照现有的规范进行使用，以便在后续迭代更新中可以**保持颜色对应关系**，当然也可以按照自己的需求来使用。

除了已经明确的 4 中类型外，针对颜色的用途，目前通过以下几种情况进行区分：

- `-brand` 当前的主题高亮色，暂仅支持蓝色；

- `-selected` 元素的选中态；

- `-disabled` 元素的非活跃态，未选中/默认状态，为浅灰色；

- `-component` 与组件相关联的颜色；

- `-danger` 危险或错误，一般用在比较重要的元素中，如删除、操作异常等，为红色；

- `-warning` 警告，一般用在提示有异常但不影响使用的问题中，程度比 danger 轻，为橙色；

- `-success` 成功，一般用在操作完成的提示中，为绿色；

- `-inverse` 反色，用于需要和背景颜色相反的元素。

## 常用的 Tokens

下面是一些相对比较常用的 Tokens 介绍。

### 背景色

- `--jsdesign-color-bg` 默认的背景色；

- `--jsdesign-color-bg-secondary` 次级背景色。

### 通用颜色

- `--jsdesign-color-bg-brand` 默认主题色；

- `--jsdesign-color-bg-danger` 表示危险的颜色；

- `--jsdesign-color-bg-warning` 表示警告的颜色；

- `--jsdesign-color-bg-success` 表示操作完成的颜色。

### 文本颜色

- `--jsdesign-color-text` 默认文本颜色，一般用在标题、导航等；

- `--jsdesign-color-text-secondary` 次级文本颜色，一般用在非活跃状态导航、标签等；

- `--jsdesign-color-text-tertiary` 三级文本颜色，一般用在占位文本，如输入框的提示；

- `--jsdesign-color-text-disabled` 无法交互的禁用型文本；

- `--jsdesign-color-text-onbrand` 在默认的主题背景色上使用的白色文本，如分享按钮；

- `--jsdesign-color-text-brand` 使用主题色的文本；

- `--jsdesign-color-text-danger` 表示危险或错误的文本；

- `--jsdesign-color-text-warning` 表示警告的文本；

- `--jsdesign-color-text-success` 表示操作完成的文本。

### 描边

- `--jsdesign-color-border` 默认描边；

- `--jsdesign-color-border-strong` 深色描边，一般用于次级带轮廓的按钮；

- `--jsdesign-color-border-selected` 选中态描边，一般用于被选中的元素；

- `--jsdesign-color-border-danger-strong` 红色的描边，用于提示错误内容，如提示输入框中的内容不符合要求。

如果需要了解当前所有可用的颜色 Tokens，可查看 [颜色 Tokens 对照表](/developer-doc/plugin/guide/development/ColorTokens)。
