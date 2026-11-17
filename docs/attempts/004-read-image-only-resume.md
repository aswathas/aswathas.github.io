# 004 — Reading a résumé that is a picture

**Date.** 2026-11-17

The Drive file `ASWATH A S_Doc.pdf` has no text layer. `pypdf` and `pymupdf` both
returned an empty string for every page, which is the expected result for a
scanned or exported-as-image document and not a sign of a broken file.

**What was tried first.** Text extraction with two PDF libraries. Both returned
nothing, for the same reason: the glyphs are not in the file, they are pixels.

**What worked.** Rasterise the page at 150 dpi with `pymupdf`, then read the
image with a vision model and transcribe the layout by hand from the result.
The transcription was checked against an older, text-extractable copy of the same
résumé (`Aswath_Resume (1).pdf`) to confirm section names and dates.

**Why it is recorded.** The first instinct is to conclude the file is corrupt or
unreadable and to ask the user for a Word version. That would have been the wrong
call: the file was perfectly readable, just not as text. Asking the user for a
re-export would have cost a round trip and taught nothing.

**What it cost.** Reading images through the context-mode hook is throttled —
the hook rejects image reads over a size limit, so the raster had to be
re-encoded to a small JPEG before it could be looked at. The PDF itself never
had to enter the conversation.
