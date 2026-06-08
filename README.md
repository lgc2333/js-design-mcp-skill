# js-design-mcp-skill

面向 Agent 的即时设计（JiShi Design / JS Design）MCP 使用技能。安装后，Agent 在控制即时设计、编写 `execute_script`、查询插件 API 文档时，会优先按这个技能里的规则来做，减少脚本返回异常、原始节点序列化失败、API 文档找不到等问题。

## 适合谁使用

- 想让 Codex / Agent 通过 MCP 操作即时设计文件的用户。
- 需要在即时设计里读取页面、选区、节点结构，或批量创建/修改图层的用户。
- 希望 Agent 能离线快速检索即时设计官方插件 API 文档的用户。

## 快速安装

安装这个 Skill：

```bash
npx skills add lgc2333/js-design-mcp-skill
```

然后在即时设计中安装并打开 MCP 插件：

[即时设计 MCP 插件](https://js.design/community?category=detail&type=plugin&id=6974f39f0aebe8c71f2bb18c)

MCP 插件的安装和连接方式请参考插件页说明。

## 它能帮 Agent 做什么

- 安全使用 `@jiujiang/jishi-mcp-server` 的 `execute_script`。
- 区分 MCP 工具返回包装、脚本返回值、即时设计 `jsDesign` PluginAPI 对象。
- 避免返回 raw node、`undefined`、循环对象等不适合 JSON 序列化的数据。
- 用统一的 `{ ok: true, ... }` / `{ ok: false, name, message }` 结构表达脚本执行结果。
- 在本地快速检索已整理的即时设计官方插件 API 文档。

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

- `skills/js-design-mcp/SKILL.md`：技能入口，保持短小，供 Agent 加载后直接执行。
- `skills/js-design-mcp/references/crawl-notes.md`：官方文档抓取入口、坑点和补全记录。
- `skills/js-design-mcp/references/official-plugin-docs/`：已整理的官方插件文档。
- `skills/js-design-mcp/tests/pressure-scenarios.md`：按 writing-skills/TDD 方式记录的压力场景和红绿测试结果。

## 官方文档索引

官方文档整理在 `skills/js-design-mcp/references/official-plugin-docs/`。

- `README.md`：AI 友好的短上下文入口。
- `index.json`：机器可检索的全量元数据索引。
- `_indexes/`：按 API/Guide 分类的短索引。
- `api/` 和 `guide/`：按站点 URL 形状展平后的正文文档。

`index.json` 已在官方文档根 README 里写明字段类型。Agent 需要精确找文档时可以检索 JSON，但不要为了确认 schema 打开它；只有需要阅读全文时再打开对应 `localPath`。

## 使用要点

- 调用 `execute_script` 前先用 `list_plugin_clients` 确认即时设计插件已连接。
- 每个 `execute_script` 脚本体都必须包 `try/catch`。
- 成功返回 `{ ok: true, ... }`，失败返回 `{ ok: false, name, message }`。
- 不要返回 raw node；手动投影成 JSON-safe 字段。
- 非 `execute_script` 工具的返回结构以当次 MCP text payload 为准，不要猜统一的 `{ success, data }`。

## 维护与验证

格式化：

```powershell
npm run format
```

常用完整性检查：

```powershell
node -e "const fs=require('fs');const p='skills/js-design-mcp/references/official-plugin-docs/index.json';console.log(JSON.parse(fs.readFileSync(p,'utf8')).length)"
```

当前官方文档数量应为 70 条。
