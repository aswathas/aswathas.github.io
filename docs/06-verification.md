# 06 — Verification

**Date.** 2026-10-15

## What passed

**Build.** `npm run build` completed clean, 18 pages, three times — once before the
first commit, once after adding `site`, once after clearing caches for the local
dev server.

**Tests.** `npm test` → 6 tests, 6 pass, 0 fail. These cover the search library
(case-insensitivity, AND semantics, kind narrowing, unknown-kind matches nothing).
They do not cover any of the changes made in this round — see untested, below.

**The OG card is served.** `curl -o /dev/null -w "%{http_code}"` against
`https://aswathas-site.pages.dev/og.png` → 200.

**Meta tags are emitted on a real page.** Fetching the deployed
`/project/axiom/` and grepping the HTML returns:

```
<link rel="canonical" href="https://aswathas-site.pages.dev/project/axiom/">
<meta property="og:image" content="https://aswathas-site.pages.dev/og.png">
<meta name="twitter:card" content="summary_large_image">
```

**The `example.com` placeholder is gone.** `grep -rl "example.com" dist/` returns
nothing after the `astro.config.mjs` change. This is the check that mattered most,
because that string was the structured data's claim about who owns the site.

**JSON-LD now names the real site.** The `Person` and `WebSite` nodes carry
`"@id":"https://aswathas-site.pages.dev/#person"` rather than the fallback.

**llms.txt names the real site.** The deployed file's first lines include
`Canonical website: https://aswathas-site.pages.dev/`.

**RSS uses the real origin.** The channel `<link>` is
`https://aswathas-site.pages.dev/`.

**The LinkedIn link is live.** The deployed `/contact/` contains
`https://www.linkedin.com/in/aswathas11/`.

**The X row behaves as specified.** Deployed HTML:
`<td>X</td><td class="date"><a href="#" rel="noreferrer" aria-disabled="true">—</a></td>`
— visible, clickable, goes nowhere, and no longer claims the Instagram handle.

**Local dev server.** Running on :4322 after clearing `node_modules/.vite`, `dist`
and `.astro`. Home, `/og.png` and `/project/axiom/` all return 200, and the
canonical link correctly resolves to the production origin because it derives from
`astro.site`, not from the request host.

## What failed

**The first verification of the URL fix reported a false negative.** Immediately
after deploying the `astro.config.mjs` change, `curl` against production returned
`<link rel="canonical" href="http://localhost:4321/project/axiom/">` — the exact
wrong value the change was supposed to fix. The `og:image` and `twitter:card` tags
from the same build were present and correct, which is the part that made it
confusing: a single response mixed the new build's tags with the old build's
canonical.

It was Cloudflare's edge cache, not a stale deploy. Re-fetching with
`Cache-Control: no-cache` and a `?cb=$RANDOM` buster returned the correct
production URL on the first try, and on two subsequent polls.

The lesson recorded here: when a deployed page disagrees with a change you just
shipped, check the cache before rebuilding. Rebuilding would not have fixed it and
would have produced a third identical deploy.

**`agent-browser` never ran.** The attempt to reproduce the click bug in a real
browser hung past 180 seconds, was backgrounded, and produced no output on two
follow-up checks. No interactive verification of any kind was performed on this
site this round. See `attempts/002`.

## Still untested

**The click bug.** Unreproduced. No static check found a cause, and no browser was
ever driven. This is the one thing the user actually reported, and it is not fixed.

**The cursor effect.** Not built.

**No visual regression check.** Every verification above is `curl` and grep — HTML
strings, not pixels. Nothing confirmed that adding the meta tags or the
`fetchpriority` attribute changed nothing visually. Both are head-only changes and
should be inert, but "should be" was not verified.

**No accessibility re-check.** `aria-disabled` was added to the X anchor. Whether
an `aria-disabled` anchor with `href="#"` is the right pattern for a
deliberately-dead link was not tested with a screen reader. `aria-disabled` on an
`<a>` is not universally announced, and a link whose only action is to jump to the
top of the page is arguably worse than no link at all.

**No test coverage for anything changed.** The 6 passing tests are the search
library. There is no test asserting that `Astro.site` is set, that the OG tags are
emitted, or that `linkedin` is non-empty. All four would have caught a regression
of what was fixed here, and none exists.

**Cross-browser.** Everything was verified by `curl` and by reading the HTML.
Nothing was opened in Firefox, Safari, or Edge.

**Mobile.** No viewport narrower than the default was rendered or checked. The
site has responsive rules for 900px, 700px and 520px that were read but not
exercised.