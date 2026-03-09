# Unit 5: Embedding & AI — Virtual Lesson
**Pathway:** Archive Developer
**Duration:** 75 min
**Materials:** Screen share for live coding, participants' similarity query output from prep task, Supabase SQL editor accessible

## Agenda
| Time | Activity |
|------|----------|
| 0:00–0:10 | Check-in: share your similarity query output — what did you find? |
| 0:10–0:35 | Presentation: batch loop implementation + dedup + model comparison |
| 0:35–1:00 | Breakout: implement or harden the embedding loop for production use |
| 1:00–1:15 | Debrief: failure modes and the lessons from testing |

## Slide Outline

**Slide 1: What the Embedding Loop Must Guarantee**
- Every chunk in the corpus gets an embedding on first run
- Re-running the script doesn't create duplicate rows (dedup via content hash)
- Rate limit errors are handled automatically (exponential backoff)
- Partial runs resume from the correct point (row count check per file)
- These four properties together make the ingestion process reliable enough to run unattended

**Slide 2: Live Code — The Batch Loop**
- Walk through the `ingestChunks` function: resume check → batch loop → embed + insert
- Show the BATCH_SIZE=5 and DELAY_MS=4000 constants and why those specific numbers
- The sleep call: why between batches, not after — the last batch shouldn't wait unnecessarily
- The retry function: exponential backoff with `attempt` parameter
- Show the 429 branch and the non-429 error branch — different handling for different errors

**Slide 3: Content Hash Dedup**
- What happens without dedup: re-run creates doubles; queries return repeated passages
- MD5 vs. SHA256: MD5 is fine here, faster, shorter
- The unique constraint in the database: not just the application-level check
- The upsert with `onConflict: 'content_hash'`: correct syntax for Supabase JS client
- Test: run the ingestion twice on the same chunk, verify only one row in Supabase

**Slide 4: Comparing Similarity Query Results**
- Walk through participants' prep task outputs: what similarity scores did you see?
- Expected range: 0.7–0.9 for highly relevant results, 0.5–0.7 for tangentially relevant
- Red flag: results under 0.5 for a query that should be obviously covered by your corpus
- Common cause of low scores: RETRIEVAL_DOCUMENT vs. RETRIEVAL_QUERY task type mismatch
- Show the taskType distinction: documents use RETRIEVAL_DOCUMENT; queries use RETRIEVAL_QUERY

**Slide 5: Model Choice — When to Switch from Gemini Free Tier**
- The break-even analysis: time vs. cost
- For 5,000 chunks: Gemini free tier is clearly better (time cost is low)
- For 25,000 chunks: OpenAI at $0.40 total cost is worth the 90% time savings
- For rebuild frequency: if you're rebuilding the corpus regularly (new texts added monthly), OpenAI's speed advantage compounds
- Migration cost: re-embedding the full corpus to switch models; plan before you start

## Breakout Activity (25 min)
**Solo coding with facilitator review**

Each participant adds two hardening features to their embedding loop:

1. **Per-batch error logging to a file** (10 min): any batch that fails after all retries should write to `ingestion-errors.log` with timestamp, batch index, and error message. This file persists after the script exits so you can diagnose problems post-run.

2. **Similarity verification function** (15 min): implement the `testSimilarity` function that embeds a query and calls `match_documents`, printing results in the format shown in the async reading. Run it with 3 test questions and confirm results make sense.

Share-back: each participant shows their similarity verification output for one question.

## Debrief Questions
1. Did anyone get similarity scores below 0.5 for a query they expected to be well-covered? What's your hypothesis for why?
2. If you had to diagnose a case where ingestion completed but the archive gives poor answers, what would you check first? In what order?
3. What's the highest-risk step in the ingestion pipeline — the one most likely to fail silently (fail without any visible error)?

## Facilitator Notes
- The taskType distinction (RETRIEVAL_DOCUMENT vs. RETRIEVAL_QUERY) is a common bug and worth testing explicitly — have participants switch the type and re-run a query to see the difference in scores
- The per-batch error log exercise is often seen as unnecessary — make the case: an ingestion run that completes but has 20 silent failures will look fine until users start getting bad answers
- Some participants will want to implement a more sophisticated resume mechanism (tracking individual chunk IDs rather than file-level row counts) — validate this as a genuine improvement, note that it adds complexity, and suggest they implement it as a stretch goal
- The model comparison discussion can run long — timebox it; the cost numbers are the most useful part
