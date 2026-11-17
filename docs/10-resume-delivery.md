# 10 — What was delivered

**Date.** 2026-11-17

## The application artefact

`C:\Users\ADMIN\Downloads\myntra\resume\out\`

| File | What it is |
| ---- | ---------- |
| `Aswath_AS_Resume_Myntra_PM1.docx` | Editable one-pager, A4, Calibri, single column |
| `Aswath_AS_Resume_Myntra_PM1.pdf` | The file to attach to the application — a LibreOffice render of the same DOCX |
| `Aswath_AS_Resume_Myntra_PM1.txt` | Plain-text twin, for pasting into a form that rejects PDFs |

The builder is `C:\Users\ADMIN\Downloads\myntra\resume\build_resume.py`. It reads
`src/data/resume.json` from this repo, so the content lives in one place and the
DOCX cannot disagree with the site.

## The site

| Path | Change |
| ---- | ------ |
| `src/data/resume.json` | **New.** The résumé content, single source of truth |
| `src/data/site.ts` | `education`, `experience` and `skills` now re-export from `resume.json`; the `aswathas@20.com` email and the duplicated `tagline` key were removed |
| `src/pages/resume.astro` | Renders the résumé from `resume.json`; the project's own table is kept under "ALL PROJECTS" so the site keeps its project pages |
| `src/pages/resume-pdf.astro` | Print view, renders the same file |
| `src/pages/resume.txt.ts` | Plain-text route, renders the same file; section headers were losing their newlines |
| `src/styles/print.css` | Fixed the page break, then tuned to fit one page |
| `public/resume.pdf` | Regenerated from the print page with headless Chrome |

## Verification

Checked on the artefact, not on the source:

- **One page.** The DOCX PDF is 1 page, 719 words, content ending at y=796 of 842.
- **Text layer.** Text extracts in reading order; no character in the document
  falls in the Unicode private use area; 15 bullets extract as `•`.
- **Keywords.** `SQL`, `Excel`, `Google Sheets`, `Tableau`, `Mixpanel`, `Jira`,
  `Figma`, `Agile`, `Scrum` all present. `CGPA 8.3` present.
- **Layout.** The rendered pages were rasterised and read back: no clipping, no
  overlap, right-hand dates flush to the right margin, uniform bullet indents.
- **Site.** `npm run build` clean, `npm test` 14/14 pass, `dist/resume.txt`
  carries the new content, the old email no longer appears in the built site.
- **Site PDF.** 1 page, 721 words, photo header, right-aligned meta column.

## Regenerating

```bash
# site
npm install && npm run build && npm test
"/c/Program Files/Google/Chrome/Application/chrome.exe" --headless=new --disable-gpu \
  --no-pdf-header-footer --print-to-pdf=public/resume.pdf \
  "file:///$(pwd)/dist/resume-pdf/index.html"

# application artefact
python C:/Users/ADMIN/Downloads/myntra/resume/build_resume.py
"/c/Program Files/LibreOffice/program/soffice.exe" --headless --convert-to pdf \
  --outdir C:/Users/ADMIN/Downloads/myntra/resume/out \
  C:/Users/ADMIN/Downloads/myntra/resume/out/Aswath_AS_Resume_Myntra_PM1.docx
```

## Not done, and why

- **No cover letter.** Not asked for. The résumé was the brief.
- **No Cloudflare deploy.** `wrangler` is not authenticated on this machine, so
  the site was not published. The commit is ready; `npx wrangler login && npm run
  deploy` publishes it.
- **No per-track variants.** See `docs/09-resume-options.md`. The JSON makes
  them cheap if Myntra asks.
- **No LinkedIn or Instagram copy.** The résumé mentions the profile link but
  the profiles themselves were not rewritten.

## Open risks

1. **The email address is inferred.** `aswathas20@gmail.com` was used because
   two independent sources agree on it and the alternative carried a `TODO`. If
   `aswathas@20.com` is the real mailbox, both the résumé and the site must
   change. See `docs/attempts/005-resume-email-discrepancy.md`.
2. **CGPA 8.3 came from the user, unverified** against any marksheet. It is the
   one academic number on the document.
3. **"Excel / Google Sheets" is listed as a working tool**, on the strength of
   the spreadsheet work behind the market assessment and the back-test results.
   It is not claimed as expert. If a spreadsheet is asked for in the exercise,
   this is the line that gets tested.
4. **The site's PDF and the application PDF are different renders** of the same
   content — one from Chrome, one from LibreOffice. Same words, different
   typography. Attach the application one; the site's is for the website.
