# /lb-own-git-unsafe

Installs a single Claude Code hook into the current project that gives Claude full ownership of committing and pushing — directly on the current branch, no branching, no pull request.

---

## What It Does

When invoked, this command creates one hook script and registers it in the project's `.claude/settings.json`:

| Hook | Trigger | Responsibility |
|------|---------|----------------|
| `lb-auto-push` | PostToolUse (Bash — on task completion) | Commit and push changes directly to the current branch |

---

## Steps

### 1. Detect Project Root

```bash
git rev-parse --show-toplevel 2>/dev/null
```

If this is not a git repo, abort and tell the user:
> "This project is not a git repository. `/lb-own-git-unsafe` requires git."

### 2. Resolve `.claude/` Directory

Use `<project-root>/.claude/` as the target. Create it if it doesn't exist:

```bash
mkdir -p "<project-root>/.claude/hooks/lb-auto-push"
```

### 3. Write Hook: `lb-auto-push` (PostToolUse)

Write the following to `<project-root>/.claude/hooks/lb-auto-push/hook.js`:

```js
#!/usr/bin/env node

import { execSync } from "child_process";

const input = JSON.parse(await new Promise(r => {
  let d = "";
  process.stdin.on("data", c => d += c);
  process.stdin.on("end", () => r(d));
}));

// Only act on Bash tool completions
const tool = input.tool_name ?? "";
if (tool !== "Bash") process.exit(0);

function exec(cmd) {
  try { return execSync(cmd, { encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] }).trim(); }
  catch { return null; }
}

// Only proceed if there are staged or unstaged changes
const status = exec("git status --porcelain");
if (!status) process.exit(0);

// Derive type and label from recent file changes
const diff = exec("git diff --name-only HEAD 2>/dev/null") ?? exec("git diff --name-only --cached") ?? "";
const files = diff.split("\n").filter(Boolean);
const type = files.some(f => /fix|bug|patch/i.test(f)) ? "fix" : "feat";
const label = files.length
  ? files[0].replace(/.*[/\\]/, "").replace(/\.[^.]+$/, "").replace(/[^a-z0-9]+/gi, "-").split("-").filter(Boolean).slice(0, 3).join("-")
  : "update-code";

const commitMsg = `${type}: ${label}`;
const branch = exec("git rev-parse --abbrev-ref HEAD") ?? "main";

exec("git add -A");
exec(`git commit -m "${commitMsg}"`);
exec(`git push origin ${branch}`);

console.log(JSON.stringify({
  continue: true,
  message: `Changes committed and pushed to \`${branch}\` with message: \`${commitMsg}\``
}));
```

### 4. Register Hook in `.claude/settings.json`

Read the existing `.claude/settings.json` (or start from `{}`), then merge in:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "node .claude/hooks/lb-auto-push/hook.js"
          }
        ]
      }
    ]
  }
}
```

Preserve any existing hooks — merge arrays, do not overwrite.

### 5. Confirm to User

Reply with:
> "`/lb-own-git-unsafe` installed.
>
> From now on in this project:
> - After changes, Claude will commit and push directly to the current branch with a `<feat|fix>: <what>` message.
>
> No branching. No pull request. Changes go straight to the branch."

---

## Notes

- This is the **unsafe** variant of `/lb-own-git` — it pushes directly to whatever branch is currently checked out. Use with caution on protected or shared branches.
- Run `/lb-own-git-unsafe` once per project to install. It is idempotent — safe to run again.
- To get the full safe workflow (branching + PR/MR), use `/lb-own-git` instead.
