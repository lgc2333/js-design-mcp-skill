# Export and Asset Gotchas

- `save_image` may fail if the MCP plugin's debug path is missing, for example `C:\tmp\mcp-debug.log`. Create the missing directory, then retry the export.
- Export names can come from source components and ancestor frames, not just the visible instance being edited. When normalizing export names, inspect the real source page, `mainComponent`, component rows, and every exported node's ancestors; verify each ancestor segment is snake_case.
- Avoid exporting content containers that only group screen UI. If a frame is there to organize a page section, clear its `exportSettings`; export only the screen, real bitmap/decorative assets, icons, launchers, and other developer resources.
