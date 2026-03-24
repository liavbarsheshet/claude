#!/usr/bin/env node

let data = '';
process.stdin.on('data', chunk => (data += chunk));
process.stdin.on('end', () => {
  const input = JSON.parse(data);
  const command = input?.tool_input?.command || '';

  if (!command.includes('git push')) return;

  console.log(
    'REMINDER: You just pushed to origin. Update changelog.md with a concise row for each change made.\n' +
    'Format: YYYY-MM-DD | <add|update|remove> | <concise description>\n' +
    'Newest entry goes at the top. Commit and push the changelog update as well.'
  );
});
