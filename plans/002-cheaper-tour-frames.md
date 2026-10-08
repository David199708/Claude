# 002 — Make each scroll frame of the house tour cheap

- **Status**: DONE
- **Commit**: 6a9d0d6
- **Severity**: MEDIUM
- **Category**: Performance
- **Estimated scope**: 1 file, ~15 lines

## Problem

`render()` in `src/components/HouseTour.astro` runs on every scroll frame and does two expensive things:

1. It forces layout four times per frame by reading geometry that only changes on resize:

```ts
// src/components/HouseTour.astro:113-121 — current
const rect = tour.getBoundingClientRect();
const total = tour.offsetHeight - sticky.offsetHeight;
const p = clamp((parseFloat(getComputedStyle(sticky).top) - rect.top) / total);
const vw = window.innerWidth;
...
const gy = frame.offsetHeight * 0.07;
```

2. It animates `filter: blur(0→6px)` on a full-viewport image during the crossfade:

```ts
// src/components/HouseTour.astro:129 — current
imgs[0].style.filter = out0 > 0 ? `blur(${out0 * 6}px)` : '';
```

Measured in Chromium with 4× CPU throttling: 3 of 147 frames over 33 ms in the tour, 0 elsewhere. Full-screen
blur is notably more expensive in Safari/iOS, where this is most likely to stutter.

## Target

- Read static geometry once and on `resize`; per frame only read `tour.getBoundingClientRect().top`.
- Keep the blur (it masks the double exposure of the crossfade, as intended) but cap it at 2px — the value the
  blur-mask recipe uses — and clear it as soon as the layer is fully transparent.

```ts
// target (inside the `if (tour && !reduce.matches)` block)
let stickTop = 0, total = 1, gx = 16, gy = 0;
const measure = () => {
  stickTop = parseFloat(getComputedStyle(sticky).top);
  total = tour.offsetHeight - sticky.offsetHeight;
  const vw = window.innerWidth;
  gx = vw >= 1216 ? (vw - 1120) / 2 : Math.min(48, Math.max(16, vw * 0.05));
  gy = frame.offsetHeight * 0.07;
};

// in render():
const p = clamp((stickTop - tour.getBoundingClientRect().top) / total);
...
imgs[0].style.filter = out0 > 0 && out0 < 1 ? `blur(${out0 * 2}px)` : '';
```

## Repo conventions to follow

- rAF-throttled `schedule()` already exists; keep it. Resize currently calls `schedule`; change it to
  `() => { measure(); schedule(); }`.

## Steps

1. Add the `measure` function and the four `let` variables above, right after `const steps = ...`.
2. In `render()`, delete the lines computing `rect`, `total`, `p`, `vw`, `gx`, `gy`, and replace with the single
   `const p = ...` line above (the `gx`/`gy` uses below stay as they are, now reading the outer variables).
3. Replace the blur line with the target blur line.
4. Replace `window.addEventListener('resize', schedule);` with
   `window.addEventListener('resize', () => { measure(); schedule(); });`
5. Call `measure();` once directly before the existing initial `render();`.

## Boundaries

- Do NOT change segment timings, scale values, captions or steps logic.
- Do NOT switch to a library or to CSS scroll-driven animations.

## Verification

- **Mechanical**: `npm run build` passes; in the browser console no errors while scrolling.
- **Feel check**: scroll slowly through the tour; the card-to-fullscreen growth, zoom, crossfade and captions must
  look identical to before except a softer blur at the house→room crossfade. Resize the window mid-tour: the card
  insets must still match the page gutters.
- In DevTools Performance with 4× CPU slowdown, scroll through the tour: no "Forced reflow" warnings from `render`.
- **Done when**: `render()` contains exactly one geometry read (`getBoundingClientRect`) and blur never exceeds 2px.
