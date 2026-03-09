# Unit 3: Sourcing the Corpus — Async Materials
**Pathway:** Archive Builder
**Duration:** 30–45 min

## Learning Objectives
- Navigate Internet Archive to locate and download a figure's complete text corpus
- Handle _djvu.txt files correctly and organize downloads using consistent naming conventions
- Spot-check OCR quality across a sample of files before committing to full corpus download

## Reading

### Step-by-Step Internet Archive Download Walkthrough

Internet Archive is the primary source for digitized texts of historical figures active before 1931. Most figures with substantial publication records have a collection page there. Here is the full process from search to local files.

**Step 1: Find the figure's collection**

Go to archive.org and search the figure's full name. In the search results, click the "Texts" filter in the left sidebar. Look for two things:
- A dedicated collection page (usually titled "[Figure Name] Collection" or something similar)
- Individual items scattered across partner library collections

Check both. Individual items outside the main collection are often the figure's contributions to anthologies, periodicals with mixed authorship, or lesser-known pamphlets. These are worth the extra search time.

**Step 2: Evaluate individual items**

Click through to an item's detail page. On the right side, find the "Download Options" box. You'll see icons for different formats. The most important formats:
- **Text files (.txt):** Direct download, ready to use
- **DJVU text (_djvu.txt):** See below for handling
- **PDF (.pdf):** Avoid if a text alternative exists

Before downloading, click "Show All" in the download options to see the full file list. Some items have multiple text files (one per chapter, or one for each issue of a periodical).

**Step 3: Download .txt files**

Click the .txt link to download. On most items, this gives you a single plain-text file of the full work. Save it to your `corpus/raw/` directory with a clean filename (see naming conventions below).

**Step 4: Handle _djvu.txt files**

Some items only offer a _djvu.txt file and no standard .txt. These files are extracted from DJVU image files — an older compression format. The text content is equivalent to standard OCR. The process:
1. Download the _djvu.txt file
2. Rename it: `figure-title-year_djvu.txt` → `figure-title-year.txt`
3. Open it in a text editor and verify it's readable text, not binary data (occasionally a _djvu.txt download is corrupted)

The underscore-djvu suffix has no technical significance after renaming — it's just an archival convention that you don't need to preserve in your local copy.

**Step 5: Use Internet Archive's bulk download option**

For figures with large collections (50+ items), consider using Internet Archive's command-line tool `ia` instead of clicking through each item manually:

```bash
pip install internetarchive
ia search "collection:(dubois)" --itemlist > items.txt
while read item; do ia download "$item" --formats="DjVuTXT,Text" ; done < items.txt
```

This downloads only .txt and _djvu.txt files, skipping PDFs, images, and other formats. It's much faster than manual downloads for large collections and produces consistent filenames.

### Naming Conventions

After downloading, rename every file before running any processing scripts. Use this format:

```
figure-last-name-short-title-year.txt
```

Examples:
- `dubois-souls-of-black-folk-1903.txt`
- `wells-southern-horrors-1892.txt`
- `douglass-narrative-1845.txt`

Rules:
- All lowercase
- Hyphens for spaces (no underscores, no spaces)
- Year at the end when known
- Keep titles short but recognizable (3–6 words)
- No special characters, apostrophes, or parentheses

Consistent naming matters because the chunk script processes files in alphabetical order and uses the filename as the source identifier in the database.

### Spot-Checking Before Full Download

Don't download an entire corpus before checking quality. The goal is to identify problems before you've invested time in a full download and cleanup pass.

**The 5-file spot-check:**
1. Pick 5 files that represent the range of your corpus (early/late dates, different source types)
2. Download them
3. Open each in a text editor
4. Read 3–5 paragraphs from the middle of the file (not the beginning — beginnings sometimes have better OCR because they were manually reviewed)
5. Note: word error rate, broken sentence structure, garbled proper names

If 4 or 5 files look clean or acceptable, proceed with the full download. If 2 or more files look poor, investigate whether this is a problem with specific source items or a systematic quality issue across the corpus. In some cases, a single digitizing institution produced consistently poor scans — and you may find better copies of the same texts in a different collection.

## Reflection Questions
1. You're downloading a figure's corpus and find that several important works are only available as PDFs — no .txt alternative. What are your options, and what information would you bring to your team?
2. After your 5-file spot-check, you find that books rate quality 2–3 but pamphlets rate quality 1. How does this change your download and cleanup plan?
3. Your figure published 300 individual items on Internet Archive. What's the practical difference between downloading them manually vs. using the `ia` command-line tool?

## Prep Task
Before your next session: Download at least 10 texts from your figure's Internet Archive collection. Rename all files using the naming convention. Spot-check 5 of them for OCR quality. Update your corpus inventory spreadsheet with the local filename, quality rating, and any notes. Bring the updated spreadsheet to the next session.
