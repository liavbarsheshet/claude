# /lb-tokens

Display current context window usage and session statistics. This command uses zero tokens — no tools, no API calls, no file reads. Claude reads its own internal context state and prints it directly.

---

## Rules

- **Do not call any tools.** No Bash, no Read, no Grep, nothing.
- **Do not make any API calls.**
- Read only from what is already in context — the conversation history you already hold.
- Output the report immediately and only once.

---

## Output Format

Print the following block exactly, filling in the real values:

```
╭─ Context Window ──────────────────────────────╮
│  Used       <used_tokens> tokens               │
│  Remaining  <remaining_tokens> tokens          │
│  Limit      <total_tokens> tokens              │
│  Consumed   <percent>%  <bar>                  │
╰───────────────────────────────────────────────╯

╭─ Session Stats ────────────────────────────────╮
│  Turns          <number of conversation turns> │
│  Tool calls     <total tool invocations>       │
│  Files read     <distinct files read>          │
│  Files edited   <distinct files written/edited>│
╰───────────────────────────────────────────────╯
```

### Bar format

The `<bar>` is a 20-character progress bar using `█` and `░`:
- Each `█` represents 5% consumed
- Example at 37%: `███████░░░░░░░░░░░░░`

### Percentage color hint (use markdown bold as emphasis)

- 0–60%:  normal
- 61–80%: **bold**
- 81–100%: **bold** and note `⚠ context running low`

---

## Notes

- All values are estimates derived from Claude's internal awareness of the conversation.
- "Turns" = number of user messages in the current session.
- "Tool calls" = total number of tool invocations Claude has made this session.
- "Files read" / "Files edited" = distinct paths touched by Read/Write/Edit tools this session.
