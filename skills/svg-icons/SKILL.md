---
name: svg-icons
description: Search and download SVG icons from react-icons. Use when the user wants to find an icon, get an SVG icon, download an icon from react-icons, or needs an icon for their project.
---

# SVG Icons Skill

Search react-icons for the closest matching icon, download it, clean it up, and save it — silently.

**Do not narrate your steps.** Work entirely in the background. Only speak to the user in these cases:
1. You need to ask which icon they want (if not specified)
2. You need the user to choose between equally good candidates (show max 3, ask once)
3. You need to ask where to save the file (see Step 5)

---

## Step 1 — Clarify the Request

If the user hasn't described what icon they want, ask:
> "What icon are you looking for?"

---

## Step 2 — Pick the Icon

Use `WebFetch` on:
```
https://react-icons.github.io/react-icons/search/#q=<keyword>
```

The page renders dynamically so results may not be visible — that's expected. Use your knowledge of react-icons packs to determine the best match. Pick one confidently. Only ask the user if two options are genuinely ambiguous.

Note the icon name (e.g. `FaHome`) and pack prefix (e.g. `fa`, `md`, `hi`, `bs`, `io5`, `lu`, `ri`, `tb`).

Derive the kebab-case filename: `FaHome` → `fa-home.svg`

---

## Step 3 — Ask Where to Save

Ask the user:
> "Where should I save it?
> 1. `~/.claude/svg/` (default icon cache)
> 2. Custom path"

If they choose 2, ask for the path. Resolve `~` to the actual home directory using Bash:
```bash
echo $HOME   # Unix/macOS
echo $USERPROFILE  # Windows
```

The resolved destination directory for option 1:
- **Unix/macOS**: `$HOME/.claude/svg/`
- **Windows**: `$USERPROFILE/.claude/svg/` (e.g. `C:/Users/liavb/.claude/svg/`)

---

## Step 4 — Check Cache

Before fetching anything, check if the file already exists in the destination:
```bash
test -f "<destination>/<icon-name>.svg" && echo "exists" || echo "missing"
```

If it exists → skip Steps 5 and 6, go directly to Step 7.

---

## Step 5 — Fetch SVG Data

Fetch the icon's JS module:
```
https://unpkg.com/@react-icons/all-files/<prefix>/<IconName>.js
```

Extract:
- `viewBox` from the root `svg` attr
- All child elements and their geometry attributes (`d`, `cx`, `cy`, `r`, `rx`, `ry`, `x`, `y`, `width`, `height`, `points`, `x1`, `y1`, `x2`, `y2`, `transform`)

Fallback if unavailable:
```
https://unpkg.com/react-icons/<prefix>/index.esm.js
```

---

## Step 6 — Build and Save the SVG

Build a clean SVG:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="<viewBox>" fill="currentColor">
  <!-- child elements with geometry attrs only -->
</svg>
```

Rules:
- Keep only: `path`, `circle`, `rect`, `ellipse`, `line`, `polyline`, `polygon`, `g`
- Strip everything except geometry attributes
- Remove: `id`, `class`, `style`, `data-*`, `aria-*`, `title`, `desc`, `focusable`, `role`
- Remove tags: `<title>`, `<desc>`, `<defs>` (unless clips/masks are actually referenced)
- `fill="currentColor"` on root `<svg>` only
- Remove `fill` on children unless explicitly `none`

Ensure the destination directory exists before saving:
```bash
mkdir -p "<destination>"
```

Save the file to `<destination>/<icon-name>.svg`.

---

## Step 7 — Open Folder and Return

Open the destination folder in the OS file explorer:
- **Windows**: `cmd.exe /c start explorer "<destination>"`
- **macOS**: `open "<destination>"`
- **Linux**: `xdg-open "<destination>"`

Then reply with only:
```
[fa-home.svg](<file:/// absolute path>) — FaHome · Font Awesome
```

If the file was already cached, append ` (cached)` to the line. Nothing else.
