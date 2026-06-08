# js-design-mcp-skill

这是一个面向 Agent 的即时设计（JiShi Design / JS Design）MCP 使用技能。

它重点解决三件事：

- 使用 `@jiujiang/jishi-mcp-server` 控制即时设计时，如何安全地调用 `execute_script`。
- 如何区分 MCP 工具返回包装、脚本返回值和即时设计 `jsDesign` PluginAPI 对象。
- 如何在本地快速检索已抓取的官方插件 API 文档，减少打开大文件和重复查证。

## 目录

- `skills/js-design-mcp/SKILL.md`：技能入口，尽量保持短小，供 agent 加载后直接执行。
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

## 验证

格式化：

```powershell
npm run format
```

常用完整性检查：

```powershell
node -e "const fs=require('fs');const p='skills/js-design-mcp/references/official-plugin-docs/index.json';console.log(JSON.parse(fs.readFileSync(p,'utf8')).length)"
```

当前官方文档数量应为 70 条。
