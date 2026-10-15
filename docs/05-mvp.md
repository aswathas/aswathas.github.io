# 05 — MVP scope

**Date.** 2026-10-15. **Written after the round shipped**, against what actually
landed, not against what was hoped for. `04-plan.md` locked three phases; phases 1
and 2 shipped and are in scope here. Phase 3 did not, and this file is where that
becomes a decision rather than an open item.

If you are about to add something to this list, read the reason first. Every
exclusion below was made for a stated reason, and several of them are exclusions
the person who wrote them would have argued for the other way.

## What the MVP does

**Every route describes its own absolute address.** `astro.config.mjs` declares
`site`, and `Desktop.astro` emits `<link rel="canonical">` and `og:url` from it.
`og:url` used to render as `http://localhost:4321/...` in production, which told
every search engine the authoritative address of every page was the dev server's
own loopback address.

**The structured data names the real site.** The `Person` and `WebSite` JSON-LD
nodes in `Desktop.astro` carry `@id` values under `https://aswathas-site.pages.dev`
instead of falling back to `https://example.com/`.

**`llms.txt` names the real site.** That endpoint hardcoded
`https://example.com` outright. It is the file this project publishes for agents
to read, and it was pointing them at a domain that does not exist.

**Every route has a shareable preview card.** `public/og.png` is a committed
1200×630 PNG, and `Desktop.astro` takes an `image` prop defaulting to `/og.png`,
emitting `og:image` with its width and height, plus `og:site_name`,
`twitter:card`, `twitter:title`, `twitter:description` and `twitter:image`.
Before this, any link to the site shared anywhere that renders previews appeared
as a bare text card.

**Routes can describe themselves.** `Desktop.astro` takes a `description` prop
defaulting to `identity.tagline`. Blog routes pass `post.summary`, project routes
pass `project.description`. One meta block, described per page.

**The LinkedIn row is live.** `identity.linkedin` was the empty string, so the
row did not render at all. It now carries the URL the user supplied:
`https://www.linkedin.com/in/aswathas11/`.

**The X row renders and is honestly dead.** It renders unconditionally rather than
being hidden while `identity.x` is empty, because the user asked for exactly
that — "leave it just clickable go nowhere". Its `href` falls back to `#`, it
carries `aria-disabled` while the URL is empty, and its label is `—`. It no longer
says `@aswath_ig`, which was the Instagram handle hardcoded into the X row: a
visitor was being told the Instagram account was the X account.

**Images are prioritised by what they actually are.** The hero portrait in
`index.astro` is very likely the LCP element and now carries
`fetchpriority="high"` with `decoding="async"`. The duplicate copy of the same
963×1280 photograph in the right rail is below the fold and carries
`loading="lazy"`. The 16–34px icons stay eager, because they are already loaded
when they are visible. See `attempts/001` for why the reflex fix was wrong.

## What the MVP deliberately does not do

**It does not fix "when i click a project isn't not opening".** The reported bug
was never in this repository. Six static hypotheses were tested and eliminated
here, and the cause turned out to be a `preventDefault()` in a click handler in
the sibling repository `agent-chronicles`, which was built the same day. This site
never had the bug. See `attempts/002`.

**It does not ship a custom cursor effect.** The user asked for "a better cursor
animation effect minimalistic and spider man like". The sibling repository built
it, used it, and removed it: a 12px dot was worse than the native pointer and it
broke text selection. The theme does not need a cursor — it has web patterns on
hover, a tether as a position indicator, and an edge alarm. This is not a
deferral; it is a decision not to build. Revisit with a reason beyond theming. See
`attempts/003`.

**It does not regenerate the project list.** `npm run sync` would pull the
current 71 GitHub repos into `src/data/projects.json`. The site lists 7. It was
raised as a candidate cause for the click bug and deliberately not run, because
running it changes which cards exist and would have made the bug harder to
characterise rather than easier. The list is curated, and curation is the
behaviour.

**It does not remove the `?? 'https://example.com/'` fallbacks** in
`rss.xml.ts` and `sitemap.xml.ts`. They are unreachable while `site` is set. They
remain the exact pattern that produced the bug, and they are worth removing
before anyone copies one into a new endpoint — but they are harmless today and
removing them did not earn its own commit.

**It does not remove `?? 'https://example.com/'` from `Desktop.astro`** for the
same reason it was judged harmless rather than urgent.

**It has no test for anything in this round.** `npm test` runs 6 tests against the
search library. Nothing asserts that `Astro.site` is set, that the OG tags are
emitted, or that `linkedin` is non-empty. All three would catch a regression of
what was fixed here. Adding them was not in scope for a round whose job was to
make existing values correct.

**It is not verified in a browser.** Every check in `06-verification.md` is
`curl` and grep against HTML strings. No viewport, no cross-browser, no screen
reader, no pixels. Both changes are head-only and should be inert, and "should be"
was not confirmed.

**It adds no dependency.** No `satori`, no rasteriser, no canvas library. The OG
card was rendered once by a developer and committed as a PNG, which is what keeps
the build `npm ci && astro build`.