# Unit 4: Text Quality & Preparation — Async Materials
**Pathway:** Archive Builder
**Duration:** 30–45 min

## Learning Objectives
- Run the provided chunk-text.ts script and interpret its output to identify good vs. bad chunks
- Recognize false chapter detection caused by OCR noise and flag affected files
- Understand the CHUNK_SIZE and OVERLAP_SIZE parameters and how to adjust them

## Reading

### Running the Chunk Script

The `chunk-text.ts` script reads text files from the `corpus/raw/` directory, splits them into overlapping chunks, detects chapter boundaries, and writes the results as JSON to `corpus/chunks/`. Before running it, make sure you have:
- Node.js installed (v18+ recommended)
- Dependencies installed: `npm install` in the project root
- A `.env` file with your Supabase credentials (the script doesn't need them to chunk — it only needs them to upload)

To run chunking only (without uploading):
```bash
npx ts-node scripts/chunk-text.ts --dry-run
```

The `--dry-run` flag produces the chunk output files without uploading to Supabase. Use this to review quality before committing to a database write.

Output files appear in `corpus/chunks/` — one JSON file per source text, named to match the source filename.

### Reading Chunk Output

Each chunk output file is an array of objects. Open any chunk file in a text editor or JSON viewer:

```json
[
  {
    "source_title": "The Souls of Black Folk",
    "chapter": "Of Our Spiritual Strivings",
    "chunk_index": 0,
    "content": "Between me and the other world there is ever an unasked question..."
  },
  ...
]
```

**What to look for in good chunks:**
- `content` is readable prose — complete thoughts, proper sentence structure
- `chapter` matches a real chapter title from the text
- Consecutive chunks overlap meaningfully — the last sentence of chunk N appears as the first sentence of chunk N+1

**What bad chunks look like:**

*Bad content:*
```
"content": "Tbe f0llcwing 1s a lisf of rernarlcs: nnnnnn Ohap. VT. On tbe..."
```
This is quality-1 OCR. Flag the source file.

*False chapter detection:*
```
"chapter": "Page 47"
```
```
"chapter": "Library of Congress"
```
```
"chapter": "iiivxxiiii"
```
Page headers, library stamps, and OCR noise fragments are being detected as chapter names. These false positives populate the corpus sidebar with nonsense entries and should be cleaned.

### Recognizing False Chapter Detection

The chapter detection logic looks for patterns that match heading formats: all-caps lines, lines starting with "CHAPTER", Roman numerals followed by text, etc. OCR noise creates false positives because:

- Page headers (running titles, page numbers) repeat on every page and look like short headings
- Library stamps and catalog information at the beginning of a scan look like metadata headings
- Roman numerals in text body (e.g., "in the 19th century") can match chapter detection patterns

**How to identify false chapters in your output:**
1. Open a chunk file and scan the `chapter` field values
2. Look for: numbers only, page numbers, place names, dates, institutional names, strings under 10 characters, strings over 80 characters
3. Any of these are probably false positives

**What to do with false-chapter files:**
- If 1–2 false chapters appear in an otherwise clean file: manually edit the source .txt file to remove the offending page headers
- If false chapters appear throughout the file: the OCR quality is too poor for the chapter detection to work; set the chapter field to null by editing the chunk script's handling for that file
- If false chapters are all page numbers: the scanner added running page headers that can be removed with a find/replace (look for a consistent pattern like "\n47\n" or "— 47 —")

### CHUNK_SIZE and OVERLAP_SIZE

The default settings are:
- `CHUNK_SIZE = 800` (tokens, approximately 3,200 characters)
- `OVERLAP_SIZE = 200` (tokens, approximately 800 characters)

These defaults work well for most prose texts. When to consider adjusting:

**Increase CHUNK_SIZE** if your corpus has long-form arguments that build over several paragraphs (philosophical texts, scholarly monographs). Larger chunks give the retrieval system more context per passage. Maximum practical: 1,200 tokens (much larger and the chunk stops functioning as a "passage" and becomes a section).

**Decrease CHUNK_SIZE** if your corpus has short, dense items (letters, short essays, short speeches). Smaller chunks let the retrieval system return more precisely targeted passages. Minimum practical: 400 tokens (smaller and chunks lack enough context to be meaningful on their own).

**Adjust OVERLAP_SIZE proportionally:** Overlap should be roughly 20–25% of CHUNK_SIZE. At 800/200 (25%) the defaults are already at the useful maximum — increasing overlap further adds redundancy without meaningfully improving coverage.

**Important:** Don't change these values mid-ingestion. If you change CHUNK_SIZE after some texts are already in the database, you'll have chunks of inconsistent sizes, which makes retrieval results harder to interpret and compare.

## Reflection Questions
1. You run the chunk script and find 15 files with output. In 3 of them, the `chapter` field contains values like "37", "New York Public Library", and "Chapter the Second Part iii". What specifically is wrong with each, and what would you do?
2. Your source text is a collection of short letters, each 1–2 paragraphs long. The default CHUNK_SIZE of 800 tokens means each chunk contains 3–4 complete letters. Is this a problem? What would you change?
3. You run `--dry-run` and open the output for one file. The first 5 chunks look clean, but chunks 40–60 are filled with garbled text. What does this tell you about the source file?

## Prep Task
Before your next session: Run the chunk script in `--dry-run` mode on all your downloaded files. Open the chunk output for at least 5 texts and check: (1) Is the `content` field readable? (2) Are the `chapter` fields real chapter names? (3) Do the chunks overlap properly? List any files with quality problems and note what type of problem each has.
