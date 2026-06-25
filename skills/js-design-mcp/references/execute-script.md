# execute_script Reference

Read this before calling `execute_script`.

## Purpose

Use `execute_script` only for custom queries, batch edits, canvas creation, or operations not covered by dedicated MCP tools. It runs JavaScript in the JiShi Design plugin context with `jsDesign` and `console` in scope.

The `code` string is a function body. It may use `await` and must `return` a result.

## Result Contract

Keep three layers separate:

- MCP wrapper: usually `content[0].text = JSON.stringify(result, null, 2)`.
- Script return value: your JSON-safe object.
- PluginAPI objects: JiShi node objects, styles, pages, and other live objects.

Always wrap scripts:

```js
try {
  return {
    ok: true,
    pageName: jsDesign.currentPage.name,
    nodes: jsDesign.currentPage.children.map((node) => ({
      id: node.id,
      name: node.name,
      type: node.type,
      width: node.width,
      height: node.height,
    })),
  }
} catch (error) {
  return {
    ok: false,
    name: error && error.name,
    message: error && error.message,
    stack: error && error.stack,
  }
}
```

Return only JSON-safe values: strings, numbers, booleans, null, arrays, and plain objects.

Do not return raw nodes, functions, symbols, BigInt, Date, cyclic objects, `undefined`, or no-return scripts. `console.log` is not returned to the caller.

## Size Rule

JS DESIGN API IS REALLYYYYYY BUGGY! You MUST keep calls small and focused. Split discovery, structure, content, assets, styling, and verification into separate calls. Large scripts are harder to debug and more likely to time out or disconnect.

## Canvas Creation

For fresh designs, ask user first if we should use auto layout and responsive adjustments. If user to let you choose, use them.

Prefer `jsDesign.createNodeFromJSXAsync` with `jsDesign.widget.h` for visible node trees. It creates normal `SceneNode` trees quickly and avoids most incremental `appendChild` layout churn.

Use a single concrete root such as `AutoLayout`, `Frame`, `Image`, `Rectangle`, `Ellipse`, `Text`, `SVG`, `Input`, or `Line`. Avoid multi-root `Fragment`; `Span` is for text children.

In MCP scripts, use `jsDesign.widget.h(...)`, not JSX literals.

```js
try {
  const { h, AutoLayout, Text } = jsDesign.widget
  const el = h(
    AutoLayout,
    {
      name: 'Card',
      direction: 'vertical',
      spacing: 8,
      padding: 16,
      width: 320,
      fill: '#FFFFFF',
    },
    h(Text, { fontSize: 20, fontWeight: 700, fill: '#111827' }, 'Title'),
    h(Text, { width: 'fill-parent', fill: '#6B7280' }, 'Body copy'),
  )
  const node = await jsDesign.createNodeFromJSXAsync(el)
  node.x = 80
  node.y = 80
  return {
    ok: true,
    id: node.id,
    name: node.name,
    type: node.type,
    width: node.width,
    height: node.height,
  }
} catch (error) {
  return {
    ok: false,
    name: error && error.name,
    message: error && error.message,
    stack: error && error.stack,
  }
}
```

Created nodes are parented to `jsDesign.currentPage`; append to another parent after creation if needed.

Use imperative creation only for small edits, unsupported node types, post-processing, or mutations of existing nodes.

## Auto Layout Rules

- Avoid many absolute `x`/`y` placements. Define responsive structure first, then content and decoration.
- Use `node.constraints` for responsive behavior such as floating actions; read constraints back after setting them.
- Use fixed positioning only for root placement, intentional overlays, unsupported assets, or small post-processing fixes.

## Verification

After visible layout, text, style, export, or asset mutation, export the affected node/frame and inspect the image. JSON reads can confirm fields, but rendered output can still clip text, recalculate layout, or export blank assets.

## Reference Routing

- Need exact widget props: read `references/official-typings/widget/index.d.ts` and the relevant file under `references/official-docs/小组件 API/API 指南/组件类型/`.
- Need PluginAPI fields: read `references/official-typings/plugin/plugin-api.d.ts`.
- Need known pitfalls: read the relevant file under `references/gotchas/`.
