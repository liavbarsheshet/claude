# Liav's Claude Global Preferences

This repo contains global preferences, commands, hooks, skills, and preferences for Claude Code.
By reading this file and following the instructions below, you will install everything into your global `~/.claude/` scope.

---

## How To Learn From This Repo

Follow these steps in order:

### 1. Commands
- Copy all `.md` files from `commands/` (excluding `@external.md`) → `~/.claude/commands/`
- Read `commands/@external.md` and learn each command listed there from its URL

### 2. Skills
- For each subfolder in `skills/`, learn the skill defined inside it and install it into `~/.claude/commands/`
- Read `skills/@external.md` and learn each skill listed there from its URL

### 3. Hooks
- For each file in `hooks/` (excluding `@external.md`): copy the script to `~/.claude/hooks/` and register it in `~/.claude/settings.json`
- Read `hooks/@external.md` and learn each hook listed there from its URL, then install and register them

### 4. Preferences
- For each `.md` file in `preferences/` (excluding `@external.md`): read and analyze its content, then merge it into `~/.claude/CLAUDE.md`
- Read `preferences/@external.md` and learn each preference listed there from its URL, then merge it

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
- `@external.md` — present in every folder, contains a list of external URLs for Claude to learn from
- `skills/<skill-name>/` — each skill lives in its own named subfolder
