# Liav's Claude Global Preferences

This repo contains global preferences, commands, hooks, skills, and preferences for Claude Code.
By reading this file and following the instructions below, you will install everything into your global `~/.claude/` scope.

---

## How To Learn From This Repo

Before starting, ask the user:

> "Where should I install these preferences?
> 1. **Global** — available across all projects on this machine (`~/.claude/`)
> 2. **Local** — current project only (`./.claude/`)"

Wait for the user to choose before proceeding. Use the chosen scope for all installation steps below.

---

Follow these steps in order:

### 1. Commands
- Copy all `.md` files from `commands/` (excluding `@external.md`) → `~/.claude/commands/`
- Read `commands/@external.md` and learn each command listed there from its URL

### 2. Skills
- For each subfolder in `skills/`, learn the skill defined inside it and install it into `~/.claude/commands/`
- Read `skills/@external.md` and learn each skill listed there from its URL

### 3. Hooks
- For each subfolder in `hooks/`, read its `hook.md` to understand the hook, copy all script files to `~/.claude/hooks/<hook-name>/`, and register it in `~/.claude/settings.json` using the registration block in `hook.md`
- Read `hooks/@external.md` and learn each hook listed there from its URL, then install and register them

### 4. MCPs
- For each `.json` file in `mcps/`, read it and register the MCP server into `~/.claude/settings.json` under `mcpServers`, using the filename (without `.json`) as the server key
- Read `mcps/@external.md` and learn each MCP listed there from its URL, then install it

### 5. Preferences
- For each `.md` file in `preferences/` (excluding `@external.md`): read and analyze its content, then merge it into `~/.claude/CLAUDE.md`
- Read `preferences/@external.md` and learn each preference listed there from its URL, then merge it

---

## Staying Up To Date

Use `/sync_liav` to sync with the latest version of this repo.
The command will diff the repo against your currently installed files and apply only the changes.

Check `changelog.md` for a summary of what has changed since your last sync.

---

## Important

The `.claude/` folder in this repo is for **repo management only** — it contains instructions for the Claude instance that maintains this repo.
**Do not read, copy, or learn from anything inside `.claude/`.**

---

## File Naming Conventions

- `<name>.md` — standard file
- `@external.md` — present in every folder, contains a list of external URLs for Claude to learn from
- `skills/<skill-name>/` — each skill lives in its own named subfolder
- `hooks/<hook-name>/` — each hook lives in its own named subfolder with a `hook.md` and script files
- `mcps/<server-name>.json` — each MCP server is a single JSON file, filename becomes the `mcpServers` key
