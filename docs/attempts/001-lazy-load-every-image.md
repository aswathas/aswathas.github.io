# Attempt 001 — `loading="lazy"` on every image

**Opened.** 2026-10-15, during the UI audit round.

**Hypothesis.** Nine `<img>` tags on the site and only one carried
`loading="lazy"`. Adding it to the rest would cut initial page weight, because the
gallery screenshots are large PNGs and lazy-loading defers them until they approach
the viewport.

**How we tested it.** Grepped every `<img>` tag across `src/pages/` and
`src/layouts/` and counted which ones carried the attribute. Found 9 images, 1 with
`loading="lazy"`. Then read each one's dimensions rather than assuming.

**What actually happened.** The count was correct and the conclusion was wrong.
Seven of the nine images are icons between 16px and 34px wide — dock tiles, project
card icons, menubar favicons. They are SVG, they are kilobytes, and most sit above
the fold where the lazy attribute does nothing useful.

Worse, the ninth image was the problem. `index.astro` loads the same
`/media/me.jpg` at 963×1280 twice: once as the portrait at the top of the page,
once in the right rail. The top one is very likely the Largest Contentful Paint
element. Lazy-loading it would have delayed the single image the page is judged by,
which is the exact opposite of the intent.

**Outcome.** Abandoned.

**Why we moved on.** The audit that motivated the change was checking a property
without reading the values. `grep -c loading=` returns 8 misses, which looks like
omission, and is actually mostly correctness. The real image problem on this page
was priority, not deferral, and the fix was the opposite attribute: `fetchpriority="high"`
on the portrait, `loading="lazy"` on the rail copy only.

**What this attempt is a reminder of.** A count of missing attributes is not a
count of missing optimisations. Read the dimension and the position of each
element before deciding it needs anything.