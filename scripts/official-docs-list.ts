// CAUTION: This url index need to update manually if you want up to date docs
// View docs-crawl-notes to know how to get these urls

export type OfficialDocEntry = {
  title: string
  url: string
  path: string
}

export const OFFICIAL_DOCS = [
  {
    title: '插件 API 简介',
    url: 'https://img.js.design/assets/docs/plugin/guide/start/Intro2022-11-28%2019-28-01.md',
    path: '插件 API/开发者文档/开始使用/插件 API 简介.md',
  },
  {
    title: '基础介绍',
    url: 'https://img.js.design/assets/docs/plugin/guide/development/Intro2022-11-28%2019-28-26.md',
    path: '插件 API/开发者文档/开发指南/基础介绍.md',
  },
  {
    title: 'GUI 用户界面',
    url: 'https://img.js.design/assets/docs/plugin/guide/development/GUI2022-11-28%2019-28-27.md',
    path: '插件 API/开发者文档/开发指南/GUI 用户界面.md',
  },
  {
    title: '访问及修改文件',
    url: 'https://img.js.design/assets/docs/plugin/guide/development/AccessingFile2023-09-18%2009-24-39.md',
    path: '插件 API/开发者文档/开发指南/访问及修改文件.md',
  },
  {
    title: 'manifest.json',
    url: 'https://img.js.design/assets/docs/plugin/guide/development/manifest.json2022-11-28%2019-28-27.md',
    path: '插件 API/开发者文档/开发指南/manifest.json.md',
  },
  {
    title: '发送网络请求',
    url: 'https://img.js.design/assets/docs/plugin/guide/development/NetworkRequests2022-11-28%2019-28-28.md',
    path: '插件 API/开发者文档/开发指南/发送网络请求.md',
  },
  {
    title: '插件的参数输入',
    url: 'https://img.js.design/assets/docs/plugin/guide/development/parameterOnly2022-11-28%2019-28-28.md',
    path: '插件 API/开发者文档/开发指南/插件的参数输入.md',
  },
  {
    title: '处理图片',
    url: 'https://img.js.design/assets/docs/plugin/guide/development/Working-with-Images2022-11-28%2019-28-28.md',
    path: '插件 API/开发者文档/开发指南/处理图片.md',
  },
  {
    title: '处理文本内容',
    url: 'https://img.js.design/assets/docs/plugin/guide/development/Working-with-Text2022-11-28%2019-28-28.md',
    path: '插件 API/开发者文档/开发指南/处理文本内容.md',
  },
  {
    title: '主题设置与 CSS 变量',
    url: 'https://img.js.design/assets/docs/plugin/guide/development/Theme2022-11-28%2019-28-28.md',
    path: '插件 API/开发者文档/开发指南/主题设置与 CSS 变量.md',
  },
  {
    title: '颜色 Tokens 对照表',
    url: 'https://img.js.design/assets/docs/plugin/guide/development/ColorTokens2022-11-28%2019-28-29.md',
    path: '插件 API/开发者文档/开发指南/颜色 Tokens 对照表.md',
  },
  {
    title: '插件 API 概述',
    url: 'https://img.js.design/assets/docs/plugin/api/reference/intro2024-05-15%2010-22-45.md',
    path: '插件 API/API 指南/基础介绍/插件 API 概述.md',
  },
  {
    title: '插件开发工具',
    url: 'https://img.js.design/assets/docs/plugin/api/reference/Typings2022-11-28%2019-28-31.md',
    path: '插件 API/API 指南/基础介绍/插件开发工具.md',
  },
  {
    title: 'jsDesign',
    url: 'https://img.js.design/assets/docs/plugin/api/reference/jsDesign2023-04-14%2015-12-07.md',
    path: '插件 API/API 指南/基础介绍/jsDesign.md',
  },
  {
    title: 'jsDesign.ui',
    url: 'https://img.js.design/assets/docs/plugin/api/reference/jsDesign-ui2022-11-28%2019-28-31.md',
    path: '插件 API/API 指南/基础介绍/jsDesign.ui.md',
  },
  {
    title: 'jsDesign.parameters',
    url: 'https://img.js.design/assets/docs/plugin/api/reference/jsDesign-parameters2022-11-28%2019-28-31.md',
    path: '插件 API/API 指南/基础介绍/jsDesign.parameters.md',
  },
  {
    title: 'jsDesign.viewport',
    url: 'https://img.js.design/assets/docs/plugin/api/reference/jsDesign-viewport2022-11-28%2019-28-31.md',
    path: '插件 API/API 指南/基础介绍/jsDesign.viewport.md',
  },
  {
    title: 'jsDesign.clientStorage',
    url: 'https://img.js.design/assets/docs/plugin/api/reference/jsDesign-clientStorage2022-11-28%2019-28-32.md',
    path: '插件 API/API 指南/基础介绍/jsDesign.clientStorage.md',
  },
  {
    title: 'fetch',
    url: 'https://img.js.design/assets/docs/plugin/api/reference/fetch2024-04-07%2020-29-35.md',
    path: '插件 API/API 指南/基础介绍/fetch.md',
  },
  {
    title: '节点类型',
    url: 'https://img.js.design/assets/docs/plugin/api/node/NodeType2022-11-28%2019-28-32.md',
    path: '插件 API/API 指南/节点相关/节点类型.md',
  },
  {
    title: '文件节点 DocumentNode',
    url: 'https://img.js.design/assets/docs/plugin/api/node/DocumentNode2022-11-28%2019-28-32.md',
    path: '插件 API/API 指南/节点相关/文件节点 DocumentNode.md',
  },
  {
    title: '页面节点 PageNode',
    url: 'https://img.js.design/assets/docs/plugin/api/node/PageNode2022-11-28%2019-28-33.md',
    path: '插件 API/API 指南/节点相关/页面节点 PageNode.md',
  },
  {
    title: '画板节点 FrameNode',
    url: 'https://img.js.design/assets/docs/plugin/api/node/FrameNode2022-11-28%2019-28-33.md',
    path: '插件 API/API 指南/节点相关/画板节点 FrameNode.md',
  },
  {
    title: '分组节点 GroupNode',
    url: 'https://img.js.design/assets/docs/plugin/api/node/GroupNode2022-11-28%2019-28-33.md',
    path: '插件 API/API 指南/节点相关/分组节点 GroupNode.md',
  },
  {
    title: '矩形节点 RectangleNode',
    url: 'https://img.js.design/assets/docs/plugin/api/node/RectangleNode2022-11-28%2019-28-33.md',
    path: '插件 API/API 指南/节点相关/矩形节点 RectangleNode.md',
  },
  {
    title: '椭圆节点 EllipseNode',
    url: 'https://img.js.design/assets/docs/plugin/api/node/EllipseNode2022-11-28%2019-28-33.md',
    path: '插件 API/API 指南/节点相关/椭圆节点 EllipseNode.md',
  },
  {
    title: '线段节点 LineNode',
    url: 'https://img.js.design/assets/docs/plugin/api/node/LineNode2022-11-28%2019-28-34.md',
    path: '插件 API/API 指南/节点相关/线段节点 LineNode.md',
  },
  {
    title: '多边形节点 PolygonNode',
    url: 'https://img.js.design/assets/docs/plugin/api/node/PolygonNode2022-11-28%2019-28-34.md',
    path: '插件 API/API 指南/节点相关/多边形节点 PolygonNode.md',
  },
  {
    title: '星形节点 StarNode',
    url: 'https://img.js.design/assets/docs/plugin/api/node/StarNode2022-11-28%2019-28-34.md',
    path: '插件 API/API 指南/节点相关/星形节点 StarNode.md',
  },
  {
    title: '文本节点 TextNode',
    url: 'https://img.js.design/assets/docs/plugin/api/node/TextNode2023-10-11%2016-47-36.md',
    path: '插件 API/API 指南/节点相关/文本节点 TextNode.md',
  },
  {
    title: '切片节点 SliceNode',
    url: 'https://img.js.design/assets/docs/plugin/api/node/SliceNode2022-11-28%2019-28-34.md',
    path: '插件 API/API 指南/节点相关/切片节点 SliceNode.md',
  },
  {
    title: '矢量节点 VectorNode',
    url: 'https://img.js.design/assets/docs/plugin/api/node/VectorNode2022-11-28%2019-28-35.md',
    path: '插件 API/API 指南/节点相关/矢量节点 VectorNode.md',
  },
  {
    title: '布尔运算节点 BooleanOperationNode',
    url: 'https://img.js.design/assets/docs/plugin/api/node/BooleanOperationNode2022-11-28%2019-28-35.md',
    path: '插件 API/API 指南/节点相关/布尔运算节点 BooleanOperationNode.md',
  },
  {
    title: '引用组件节点 ComponentNode',
    url: 'https://img.js.design/assets/docs/plugin/api/node/ComponentNode2023-04-14%2015-16-21.md',
    path: '插件 API/API 指南/节点相关/引用组件节点 ComponentNode.md',
  },
  {
    title: '实例组件节点 InstanceNode',
    url: 'https://img.js.design/assets/docs/plugin/api/node/InstanceNode2022-11-28%2019-28-35.md',
    path: '插件 API/API 指南/节点相关/实例组件节点 InstanceNode.md',
  },
  {
    title: '变体节点 ComponentSetNode',
    url: 'https://img.js.design/assets/docs/plugin/api/node/ComponentSetNode2022-11-28%2019-28-35.md',
    path: '插件 API/API 指南/节点相关/变体节点 ComponentSetNode.md',
  },
  {
    title: '基础样式',
    url: 'https://img.js.design/assets/docs/plugin/api/style/BaseStyle2022-11-28%2019-28-36.md',
    path: '插件 API/API 指南/样式相关/基础样式.md',
  },
  {
    title: '填充 Paint',
    url: 'https://img.js.design/assets/docs/plugin/api/style/Paint2022-11-28%2019-28-36.md',
    path: '插件 API/API 指南/样式相关/填充 Paint.md',
  },
  {
    title: '填充样式 PaintStyle',
    url: 'https://img.js.design/assets/docs/plugin/api/style/PaintStyle2022-11-28%2019-28-36.md',
    path: '插件 API/API 指南/样式相关/填充样式 PaintStyle.md',
  },
  {
    title: '图片 Image',
    url: 'https://img.js.design/assets/docs/plugin/api/style/Image2023-08-22%2010-09-32.md',
    path: '插件 API/API 指南/样式相关/图片 Image.md',
  },
  {
    title: '特效 Effect',
    url: 'https://img.js.design/assets/docs/plugin/api/style/Effect2022-11-28%2019-28-37.md',
    path: '插件 API/API 指南/样式相关/特效 Effect.md',
  },
  {
    title: '特效样式 EffectStyle',
    url: 'https://img.js.design/assets/docs/plugin/api/style/EffectStyle2022-11-28%2019-28-37.md',
    path: '插件 API/API 指南/样式相关/特效样式 EffectStyle.md',
  },
  {
    title: '网格布局 LayoutGrid',
    url: 'https://img.js.design/assets/docs/plugin/api/style/LayoutGrid2022-11-28%2019-28-37.md',
    path: '插件 API/API 指南/样式相关/网格布局 LayoutGrid.md',
  },
  {
    title: '网格布局样式 GridStyle',
    url: 'https://img.js.design/assets/docs/plugin/api/style/GridStyle2022-11-28%2019-28-37.md',
    path: '插件 API/API 指南/样式相关/网格布局样式 GridStyle.md',
  },
  {
    title: '文本样式 TextStyle',
    url: 'https://img.js.design/assets/docs/plugin/api/style/TextStyle2022-11-28%2019-28-37.md',
    path: '插件 API/API 指南/样式相关/文本样式 TextStyle.md',
  },
  {
    title: '设置样式的文本段 StyledTextSegment',
    url: 'https://img.js.design/assets/docs/plugin/api/style/StyledTextSegment2022-11-28%2019-28-37.md',
    path: '插件 API/API 指南/样式相关/设置样式的文本段 StyledTextSegment.md',
  },
  {
    title: '文本子层 TextSublayer',
    url: 'https://img.js.design/assets/docs/plugin/api/style/TextSublayer2022-11-28%2019-28-38.md',
    path: '插件 API/API 指南/样式相关/文本子层 TextSublayer.md',
  },
  {
    title: '用户 User',
    url: 'https://img.js.design/assets/docs/plugin/api/other/User2022-11-28%2019-28-38.md',
    path: '插件 API/API 指南/其他/用户 User.md',
  },
  {
    title: '矢量路径 VectorPath',
    url: 'https://img.js.design/assets/docs/plugin/api/other/VectorPath2022-11-28%2019-28-39.md',
    path: '插件 API/API 指南/其他/矢量路径 VectorPath.md',
  },
  {
    title: '矢量网格 VectorNetwork',
    url: 'https://img.js.design/assets/docs/plugin/api/other/VectorNetwork2022-11-28%2019-28-39.md',
    path: '插件 API/API 指南/其他/矢量网格 VectorNetwork.md',
  },
  {
    title: '曲线控制 HandleMirroring',
    url: 'https://img.js.design/assets/docs/plugin/api/other/HandleMirroring2022-11-28%2019-28-39.md',
    path: '插件 API/API 指南/其他/曲线控制 HandleMirroring.md',
  },
  {
    title: '混合模式 BlendMode',
    url: 'https://img.js.design/assets/docs/plugin/api/other/BlendMode2022-11-28%2019-28-39.md',
    path: '插件 API/API 指南/其他/混合模式 BlendMode.md',
  },
  {
    title: '字体名称 FontName',
    url: 'https://img.js.design/assets/docs/plugin/api/other/FontName2022-11-28%2019-28-39.md',
    path: '插件 API/API 指南/其他/字体名称 FontName.md',
  },
  {
    title: '字间距 LetterSpacing',
    url: 'https://img.js.design/assets/docs/plugin/api/other/LetterSpacing2022-11-28%2019-28-40.md',
    path: '插件 API/API 指南/其他/字间距 LetterSpacing.md',
  },
  {
    title: '行高 LineHeight',
    url: 'https://img.js.design/assets/docs/plugin/api/other/LineHeight2022-11-28%2019-28-40.md',
    path: '插件 API/API 指南/其他/行高 LineHeight.md',
  },
  {
    title: '文本格式 TextCase',
    url: 'https://img.js.design/assets/docs/plugin/api/other/TextCase2022-11-28%2019-28-40.md',
    path: '插件 API/API 指南/其他/文本格式 TextCase.md',
  },
  {
    title: '文本装饰 TextDecoration',
    url: 'https://img.js.design/assets/docs/plugin/api/other/TextDecoration2022-11-28%2019-28-40.md',
    path: '插件 API/API 指南/其他/文本装饰 TextDecoration.md',
  },
  {
    title: '超链接 HyperlinkTarget',
    url: 'https://img.js.design/assets/docs/plugin/api/other/HyperlinkTarget2022-11-28%2019-28-40.md',
    path: '插件 API/API 指南/其他/超链接 HyperlinkTarget.md',
  },
  {
    title: '响应式调整 Constraints',
    url: 'https://img.js.design/assets/docs/plugin/api/other/Constraints2022-11-28%2019-28-40.md',
    path: '插件 API/API 指南/其他/响应式调整 Constraints.md',
  },
  {
    title: '辅助线 Guide',
    url: 'https://img.js.design/assets/docs/plugin/api/other/Guide2022-11-28%2019-28-41.md',
    path: '插件 API/API 指南/其他/辅助线 Guide.md',
  },
  {
    title: '描边端点 StrokeCap',
    url: 'https://img.js.design/assets/docs/plugin/api/other/StrokeCap2022-11-28%2019-28-41.md',
    path: '插件 API/API 指南/其他/描边端点 StrokeCap.md',
  },
  {
    title: '描边顶点 StrokeJoin',
    url: 'https://img.js.design/assets/docs/plugin/api/other/StrokeJoin2022-11-28%2019-28-41.md',
    path: '插件 API/API 指南/其他/描边顶点 StrokeJoin.md',
  },
  {
    title: 'RGB/RGBA',
    url: 'https://img.js.design/assets/docs/plugin/api/other/RGB2022-11-28%2019-28-41.md',
    path: '插件 API/API 指南/其他/RGB_RGBA.md',
  },
  {
    title: '原型交互 - 触发 Trigger',
    url: 'https://img.js.design/assets/docs/plugin/api/other/Trigger2022-11-28%2019-28-41.md',
    path: '插件 API/API 指南/其他/原型交互 - 触发 Trigger.md',
  },
  {
    title: '原型动作 Action',
    url: 'https://img.js.design/assets/docs/plugin/api/other/Action2022-11-28%2019-28-41.md',
    path: '插件 API/API 指南/其他/原型动作 Action.md',
  },
  {
    title: '原型交互 Reaction',
    url: 'https://img.js.design/assets/docs/plugin/api/other/Reaction2022-11-28%2019-28-42.md',
    path: '插件 API/API 指南/其他/原型交互 Reaction.md',
  },
  {
    title: '原型交互 - 过渡 Transition',
    url: 'https://img.js.design/assets/docs/plugin/api/other/Transition2022-11-28%2019-28-42.md',
    path: '插件 API/API 指南/其他/原型交互 - 过渡 Transition.md',
  },
  {
    title: '弹层 Overlay',
    url: 'https://img.js.design/assets/docs/plugin/api/other/Overlay2022-11-28%2019-28-42.md',
    path: '插件 API/API 指南/其他/弹层 Overlay.md',
  },
  {
    title: '溢出滚动 OverflowDirection',
    url: 'https://img.js.design/assets/docs/plugin/api/other/OverflowDirection2022-11-28%2019-28-42.md',
    path: '插件 API/API 指南/其他/溢出滚动 OverflowDirection.md',
  },
  {
    title: '导出设置 ExportSettings',
    url: 'https://img.js.design/assets/docs/plugin/api/other/ExportSettings2022-11-28%2019-28-42.md',
    path: '插件 API/API 指南/其他/导出设置 ExportSettings.md',
  },
  {
    title: '小组件 API 简介',
    url: 'https://img.js.design/assets/docs/widget/guide/start/Intro2022-11-28%2019-28-01.md',
    path: '小组件 API/开发者文档/开始使用/小组件 API 简介.md',
  },
  {
    title: '基础介绍',
    url: 'https://img.js.design/assets/docs/widget/guide/development/Intro2022-11-28%2019-28-29.md',
    path: '小组件 API/开发者文档/开发指南/基础介绍.md',
  },
  {
    title: '小组件 UI 及交互',
    url: 'https://img.js.design/assets/docs/widget/guide/development/UI2022-11-28%2019-28-29.md',
    path: '小组件 API/开发者文档/开发指南/小组件 UI 及交互.md',
  },
  {
    title: '小组件状态与多人操作',
    url: 'https://img.js.design/assets/docs/widget/guide/development/State-and-Multiplayer2022-11-28%2019-28-29.md',
    path: '小组件 API/开发者文档/开发指南/小组件状态与多人操作.md',
  },
  {
    title: '使用插件 API',
    url: 'https://img.js.design/assets/docs/widget/guide/development/Use-PluginAPI2022-11-28%2019-28-30.md',
    path: '小组件 API/开发者文档/开发指南/使用插件 API.md',
  },
  {
    title: '处理用户事件',
    url: 'https://img.js.design/assets/docs/widget/guide/development/Handling-User-Events2022-11-28%2019-28-30.md',
    path: '小组件 API/开发者文档/开发指南/处理用户事件.md',
  },
  {
    title: '文本编辑',
    url: 'https://img.js.design/assets/docs/widget/guide/development/TextEdit2022-11-28%2019-28-30.md',
    path: '小组件 API/开发者文档/开发指南/文本编辑.md',
  },
  {
    title: '添加悬停状态',
    url: 'https://img.js.design/assets/docs/widget/guide/development/Hover2022-11-28%2019-28-30.md',
    path: '小组件 API/开发者文档/开发指南/添加悬停状态.md',
  },
  {
    title: '发送网络请求',
    url: 'https://img.js.design/assets/docs/widget/guide/development/NetworkRequests2022-11-28%2019-28-30.md',
    path: '小组件 API/开发者文档/开发指南/发送网络请求.md',
  },
  {
    title: '使用列表',
    url: 'https://img.js.design/assets/docs/widget/guide/development/List2022-11-28%2019-28-31.md',
    path: '小组件 API/开发者文档/开发指南/使用列表.md',
  },
  {
    title: '小组件中的图片',
    url: 'https://img.js.design/assets/docs/widget/guide/development/Images2022-11-28%2019-28-31.md',
    path: '小组件 API/开发者文档/开发指南/小组件中的图片.md',
  },
  {
    title: '管理多个小组件',
    url: 'https://img.js.design/assets/docs/widget/guide/development/Managing-Multiple-Widgets2022-11-28%2019-28-31.md',
    path: '小组件 API/开发者文档/开发指南/管理多个小组件.md',
  },
  {
    title: '小组件的撤销和重做',
    url: 'https://img.js.design/assets/docs/widget/guide/development/Undo-and-Redo2022-11-30%2019-19-28.md',
    path: '小组件 API/开发者文档/开发指南/小组件的撤销和重做.md',
  },
  {
    title: '小组件 API 概述',
    url: 'https://img.js.design/assets/docs/widget/api/reference/intro2022-11-28%2019-28-31.md',
    path: '小组件 API/API 指南/基础介绍/小组件 API 概述.md',
  },
  {
    title: '小组件开发工具',
    url: 'https://img.js.design/assets/docs/widget/api/reference/Typings2022-11-28%2019-28-33.md',
    path: '小组件 API/API 指南/基础介绍/小组件开发工具.md',
  },
  {
    title: '小组件 manifest',
    url: 'https://img.js.design/assets/docs/widget/api/reference/manifest2022-11-28%2019-28-33.md',
    path: '小组件 API/API 指南/基础介绍/小组件 manifest.md',
  },
  {
    title: 'jsDesign.widget',
    url: 'https://img.js.design/assets/docs/widget/api/reference/jsDesign.widget2022-11-28%2019-28-33.md',
    path: '小组件 API/API 指南/基础介绍/jsDesign.widget.md',
  },
  {
    title: 'register',
    url: 'https://img.js.design/assets/docs/widget/api/reference/register2022-11-28%2019-28-33.md',
    path: '小组件 API/API 指南/基础介绍/register.md',
  },
  {
    title: 'useWidgetId',
    url: 'https://img.js.design/assets/docs/widget/api/reference/useWidgetId2022-11-28%2019-28-34.md',
    path: '小组件 API/API 指南/基础介绍/useWidgetId.md',
  },
  {
    title: 'useSyncedState',
    url: 'https://img.js.design/assets/docs/widget/api/reference/useSyncedState2022-11-28%2019-28-34.md',
    path: '小组件 API/API 指南/基础介绍/useSyncedState.md',
  },
  {
    title: 'useSyncedMap',
    url: 'https://img.js.design/assets/docs/widget/api/reference/useSyncedMap2022-11-28%2019-28-34.md',
    path: '小组件 API/API 指南/基础介绍/useSyncedMap.md',
  },
  {
    title: 'usePropertyMenu',
    url: 'https://img.js.design/assets/docs/widget/api/reference/usePropertyMenu2022-11-28%2019-28-34.md',
    path: '小组件 API/API 指南/基础介绍/usePropertyMenu.md',
  },
  {
    title: 'useEffect',
    url: 'https://img.js.design/assets/docs/widget/api/reference/useEffect2022-11-28%2019-28-34.md',
    path: '小组件 API/API 指南/基础介绍/useEffect.md',
  },
  {
    title: 'waitForTask',
    url: 'https://img.js.design/assets/docs/widget/api/reference/waitForTask2022-11-28%2019-28-35.md',
    path: '小组件 API/API 指南/基础介绍/waitForTask.md',
  },
  {
    title: '自动布局 <AutoLayout />',
    url: 'https://img.js.design/assets/docs/widget/api/component/AutoLayout2022-11-28%2019-28-35.md',
    path: '小组件 API/API 指南/组件类型/自动布局 AutoLayout.md',
  },
  {
    title: '画板 <Frame />',
    url: 'https://img.js.design/assets/docs/widget/api/component/Frame2022-11-28%2019-28-36.md',
    path: '小组件 API/API 指南/组件类型/画板 Frame.md',
  },
  {
    title: '文本 <Text />',
    url: 'https://img.js.design/assets/docs/widget/api/component/Text2022-11-28%2019-28-36.md',
    path: '小组件 API/API 指南/组件类型/文本 Text.md',
  },
  {
    title: '矩形 <Rectangle />',
    url: 'https://img.js.design/assets/docs/widget/api/component/Rectangle2022-11-28%2019-28-36.md',
    path: '小组件 API/API 指南/组件类型/矩形 Rectangle.md',
  },
  {
    title: '图片 <Image />',
    url: 'https://img.js.design/assets/docs/widget/api/component/Image2022-11-28%2019-28-36.md',
    path: '小组件 API/API 指南/组件类型/图片 Image.md',
  },
  {
    title: '椭圆 <Ellipse />',
    url: 'https://img.js.design/assets/docs/widget/api/component/Ellipse2022-11-28%2019-28-37.md',
    path: '小组件 API/API 指南/组件类型/椭圆 Ellipse.md',
  },
  {
    title: '线段 <Line />',
    url: 'https://img.js.design/assets/docs/widget/api/component/Line2022-11-28%2019-28-37.md',
    path: '小组件 API/API 指南/组件类型/线段 Line.md',
  },
  {
    title: '<SVG />',
    url: 'https://img.js.design/assets/docs/widget/api/component/SVG2022-11-28%2019-28-37.md',
    path: '小组件 API/API 指南/组件类型/SVG.md',
  },
  {
    title: '输入 <Input />',
    url: 'https://img.js.design/assets/docs/widget/api/component/Input2022-11-28%2019-28-37.md',
    path: '小组件 API/API 指南/组件类型/输入 Input.md',
  },
  {
    title: '<Fragment />',
    url: 'https://img.js.design/assets/docs/widget/api/component/Fragment2022-11-28%2019-28-37.md',
    path: '小组件 API/API 指南/组件类型/Fragment.md',
  },
  {
    title: '<Span />',
    url: 'https://img.js.design/assets/docs/widget/api/component/Span2022-11-28%2019-28-37.md',
    path: '小组件 API/API 指南/组件类型/Span.md',
  },
  {
    title: '对齐方式 AlignItems',
    url: 'https://img.js.design/assets/docs/widget/api/property/AlignItems2022-11-28%2019-28-38.md',
    path: '小组件 API/API 指南/属性相关/对齐方式 AlignItems.md',
  },
  {
    title: '圆弧 ArcData',
    url: 'https://img.js.design/assets/docs/widget/api/property/ArcData2022-11-28%2019-28-38.md',
    path: '小组件 API/API 指南/属性相关/圆弧 ArcData.md',
  },
  {
    title: '混合模式 BlendMode',
    url: 'https://img.js.design/assets/docs/widget/api/property/BlendMode2022-11-28%2019-28-38.md',
    path: '小组件 API/API 指南/属性相关/混合模式 BlendMode.md',
  },
  {
    title: '颜色 Color',
    url: 'https://img.js.design/assets/docs/widget/api/property/Color2022-11-28%2019-28-39.md',
    path: '小组件 API/API 指南/属性相关/颜色 Color.md',
  },
  {
    title: '约束 Constraint',
    url: 'https://img.js.design/assets/docs/widget/api/property/Constraint2022-11-28%2019-28-39.md',
    path: '小组件 API/API 指南/属性相关/约束 Constraint.md',
  },
  {
    title: '圆角 CornerRadius',
    url: 'https://img.js.design/assets/docs/widget/api/property/CornerRadius2022-11-28%2019-28-39.md',
    path: '小组件 API/API 指南/属性相关/圆角 CornerRadius.md',
  },
  {
    title: '特效 Effect',
    url: 'https://img.js.design/assets/docs/widget/api/property/Effect2022-11-28%2019-28-39.md',
    path: '小组件 API/API 指南/属性相关/特效 Effect.md',
  },
  {
    title: '字重 FontWeight',
    url: 'https://img.js.design/assets/docs/widget/api/property/FontWeight2022-11-28%2019-28-39.md',
    path: '小组件 API/API 指南/属性相关/字重 FontWeight.md',
  },
  {
    title: '悬停样式 HoverStyle',
    url: 'https://img.js.design/assets/docs/widget/api/property/HoverStyle2022-11-28%2019-28-39.md',
    path: '小组件 API/API 指南/属性相关/悬停样式 HoverStyle.md',
  },
  {
    title: '边距 Padding',
    url: 'https://img.js.design/assets/docs/widget/api/property/Padding2022-11-28%2019-28-40.md',
    path: '小组件 API/API 指南/属性相关/边距 Padding.md',
  },
  {
    title: '填充 Paint',
    url: 'https://img.js.design/assets/docs/widget/api/property/Paint2022-11-28%2019-28-40.md',
    path: '小组件 API/API 指南/属性相关/填充 Paint.md',
  },
  {
    title: '属性菜单 PropertyMenu',
    url: 'https://img.js.design/assets/docs/widget/api/property/PropertyMenu2022-11-28%2019-28-40.md',
    path: '小组件 API/API 指南/属性相关/属性菜单 PropertyMenu.md',
  },
  {
    title: '尺寸 Size',
    url: 'https://img.js.design/assets/docs/widget/api/property/Size2022-11-28%2019-28-40.md',
    path: '小组件 API/API 指南/属性相关/尺寸 Size.md',
  },
  {
    title: '描边端点 StrokeCap',
    url: 'https://img.js.design/assets/docs/widget/api/property/StrokeCap2022-11-28%2019-28-40.md',
    path: '小组件 API/API 指南/属性相关/描边端点 StrokeCap.md',
  },
  {
    title: '同步映射 SyncedMap',
    url: 'https://img.js.design/assets/docs/widget/api/property/SyncedMap2022-11-28%2019-28-41.md',
    path: '小组件 API/API 指南/属性相关/同步映射 SyncedMap.md',
  },
  {
    title: '变换 Transform',
    url: 'https://img.js.design/assets/docs/widget/api/property/Transform2022-11-28%2019-28-41.md',
    path: '小组件 API/API 指南/属性相关/变换 Transform.md',
  },
  {
    title: '点击事件 WidgetClickEvent',
    url: 'https://img.js.design/assets/docs/widget/api/property/WidgetClickEvent2022-11-28%2019-28-41.md',
    path: '小组件 API/API 指南/属性相关/点击事件 WidgetClickEvent.md',
  },
] as const satisfies readonly OfficialDocEntry[]
