# Claude Global Config

A personal Claude Code configuration repo — commands, skills, hooks, MCPs, and preferences — installable into any Claude instance in seconds.

---

## What's Inside

### Commands

| Command | Description |
|---------|-------------|
| `/lb-analyze` | Full repo analysis — scans architecture, stack, conventions, and writes project context into CLAUDE.md |
| `/lb-git-cr` | Code review — analyzes all commits on current branch, surfaces bugs and issues ordered by severity |
| `/lb-sync` | Sync — diffs this repo against your installed files and applies only the delta |
| `/lb-own-git` | Installs two project-level hooks: auto-branches before changes (`claude-<feat\|fix>-<what>`), then commits, pushes, and opens a PR/MR after |

### Skills

| Skill | Description |
|-------|-------------|
| `better-colors` | Color theory, psychology, 60-30-10 rule, WCAG accessibility — applied automatically during UI/design work |
| `svg-icons` | Search and download clean SVGs from react-icons and Bootstrap Icons |
| `skill-creator` | Create, improve, and benchmark skills |
| `frontend-design` | Frontend design patterns and component architecture |
| `mcp-builder` | Build and configure MCP servers |
| `canvas-design` | Canvas-based visual design |
| `brand-guidelines` | Apply and enforce brand guidelines |
| `algorithmic-art` | Generative and algorithmic art |
| `pdf` | Read, generate, and manipulate PDF files |
| `pptx` | Create and edit PowerPoint presentations |
| `web-artifacts-builder` | Build interactive web artifacts |
| `webapp-testing` | Web application testing strategies |
| `ui-ux-pro-max` | Advanced UI/UX design patterns |
| `shadcn-ui` | shadcn/ui component patterns and usage |
| `web-accessibility` | Web accessibility standards and implementation |
| `web-design-guidelines` | Vercel-style web design guidelines |

### Hooks

| Hook | Trigger | Description |
|------|---------|-------------|
| `code-dedup-check` | After Edit/Write | Detects duplicate or similar logic and consolidates it automatically |
| `lint-runner` | After Edit/Write | Detects and runs the project linter (ESLint, Biome, Ruff, etc.) — fails loudly so Claude fixes issues inline |

### MCPs

| Server | Description |
|--------|-------------|
| `playwright` | Microsoft Playwright MCP — browser automation and end-to-end testing |

### Preferences

| Preference | Description |
|------------|-------------|
| `coding_style` | 8 mandatory code style rules: guard clauses, bracketless single-line conditionals, longest-line-first ordering, import grouping, vertical spacing, minimal comments, concise docs, no em dashes |
| `web_development` | TypeScript best practices, CSS over frameworks, SVG icons stored in `<src>/assets/icons/`, React children composition over prop-injection, Context API for component APIs |

---

## Installation

Open a Claude Code session and paste the following prompt:

```
Read the CLAUDE.md at https://raw.githubusercontent.com/liavbarsheshet/claude/main/CLAUDE.md and follow its instructions to install everything.
```

Claude will:
1. Ask whether to install **globally** (`~/.claude/`) or **locally** (current project)
2. Copy all commands to `~/.claude/commands/`
3. Learn and install all skills into `~/.claude/commands/`
4. Copy hook scripts to `~/.claude/hooks/` and register them in `~/.claude/settings.json`
5. Register MCP servers in `~/.claude/settings.json`
6. Merge all preferences into `~/.claude/CLAUDE.md`

---

## Staying Up To Date

After installing, run `/lb-sync` at any time. It will:

- Diff the repo against your currently installed files
- Show a summary of what changed since your last sync
- Apply only the delta — new items added, changed items updated, removed items cleaned up

---

## Repo Structure

```
CLAUDE.md               ← entry point — tells Claude how to install everything
changelog.md            ← append-only change history
commands/               ← slash command definitions (.md)
  @external.md          ← external command sources
skills/                 ← each skill in its own subfolder
  <skill-name>/
  @external.md          ← external skill sources (GitHub URLs + npx packages)
hooks/                  ← each hook in its own subfolder
  <hook-name>/
    hook.md             ← hook description + settings.json registration block
    <script>            ← the hook script (Node.js)
  @external.md          ← external hook sources
mcps/                   ← one .json file per MCP server
preferences/            ← preference files merged into ~/.claude/CLAUDE.md
  @external.md          ← external preference sources
```

> The `.claude/` folder is for **repo management only** and is never installed.
