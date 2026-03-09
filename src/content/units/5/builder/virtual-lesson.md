# Unit 5: Embedding & AI — Virtual Lesson
**Pathway:** Archive Builder
**Duration:** 75 min
**Materials:** Screen share, `.env` file set up on all participants' machines, Supabase dashboard access, ingestion script available

## Agenda
| Time | Activity |
|------|----------|
| 0:00–0:10 | Check-in: did your `--verify-env` pass? Any setup problems? |
| 0:10–0:35 | Presentation: ingestion script walkthrough + rate limits + resume logic |
| 0:35–1:00 | Breakout: start ingestion + monitor progress + troubleshoot |
| 1:00–1:15 | Debrief: what problems did people hit? how were they resolved? |

## Slide Outline

**Slide 1: What the Ingestion Script Does**
- Reads chunk JSON files from corpus/chunks/
- For each chunk: calls the Gemini API with the chunk text, gets back 768 numbers (the embedding)
- Inserts a row into Supabase document_chunks: title, chapter, content, embedding vector
- Processes in batches of 5, waits 4 seconds between batches
- Skips files already fully ingested (resume support via row count check)
- This process converts your text corpus into a searchable semantic database

**Slide 2: The `.env` File — What Each Variable Does**
- GEMINI_API_KEY: authenticates Gemini API calls — the embedding model needs this
- SUPABASE_URL: the URL of your database — unique to your project
- SUPABASE_SERVICE_ROLE_KEY: the database master key — write access to all tables
- Never share, never commit, never log these values
- `--verify-env` flag: checks all three before doing anything — always run this first

**Slide 3: Reading the Logs**
- Walk through a normal batch log line: batch number, chunk range, status
- The 429 error log: what it looks like, what the backoff sequence looks like
- The "skipping" log: file already fully ingested — this is expected on resume
- What a stalled ingestion looks like: log stops updating for >10 minutes
- What to do if it stalls: Ctrl+C, check for error messages, restart

**Slide 4: Monitoring in Supabase**
- Live demo: open Table Editor → document_chunks → watch row count
- Show how to run a quick count query in the SQL editor: `SELECT COUNT(*) FROM document_chunks;`
- Show how to check progress for a specific file: `SELECT COUNT(*) FROM document_chunks WHERE source_title = 'The Souls of Black Folk';`
- The row count is your ground truth — if the script says it ingested 143 chunks but Supabase shows 142, there was one failure

**Slide 5: Resume Logic and Safe Stopping**
- Resume works by counting existing rows per source file before ingesting
- If count equals expected total → file is done, skip it
- If count is less than expected → re-embed and upsert (the content hash dedup prevents duplicates)
- Safe to stop: Ctrl+C at any point
- Not safe: deleting database rows without clearing chunk files (creates orphaned data)

## Breakout Activity (25 min)
**Solo work**

Participants start (or continue) their ingestion during the breakout:
1. Verify `.env` with `--verify-env` (or confirm it already passed) (2 min)
2. Start the ingestion script (3 min)
3. Watch the first 3–5 batch log lines to confirm it's running correctly (5 min)
4. Open Supabase in a separate window and watch the row count increase (10 min)
5. If ingestion is running smoothly: run the test query in Supabase SQL editor to confirm data looks correct (5 min)

Participants who hit problems (`.env` errors, 429 errors that don't resolve, database errors) flag in the chat and the facilitator helps them one-on-one.

Share-back: each participant reports: running / blocked / completed first file, and one thing they observed.

## Debrief Questions
1. Did anyone see a 429 error that the backoff didn't resolve? What happened next?
2. What does the row count in Supabase tell you that the script logs alone can't?
3. If you had to stop ingestion right now and resume in a week, would anything be lost? What would you check before resuming?

## Facilitator Notes
- The `.env` setup is the most common blocker — some participants will have incorrect keys, wrong URL format, or a typo. Budget extra time at the start for troubleshooting setup issues
- 429 errors that don't self-resolve usually indicate that two ingestion processes are running simultaneously — check for this before assuming a script bug
- Participants who have very large corpora (10,000+ chunks) will need to understand that ingestion may not complete in a single session — normalize this and make sure resume logic is tested
- If participants are curious about what the embedding vectors look like: show a single row in Supabase with the embedding column visible — the vectors are large arrays of decimals, typically truncated in the UI
