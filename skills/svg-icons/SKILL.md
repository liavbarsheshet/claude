---
name: svg-icons
description: Search and download SVG icons from react-icons. Use when the user wants to find an icon, get an SVG icon, download an icon from react-icons, or needs an icon for their project.
---

# SVG Icons Skill

Search react-icons for the closest matching icon(s), download them, clean them up, and save them.

## Output rules — read first, apply throughout

- **Never output any text while working.** No step names, no progress updates, no explanations, no tool call commentary.
- Only produce text output in exactly three situations:
  1. Asking which icon(s) the user wants (if not specified)
  2. Asking where to save (always, once — shared destination for all icons)
  3. The result lines at the end (one per icon)
- Run all tool calls (Bash, WebFetch, Write) silently between those three moments.

---

## Step 1 — Clarify the Request

If the user hasn't described what icon(s) they want, ask:
> "What icon(s) are you looking for?"

The user can provide one or multiple icons (e.g. "home, user, settings"). Parse all of them.

Then wait. Do not output anything else until the user replies.

---

## Step 2 — Resolve Home Directory (silent)

```bash
echo $USERPROFILE 2>/dev/null || echo $HOME
```

---

## Step 3 — Ask Where to Save

Check for a last-used custom path:
```bash
cat "<home>/.claude/svg-icons-last-path" 2>/dev/null
```

Build and present options — do not output anything before this prompt:

If no last path:
> "Where should I save them?
> 1. `~/.claude/svg/` (global)
> 2. `.claude/svg/` (local project)
> 3. Custom path"

If last path exists:
> "Where should I save them?
> 1. `~/.claude/svg/` (global)
> 2. `.claude/svg/` (local project)
> 3. `<last path>` (last used)
> 4. Custom path"

If the user picks custom path, ask for it, then persist:
```bash
echo "<custom path>" > "<home>/.claude/svg-icons-last-path"
```

Resolved destinations:
- **Global** — Unix: `$HOME/.claude/svg/` · Windows: `$USERPROFILE/.claude/svg/`
- **Local** — `<cwd>/.claude/svg/`

---

## Steps 4–7 — Process Each Icon (silent, repeat for every icon)

For each icon in the list, run steps 4–7 independently:

### Step 4 — Pick the Icon

Use your knowledge of react-icons packs to find the best match. Optionally fetch:
```
https://react-icons.github.io/react-icons/search/#q=<keyword>
```
The page is dynamic so results may not appear — rely on knowledge if needed. Pick one confidently. Only ask the user if two options are genuinely ambiguous (show max 3).

Note the icon name (e.g. `FaHome`), pack prefix (e.g. `fa`), and derive the filename: `FaHome` → `fa-home.svg`.

### Step 5 — Check Cache

```bash
test -f "<destination>/<filename>" && echo "exists" || echo "missing"
```

If exists → skip Steps 6 and 7, mark as `(cached)`.

### Step 6 — Fetch SVG Data

```
https://unpkg.com/@react-icons/all-files/<prefix>/<IconName>.js
```

Extract `viewBox` and all child element geometry attributes (`d`, `cx`, `cy`, `r`, `rx`, `ry`, `x`, `y`, `width`, `height`, `points`, `x1`, `y1`, `x2`, `y2`, `transform`).

Fallback:
```
https://unpkg.com/react-icons/<prefix>/index.esm.js
```

### Step 7 — Build and Save

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="<viewBox>" fill="currentColor">
  <!-- child elements, geometry attrs only -->
</svg>
```

Rules:
- Keep only: `path`, `circle`, `rect`, `ellipse`, `line`, `polyline`, `polygon`, `g`
- Strip all non-geometry attributes
- Remove: `id`, `class`, `style`, `data-*`, `aria-*`, `focusable`, `role`
- Remove tags: `<title>`, `<desc>`, `<defs>` (unless clips/masks are referenced)
- `fill="currentColor"` on root `<svg>` only; remove `fill` on children unless `none`

```bash
mkdir -p "<destination>"
```

Save to `<destination>/<filename>`.

---

## Step 8 — Return Results

Reply with one line per icon, in the order they were requested:
```
[fa-home.svg](<file:///absolute/path/to/fa-home.svg>) — FaHome · Font Awesome · `<destination>`
[fa-user.svg](<file:///absolute/path/to/fa-user.svg>) — FaUser · Font Awesome · `<destination>`
```

Append ` (cached)` to any icon that already existed. Nothing else.
