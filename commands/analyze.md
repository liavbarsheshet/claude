# /analyze

Performs a full analysis of the current repository or project folder, then updates the relevant Claude Code files to reflect what was learned.

---

## Phase 1: Analysis

Explore and understand the following:

- **Purpose** what the project does, its domain, and its goals
- **Architecture** folder structure, layers, and how components relate
- **Stack and frameworks** languages, libraries, runtimes, and tooling
- **Conventions** naming, file organization, and patterns used throughout
- **Code style** formatting, control flow patterns, and code structure habits
- **Testing** test framework, coverage patterns, and testing conventions
- **Configuration** environment setup, scripts, and build pipeline

---

## Phase 2: Internalize

Build a complete mental model of the project before touching anything. Do not make assumptions. If something is unclear, infer from existing codebase patterns.

---

## Phase 3: Update Claude Code Files

After analysis, update or create the relevant Claude Code files inside the project:

- **CLAUDE.md** project purpose, stack, architecture, conventions, and any rules Claude should follow when working in this repo
- **.claude/CLAUDE.md** if it exists, update or add any project-specific instructions for Claude managing this repo

Only write what was actually discovered. Do not add placeholders or assumptions.

---

## Notes

- Run this command at the start of working in any unfamiliar repo
- Re-run whenever the project structure or conventions change significantly
- Do not modify any source code during analysis
