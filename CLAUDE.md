# Liav's Claude Global Preferences

This repo contains global preferences, commands, hooks, skills, and preferences for Claude Code.
By reading this file and following the instructions below, you will install everything into your global `~/.claude/` scope.

---

## How To Learn From This Repo

Follow these steps in order:

### 1. Commands
Copy all `.md` files from `commands/` → `~/.claude/commands/`

### 2. Skills
Copy all `.md` files from `skills/` → `~/.claude/commands/`

### 3. Hooks
For each file in `hooks/`:
- Copy the script to `~/.claude/hooks/`
- Register it in `~/.claude/settings.json` under the appropriate event

### 4. Preferences
For each `.md` file in `preferences/`:
- Read and analyze its content
- Merge it into `~/.claude/CLAUDE.md` as part of your global instructions

---

## Global vs Local

By default, everything installs to `~/.claude/` (global — active across all projects on this machine).

If the user specifies **"learn locally"**, install everything to `./.claude/` of the current project instead.

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
- `@<name>.md` — sourced from an external/online origin
