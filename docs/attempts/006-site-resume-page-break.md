# 006 — The site's résumé PDF came out as two pages, and page 1 was half empty

**Date.** 2026-11-17

After the résumé content was wired into the site's print page, the generated
`public/resume.pdf` had two pages — and page 1 ended at y=466 of 842, roughly
half way down. Page 2 held the rest.

**Cause.** `src/styles/print.css` had

```css
section {
  break-inside: avoid;
}
```

The `SELECTED PROJECTS` section is longer than the space left on page 1, so the
browser moved the *entire* section to page 2 rather than splitting it. The result
was not a second page of overflow; it was a page that stopped halfway through
and a second page that started with a whole section.

**Fix.** Sections are allowed to break (`break-inside: auto` on `section`), the
individual entries keep `break-inside: avoid` so a job or a project is never cut
in half, and `h2` got `break-after: avoid` so a heading never sits alone at the
foot of a page.

**Then the second problem.** With the break fixed the document was still two
pages — now genuinely 1.4 pages of content. The print stylesheet was tuned down
(10mm margins, 8.5pt body, 8pt bullets, 1.3 line height, smaller photo, tighter
section spacing) until it fit one page with the footer intact. Final measure:
content ends at y=810 of 842, which is inside the 10mm bottom margin.

**Lesson.** `break-inside: avoid` is a page-level rule, not a paragraph-level
one. Applied to a container that can exceed a page, it converts overflow into a
blank half-page.

**Also recorded.** The first visual check of the site's HTML résumé was done by
screenshotting the built page over `file://`. That produced an unstyled,
apparently broken page — because Astro emits stylesheet links as absolute paths
(`/_astro/...`), and under `file://` those resolve to the filesystem root. The
page was fine; the test was wrong. The screenshot was taken again over
`http://127.0.0.1` with the built site served locally, and it rendered
correctly. A broken screenshot is not proof of a broken page.
