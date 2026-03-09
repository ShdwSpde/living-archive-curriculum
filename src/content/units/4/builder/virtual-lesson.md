# Unit 4: Text Quality & Preparation — Virtual Lesson
**Pathway:** Archive Builder
**Duration:** 75 min
**Materials:** Screen share, chunk-text.ts available on participants' machines, corpus files from Unit 3, JSON viewer or text editor

## Agenda
| Time | Activity |
|------|----------|
| 0:00–0:10 | Check-in: what did your dry-run output look like? Any surprises? |
| 0:10–0:35 | Presentation: reading chunk output + identifying quality problems |
| 0:35–1:00 | Breakout: run the script and triage quality issues in your corpus |
| 1:00–1:15 | Debrief: what did you find, what did you do about it? |

## Slide Outline

**Slide 1: What the Chunk Script Does**
- Reads .txt files from corpus/raw/
- Splits text into overlapping windows of CHUNK_SIZE tokens
- Attempts to detect chapter boundaries using heading patterns
- Writes JSON output files to corpus/chunks/
- The `--dry-run` flag: chunks without uploading — always use this first
- Output structure: source_title, chapter, chunk_index, content

**Slide 2: Reading Chunk Output — Good vs. Bad**
- Walk through a clean chunk: readable content, real chapter name, proper overlap
- Walk through a bad chunk: garbled content field — this is quality-1 OCR in action
- Walk through a false chapter: "37", "Library of Congress", "iiivxxiiii"
- The test question: would you feel comfortable if this chunk appeared in an answer to a user's question?
- If no, it needs to be fixed or excluded before ingestion

**Slide 3: False Chapter Detection — What It Looks Like and Why**
- Chapter detection looks for heading patterns: all-caps, "CHAPTER X", Roman numerals
- OCR noise creates matches: page headers, catalog stamps, running titles, in-text Roman numerals
- Show real examples from a historical text: "New York, 1903" mistaken for a chapter; "IV." in a sentence triggering chapter detection
- The consequence: sidebar populated with nonsense chapter entries that confuse users
- The fix options: edit source file, set chapter to null for the file, or adjust the detection regex

**Slide 4: Diagnosing Quality Problems by Section**
- A file where only the middle 20 chunks are garbled: the scan quality degraded partway through the source document
- A file where all chapter names are page numbers: the document had running page headers in the scan
- A file where content is clean but chunks don't overlap: CHUNK_SIZE may be larger than the file length
- A file with 0 chunks: the source file may be empty or too short to chunk
- Each pattern points to a specific diagnosis and a specific fix

**Slide 5: CHUNK_SIZE and OVERLAP_SIZE — When to Change Them**
- Default: 800 / 200 (25% overlap) — good for most prose
- When to increase: long philosophical arguments, dense scholarly texts
- When to decrease: letters, short speeches, fragmented source material
- The rule: decide before you ingest, not during. Mixed chunk sizes in a single corpus cause inconsistent retrieval
- Change the constant, re-run dry-run, verify, then ingest

## Breakout Activity (25 min)
**Solo work**

Participants run the chunk script on their full corpus (or a significant portion) and triage the output:

1. Run `npx ts-node scripts/chunk-text.ts --dry-run` (5 min, or use output from prep task)
2. Open 5–7 chunk output files and scan them for: garbled content, false chapter names, missing overlap (10 min)
3. Classify each file: clean / minor issues / significant issues (5 min)
4. For "significant issues" files: write one sentence per file describing what is wrong and what you recommend (include, fix, or exclude) (5 min)

Share-back: each participant names their worst quality problem — what file it is, what the problem is, what they're going to do about it.

## Debrief Questions
1. Did anyone find a file where the first few chunks look clean but later chunks are garbled? What does that tell you about the source scan?
2. How many of your files had false chapter detection? What was the most common false pattern?
3. Is there any file in your corpus where you're not sure whether to fix it or exclude it? What would help you decide?

## Facilitator Notes
- The `--dry-run` flag must be emphasized — participants who skip it and run the full ingest before reviewing quality will spend time cleaning up the database rather than fixing source files
- False chapter detection is often more alarming than it should be — reassure participants that it's fixable, and that for the most common cases (page number headers) it's a quick regex fix in the source file
- Some participants will want to fix every quality-2 file; redirect them to the four-tier framework from the Advocate pathway: is the fix worth the time? Quality 2 often doesn't need fixing — it will ingest acceptably
- If participants haven't done the prep task, allocate the first 10 minutes of the breakout to running the script rather than triaging output
