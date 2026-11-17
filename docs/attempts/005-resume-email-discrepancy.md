# 005 — Two different emails on two résumés

**Date.** 2026-11-17

Three sources disagree about which address to print.

| Source | Address |
| ------ | ------- |
| Drive `ASWATH A S_Doc.pdf` (the résumé being replaced) | `aswathas@20.com` |
| Older résumé `Aswath_Resume (1).pdf` | `aswathas20@gmail.com` |
| `git config user.email` on this machine | `aswathas20@gmail.com` |
| `src/data/site.ts`, before this change | `aswathas@20.com`, carrying the comment `// TODO: real links` |

`aswathas@20.com` reads like a truncated `aswathas20@gmail.com`, and the
`// TODO: real links` comment above it says the author was not confident in that
line. Two independent sources agree on the Gmail address and one carries a
"not sure" marker on the other.

**Decision.** The Gmail address was used, and the site's `TODO` comment and the
duplicate `tagline` key in the same object were cleaned up while the file was
open.

**Flagged, not buried.** This is the one fact in the résumé that was inferred
rather than confirmed. If `aswathas@20.com` is a real, working mailbox, the
user has to say so and both the résumé and the site change back. An application
that bounces mail is a silent rejection.

**Lesson.** A résumé is a contact sheet. One wrong character is a lost
application, and the character most likely to be wrong is the one that looks
almost right.
