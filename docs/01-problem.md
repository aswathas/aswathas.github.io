# 01 — The problem

**Date.** 2026-10-15

The site at `aswathas.github.io` is a static Astro build served through Cloudflare
Pages, styled as a macOS desktop. It was working. It was not discoverable, and it
had at least one thing that did not work at all.

Three problems were on the table when this round started, and they came from three
different places: one from a person using the site, one from reading the source,
and one that had been sitting there since the first commit.

## What the user reported

The user opened with two reports. The first, verbatim:

> "when i click a project isn't not opening"

The second came later, after an audit round:

> "what else can you do ui improvement"
> "i wan to do all improvements"

The click report is still **unreproduced**. That matters for how this file should
be read: we fixed four things in this round and the reported bug is not one of
them. See `06-verification.md`.

## What reading the source found

The social links on `/contact/` were partly empty and partly wrong. `identity.linkedin`
was the empty string, so the LinkedIn row did not render at all. `identity.x` was
also empty, and worse, the row that would have shown it hardcoded the label
`@aswath_ig` — the Instagram handle, copy-pasted into the X row. A reader visiting
that page would have been told the Instagram account was the X account.

The user supplied the correct values during this session:

> "my linkedlin link is https://www.linkedin.com/in/aswathas11/ , my ig is aswath_ig"
> "for tewsiiter leave it just clickable go nowhere but i gave detail for the other 2"

The last part is a decision, not an omission: the X row stays visible and clickable
and goes nowhere, until there is an X handle to give it.

## What had been wrong since the first commit

This is the part that was not reported by anyone, because nobody reading a page can
see it.

`astro.config.mjs` was `defineConfig({})`. It had no `site` key. That one omission
produced three separate failures downstream:

- Every `<meta property="og:url">` and canonical link rendered as
  `http://localhost:4321/...` — the dev server's own address, shipped to production.
- The JSON-LD structured data in `Desktop.astro` reads `Astro.site?.href ?? 'https://example.com/'`.
  With `site` unset it took the fallback, so the schema.org `Person` and `WebSite`
  nodes declared the site to be **example.com**.
- `llms.txt.ts` did not read `Astro.site` at all. It hardcoded
  `const site = 'https://example.com'`. So `llms.txt` — the file this project
  deliberately publishes for AI agents to read — pointed every agent at a domain
  that does not exist.

The sitemap and RSS endpoints read `site?.href ?? 'https://example.com/'`, so they
were wrong for the same reason, though their fallback is correct once `site` is set.

## What it costs

The canonical and `og:url` problem means search engines were told the authoritative
address of every page was a localhost URL. The `example.com` problem means the
structured data — the part intended to tell a search engine who this person is —
was pointing at a placeholder domain.

The missing `og:image` means every link to this site, shared anywhere that renders
previews, appeared as a bare text card. For a portfolio whose main distribution
channel is a link in a LinkedIn post, that is the difference between a card and a
URL.

The empty LinkedIn row means a visitor looking for the LinkedIn profile does not
find one.