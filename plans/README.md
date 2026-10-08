# Animation plans

| # | Title | Severity | Status |
| --- | --- | --- | --- |
| 001 | Limit the house zoom so the photo never pixelates | MEDIUM | DONE |
| 002 | Make each scroll frame of the house tour cheap | MEDIUM | DONE |
| 003 | Make switching treatment tabs feel snappy | MEDIUM | DONE |

**Order**: 001 → 002 → 003. 001 and 002 touch the same `render()` function in `src/components/HouseTour.astro`;
run 001 first (one line), then 002. 003 is independent.
