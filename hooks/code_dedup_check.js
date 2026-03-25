#!/usr/bin/env node
// Registration (add to ~/.claude/settings.json):
// {
//   "PostToolUse": [{ "matcher": "Edit|Write", "hooks": [{ "type": "command", "command": "node ~/.claude/hooks/code_dedup_check.js" }] }]
// }

let data = '';
process.stdin.on('data', chunk => (data += chunk));
process.stdin.on('end', () => {
  const input = JSON.parse(data);
  const toolName = input?.tool_name || '';

  if (!['Edit', 'Write'].includes(toolName)) return;

  const filePath = input?.tool_input?.file_path || '';
  if (!filePath) return;

  console.log(
    `DEDUP CHECK: You just modified "${filePath}".\n` +
    `Search the codebase for any existing functions, utilities, or logic that are similar or identical to what you just added or changed.\n` +
    `- If identical: remove the duplicate, update the original.\n` +
    `- If similar but serving different purposes: extract a shared helper and refactor both to use it.\n` +
    `Do this check now before responding to the user.`
  );
});
