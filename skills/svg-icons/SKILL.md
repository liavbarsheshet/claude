---
name: svg-icons
description: Search and download SVG icons from react-icons. Use when the user wants to find an icon, get an SVG icon, download an icon from react-icons, or needs an icon for their project.
---

# SVG Icons Skill

Search react-icons (https://react-icons.github.io/react-icons/) for the closest matching icon to what the user wants, download it, clean it up, and set fill to `currentColor`.

---

## Step 1 — Clarify the Request

If the user hasn't described what icon they want, ask:
> "What icon are you looking for? Describe it or give a keyword (e.g. 'home', 'close button', 'shopping cart')."

---

## Step 2 — Search react-icons

Use `WebFetch` to search the react-icons site:
```
https://react-icons.github.io/react-icons/search/#q=<keyword>
```

Scan the results and identify the best matching icon. Note:
- The icon name (e.g. `FaHome`, `MdClose`, `HiShoppingCart`)
- The pack prefix (e.g. `fa`, `md`, `hi`, `bs`, `io5`, `lu`, `ri`, `si`, `tb`, etc.)

If multiple strong candidates exist, pick the one that best matches the user's intent. If unsure between a few, briefly list them and ask the user to choose.

---

## Step 3 — Fetch the SVG Data

Use `WebFetch` to retrieve the icon's JS module from the `@react-icons/all-files` CDN:
```
https://unpkg.com/@react-icons/all-files/<prefix>/<IconName>.js
```

Example:
```
https://unpkg.com/@react-icons/all-files/fa/FaHome.js
```

The file exports a function that wraps the SVG structure. Extract:
- `viewBox` value from the `attr` object on the root `svg` tag
- All child elements (typically `path`, `circle`, `rect`, `polyline`, `line`, etc.) and their `attr` objects

If the file is unavailable on `@react-icons/all-files`, fall back to fetching the full pack index:
```
https://unpkg.com/react-icons/<prefix>/index.esm.js
```
Then extract the relevant icon's data from that file.

---

## Step 4 — Reconstruct the SVG

Build a clean SVG from the extracted data:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="<viewBox>">
  <!-- child elements here -->
</svg>
```

Rules:
- Keep only semantic shape elements: `path`, `circle`, `rect`, `ellipse`, `line`, `polyline`, `polygon`, `g`
- Strip all attributes except geometry ones (`d`, `cx`, `cy`, `r`, `rx`, `ry`, `x`, `y`, `width`, `height`, `points`, `x1`, `y1`, `x2`, `y2`, `transform`)
- Remove: `id`, `class`, `style`, `data-*`, `aria-*`, `title`, `desc`, `focusable`, `role`
- Remove wrapper tags: `<title>`, `<desc>`, `<defs>` (unless used for masks/clips that are actually referenced)
- Set `fill="currentColor"` on the root `<svg>` element
- Remove any `fill` attributes on child elements unless they are explicitly `none` (to preserve strokes or cutouts)

---

## Step 5 — Save the File

Ask the user where to save the file, or default to the current working directory.

Save as: `<icon-name-kebab-case>.svg`

Example: `FaHome` → `fa-home.svg`

Confirm once saved:
> "Saved `fa-home.svg` — FaHome from Font Awesome."
