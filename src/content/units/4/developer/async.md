# Unit 4: Text Quality & Preparation — Async Materials
**Pathway:** Archive Developer
**Duration:** 30–45 min

## Learning Objectives
- Write chapter detection regex patterns appropriate for different corpus types (books, magazines, speeches)
- Implement a minimum-length filter and test it against edge cases in historical OCR text
- Write a quality audit script that outputs per-file statistics for the full corpus

## Reading

### Chapter Detection Regex Patterns

Chapter detection identifies section boundaries in a text that should be tracked as metadata on each chunk. The goal is to produce a `chapter` field that reflects the actual chapter or section name — not page headers, OCR artifacts, or mid-text headings that aren't meaningful structural divisions.

**For books (monographs):**

Books published before 1931 typically use one of a small number of heading conventions:
- `CHAPTER I.` or `CHAPTER 1` (all caps, Roman or Arabic numeral)
- `Chapter I — Title of Chapter` (mixed case with dash separator)
- `I. Title of Chapter` (Roman numeral followed by period or dash)

Regex for standard book chapter heading:
```typescript
const BOOK_CHAPTER_RE = /^(CHAPTER\s+[IVXLCDM\d]+\.?\s*[-—]?\s*.+|[IVXLCDM]+\.\s+[A-Z][A-Za-z\s]{5,60})$/m;
```

Test against false positives:
- "IV. The town of Boston" — true positive (Roman numeral chapter heading)
- "IV. It was in the fourth year" — false positive (Roman numeral beginning a sentence)
- "Chapter THE THIRD Part 2 (cont'd)" — false positive (OCR merged lines)

The 5–60 character constraint on the title portion filters most mid-sentence Roman numeral false positives, but not all.

**For magazines (periodicals):**

Crisis magazine issues don't have chapters in the traditional sense. Forcing chapter detection on periodicals produces noise. For periodical-heavy corpora, consider disabling chapter detection entirely and using the issue date as the `chapter` field instead:

```typescript
// For periodical items, extract from filename
function getChapterFromFilename(filename: string): string | null {
  const match = filename.match(/(\d{4})-(\d{2})/);
  if (match) return `${match[1]}-${match[2]}`;
  return null;
}
```

**For speeches and essays:**

Short-form texts often have no chapter structure at all. A single speech or essay should produce a null `chapter` field rather than false detection. Test: if a text has fewer than 5,000 tokens total, set chapter = null and don't attempt detection.

### Edge Cases in OCR Text

OCR text from pre-1931 sources introduces specific patterns that break naive regex chapter detection:

**Merged OCR columns:** Some books were typeset in two columns. OCR sometimes merges these, producing lines like:
```
The question before the nation I. THE AFTERMATH
```
where the first column text and the chapter heading appear on the same line. A line-start anchor (`^`) in your regex helps, but merged-column text may not start at column zero.

**Page headers as chapters:** Running titles appear at the top of each page:
```
W.E.B. DU BOIS          47          THE SOULS OF BLACK FOLK
```
These match any heading-like pattern. The 100-character minimum filter doesn't help here because page headers are typically short. The best filter is content-based: reject any "chapter" value that appears more than twice in the document (real chapter names are unique; page headers repeat).

**Roman numeral variations:** Pre-1931 texts use inconsistent Roman numeral formatting:
- `IV.` — standard
- `iv.` — lowercase (common in footnotes and some publishers)
- `IIII` — archaic form of IV (appears in some early 20th-century texts)
- `XC` — 90 (appears in numbered lists)

Your regex should handle lowercase Roman numerals. IIII and archaic variants can be treated as false positives (the documents that use them are rare enough not to optimize for).

### The 100-Character Minimum Filter

The minimum content length filter prevents very short chunks from being ingested. A chunk of 50 characters — a page number, a running title fragment, a single word — is not useful for retrieval and will produce misleading embeddings.

```typescript
const MIN_CHUNK_CHARS = 400; // about 100 tokens

function filterChunks(chunks: Chunk[]): Chunk[] {
  return chunks.filter(c => c.content.trim().length >= MIN_CHUNK_CHARS);
}
```

400 characters (approximately 100 tokens at 4 chars/token) is a reasonable minimum. Lower than this and you're including chunks that can't carry meaningful semantic content. Higher and you risk excluding short but meaningful passages.

### Writing a Quality Audit Script

A quality audit script analyzes all your corpus text files and outputs per-file statistics without chunking or uploading. This gives you a numerical picture of your corpus quality before you commit to ingestion.

**Statistics to compute per file:**
- Total character count
- Estimated word count
- Estimated token count (characters ÷ 4)
- Non-ASCII character ratio (high ratio → likely garbled OCR)
- Ratio of lines shorter than 10 characters (high ratio → likely fragmented OCR)
- Unique "chapter candidates" detected by your regex

**Sample output format:**
```
filename                          chars   words  tokens  nonASCII  shortLines  chapters
dubois-souls-1903.txt            182443   28432   45611    0.002      0.08        14
dubois-darkwater-1920.txt         97811   15234   24453    0.003      0.09         8
dubois-crisis-1910-01_djvu.txt    21234    3122    5309    0.041      0.18         3 (suspicious)
```

Flag any file where:
- Non-ASCII ratio > 0.02 (2%) — likely significant OCR noise
- Short-line ratio > 0.15 (15%) — likely fragmented paragraphs
- Chapter count > 40 (for a single text) — likely false chapter detection

These flags are not automatic exclusions — they're prompts to review the file manually.

## Reflection Questions
1. Your regex detects "I. The Aftermath" as a chapter heading. Later in the same document, "I. It seemed to him that" is also detected. What filter would you add to distinguish these?
2. A Crisis magazine issue has 3 chapters detected: "October 1915", "The Crisis Vol. 11", and "IV. On the Ills of the Republic". Which are false positives and which might be real? What rule would you write?
3. Your quality audit script flags a file with a 0.03 non-ASCII ratio. You open it and find that the non-ASCII characters are all em-dashes (—) and curly quotes (""). Is this a problem? What's your response?

## Prep Task
Before your next session: Write the quality audit script that reads all files in `corpus/raw/` and outputs the statistics table described above. Run it on your corpus. Flag any files that exceed the thresholds. Bring the output table to the next session.
