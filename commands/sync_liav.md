# /sync_liav

Syncs your installed Claude global scope with the latest version of Liav's preferences repo.

---

## Steps

1. **Fetch** the latest state of the repo:
   - Try SSH first: `git@github.com:liavbarsheshet/claude.git`
   - Fall back to HTTPS if SSH fails: `https://github.com/liavbarsheshet/claude`
2. **Read** `changelog.md` to identify what changed since last sync
3. **Diff** each folder against what is currently installed in `~/.claude/`:
   - `commands/` vs `~/.claude/commands/`
   - `skills/` vs `~/.claude/commands/`
   - `hooks/` vs `~/.claude/hooks/`
   - `preferences/` vs the relevant sections in `~/.claude/CLAUDE.md`
4. **Apply** only the delta:
   - New files → install
   - Modified files → overwrite
   - Removed files → delete from `~/.claude/`
5. **Hooks**: for any added/modified/removed hook, update the registration in `~/.claude/settings.json`
6. **Preferences**: for any added/modified/removed preference, re-merge into `~/.claude/CLAUDE.md`
7. **Report** a summary of what was added, updated, or removed

---

## Scope

By default syncs to global `~/.claude/`.
If the user specifies `--local`, syncs to `./.claude/` of the current project instead.
