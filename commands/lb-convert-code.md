# /lb-convert-code

Refactors an entire codebase to align with your current global Claude preferences — coding style, web development rules, and any other active preferences — while preserving all existing logic, architecture, and design decisions.

**This is an expensive, multi-step command. User approval is required before anything begins.**

---

## Phase 0 — Cost Warning & Approval

Before doing anything else, output this message exactly and wait for the user to reply:

> **⚠ This is an expensive operation.**
>
> `/lb-convert-code` will:
> - Analyze the full project structure
> - Read your active global preferences
> - Identify every file that needs updating
> - Rewrite those files one by one to match your preferences
>
> Depending on the size of the codebase, this may consume a significant portion of your context window and take many tool calls.
>
> **Logic, architecture, and design will not be changed — only style, patterns, and conventions.**
>
> Type `yes` to proceed or `no` to cancel.

If the user does not type `yes` (case-insensitive), abort immediately with:
> "Cancelled. No changes were made."

---

## Phase 1 — Project Analysis

Run `/lb-analyze` in full to build a complete understanding of the project:
- Tech stack and frameworks in use
- Directory structure and file organization
- Existing coding conventions (even if inconsistent)
- Test setup and how to run tests
- Linter/formatter config and how to run it
- Any project-level `.claude/CLAUDE.md` or local overrides

Store all findings internally — this phase produces no user-visible output.

---

## Phase 2 — Load Active Preferences

Read `~/.claude/CLAUDE.md` to extract all active global preferences. For each preference section found, note:
- The rule
- What it affects (TypeScript, CSS, React, git, comments, etc.)
- How to detect a violation in code
- What the corrected form looks like

Also check for any local `.claude/CLAUDE.md` in the project. If it exists and conflicts with a global preference, **the local rule wins** — do not override project-specific decisions.

---

## Phase 3 — Gap Analysis

Compare the project's current codebase against the loaded preferences. Produce an internal gap report:

For each preference rule, identify:
- Which files are affected
- What specific violations exist (e.g. "12 files use emoji icons", "34 components use className toggling instead of data-* attributes")
- Estimated impact: Low / Medium / High (based on number of files and blast radius of the change)

Group violations by preference category.

---

## Phase 4 — Conversion Plan

Present the plan to the user before touching any file:

```
╭─ Conversion Plan ─────────────────────────────────────────────╮
│                                                               │
│  Found X files across Y categories that need updating.       │
│                                                               │
│  [coding_style]                                               │
│    • Guard clauses missing in 8 functions     — 5 files      │
│    • Em dashes in comments                    — 3 files      │
│                                                               │
│  [web_development]                                            │
│    • className toggling instead of data-*     — 12 files     │
│    • Emoji used as icons                      — 4 files      │
│    • Tailwind found but CSS preferred         — SKIPPED *    │
│                                                               │
│  * Tailwind is already the project framework — not changed.  │
│                                                               │
│  Estimated scope: N files to rewrite.                        │
│                                                               │
╰───────────────────────────────────────────────────────────────╯

Proceed with all categories? Or reply with categories to skip (e.g. "skip coding_style").
```

Wait for user confirmation before continuing.
- If user says `yes` or `proceed` → continue with all
- If user specifies categories to skip → exclude them
- If user says `no` → abort with "Cancelled. No changes were made."

---

## Phase 5 — Execution

Process each affected file. For every file:

1. **Read** the full file
2. **Apply** only the changes identified in Phase 3 for that file:
   - Never change logic, algorithms, data flow, or component structure
   - Never rename variables, functions, or components unless a preference explicitly requires it
   - Never add features or refactor beyond what the preference specifies
   - Respect existing patterns that are intentional project choices
3. **Write** the updated file
4. After every 10 files (or at natural checkpoints), run the project's linter and/or test suite if available:
   ```bash
   # use whatever was detected in Phase 1
   ```
   If lint or tests fail, stop and report to the user before continuing.

Process order — least risky first:
1. Config and non-code files (comments, docs)
2. Utility / helper files
3. Shared components / types
4. Feature code
5. Entry points and root files

---

## Phase 6 — Verification

After all files are processed, run a final verification pass:

```bash
# run full lint
# run full test suite
```

Report the results. If anything fails, list the failures and ask the user how to proceed.

---

## Phase 7 — Summary Report

Output a final summary:

```
╭─ Conversion Complete ─────────────────────────────────────────╮
│                                                               │
│  Files changed:   N                                           │
│  Files skipped:   N  (already compliant or excluded)         │
│  Categories:      coding_style, web_development               │
│                                                               │
│  Lint:   ✓ passing                                            │
│  Tests:  ✓ passing  (or: ⚠ N failures — see above)           │
│                                                               │
╰───────────────────────────────────────────────────────────────╯
```

Then list each changed file with a one-line description of what was updated.

---

## Hard Rules

- **Never** change business logic, algorithms, or data flow.
- **Never** rename public APIs, exported functions, or component names.
- **Never** introduce new dependencies.
- **Never** apply a global preference that directly conflicts with a local project override.
- **Never** modify files in `node_modules/`, `dist/`, `build/`, `.git/`, or generated files.
- If unsure whether a change is safe, skip the file and note it in the summary.
