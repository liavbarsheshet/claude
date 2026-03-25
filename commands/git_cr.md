# /git_cr

Reviews all code changes committed exclusively on the current branch.
Finds bugs, issues, and potential problems — ordered by severity with clickable file locations.

---

## Step 1 — Branch Safety Check

Run:
```bash
git rev-parse --abbrev-ref HEAD
```

If the branch name is `main` or `master`, or matches patterns like `release/*`, `hotfix/*` — stop and respond:

> **Protected branch detected.**
> `/git_cr` only reviews side branches. Switch to a feature or fix branch to use this command.

---

## Step 2 — Collect This Branch's Commits

Get all commits that exist on this branch but on no other local branch:
```bash
git log --oneline HEAD --not $(git for-each-ref --format='%(refname:short)' refs/heads/ | grep -v "^$(git rev-parse --abbrev-ref HEAD)$" | xargs)
```

If no unique commits are found — stop and respond:

> No commits unique to this branch yet.

---

## Step 3 — Get the Full Diff

Get the diff of all files touched by those commits:
```bash
git diff $(git log HEAD --not $(git for-each-ref --format='%(refname:short)' refs/heads/ | grep -v "^$(git rev-parse --abbrev-ref HEAD)$" | xargs) --oneline | tail -1 | awk '{print $1}')^...HEAD
```

---

## Step 4 — Review the Diff

Analyze all changed files for:

- **Bugs** — logic errors, off-by-ones, null/undefined access, incorrect conditions
- **Security** — injection risks, exposed secrets, missing input validation, unsafe operations
- **Performance** — unnecessary loops, redundant calls, blocking operations
- **Error handling** — unhandled exceptions, missing fallbacks, swallowed errors
- **Type safety** — type mismatches, unsafe casts, missing checks
- **Code quality** — dead code, unused variables, misleading naming, overly complex logic

---

## Step 5 — Output

If no issues are found:

> No issues found in this branch.

Otherwise, output a severity-ordered list. Use this format exactly:

```
## Code Review — <branch-name>

### Critical
- [**filename:line**](relative/path/to/file#Lline) — concise description of the issue

### High
- [**filename:line**](relative/path/to/file#Lline) — concise description

### Medium
- [**filename:line**](relative/path/to/file#Lline) — concise description

### Low
- [**filename:line**](relative/path/to/file#Lline) — concise description
```

Rules:
- Only include severity levels that have findings — omit empty ones
- One line per finding, no elaboration unless truly necessary
- File path must be relative to repo root
- Line number must point to the exact problematic line
- Keep descriptions under 15 words — precise and actionable
