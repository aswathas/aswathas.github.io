# 02 — Options considered

**Date.** 2026-10-15

Three problems needed a shape decided before code was written. This file records
what was considered, including the options that were dismissed without being built.

## How to produce the OG image

The site had no `og:image` at all. Something had to render a 1200×630 PNG.

### Option A — a static image, hand-designed once

Write the card once as HTML, render it to a PNG, and commit the PNG to `public/`.
Every page shares one image.

**Viable because:** there is nothing dynamic about this site. It is a static build
of a single person's portfolio, and the name and the tagline do not change per
route. A shared card is the honest one.

**Against it:** a single card cannot say "axiom" on the axiom page. Per-page cards
are better for a blog or a project index.

### Option B — a build-time Astro endpoint with `satori` + `resvg`

A `src/pages/og.png.ts` route that renders a React-ish element to SVG, rasterises
it, and returns a PNG. Each page would get its own title baked in.

**Viable because:** it is the standard Astro answer and it works at the edge.

**Against it:** it adds `satori` and a rasteriser to a project whose entire
dependency list is `astro` and `lucide-static`. The site is deliberately static
and small; this adds a real dependency tree to serve one image that a committed
PNG serves for free. Per-page titles are also worth less here than the rendering
is, because the vast majority of shares of this site will be the root URL.

### Option C — leave it, the favicon is enough

Rejected without being built. A 16×16 favicon stretched into a 1200×630 slot is
not a preview card.

### Chosen

Option A. See `03-decision.md`.

### The sub-decision: which renderer

Even within Option A, the PNG still has to come out of something. Headless Chrome
was already on the machine at `C:\Program Files\Google\Chrome\Application\chrome.exe`.
That made the renderer choice free — no `sharp`, no canvas polyfill, no Python
Pillow. The renderer is a one-off developer action that produced a committed
artifact, not something that runs in CI or on the server.

## How to fix the image loading priorities

The site has nine `<img>` tags.

### Option A — add `loading="lazy"` to all of them

The reflex fix, and it is the wrong one here. Seven of the nine are icons between
16px and 34px wide, several of them above the fold. Lazy-loading a 16px SVG that
is already visible delays it for no benefit and can produce a visible pop.

### Option B — judge each image by what it actually is

`index.astro` loads the same `/media/me.jpg` twice at 963×1280: once as the
portrait at the top, once in the right rail. The top one is very likely the
Largest Contentful Paint element, which means lazy-loading it would actively
*hurt*. The rail copy is below the fold and is a genuine lazy candidate. The
gallery on project pages already carried `loading="lazy"`.

**Chosen.** The portrait gets `fetchpriority="high"` and `decoding="async"`. The
rail copy gets `loading="lazy"`. The icons stay eager, because they are already
loaded when they are visible.

## How to fix the missing `site` in `astro.config.mjs`

### Option A — set `site` in the Astro config

One line. Every consumer of `Astro.site` — canonical, `og:url`, sitemap, RSS,
JSON-LD — picks it up.

### Option B — hardcode the origin at each use site

This is what `llms.txt.ts` was already doing, and it is how the placeholder got
there in the first place. Four call sites, four places to forget.

**Chosen:** Option A, plus removing the `?? 'https://example.com/'` fallbacks so
the next reader is not tempted to reinstate the pattern. The fallbacks in
`rss.xml.ts` and `sitemap.xml.ts` are still there and are now harmless, because
the value they fall back to is unreachable when `site` is set.

## What was considered and never built

**A custom cursor effect.** The user asked for "a better cursor animation effect
minimalistic and spider man like". Nothing was built. It was deferred rather than
rejected — see `attempts/` and the open questions in `06-verification.md`.

**Regenerating the project list.** `npm run sync` would pull the current 71 GitHub
repos into `src/data/projects.json`. The site lists 7. This was raised as a
possible cause of the unreproduced click bug and was **not** run, because running
it would have changed which cards exist and made the bug harder to characterise,
not easier.