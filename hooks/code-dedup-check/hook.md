# code-dedup-check

After every `Edit` or `Write` tool call, instructs Claude to search the codebase for logic similar or identical to what was just added, and consolidate where appropriate.

## Behavior

- If identical code is found elsewhere: remove the duplicate, update the original.
- If similar code serves different purposes: extract a shared helper and refactor both to use it.

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
            "command": "node ~/.claude/hooks/code-dedup-check/code_dedup_check.js"
          }
        ]
      }
    ]
  }
}
```

## Files

- `code_dedup_check.js` — the hook script (Node.js)
