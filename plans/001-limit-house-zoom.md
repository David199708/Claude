# 001 — Limit the house zoom so the photo never pixelates

- **Status**: DONE
- **Commit**: 6a9d0d6
- **Severity**: MEDIUM
- **Category**: Physicality & origin
- **Estimated scope**: 1 file, 1 line

## Problem

The scroll tour zooms the house photo to `scale(2.6)` (1 + 0.1 + 1.5). The source image is 640×480 px and is
already stretched to full viewport width (~1280–1920 px), so at peak zoom it is upscaled 5–8×: the bricks and
shutters turn into visible blocks right before the crossfade. Motion should make the house feel closer, not show
compression artefacts.

```ts
// src/components/HouseTour.astro:127 — current
imgs[0].style.transform = `scale(${1 + 0.1 * grow + 1.5 * zoom})`;
```

## Target

Peak scale 1.6 (1 + 0.1 + 0.5). The blur crossfade that follows (plan 002) carries the "stepping inside" feeling,
so the zoom does not need to travel as far.

```ts
// target
imgs[0].style.transform = `scale(${1 + 0.1 * grow + 0.5 * zoom})`;
```

## Repo conventions to follow

- All tour motion is computed in the `render()` function of `src/components/HouseTour.astro`; transforms are set
  directly on the element (`imgs[n].style.transform`), never through CSS variables.

## Steps

1. In `src/components/HouseTour.astro`, change the line shown above (`1.5 * zoom` → `0.5 * zoom`). Nothing else.

## Boundaries

- Do NOT change the segment timings (`seg(p, 0.18, 0.5)` etc.), the transform-origin, or other layers.
- If the line does not match exactly, STOP and report.

## Verification

- **Mechanical**: `npm run build` completes without errors.
- **Feel check**: `npm run preview`, open http://localhost:4321/#gutshaus on a 1280 px wide window, scroll slowly
  through the tour. At the moment just before the image blurs, shutters and window frames must still read as
  shapes, not as square pixel blocks. The zoom should still feel like moving towards the entrance.
- **Done when**: the max scale in the file is 1.6 and the build passes.
