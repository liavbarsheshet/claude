# lint-runner

After every `Edit` or `Write` tool call, detects the project's linter and runs it. If linting fails, instructs Claude to fix the issues before responding to the user.

## Behavior

- Walks up from the modified file to find the project root
- Detects the linter in this order: npm scripts (`lint`, `lint:check`) → eslint → biome → ruff → flake8 → rubocop → golangci-lint
- Runs silently — only outputs if lint fails
- On failure: prints the lint errors and instructs Claude to fix them

## Registration

Add to `~/.claude/settings.json`:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "node ~/.claude/hooks/lint-runner/lint_runner.js"
          }
        ]
      }
    ]
  }
}
```

## Files

- `lint_runner.js` — the hook script (Node.js)
