# 09 — Résumé options, and what was chosen

**Date.** 2026-11-17

Five options were on the table. Three of them are dead on arrival, and the
interesting argument is between the last two.

## Option A — edit the existing résumé in place

Keep the layout, the photo, the section order; swap the wording.

**Rejected.** It inherits the two problems the JD cares about: an image-only PDF
(no ATS can parse it) and an engineering framing. And the fix for the image is a
full re-layout anyway, so "edit in place" is not cheaper than rebuilding — it is
rebuilding with a worse constraint.

## Option B — two-column, photo, designed

The kind of résumé that reads well in a human's eye and badly in a parser.
Columns and sidebars are exactly what breaks ATS extraction: reading order
becomes ambiguous, and half the content can end up in a text layer nobody reads.

**Rejected.** The JD lists "Excel and Google Sheets", "SQL", "Tableau" as
requirements. Those are words a parser looks for. A layout that scrambles reading
order works against the one thing this application is being judged on.

## Option C — keep the résumé, add a second "PM projects" document

Leave the application résumé alone and attach a project write-up.

**Rejected.** Two documents means two things to read, and the short one is still
the image-only one.

## Option D — one page, single column, no photo, ATS-clean, PM-framed

One column. Standard headings in the order a parser expects (SUMMARY / EDUCATION /
EXPERIENCE / PROJECTS / SKILLS). No tables, no graphics, no photo. A text layer
that extracts cleanly. Every bullet carrying a number or a decision. One page,
because a screen is one page.

**Chosen**, with two conditions attached.

**Condition 1: one source of truth.** The résumé was going to exist in three
places — the application PDF, the site's HTML résumé, the site's PDF. Three
copies is three résumés, and they drift the first time one is edited. So the
content lives in one file, `src/data/resume.json`, and everything renders it:
the site's HTML page, the site's print page, the site's plain-text route, and the
DOCX builder that produces the application artefact.

**Condition 2: the application PDF is the one that matters.** The site copy is
nice-to-have; the file attached to the application is the deliverable. So the
DOCX/PDF pipeline got the verification effort — page count, text layer, bullet
encoding, keyword presence — and the site's print page got a page-break fix and
a density pass.

## Option E — a separate "PM" résumé variant per Myntra work stream

Four variants, one for Analytics, one for Problem Solving, one for Product Ops,
one for Program Management.

**Rejected for now.** The JD offers four streams but the user picked one track,
and a résumé that changes its story per version is a résumé nobody has reviewed.
The numbers that carry Analytics (83 sources, 100 localities, 32,450 → 142
tokens) also carry Problem Solving, and both are the same skill wearing
different vocabulary. One strong document beats four thin ones.

**Kept open:** if the application asks for a track-specific document, the JSON
makes it a one-file edit, not a rewrite.

## What the framing rules became

- **Every bullet carries a number or a decision.** "Sized a two-corridor market
  from 83 cited sources" beats "Researched the market". "Turned the evidence
  into a go/no-go verdict with a 90-day launch plan" beats "Made a launch plan".
- **Output before input.** The bullet starts with what was decided or shipped,
  not with what was read or learned.
- **Name the trade-off, not just the tool.** "Designed the evaluation to choose
  the architecture, not to prove it" is the sentence that reads as product
  thinking.
- **Say what you are building up.** Tableau, Mixpanel, Jira and Figma are listed
  under "Building up" rather than claimed as skills. The JD says *eager to
  learn* SQL, Tableau or Mixpanel; pretending otherwise is the kind of thing
  that dies in an interview.
- **Business words, not stack words.** "financial statements", "KPIs",
  "root-cause analysis", "pricing and route economics" — the vocabulary of the
  four work streams, with the stack listed separately under Technical.

## The verification gate

The DOCX is only accepted when all of these hold:

1. One page. A second page is a page the recruiter may not scroll to.
2. A real text layer, extractable, in reading order.
3. Bullets that survive extraction as `•` — which is why the numbering definition
   was patched. See `docs/attempts/007-resume-bullet-encoding.md`.
4. Every JD keyword present: SQL, Excel, Google Sheets, Tableau, Mixpanel,
   Jira, Figma, Agile, Scrum.
5. Nothing that is not true. Where the user could not supply a fact (CGPA), the
   question was asked instead of guessed.
