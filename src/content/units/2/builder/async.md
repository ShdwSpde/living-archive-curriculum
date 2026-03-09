# Unit 2: Choosing a Historical Figure — Async Materials
**Pathway:** Archive Builder
**Duration:** 30–45 min

## Learning Objectives
- Locate a historical figure's digitized texts on Internet Archive and assess their usability
- Distinguish between .txt, _djvu.txt, and .pdf formats and understand why format matters for ingestion
- Set up a corpus inventory spreadsheet that will track files through the full pipeline

## Reading

### Finding Your Figure on Internet Archive

Internet Archive (archive.org) is the primary source for public-domain digitized texts. Most historical figures with substantial pre-1931 publication records have significant collections there. The search interface is simple but knowing how to read results makes the difference between a good corpus and a frustrating one.

**How to search:** Go to archive.org and search for your figure's name. Then filter by "Texts" in the left sidebar. You'll often find both a dedicated collection (e.g., "W.E.B. Du Bois Collection") and individual items scattered across partner collections. Check both.

**The three file types you'll encounter:**

*Plain text (.txt):* The best format. These are either transcribed or OCR-processed files that you can open in any text editor. The quality varies, but even mediocre OCR text is usually workable with some cleanup. Always prefer .txt when available.

*DJVU text (_djvu.txt):* These are extracted from DJVU image files — an older compressed image format used by some libraries. The extraction quality is often equivalent to standard OCR. The filename convention is awkward but the files are usable. If you download a _djvu.txt file, rename it to a clean .txt filename.

*PDF (.pdf):* PDFs contain images of pages with text layers of variable quality. Extracting text from PDFs requires additional tools (pdftotext, Tesseract) and the results are inconsistent. Avoid PDFs if .txt alternatives exist. If PDF is your only option for a critical text, note it in your inventory and plan for extra cleanup work.

### Spot-Checking OCR Quality

Before you commit to downloading an entire figure's corpus, spot-check quality on 5–10 representative files. OCR quality varies by digitizing institution, scan quality, and the age and condition of the original document.

**How to spot-check:** Download a .txt file, open it in a text editor, and read 2–3 paragraphs. Ask yourself:
- Are sentences readable and coherent?
- Are proper names spelled correctly (or consistently misspelled)?
- Are there garbled word fragments (like "tbe" for "the" or "rn" for "m")?
- Are there large blocks of nonsense characters?

Rate each file 1–3:
- **3 (Clean):** Readable, minor errors, usable as-is
- **2 (Acceptable):** Readable with noticeable errors, but meaning is recoverable
- **1 (Poor):** Garbled, large sections unreadable — flag for remediation or exclusion

A corpus where most files rate 2–3 is workable. A corpus where most files rate 1 needs a conversation with your team about whether remediation is feasible.

### Building Your Corpus Inventory Spreadsheet

Before you download anything, set up a tracking spreadsheet. This will save significant time later when you need to know what you have, where it came from, and what shape it's in.

**Columns to include:**
- `filename` — the filename you'll use locally (clean, no spaces, use hyphens)
- `title` — the full display title of the work
- `year` — publication year
- `source_url` — the Internet Archive item URL
- `format` — txt / djvu.txt / pdf
- `ocr_quality` — your 1–3 rating after spot-check
- `notes` — anything relevant (volume number, series, unusual content)

You don't need to fill every row before you start downloading, but having the spreadsheet open while you browse Internet Archive builds good habits. The metadata you record now will feed directly into the `worksMetadata.ts` file later in the project.

### Directory Naming Conventions

When you download files locally, use a consistent directory structure from the start. The standard structure for this project:

```
corpus/
  raw/
    figure-name/
      title-of-work-1903.txt
      another-work-1911.txt
```

Rules for filenames:
- Lowercase only
- Hyphens instead of spaces
- Include the year when you know it
- No special characters, no parentheses, no apostrophes

A consistent naming convention means you can write scripts later that process all files without manual exceptions.

## Reflection Questions
1. You've spot-checked 5 files from your figure's Internet Archive collection. Two are clean, two are acceptable, and one is garbled. What would you do with the garbled file — and what would you tell your team about it?
2. Your figure published a major work in 1933. The Internet Archive has a good scan as a .txt file. What do you need to investigate before including it in your corpus?
3. A colleague suggests skipping the inventory spreadsheet and just downloading all the files at once. What's your response?

## Prep Task
Before your next session: Go to Internet Archive and find your figure's collection. Download at least 5 .txt or _djvu.txt files. Open each one and rate the OCR quality 1–3. Add all 5 to a corpus inventory spreadsheet with filename, title, year, source URL, format, and your quality rating. Bring the spreadsheet to the next session.
