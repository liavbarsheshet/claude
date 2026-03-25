---
name: styled-terminal
description: Print styled, colored output directly in the terminal using the styled-terminal library. Use when the user wants to preview a color, visualize a palette, see color variations, or get color values in all formats (hex, rgb, hsl, hsv). Also use proactively when suggesting colors in a design context — always show a live preview block.
---

# Styled Terminal — Color Preview in the Terminal

Uses the `styled-terminal` npm package to render visual color blocks and palettes directly in the terminal.

## Output rules

- Always run silently — no step narration, no commentary
- Print the visual output and nothing else (unless the user asked a question)
- Never show the raw Node.js script to the user

---

## Step 1 — Resolve the Color

Accept any color format the user provides:
- Named color: `"coral"`, `"midnight blue"`, `"forest green"`
- Hex: `#FF6B6B`, `#fff`
- RGB: `rgb(255, 107, 107)`
- HSL: `hsl(0, 100%, 71%)`
- Description: `"a warm red"`, `"something calm and bluish"`

If the input is a name or description, use your color knowledge to resolve it to an exact hex value first.

---

## Step 2 — Run the Terminal Preview

Generate and run this Node.js script inline via Bash. Replace `HEX_VALUE` with the resolved hex (e.g. `FF6B6B` without `#`):

```bash
node -e "
const { style, Color } = require('styled-terminal');

// ── Color conversions ────────────────────────────────────────────────────────

function hexToRgb(hex) {
  hex = hex.replace(/^#/, '');
  if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
  const n = parseInt(hex, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if (max === min) { h = s = 0; }
  else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function rgbToHsv(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
  let h;
  const s = max === 0 ? 0 : d / max;
  const v = max;
  if (d === 0) { h = 0; }
  else {
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), v: Math.round(v * 100) };
}

function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0').toUpperCase()).join('');
}

// Lighten or darken a hex color by adjusting HSL lightness
function adjustLightness(hex, delta) {
  const { r, g, b } = hexToRgb(hex);
  const { h, s, l } = rgbToHsl(r, g, b);
  const newL = Math.max(0, Math.min(100, l + delta));
  return hslToRgbHex(h, s, newL);
}

function hslToRgbHex(h, s, l) {
  s /= 100; l /= 100;
  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  const r = Math.round(f(0) * 255);
  const g = Math.round(f(8) * 255);
  const b = Math.round(f(4) * 255);
  return rgbToHex(r, g, b);
}

// ── Render ───────────────────────────────────────────────────────────────────

const hex = 'HEX_VALUE';
const { r, g, b } = hexToRgb(hex);
const hsl = rgbToHsl(r, g, b);
const hsv = rgbToHsv(r, g, b);
const fullHex = rgbToHex(r, g, b);

const block = (hexColor, label) => {
  const c = hexColor.replace(/^#/, '');
  const color = Color.hex(c);
  const swatch = style.bg(color)('        ');
  const fg = style.fg(color);
  console.log(swatch + '  ' + fg(hexColor.toUpperCase()) + (label ? '  ' + label : ''));
};

const separator = style.fg(Color.table256(240))('─'.repeat(44));

// Header
console.log('');
console.log(separator);

// Main swatch
block(fullHex, style.fg(Color.table256(250))('base'));

console.log('');

// Color values
const label = style.fg(Color.table256(245));
const value = style.fg(Color.table256(252)).bold;

console.log(label('  Hex  ') + value(fullHex));
console.log(label('  RGB  ') + value('rgb(' + r + ', ' + g + ', ' + b + ')'));
console.log(label('  HSL  ') + value('hsl(' + hsl.h + '°, ' + hsl.s + '%, ' + hsl.l + '%)'));
console.log(label('  HSV  ') + value('hsv(' + hsv.h + '°, ' + hsv.s + '%, ' + hsv.v + '%)'));

console.log('');
console.log(label('  Variations'));
console.log('');

// Tints (lighter)
block(adjustLightness(hex, 30), label('tint +30'));
block(adjustLightness(hex, 15), label('tint +15'));

// Base
block(fullHex, style.fg(Color.table256(250))('base'));

// Shades (darker)
block(adjustLightness(hex, -15), label('shade -15'));
block(adjustLightness(hex, -30), label('shade -30'));

console.log(separator);
console.log('');
"
```

If `styled-terminal` is not installed globally, prefix with:
```bash
npm install -g styled-terminal 2>/dev/null; node -e "..."
```

---

## Step 3 — Palette Mode (multiple colors)

If the user provides multiple colors or asks for a palette preview, loop the swatch block for each color — print them sequentially without repeating the values section, just swatches + hex labels:

```bash
node -e "
const { style, Color } = require('styled-terminal');
const colors = ['HEX1', 'HEX2', 'HEX3']; // resolved hex values without #
const labels = ['Label1', 'Label2', 'Label3'];
console.log('');
colors.forEach((hex, i) => {
  const color = Color.hex(hex);
  const swatch = style.bg(color)('        ');
  const fg = style.fg(color);
  console.log(swatch + '  ' + fg('#' + hex.toUpperCase()) + '  ' + labels[i]);
});
console.log('');
"
```

---

## Step 4 — Complementary & Harmony Preview

When suggesting colors that "fit together" (e.g. user asks "what pairs with this?"), run the swatch loop across all suggested colors with a harmony label:

```bash
node -e "
const { style, Color } = require('styled-terminal');
const palette = [
  { hex: 'HEX1', role: '60% dominant' },
  { hex: 'HEX2', role: '30% secondary' },
  { hex: 'HEX3', role: '10% accent' },
];
console.log('');
palette.forEach(({ hex, role }) => {
  const color = Color.hex(hex);
  const swatch = style.bg(color)('        ');
  const label = style.fg(Color.table256(245))(role);
  console.log(swatch + '  ' + style.fg(color)('#' + hex.toUpperCase()) + '  ' + label);
});
console.log('');
"
```

---

## Behavior Rules

- **Proactive**: whenever you suggest or discuss a specific color in any design context, always run a preview block — never just name a hex value without showing it
- **Color knowledge**: use the `better-colors` skill knowledge when picking harmonious suggestions
- **Format flexibility**: accept any color input — always normalize to hex first before passing to styled-terminal
- **Dark/light text**: styled-terminal handles this automatically via ANSI — do not try to compute readable text color manually
- **No install noise**: suppress npm output with `2>/dev/null` — if it fails, tell the user to run `npm install -g styled-terminal` once
