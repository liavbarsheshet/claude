# /lb-own-git

Installs two Claude Code hooks into the current project that give Claude full ownership of the git workflow — branching before changes, committing and opening a pull/merge request after.

---

## What It Does

When invoked, this command creates two hook scripts and registers them in the project's `.claude/settings.json`:

| Hook | Trigger | Responsibility |
|------|---------|----------------|
| `lb-branch-guard` | PreToolUse (Edit \| Write \| Bash) | Create a scoped branch before any changes |
| `lb-pr-push` | PostToolUse (Bash — on task completion) | Commit, push, open PR/MR, notify user |

---

## Steps

### 1. Detect Project Root

```bash
git rev-parse --show-toplevel 2>/dev/null
```

If this is not a git repo, abort and tell the user:
> "This project is not a git repository. `/lb-own-git` requires git."

### 2. Clean Up Any Existing `lb-own-git` Installation

Before installing, remove any previously installed variant (safe or unsafe) to prevent duplication:

```bash
rm -rf "<project-root>/.claude/hooks/lb-branch-guard"
rm -rf "<project-root>/.claude/hooks/lb-pr-push"
rm -rf "<project-root>/.claude/hooks/lb-auto-push"
rm -f  "<project-root>/.claude/.lb-own-git-state.json"
```

Then read `.claude/settings.json` and strip out any hook entries whose `command` contains `lb-branch-guard`, `lb-pr-push`, or `lb-auto-push`. Write the cleaned result back before proceeding.

### 3. Resolve `.claude/` Directory

Use `<project-root>/.claude/` as the target. Create it if it doesn't exist:

```bash
mkdir -p "<project-root>/.claude/hooks/lb-branch-guard"
mkdir -p "<project-root>/.claude/hooks/lb-pr-push"
```

### 4. Write Hook: `lb-branch-guard` (PreToolUse)

Write the following to `<project-root>/.claude/hooks/lb-branch-guard/hook.js`:

```js
#!/usr/bin/env node

import { execSync } from "child_process";

const input = JSON.parse(await new Promise(r => {
  let d = "";
  process.stdin.on("data", c => d += c);
  process.stdin.on("end", () => r(d));
}));

const tool = input.tool_name ?? "";
if (!["Edit", "Write", "Bash"].includes(tool)) process.exit(0);

function exec(cmd) {
  try { return execSync(cmd, { encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] }).trim(); }
  catch { return null; }
}

// Already on a claude branch — nothing to do
const current = exec("git rev-parse --abbrev-ref HEAD");
if (current?.startsWith("claude-")) process.exit(0);

// State file: remember which branch we branched from and the chosen name
const stateFile = ".claude/.lb-own-git-state.json";
let state = null;
try { state = JSON.parse(execSync(`cat ${stateFile}`, { encoding: "utf8" })); } catch {}
if (state?.branch) process.exit(0); // branch already created this session

// Determine type and short label from the hook input
const toolInput = JSON.stringify(input.tool_input ?? {}).toLowerCase();
const type = toolInput.includes("fix") || toolInput.includes("bug") || toolInput.includes("error") ? "fix" : "feat";

// Derive a 2-3 word slug from the tool input or file path
let label = "update-code";
const pathMatch = JSON.stringify(input.tool_input ?? "").match(/["']([^"']+\.[a-z]{1,5})["']/);
if (pathMatch) {
  const parts = pathMatch[1].replace(/.*[/\\]/, "").replace(/\.[^.]+$/, "").replace(/[^a-z0-9]+/gi, "-").split("-").filter(Boolean);
  label = parts.slice(0, 3).join("-");
}

const branchName = `claude-${type}-${label}`;
const baseBranch = current ?? "main";

exec(`git checkout -b ${branchName}`);
execSync(`echo '${JSON.stringify({ branch: branchName, base: baseBranch })}' > ${stateFile}`);

console.log(JSON.stringify({ continue: true }));
```

### 5. Write Hook: `lb-pr-push` (PostToolUse)

Write the following to `<project-root>/.claude/hooks/lb-pr-push/hook.js`:

```js
#!/usr/bin/env node

import { execSync } from "child_process";
import { existsSync, readFileSync, unlinkSync } from "fs";

const input = JSON.parse(await new Promise(r => {
  let d = "";
  process.stdin.on("data", c => d += c);
  process.stdin.on("end", () => r(d));
}));

// Only act on Bash tool completions that signal task done
const tool = input.tool_name ?? "";
if (tool !== "Bash") process.exit(0);

const stateFile = ".claude/.lb-own-git-state.json";
if (!existsSync(stateFile)) process.exit(0);

const { branch, base } = JSON.parse(readFileSync(stateFile, "utf8"));

function exec(cmd) {
  try { return execSync(cmd, { encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] }).trim(); }
  catch { return null; }
}

// Only proceed if there are staged or unstaged changes
const status = exec("git status --porcelain");
if (!status) process.exit(0);

// Derive commit message from branch name: claude-feat-add-login → feat: add-login
const match = branch.match(/^claude-(feat|fix)-(.+)$/);
const type = match?.[1] ?? "feat";
const what = match?.[2] ?? "update";
const commitMsg = `${type}: ${what}`;

exec("git add -A");
exec(`git commit -m "${commitMsg}"`);
exec(`git push -u origin ${branch}`);

// Detect remote and open PR/MR
const remote = exec("git remote get-url origin") ?? "";
let prUrl = null;

if (remote.includes("github")) {
  prUrl = exec(`gh pr create --base ${base} --head ${branch} --title "${commitMsg}" --body "Opened by Claude Code via /lb-own-git" 2>/dev/null`);
} else if (remote.includes("gitlab")) {
  const projectPath = remote.replace(/.*[:/]/, "").replace(/\.git$/, "");
  prUrl = `${remote.replace(/\.git$/, "")}/-/merge_requests/new?merge_request[source_branch]=${branch}&merge_request[target_branch]=${base}`;
} else if (remote.includes("bitbucket")) {
  prUrl = exec(`bb pr create --source ${branch} --destination ${base} --title "${commitMsg}" 2>/dev/null`);
}

// Clean up state
unlinkSync(stateFile);

// Notify Claude to surface the PR link to the user
const msg = prUrl
  ? `Changes pushed to branch \`${branch}\`. PR/MR opened: ${prUrl}\n\nPlease notify the user to review and approve the pull request.`
  : `Changes pushed to branch \`${branch}\`. Please open a pull/merge request from \`${branch}\` into \`${base}\` and notify the user to approve it.`;

console.log(JSON.stringify({ continue: true, message: msg }));
```

### 6. Register Hooks in `.claude/settings.json`

Read the existing `.claude/settings.json` (or start from `{}`), then merge in:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Edit|Write|Bash",
        "hooks": [
          {
            "type": "command",
            "command": "node .claude/hooks/lb-branch-guard/hook.js"
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "node .claude/hooks/lb-pr-push/hook.js"
          }
        ]
      }
    ]
  }
}
```

Preserve any existing hooks — merge arrays, do not overwrite.

### 7. Confirm to User

Reply with:
> "`/lb-own-git` installed.
>
> From now on in this project:
> - Before any changes, Claude will create a `claude-<feat|fix>-<what>` branch off the current branch.
> - After changes, Claude will commit, push, and open a pull/merge request back to the original branch.
>
> You will be notified to review and approve the request before anything merges."

---

## Notes

- The state file `.claude/.lb-own-git-state.json` is ephemeral — created at branch time, deleted after the PR is opened. Add it to `.gitignore` if desired.
- If `gh` (GitHub CLI), `bb` (Bitbucket CLI), or `glab` (GitLab CLI) is not installed, Claude will fall back to printing the manual PR URL.
- Run `/lb-own-git` once per project to install. It is idempotent — safe to run again.
