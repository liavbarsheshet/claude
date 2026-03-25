---
name: svg-icons
description: Search and download SVG icons from react-icons. Use when the user wants to find an icon, get an SVG icon, download an icon from react-icons, or needs an icon for their project.
---

# SVG Icons Skill

Search react-icons for the closest matching icon, download it, clean it up, and return it — silently.

**Do not narrate your steps.** Do not explain what you're doing, what you're fetching, or what candidates exist. Work entirely in the background. Only speak to the user in two cases:
1. You need to ask which icon they want (if not specified)
2. You need the user to choose between equally good candidates (show max 3, ask once)

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

The page renders dynamically so results may not be visible — that's expected. Use your knowledge of react-icons packs to determine the best match for the user's intent. Pick one icon confidently. Only ask the user if two options are genuinely ambiguous.

Note the icon name (e.g. `FaHome`) and pack prefix (e.g. `fa`, `md`, `hi`, `bs`, `io5`, `lu`, `ri`, `tb`).

---

## Step 3 — Fetch SVG Data

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

## Step 4 — Build the SVG

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

---

## Step 5 — Save and Return

Save to the system temp directory as `<icon-name-kebab-case>.svg`.
- Windows temp: `C:/Users/<username>/AppData/Local/Temp/` — get the username from the environment or path context
- Unix temp: `/tmp/`

Example: `FaHome` → `C:/Users/liavb/AppData/Local/Temp/fa-home.svg`

Then reply with only:
```
[fa-home.svg](file:///C:/Users/liavb/AppData/Local/Temp/fa-home.svg) · [open folder](file:///C:/Users/liavb/AppData/Local/Temp) — FaHome · Font Awesome
```

Nothing else. No explanation. Just the file link, folder link, and source attribution on one line.
