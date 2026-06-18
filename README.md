# js-design-mcp-skill

面向 Agent 的即时设计（JiShi Design / JS Design）MCP 使用技能。安装后，Agent 在控制即时设计、编写 `execute_script`、查询插件和小组件 API 文档时，会优先按这个技能里的规则来做，减少脚本返回异常、原始节点序列化失败、API 文档找不到等问题。

## 适合谁使用

- 想让 Codex / Agent 通过 MCP 操作即时设计文件的用户。
- 需要在即时设计里读取页面、选区、节点结构，或批量创建/修改图层的用户。
- 希望 Agent 能离线快速检索即时设计官方插件和小组件 API 文档的用户。

## 快速安装

安装这个 Skill：

```bash
npx skills add lgc2333/js-design-mcp-skill
```

然后安装以下插件，安装和连接方式请参考下面的插件页说明：

[九匠即时 MCP](https://js.design/community?category=detail&type=plugin&id=6974f39f0aebe8c71f2bb18c)

## 它能帮 Agent 做什么

- 安全使用 `@jiujiang/jishi-mcp-server` 的 `execute_script`。
- 区分 MCP 工具返回包装、脚本返回值、即时设计 `jsDesign` PluginAPI 对象。
- 避免返回 raw node、`undefined`、循环对象等不适合 JSON 序列化的数据。
- 用统一的 `{ ok: true, ... }` / `{ ok: false, name, message }` 结构表达脚本执行结果。
- 在本地快速检索已整理的即时设计官方插件和小组件 API 文档。
- 查询官方 typings，确认准确字段、类型、联合值和方法签名。

## 推荐使用方式

连接插件后，可以这样要求 Agent：

```text
使用 js-design-mcp skill，读取当前即时设计页面的顶层节点。
```

或者：

```text
使用 js-design-mcp skill，在当前页面创建一个 320x180 的卡片组件。
```

这个 Skill 会提醒 Agent 先检查连接，再用 `get_page_nodes`、`get_selection`、`get_node_children` 做发现；需要自定义读写时，再用带 `try/catch` 的 `execute_script`。

## 目录说明

- `skills/js-design-mcp/SKILL.md`：技能入口，保持短小，只放 MCP 使用规则和 reference 路由。
- `skills/js-design-mcp/references/docs-overview.md`：官方 Markdown docs 与 typings 的 AI 索引入口。
- `skills/js-design-mcp/references/gotchas.md`：MCP、节点创建、自动布局、文字、导出等实操坑点。
- `skills/js-design-mcp/references/docs-crawl-notes.md`：官方 docs/typings 抓取、刷新、提升到 reference 的维护说明。
- `skills/js-design-mcp/references/official-docs/`：按官方侧边栏整理的 122 篇 Markdown 文档，含 70 篇插件 API 与 52 篇小组件 API。
- `skills/js-design-mcp/references/official-typings/`：官方 npm typings，含 Plugin API 与 Widget API declaration files。

## 维护与验证

- `pnpm run crawl:docs`：从静态 URL 清单抓取官方 Markdown docs，默认写入 `temp/official-docs/`。
- `pnpm run crawl:typings`：从官方 npm typings 包抓取 `.d.ts`，需要 `7z`，默认写入 `temp/official-typings/`。
- `pnpm run check`：TypeScript type check。
- `pnpm run test`：crawler 单元测试。
- `pnpm run format`：Prettier 格式化。

刷新 docs 或 typings 后，确认输出无误，再把生成结果提升到 `skills/js-design-mcp/references/` 下对应目录。
