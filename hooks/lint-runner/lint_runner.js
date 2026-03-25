#!/usr/bin/env node
// Registration (add to ~/.claude/settings.json):
// {
//   "PostToolUse": [{ "matcher": "Edit|Write", "hooks": [{ "type": "command", "command": "node ~/.claude/hooks/lint_runner.js" }] }]
// }

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

let data = '';
process.stdin.on('data', chunk => (data += chunk));
process.stdin.on('end', () => {
  const input = JSON.parse(data);
  const toolName = input?.tool_name || '';

  if (!['Edit', 'Write'].includes(toolName)) return;

  const filePath = input?.tool_input?.file_path || '';
  if (!filePath) return;

  const projectRoot = findProjectRoot(path.dirname(filePath));
  if (!projectRoot) return;

  const lintCmd = detectLintCommand(projectRoot);
  if (!lintCmd) return;

  try {
    execSync(lintCmd.cmd, { cwd: projectRoot, stdio: 'pipe' });
  } catch (err) {
    const output = [err.stdout?.toString(), err.stderr?.toString()]
      .filter(Boolean)
      .join('\n')
      .trim();

    console.log(
      `LINT FAILED (${lintCmd.label}) after your changes to "${filePath}".\n` +
      `Fix the following issues before responding to the user:\n\n${output}\n\n` +
      `Re-run \`${lintCmd.cmd}\` in ${projectRoot} to verify.`
    );
  }
});

function findProjectRoot(dir) {
  const markers = ['package.json', '.eslintrc', '.eslintrc.js', '.eslintrc.json',
    '.eslintrc.cjs', 'pyproject.toml', '.rubocop.yml', 'Gemfile', 'go.mod'];
  if (markers.some(m => fs.existsSync(path.join(dir, m)))) return dir;
  const parent = path.dirname(dir);
  if (parent === dir) return null;
  return findProjectRoot(parent);
}

function detectLintCommand(root) {
  // Node.js / npm
  const pkgPath = path.join(root, 'package.json');
  if (fs.existsSync(pkgPath)) {
    try {
      const scripts = JSON.parse(fs.readFileSync(pkgPath, 'utf8')).scripts || {};
      if (scripts.lint) return { cmd: 'npm run lint', label: 'npm' };
      if (scripts['lint:check']) return { cmd: 'npm run lint:check', label: 'npm' };
    } catch {}
    // Fallback: bare eslint/biome/prettier
    if (fs.existsSync(path.join(root, 'node_modules/.bin/eslint')))
      return { cmd: 'npx eslint .', label: 'eslint' };
    if (fs.existsSync(path.join(root, 'node_modules/.bin/biome')))
      return { cmd: 'npx biome check .', label: 'biome' };
  }

  // Python
  if (fs.existsSync(path.join(root, 'pyproject.toml'))) {
    try {
      execSync('ruff --version', { stdio: 'pipe' });
      return { cmd: 'ruff check .', label: 'ruff' };
    } catch {}
    try {
      execSync('flake8 --version', { stdio: 'pipe' });
      return { cmd: 'flake8 .', label: 'flake8' };
    } catch {}
  }

  // Ruby
  if (fs.existsSync(path.join(root, '.rubocop.yml')))
    return { cmd: 'rubocop', label: 'rubocop' };

  // Go
  if (fs.existsSync(path.join(root, 'go.mod'))) {
    try {
      execSync('golangci-lint --version', { stdio: 'pipe' });
      return { cmd: 'golangci-lint run', label: 'golangci-lint' };
    } catch {}
  }

  return null;
}
