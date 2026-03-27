# Web Development Preferences

---

## TypeScript

- All types must be professional, precise, and purposeful — no lazy `any`, no redundant type annotations where inference suffices.
- Never duplicate types. Before defining a new type, check if an existing one can be reused or extended.
- Use OOP principles (interfaces, abstract classes, inheritance, generics) when modeling domain entities or shared contracts.
- Prefer `interface` for object shapes that may be extended; prefer `type` for unions, intersections, and utility compositions.

---

## Styling

- Always prefer plain CSS (or CSS Modules) over Tailwind or other utility-class frameworks.
- Exception: if the repo is already using Tailwind or another framework, continue using it consistently — do not mix.
- Never introduce a new styling framework into a project that doesn't already use one.

---

## Icons

- Never use emojis as icons in UI — not in buttons, labels, navigation, or anywhere visual.
- Always source icons from a proper icon library. Prefer using the `svg-icons` skill to fetch them.
- Regardless of project type (React, Vue, plain HTML, etc.), always store fetched icons at:
  ```
  <src>/assets/icons/
  ```
  where `<src>` is the project's source root (e.g. `src/`, `app/`, etc.).

---

## CSS — Conditional Styling

- For conditional styling, prefer `data-*` attributes over toggling class names.
- Set the attribute on the element to reflect its current state, then target it in CSS using attribute selectors.

  Prefer:
  ```tsx
  <button data-variant="primary" data-disabled={isDisabled}>Click</button>
  ```
  ```css
  button[data-variant="primary"] { background: blue; }
  button[data-disabled="true"] { opacity: 0.5; pointer-events: none; }
  ```

  Avoid:
  ```tsx
  <button className={`btn ${isPrimary ? 'btn--primary' : ''} ${isDisabled ? 'btn--disabled' : ''}`}>Click</button>
  ```

- This keeps conditional logic out of class string construction, makes state explicit in the DOM, and keeps CSS selectors readable and co-located with the element's semantics.

---

## React — Component Composition

- Prefer nested children composition over prop-injection of components.
- Pass behavior and data via props; pass structure and layout via `children`.

  Prefer:
  ```tsx
  <Card>
    <Card.Header>Title</Card.Header>
    <Card.Body>Content</Card.Body>
  </Card>
  ```

  Avoid:
  ```tsx
  <Card header={<Header />} body={<Body />} />
  ```

---

## React — Context API

- Do not avoid React Context out of habit or fear of complexity.
- Use Context to expose a component's internal API to its children — this is idiomatic and correct for compound components, providers, and feature-scoped state.
- Structure: define the context, expose a `use<Name>` hook for consumers, and wrap with a provider at the appropriate tree boundary.
