# Changelog

Format: `YYYY-MM-DD | <add|update|remove> | <concise description>`

---

2026-03-27 | update | rename sync_liav command to sync_lb
2026-03-27 | add | 3 external skills via npx (shadcn-ui, web-accessibility, web-design-guidelines)
2026-03-27 | add | 8 external skills from anthropics/skills (mcp-builder, canvas-design, brand-guidelines, algorithmic-art, pdf, pptx, web-artifacts-builder, webapp-testing)
2026-03-27 | update | svg-icons skill — add Bootstrap Icons as a second icon source
2026-03-27 | remove | styled-terminal skill
2026-03-25 | add | styled-terminal skill — live color preview blocks in terminal with hex/rgb/hsl/hsv/variations
2026-03-25 | add | better-colors skill — color theory, psychology, 60-30-10 rule, accessibility, dark mode
2026-03-25 | update | svg-icons skill — support multiple icons in a single request
2026-03-25 | add | playwright MCP server (Microsoft @playwright/mcp)
2026-03-25 | add | mcps/ folder — MCP server definitions as JSON files, installed into ~/.claude/settings.json
2026-03-25 | add | ui-ux-pro-max-skill as external skill in skills/@external.md
2026-03-25 | add | /git_cr command — reviews branch changes vs base, severity-ordered findings with IDE hyperlinks
2026-03-25 | refactor | hooks now use subfolder structure (hook.md + scripts) matching skills pattern
2026-03-25 | fix | remove wrongly added dev hooks from repo management settings.local.json
2026-03-25 | fix | gitignore .claude/svg/ test files
2026-03-25 | add | code_dedup_check hook — checks for code duplication after every Edit/Write
2026-03-25 | add | lint_runner hook — detects and runs linter after every Edit/Write, fixes on failure
2026-03-25 | add | anthropic frontend-design as external skill in skills/@external.md
2026-03-25 | update | svg-icons skill — remove folder open, enforce silent execution, path shown in result
2026-03-25 | update | svg-icons skill — add local .claude/svg option, fix Windows folder open via PowerShell
2026-03-25 | update | svg-icons skill — remember last custom save path, show as option on next run
2026-03-25 | update | svg-icons skill — destination choice (.claude/svg or custom), caching, unix support
2026-03-25 | update | svg-icons skill — silent execution, saves to temp dir, returns clickable hyperlink
2026-03-25 | add | svg-icons skill — search, download, and clean SVG icons from react-icons
2026-03-25 | add | anthropic skill-creator as external skill in skills/@external.md
2026-03-25 | update | @external.md files now support URL, GitHub repo, or shell command (e.g. npx) entries
2026-03-25 | add | changelog_reminder hook in .claude/ to enforce changelog updates after every push
2026-03-24 | add | coding_style preference
2026-03-24 | add | /analyze command
2026-03-24 | add | /sync_liav command
2026-03-24 | add | @external.md per folder and skills nested subfolder convention
2026-03-24 | add | initial repo structure with CLAUDE.md and changelog
