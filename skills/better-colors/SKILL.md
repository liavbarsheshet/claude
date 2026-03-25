---
name: better-colors
description: Deep knowledge of color theory, psychology, and the 60-30-10 rule for UI/UX design. Apply this knowledge whenever working on interfaces, design systems, color palettes, themes, or any visual design decisions.
---

# Better Colors — Color Theory & Psychology for UI/UX

This skill encodes professional color knowledge. Apply it automatically whenever making design decisions.

---

## 1. The Color Wheel

Colors are organized in three tiers:

- **Primary** — Red, Yellow, Blue (cannot be mixed from other colors)
- **Secondary** — Orange, Green, Purple (two primaries mixed)
- **Tertiary** — Red-Orange, Yellow-Green, Blue-Violet, etc. (primary + adjacent secondary)

**Temperature:**
- **Warm** — Reds, Oranges, Yellows → energy, urgency, warmth, action
- **Cool** — Blues, Greens, Purples → calm, trust, professionalism, space
- **Neutral** — Whites, Greys, Browns, Black → balance, stability, backgrounds

---

## 2. Color Properties

Every color has three dimensions:

| Property | Definition | Design Impact |
|---|---|---|
| **Hue** | The color itself (red, blue, etc.) | Identity and meaning |
| **Saturation** | Intensity / purity of the color | Low sat = calm; High sat = vibrant, urgent |
| **Value/Lightness** | How light or dark it is | Contrast, hierarchy, accessibility |

**Tints** — hue + white → lighter, softer
**Shades** — hue + black → darker, heavier
**Tones** — hue + grey → muted, sophisticated

---

## 3. Color Harmonies

Start with a harmony before building a palette. Use two or three colors maximum at first.

### Monochromatic
One hue in varying tints, tones, shades. Cohesive and elegant. Low contrast — good for backgrounds and subtle UI, weak for emphasis.

### Analogous
Three adjacent colors on the wheel (e.g. blue, blue-green, green). Natural, comfortable, low contrast. Great for backgrounds and content areas.

### Complementary
Two colors directly opposite on the wheel (e.g. blue + orange). Maximum contrast and visual tension. Use for strong CTA emphasis — never use in equal proportions.

### Split-Complementary
One base + two colors adjacent to its complement. High contrast but less tension than complementary. More balanced for UI.

### Triadic
Three evenly spaced colors (120° apart). Vibrant and balanced. Hard to get right — requires strong proportional discipline.

### Tetradic / Square
Four colors (two complementary pairs). Very rich — demands a clear dominant; easy to become chaotic.

---

## 4. The 60-30-10 Rule

The single most practical rule for UI color balance. Originates from interior design, fully transferable to interfaces.

### The Ratio
| Role | % | What it is |
|---|---|---|
| **Dominant** | 60% | Primary background, surfaces, containers |
| **Secondary** | 30% | Supporting elements, sidebars, cards, text |
| **Accent** | 10% | CTAs, highlights, active states, links |

### Why it works
The proportions create visual hierarchy without the designer having to think about it. The eye moves from dominant → secondary → accent naturally. The accent becomes the focal point simply because it's the least used color.

### The accent rule
The accent must be the brightest, most vibrant, most saturated color in the palette. If all three colors are similarly muted, CTAs disappear — the rule only works when the accent has real contrast against the other two. A muted accent defeats the purpose entirely.

### Application in UI
- **60%** — Page background, main surface, navigation background
- **30%** — Cards, panels, secondary text, subtle borders, form fields
- **10%** — Primary buttons, links, active tabs, badges, focus rings, progress indicators

### Common mistakes
- Using accent color for decorative elements — dilutes its power
- Applying accent to large areas — breaks the 10% threshold
- Choosing an accent too close in value/saturation to the secondary — no pop
- Ignoring the rule for dark mode (see below)

---

## 5. Dark Mode Color Principles

Dark mode requires a different approach than simply inverting a light palette.

- **Never use pure black (#000000)** as a background — creates excessive contrast and eye strain. Use dark grey (e.g. #121212, #1A1A1A).
- **Never use pure white (#FFFFFF)** for text on dark — use off-white (e.g. #E8E8E8, #F5F5F5).
- **Reduce saturation** of accent colors — highly saturated colors on dark backgrounds cause chromatic vibration and fatigue. Desaturate 15–25%.
- **Raise the value** of accent colors slightly — what pops on white will be too dark on dark grey.
- The 60-30-10 rule still applies: dark surfaces at 60%, mid-dark panels at 30%, accent at 10%.
- **Elevation** in dark mode is expressed through lightness, not shadow: higher surfaces use progressively lighter grey overlays.

---

## 6. Color Psychology

Colors carry psychological and cultural associations. Use them intentionally.

| Color | Positive Associations | Caution |
|---|---|---|
| **Red** | Energy, urgency, passion, power | Error, danger, aggression — never use casually for CTAs in safety-critical UI |
| **Orange** | Warmth, enthusiasm, creativity, action | Can feel cheap if over-saturated |
| **Yellow** | Optimism, attention, clarity, warmth | Very low contrast on white; can feel caution/warning |
| **Green** | Growth, success, health, safety | Success states, financial apps, environment |
| **Blue** | Trust, reliability, calm, professionalism | Most universally positive — dominant in B2B and finance |
| **Purple** | Luxury, creativity, wisdom, mystery | Premium and creative products |
| **Pink** | Playfulness, warmth, romance, care | Health, beauty, inclusive/soft brands |
| **Brown / Earthy** | Stability, naturalness, warmth | Craft, organic, heritage brands |
| **Black** | Sophistication, authority, power, elegance | Luxury and premium |
| **White** | Cleanliness, simplicity, space, openness | Minimalism, healthcare, tech |
| **Grey** | Neutrality, balance, professionalism | Overuse = cold, lifeless |

### Cultural variance
Color meaning shifts across cultures. Red = luck in China, danger in the West. White = purity in Western contexts, mourning in parts of Asia. Green = go/safety in most of the world, but has religious significance in some regions. **Always validate color choices with real users in the target market.**

---

## 7. Color and Hierarchy

Color is one of five tools for visual hierarchy (alongside size, weight, spacing, and contrast). Hierarchy rules:

1. **High saturation + high value contrast** = maximum attention
2. **Low saturation + low contrast** = recedes into background
3. Never use color as the *only* signal — pair with shape, label, or icon for accessibility
4. Primary action: highest contrast color. Secondary action: secondary color. Destructive action: red, always distinct from primary.
5. Disabled states: always desaturate and reduce opacity — they should feel "turned off"

---

## 8. Accessibility (WCAG)

Never treat accessibility as optional.

| Level | Normal Text | Large Text (18pt+ or 14pt bold) |
|---|---|---|
| **AA (minimum)** | 4.5:1 | 3:1 |
| **AAA (ideal)** | 7:1 | 4.5:1 |

- **Color blind users** (8% of males): Never use color alone to convey meaning. Add labels, icons, or patterns.
- Common deficiencies: red-green (deuteranopia/protanopia), blue-yellow (tritanopia)
- Use tools like the APCA contrast model for modern UI contexts
- Test the full palette in greyscale — hierarchy must still hold with no color

---

## 9. Building a Palette — Process

1. **Start with brand intent** — what emotion, trust level, and energy does the product need?
2. **Pick a primary hue** — this becomes your dominant 60%
3. **Choose a harmony** — complementary for energy, analogous for calm, split-complementary for balance
4. **Apply 60-30-10** — assign roles before assigning specific hues
5. **Derive full scale** — for each hue, generate 5–9 tints/shades (e.g. 50/100/200…900)
6. **Define semantic tokens** — map palette values to purpose: `color.surface`, `color.primary`, `color.error`, `color.success`, etc. Never hardcode hex values in components.
7. **Test greyscale** — hierarchy must survive with color removed
8. **Test contrast** — every text/background combo must pass WCAG AA
9. **Test with users** — particularly for cultural fit and accessibility
10. **Define dark mode mappings** — map each semantic token to its dark-mode counterpart

---

## 10. Practical Rules for AI Design Decisions

Apply these whenever generating or reviewing UI color choices:

- If a CTA is invisible or weak, the accent is not vibrant enough or is overused
- If the design feels chaotic, there are too many accent colors or the 60-30-10 ratio is broken
- If the design feels flat and lifeless, saturation of the accent is too low
- If a dark mode feels harsh, backgrounds are too dark or text is too bright — pull both toward the middle
- If color is carrying meaning (status, error, success), always pair with a non-color signal
- Semantic naming (`primary`, `surface`, `on-surface`, `error`) always beats raw hex values in code
- When in doubt: less color, more contrast, one strong accent
