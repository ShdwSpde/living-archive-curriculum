# Unit 3: Sourcing the Corpus — In-Person Lesson
**Pathway:** Archive Developer
**Duration:** 75 min
**Room setup:** Developer workstations with Node.js or Python, terminal access, projector for live coding demo, whiteboard for architecture notes
**Materials:** Starter code file (download-corpus.ts or .py) pre-loaded on all machines, corpus inventory spreadsheet accessible

## Agenda
| Time | Activity |
|------|----------|
| 0:00–0:10 | Warm-up: API exploration — what does the search response look like for your figure? |
| 0:10–0:30 | Facilitated presentation: live-code the download script from scratch |
| 0:30–1:00 | Workshop: complete and run the script for your own corpus |
| 1:00–1:15 | Gallery share: show your running script + discuss edge cases |

## Warm-Up Activity

**API exploration (10 min)**

Each participant opens a browser and navigates to:
```
https://archive.org/advancedsearch.php?q=collection:(dubois)&fl[]=identifier&output=json&rows=5&page=1
```

Then modifies the query for their own figure. Read the JSON response in the browser:
- What is `numFound`?
- What identifiers did you get back in `docs`?
- Does `numFound` match your expectations from your Unit 2 corpus inventory?

Share around the room: anyone with a `numFound` of 0? (They may need to change their collection name or search strategy — discuss how to find the right collection identifier.)

## Facilitated Presentation

**Live-code the download script (20 min)**

Facilitator writes the full script live on the projector, explaining each decision as they go. The sequence:

**Step 1: Pagination (6 min)**

Start with a `getAllItemIds` function. Show the fetch call, extract `numFound`, build the page loop. Explain why you collect all IDs before downloading: separation of concerns, cleaner resume logic. Run the function live for a model figure — show the output in the terminal.

**Step 2: Item metadata + file selection (5 min)**

Write `getTextFiles(id)` — fetches `archive.org/metadata/{id}/files`, filters for DjVuTXT and Text formats, returns filename and download URL. Run it for one item ID from step 1. Show the console output. Ask: what happens if an item has no text files? Write the `if (files.length === 0)` branch.

**Step 3: Download + integrity check (5 min)**

Write `downloadFile(url, localPath)`. Show the size check (< 1000 bytes = suspicious) and the word count check (< 100 words = suspicious). Write the warning to the log rather than throwing — you want to continue the run.

**Step 4: Resume + logging (4 min)**

Add `if (fs.existsSync(localPath)) return;` at the top of the download function. Show what a structured log line looks like: timestamp, level, message. Explain: the log file stays with the corpus permanently as a provenance record.

## Workshop Activity

**Complete and run the script for your corpus (30 min)**

Participants work on their own machines with the starter code as scaffolding.

**Phase 1 (10 min):** Modify the search query for your figure's collection. Run `getAllItemIds`. Verify the item count.

**Phase 2 (10 min):** Add the metadata fetch and file selection step. Run it for 3–5 items. Verify you're getting text file URLs back.

**Phase 3 (10 min):** Add the download step with integrity check and resume logic. Run the script for your first 10 items. Watch the terminal output. Check that the files appear in `corpus/raw/` with correct filenames.

Facilitator circulates. Common issues:
- Collection name not matching (figure's collection uses an unexpected identifier)
- Download URL construction errors (missing slash, wrong case)
- `fs` module not imported
- File encoding issues on Windows (UTF-8 BOM in output files)

## Synthesis / Gallery Share

**Running scripts and edge cases (15 min)**

Each participant opens their terminal and runs their script (or shows a partial run) while the room watches. Quick round:
- How many items are you downloading?
- Did any integrity checks trigger warnings? Which files?
- What was the hardest part to implement?

Facilitator writes edge cases on the whiteboard as they come up. Common ones:
- Items with no text files (PDFs only)
- Items that return HTTP 404 on the metadata endpoint (deleted or hidden items)
- Very large files (>10MB for a single text — might be a complete periodical run, not an individual issue)
- Items where the "Text" format file is actually HTML (Library of Congress items sometimes do this)

For each edge case, discuss: how would you handle it in the script?

## Facilitator Notes
- Live-coding from scratch is the right format for this session — participants who watch it being built retain the pattern better than those who read finished code
- The restart-from-checkpoint exercise (running the script twice and showing the SKIP log lines) is worth doing explicitly — it makes the resume logic concrete
- The integrity check warnings are not errors — emphasize this. You want the script to finish and produce a log with warnings, not crash on the first suspicious file
- Some participants will want to add more sophisticated integrity checking (actual OCR quality assessment) — validate the instinct but redirect: quality assessment is Unit 4's job; Unit 3 is just getting the files down safely
