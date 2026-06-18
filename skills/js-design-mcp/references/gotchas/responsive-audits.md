# Responsive Audit Gotchas

- Full-tree audits belong here, not in the general auto-layout notes. Use them after creating or repairing responsive pages, especially when screenshots reveal one clipped or fixed-size example.
- Classify nodes before mutating them. Root artboards, icon wells, chart holders, grow spacers, and horizontal fill rows often need one fixed axis; ordinary cards, content stacks, and long text boxes are more suspicious.
- Audit for repeated patterns, not just selected nodes: 100x100 frames with children, child bounds outside parent bounds, long fixed text, `/ grow` nodes with `layoutGrow = 0`, and icon children larger than their wells.

## Code snippets

Conservative repair for JSX `AutoLayout` frames that materialize as clipped `100x100` nodes. Run after creation, then export and inspect the result.

```js
const root = jsDesign.getNodeById(rootId)
const hugWidthPrefixes = ['Badge /', 'Button /', 'Brand', 'CTA checks']
const fixedPrefixes = ['Icon well /']

function childBounds(node) {
  if (!node.children || node.children.length === 0) return null
  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity
  for (const child of node.children) {
    minX = Math.min(minX, child.x)
    minY = Math.min(minY, child.y)
    maxX = Math.max(maxX, child.x + child.width)
    maxY = Math.max(maxY, child.y + child.height)
  }
  return { minX, minY, maxX, maxY }
}

function walk(node, visit) {
  if (!node || node.type !== 'FRAME' || !node.children) return
  for (const child of node.children) walk(child, visit)
  visit(node)
}

walk(root, (node) => {
  if (node.layoutMode === 'NONE') return

  if (fixedPrefixes.some((prefix) => node.name.startsWith(prefix))) {
    node.primaryAxisSizingMode = 'FIXED'
    node.counterAxisSizingMode = 'FIXED'
    node.resizeWithoutConstraints(44, 44)
    return
  }

  const bounds = childBounds(node)
  if (!bounds) return

  const hugWidth = hugWidthPrefixes.some((prefix) => node.name.startsWith(prefix))
  if (hugWidth && node.layoutMode === 'HORIZONTAL') node.primaryAxisSizingMode = 'AUTO'
  if (node.layoutMode === 'VERTICAL') node.primaryAxisSizingMode = 'AUTO'

  const targetWidth = hugWidth ? Math.max(node.width, bounds.maxX + (node.paddingRight || 0)) : node.width
  const targetHeight = Math.max(node.height, bounds.maxY + (node.paddingBottom || 0))
  if (targetWidth !== node.width || targetHeight !== node.height) {
    node.resizeWithoutConstraints(targetWidth, targetHeight)
  }
})
```

Pure PluginAPI full-tree audit for fixed-size leftovers. Use this after a pure JS build or repair pass; inspect `suspicious` before mutating, because some fixed axes are intentional.

```js
const root = jsDesign.getNodeById(rootId)

function safe(node, key) {
  try {
    return node[key]
  } catch (error) {
    return `READ_ERROR: ${key}: ${error && error.message}`
  }
}

function pathOf(node) {
  const parts = []
  let current = node
  while (current && current !== root) {
    parts.unshift(current.name)
    current = current.parent
  }
  return parts.join(' > ')
}

function classify(node) {
  const name = String(safe(node, 'name'))
  if (node === root) return 'root-artboard'
  if (name.startsWith('Icon well /') || name.startsWith('Icon /')) return 'icon-fixed-ok'
  if (name === 'Chart bars' || name === 'Bar holder' || name === 'Bar') return 'chart-fixed-ok'
  if (name.includes('spacer / grow')) return 'spacer-grow-ok'
  if (/^(Nav \/|Hero grid \/|Lower content \/|CTA strip \/|.* row|Queue item \/|Rail header)/.test(name)) {
    return 'row-width-fixed-height-auto-ok'
  }
  return 'content-or-control'
}

const suspicious = []
function walk(node) {
  if (safe(node, 'type') === 'FRAME') {
    const item = {
      id: node.id,
      name: node.name,
      path: pathOf(node),
      category: classify(node),
      width: node.width,
      height: node.height,
      primary: safe(node, 'primaryAxisSizingMode'),
      counter: safe(node, 'counterAxisSizingMode'),
      layoutGrow: safe(node, 'layoutGrow'),
    }
    if (item.category === 'content-or-control' && ((item.name.includes('/ grow') && item.layoutGrow === 0) || (item.primary === 'FIXED' && item.counter === 'FIXED'))) {
      suspicious.push(item)
    }
  }
  const children = safe(node, 'children')
  if (children && !String(children).startsWith('READ_ERROR')) {
    for (const child of children) walk(child)
  }
}

walk(root)
return { suspicious }
```
