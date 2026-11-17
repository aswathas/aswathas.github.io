# Session ledger

Every prompt that changed this project, what was decided, and what was done.
Kept as a ledger rather than a narrative: the narrative lives in `docs/`.

---

## 2026-11-17 — Myntra PM1 application résumé

**Prompt.** "D:\Downloads\Myntra PM1 Internship JD V2 (1).pdf" i want to apply for
this internship , get my resume from drive Aswath AS doc ( like that name) get it
read jd and redesign my jd and get me perfect resume which can get me into this
company

**Sources read.** The JD PDF (6 pages, text layer). The Drive file
`ASWATH A S_Doc.pdf` — image only, so rasterised and transcribed
(`docs/attempts/004-read-image-only-resume.md`). The user's own GitHub READMEs
and the site repo, for evidence.

**Decision.** Target the Analytics + Problem Solving track. One page, single
column, ATS-clean, no photo, business framing over stack framing, one source of
truth in `src/data/resume.json` shared by the site and the application artefact
(`docs/09-resume-options.md`).

**Action.** Read the JD, transcribed the current résumé, mined the GitHub
evidence, asked the two questions only the user could answer (CGPA, target
track), wrote the JSON, rebuilt the DOCX/PDF, wired the site's three résumé
surfaces to the same file, fixed the print page break, ran the site's test suite,
committed and pushed.

**Questions asked.** Two, both answered:

- CGPA — the user answered **8.3**. It was not inferred, estimated, or carried
  over from any other document.
- Target track — the user chose **Analytics + Problem Solving** over the other
  three work streams.

**Prompts in the middle of the task.** "use our latest project skills add our
aswath-chronicle asd site" — read as: record the work with the chronicle skill,
and put the résumé on the site. Both done.

**Decisions worth remembering.**

- The email address on the résumé was a guess between two candidates. Went with
  the one two sources agreed on and flagged it in the delivery doc
  (`docs/attempts/005-resume-email-discrepancy.md`).
- Tableau, Mixpanel, Jira and Figma are listed under "Building up", not claimed
  as skills. The JD says *eager to learn*; claiming them would die in an
  interview.
- The site's PDF and the application PDF are different renders of the same
  content. Left that way on purpose: the application file is the deliverable,
  the site's is the web copy.

**Not verified.** Whether `aswathas@20.com` is a live mailbox. Whether the CGPA
matches a marksheet. The Cloudflare deploy was not run — `wrangler` is not
authenticated on this machine.
