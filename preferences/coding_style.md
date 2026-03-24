# Coding Style

These rules must be followed whenever facing a coding task.

---

## Code Style Rules

### 1. Guard Clauses
Always use guard clauses for control flow. Handle edge cases and early returns first to reduce nesting and improve readability.

### 2. Bracketless Single-Line Conditionals
Omit braces for single-statement `if` blocks when the language permits.

### 3. Longest-Line-First Ordering
Within any block where order is semantically flexible (imports, object properties, parameters, variable declarations), sort lines by descending length. Apply only when it does not affect logic or readability.

### 4. Import Grouping
Organize imports into three groups, each separated by a single blank line, regardless of language:
1. **Global packages** (third-party, globally installed)
2. **Alias-based paths** (e.g. `@/` in JS/TS)
3. **Absolute and relative paths**

Follow the last group with one blank line before the code begins.

### 5. Vertical Spacing
Use vertical spacing intentionally to separate logical blocks. Consistent spacing improves readability and visual structure.

### 6. Minimal Comments
Only comment when the logic is genuinely non-trivial. Code should be self-explanatory. Avoid redundant, obvious, or descriptive comments.

### 7. Concise Documentation
Keep doc comments short. No ` - ` separator after tags. Include only: brief description, parameters, and return value. No filler text.

### 8. Avoid the Em Dash
Never use `—` in any code, comments, or documentation.
