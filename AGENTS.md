# AGENTS.md

## Commands

```bash
pnpm run format  # Prettier
pnpm run check  # Type check
pnpm run test  # Unit tests

pnpm run crawl:docs
pnpm run crawl:typings
```

## Rules

- Run `pnpm run format` before work is done.
- After using JSDesign MCP, if there are any pitfalls worth noting, record them in `skills/js-design-mcp/references/gotchas/`. Keep these notes short. Add only reusable rules. Put probes, long examples, and session details elsewhere.
- Use `temp` folder under this project (if there's no, create one) to store temporary files, use `temp/snapshots` for storing temporary output images.
- Before doing any work related to crawling official docs or typings, read `skills/js-design-mcp/references/docs-crawl-notes.md` first.

## Note

- Message `ca` means commit all, `cnp` means commit all and push. Include unstaged files if user not specified. `nu` means no unstaged files.

## Commit

Use English conventional commit messages:

```text
type(optional scope): description

optional body

optional footer(s)
```
