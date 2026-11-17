# 007 — The bullets were invisible to text extraction

**Date.** 2026-11-17

The first DOCX build produced a PDF whose bullets rendered fine on screen but
extracted as **zero** `•` characters. The font list showed the cause:

```
(9.5, 'SymbolMT')  15
```

Fifteen spans in SymbolMT — the font Word uses for the stock bullet glyph. The
glyph itself is `U+F0B7`, a **private use area** codepoint, not `U+2022`.

**Why this mattered.** On screen the bullet looks like a bullet. In the text
layer it is a codepoint that many parsers either drop or surface as junk, so the
extracted résumé loses the bullet markers and, with them, the structure that
tells a parser which lines are achievements and which are headers.

**Fix.** The numbering definition behind the `List Bullet` style was patched so
level 0 points at Calibri's real bullet: `lvlText` set to `•`, and the run fonts
set to Calibri instead of SymbolMT. `python-docx` has no API for this, so the
numbering part is edited through its XML.

**Verification.** After the patch the font table contains no SymbolMT at all, the
extracted text contains 15 `•` characters, and no character in the document falls
in the private use area.

**Lesson.** A résumé is read twice — once by a person, once by a parser. The
person sees the same thing either way; the parser sees the difference. Checking
the extracted text, not the rendering, is what catches this class of defect.
