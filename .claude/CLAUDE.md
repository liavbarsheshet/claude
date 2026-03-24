# Repo Management Context

This file is for the Claude instance that **manages and maintains this repo**.
It is NOT for syncing — it will never be learned by other Claude instances.

---

## What This Repo Is

A global preferences repo for Claude Code. It stores commands, hooks, skills, and preferences
that any Claude instance can learn and install into their global `~/.claude/` scope.

---

## Repo Structure

```
CLAUDE.md              ← entry point for other Claudes to learn from this repo
changelog.md           ← one concise row per change (append only, newest at top)
commands/              ← custom slash commands (.md files)
  @external.md         ← list of external command sources to learn from
hooks/                 ← event-driven hook scripts
  @external.md         ← list of external hook sources to learn from
skills/                ← each skill lives in its own named subfolder
  @external.md         ← list of external skill sources to learn from
  <skill-name>/        ← skill definition folder
preferences/           ← preference files Claude reads and merges into ~/.claude/CLAUDE.md
  @external.md         ← list of external preference sources to learn from
.claude/
  CLAUDE.md            ← (this file) repo management context, not synced
```

### File naming conventions
- `<name>.md` — standard file
- `@external.md` — one per folder, contains a list of external URLs for Claude to learn from
- `skills/<skill-name>/` — each skill lives in its own named subfolder

---

## How Other Claudes Learn From This Repo

1. They read the root `CLAUDE.md` (entry point)
2. `CLAUDE.md` instructs them to:
   - Copy `commands/` (excl. `@external.md`) → `~/.claude/commands/`, then fetch from `commands/@external.md`
   - Learn each skill from `skills/<skill-name>/` → `~/.claude/commands/`, then fetch from `skills/@external.md`
   - Copy `hooks/` scripts → `~/.claude/hooks/` and register in `~/.claude/settings.json`, then fetch from `hooks/@external.md`
   - Merge all `preferences/` → `~/.claude/CLAUDE.md`, then fetch from `preferences/@external.md`

### Global vs Local
- Default: everything installs to `~/.claude/` (global — available across all projects)
- Future: user can specify "learn locally" → installs to `./.claude/` of current project only

---

## Syncing (`/sync_liav`)

The `/sync_liav` command allows an already-trained Claude to stay up to date:
1. Fetch latest repo state
2. Diff repo vs currently installed files in `~/.claude/`
3. Apply only the delta (new, modified, removed)
4. Re-merge any changed preferences into `~/.claude/CLAUDE.md`
5. Re-register any changed hooks in `~/.claude/settings.json`

---

## Preferences

- **Scripts**: Use Node.js or Deno — never Python.
- **After each task**: add, commit, and push to GitHub using git commands.
- **Commit message format**: `<feat|fix>: <what_changed>` — e.g., `feat: add sync_liav command`

---

## Maintaining This Repo

### When adding a new command
1. Create `commands/<name>.md` with the command spec
2. Append a row to `changelog.md`

### When adding a new skill
1. Create `skills/<skill-name>/` folder with the skill spec inside
2. Append a row to `changelog.md`

### When adding an external source
1. Add the URL to the relevant folder's `@external.md`
2. Append a row to `changelog.md`

### When adding a new hook
1. Create `hooks/<name>.md` (or script file) with the hook spec
2. Document the `settings.json` registration required
3. Append a row to `changelog.md`

### When adding a new preference
1. Create `preferences/<name>.md` with the preference content
2. Append a row to `changelog.md`

### changelog.md format
One line per change, newest at top:
```
YYYY-MM-DD | <type> | <concise description>
```
Types: `add`, `update`, `remove`
