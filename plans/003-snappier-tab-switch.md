# 003 — Make switching treatment tabs feel snappy

- **Status**: DONE
- **Commit**: 6a9d0d6
- **Severity**: MEDIUM
- **Category**: Easing & duration
- **Estimated scope**: 1 file, ~10 lines

## Problem

Switching a treatment tab is UI the visitor may repeat several times in a row, but the panel takes up to ~660 ms
to settle (8 rows: 80 ms + 7 × 40 ms delay + 300 ms) and the icon draws for 900 ms. Meanwhile the panel heading
(accent word, title, text) teleports in with no transition, so the panel half-appears at once and half later.

```css
/* src/components/Treatments.astro:290-291 — current */
transition: stroke-dashoffset 900ms var(--ease-in-out);
transition-delay: calc(var(--i, 0) * 80ms);

/* src/components/Treatments.astro:346-349 — current */
transition:
  opacity 300ms var(--ease-out),
  transform 300ms var(--ease-out);
transition-delay: calc(80ms + var(--n) * 40ms);
```

## Target

UI budget: each row 200 ms, 30 ms stagger (the low end of the 30–80 ms range), rows start right away; the icon
draws in 600 ms; the heading block enters with the same row motion so the panel reads as one entrance.

```css
.icon path {
  transition: stroke-dashoffset 600ms var(--ease-in-out);
  transition-delay: calc(var(--i, 0) * 60ms);
}

.list li {
  transition:
    opacity 200ms var(--ease-out),
    transform 200ms var(--ease-out);
  transition-delay: calc(var(--n) * 30ms);
}

.panel-intro > :not(.icon) {
  transition:
    opacity 200ms var(--ease-out),
    transform 200ms var(--ease-out);
}

.is-ready .panel:not([hidden]) .panel-intro > :not(.icon) {
  @starting-style {
    opacity: 0;
    transform: translateY(4px);
  }
}
```

## Repo conventions to follow

- Entrance on tab change uses `@starting-style` on `.is-ready .panel:not([hidden]) ...` — see the existing
  `.list li` rule at `src/components/Treatments.astro:354`. Keyboard switches set `[data-instant]` on the root and
  must stay instant.
- Easing tokens: `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` and `--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)`
  in `src/styles/global.css`.

## Steps

1. Replace the two `.icon path` transition lines with the target values.
2. Replace the `.list li` transition and transition-delay with the target values.
3. Add the two `.panel-intro > :not(.icon)` rules after the `.list li` `@starting-style` rule.
4. Extend the existing instant rule to
   `[data-instant] .list li, [data-instant] .icon path, [data-instant] .panel-intro > * { transition: none; }`.
5. In the `@media (prefers-reduced-motion: reduce)` block, add
   `.is-ready .panel:not([hidden]) .panel-intro > :not(.icon) { @starting-style { transform: none; } }`.

## Boundaries

- Do NOT touch the tab indicator (`.tabs-active` clip-path 250 ms) — it already follows the recipe.
- Do NOT change markup or JS.

## Verification

- **Mechanical**: `npm run build` passes.
- **Feel check**: click through all four tabs quickly. Each panel must be fully settled within ~0.4 s; the heading
  and the rows must feel like one entrance, not two. Arrow keys still switch with no animation.
- DevTools Animations panel at 10 %: rows start immediately after the click, 30 ms apart.
- Rendering panel → emulate `prefers-reduced-motion: reduce`: panels fade, nothing moves.
- **Done when**: no transition in `Treatments.astro` panel content exceeds 200 ms (icon 600 ms excepted).
