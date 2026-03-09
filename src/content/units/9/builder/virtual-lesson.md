# Unit 9: Pitfalls & Quality Control — Virtual Lesson
**Pathway:** Archive Builder
**Duration:** 75 min
**Materials:** Supabase SQL editor accessible, screen share for diagnostic demo, ingestion script accessible for restart demo

## Agenda
| Time | Activity |
|------|----------|
| 0:00–0:10 | Check-in: share your diagnostic query output — what did you find? |
| 0:10–0:35 | Presentation: the four pitfalls + diagnostics walkthrough |
| 0:35–1:00 | Breakout: run diagnostics + fix at least one issue |
| 1:00–1:15 | Debrief: patterns in the findings + prevention practices |

## Slide Outline

**Slide 1: The Four Pitfalls — Why They Happen**
- The 1,000-row default limit: Supabase protects against runaway queries, but silently truncates results
- Chapter dedup: OCR variation and whitespace inconsistency are inevitable; normalization isn't automatic
- Batch UPDATE timeout: Supabase free tier has a request timeout; large UPDATEs silently stop mid-way
- Stalled ingestion: rate limits + API timeouts can cause the script to stall without crashing
- All four are predictable and fixable; the problem is not knowing about them until you hit them

**Slide 2: The 1,000-Row Limit in Practice**
- Live demo: query document_chunks without a limit, count the results
- Show: the count equals exactly 1,000 even though there are 5,000 rows
- Show the fix: explicit .range() calls
- Pagination pattern: loop with .range(0, 999), .range(1000, 1999), etc.
- When this hurts most: batch update scripts that process the full corpus

**Slide 3: Chapter Dedup Diagnostics**
- Run the duplicate chapter variant query live in Supabase
- Show what the variant_count > 1 output looks like
- Run the normalization SQL: TRIM(REGEXP_REPLACE(chapter, '\s+', ' ', 'g'))
- Verify by re-running the duplicate check query: should return 0 rows
- When to run this: after every ingestion, after any corpus cleanup operation

**Slide 4: Batch UPDATE Strategy**
- Show the timeout behavior: large UPDATE appears to succeed but row count is wrong
- The batching pattern: UPDATE ... WHERE id IN (SELECT id ... LIMIT 1000)
- Run the batch twice: show the first batch updates 1,000 rows, second batch updates 0
- The loop pattern: run until 0 rows updated
- Supabase batch-update.ts script: walk through how to use it

**Slide 5: Killing and Restarting Ingestion**
- The resume logic: row count check per file at the start of ingestion
- Safe to stop at any time: Ctrl+C will not corrupt data
- What to check after stopping: per-file row counts in Supabase
- What to expect on restart: SKIP logs for complete files, continuation for incomplete file
- Demo: stop a running ingestion mid-file, restart, confirm it picks up from the right place

## Breakout Activity (25 min)
**Solo work in Supabase**

Each participant runs the three diagnostic queries from the async reading and addresses findings:

1. Run all three diagnostics (5 min)
2. For any short chapters found: run the normalization SQL and verify (5 min)
3. For any duplicate chapter variants found: run the normalization SQL and verify (5 min)
4. For any works with low chunk counts: investigate — is it expected (short text) or a gap (failed ingestion)? (10 min)

Share-back: each participant names the most significant issue they found and whether they fixed it.

## Debrief Questions
1. Did anyone find the same pitfall in multiple participants' corpora? Which pitfall was most common?
2. After running the chapter normalization SQL, did the sidebar change in a visible way? What specifically changed?
3. What's one preventive practice you'd add to your workflow based on today's session?

## Facilitator Notes
- The 1,000-row limit demo is the most surprising finding for most Builders — many have been unknowingly processing partial data
- The chapter normalization SQL is safe to run repeatedly — it's idempotent (running it twice doesn't change anything the second time)
- Some participants will find the batch UPDATE timeout pitfall in their own work when they investigate the low-chunk-count diagnostic — the UPDATE appeared to succeed but only partially applied
- The session should end with each participant having a cleaner corpus than when they started — the diagnostic + fix cycle is the heart of the session
