# 04 — Plan

**Date.** 2026-10-15

Locked. Three phases, in order. Phase 1 and 2 shipped; phase 3 is open.

## Phase 1 — Make the existing values correct

Nothing new. No new files, no new dependencies.

- Set `linkedin` in `src/data/site.ts` to the URL supplied by the user.
- Correct `llms.txt.ts`, which hardcoded `https://example.com`.
- Make the X row render unconditionally, fall back to `#`, carry
  `aria-disabled` when empty, and stop labelling itself `@aswath_ig`.

## Phase 2 — Make the pages describe themselves

- Set `site` in `astro.config.mjs`. This alone fixes canonical, `og:url`, sitemap,
  RSS and the JSON-LD `base` in one line.
- Add a `description` prop to `Desktop.astro`, defaulting to `identity.tagline`, so
  a route can describe itself without duplicating the meta block.
- Add an `image` prop defaulting to `/og.png`.
- Emit `og:image`, `og:image:width`, `og:image:height`, `og:site_name`,
  `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`, and a
  `<link rel="canonical">`.
- Pass `post.summary` from blog routes and `project.description` from project
  routes.
- Render `public/og.png` with headless Chrome.
- Set image priorities: `fetchpriority` on the hero portrait, `loading="lazy"` on
  the rail copy.

## Phase 3 — The reported defect, and the cursor effect

**Not shipped. This phase is open.**

- Reproduce "when i click a project isn't not opening". Every static check passed:
  the card `href` values are correct, every `/project/<slug>/` page returns 200,
  no overlay has `pointer-events` enabled over the cards, no listener calls
  `preventDefault` on them, and no responsive rule hides them. The bug was not
  found.
- Build the cursor effect. Described by the user as "minimalistic and spider man
  like". Not started.

## Deliverables this plan does not include

- Regenerating `src/data/projects.json` via `npm run sync`. The site lists 7 of
  71 repositories. Deliberately not run during this round — see `02-options.md`.
- Removing the `?? 'https://example.com/'` fallbacks now that they are unreachable.
- The dev-server port note: local runs land on 4322 because 4321 is occupied.

## Verification for each phase

Phase 1 and 2: `npm run build` clean, `npm test` green, `curl` the deployed HTML
and grep for the emitted tags rather than trusting that the component compiled.
Phase 3 cannot be verified until it exists.