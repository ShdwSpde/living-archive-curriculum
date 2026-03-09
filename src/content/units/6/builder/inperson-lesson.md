# Unit 6: Database Design — In-Person Lesson
**Pathway:** Archive Builder
**Duration:** 75 min
**Room setup:** Developer workstations with Supabase dashboard open, projector for SQL demo, whiteboard for schema diagram
**Materials:** Migration SQL file accessible, diagnostic query cheat sheet (one per person), test-query script available

## Agenda
| Time | Activity |
|------|----------|
| 0:00–0:10 | Warm-up: "one thing I noticed in my database" — share a row or query result |
| 0:10–0:30 | Facilitated presentation: schema walkthrough + diagnostic queries live |
| 0:30–1:00 | Workshop: database exploration + threshold tuning |
| 1:00–1:15 | Gallery share: threshold recommendations + anomalies found |

## Warm-Up Activity

**"One thing I noticed in my database" (10 min)**

Each participant opens the Supabase Table Editor for their `document_chunks` table and finds one interesting or surprising thing: a chapter name that looks wrong, a work that has fewer rows than expected, a content field that looks garbled, or a source_title they don't recognize.

Round the room: each person shares what they found. Facilitator categorizes findings on the whiteboard:
- Schema issues (wrong columns, missing fields)
- Ingestion issues (missing rows, wrong counts)
- Data quality issues (garbled content, false chapters)

These categories become the focus of the workshop.

## Facilitated Presentation

**Schema walkthrough + diagnostic queries (20 min)**

**Part 1: Schema diagram (5 min)**

Draw on the whiteboard: the `document_chunks` table with columns as boxes. Draw arrows showing which columns are user-generated (source_title, chapter, content) vs. system-generated (id, content_hash, embedding, created_at) vs. optional (metadata). This gives participants a visual model of where data comes from.

Key insight to emphasize: everything in the user-generated columns is under the Builder's control. If source_title is wrong, the Builder fixes the TITLE_MAP. If chapter is wrong, the Builder fixes the chunk script. The database stores what the scripts produce.

**Part 2: Live schema exploration (8 min)**

Open the Table Editor on the projector. Navigate to a row in "Expanded" view — show all columns. Ask participants to follow along on their own machines with a row from their own corpus.

Walk through: id (UUID format), source_title (string), chapter (string or null), content (the actual passage — read the first sentence aloud), content_hash (32 hex characters), embedding (array, truncated in UI to [...768 items]), created_at (ISO timestamp).

Ask: how many rows does your table have? Run `SELECT COUNT(*) FROM document_chunks;` live on the projector, then ask participants to run it on their own tables.

**Part 3: Diagnostic queries in practice (7 min)**

Run the three diagnostic queries from the prep task live on the projector corpus:

1. `SELECT source_title, COUNT(*) FROM document_chunks GROUP BY source_title ORDER BY COUNT(*) DESC;` — show the per-work row counts. Are any suspiciously low?

2. `SELECT DISTINCT chapter FROM document_chunks WHERE chapter IS NOT NULL ORDER BY chapter LIMIT 30;` — scan the chapter list for obvious false positives.

3. `SELECT content FROM document_chunks WHERE source_title ILIKE '%crisis%' LIMIT 3;` — show actual Crisis magazine content to verify quality.

Ask participants to run the same queries on their own tables during this demo.

## Workshop Activity

**Database exploration + threshold tuning (30 min)**

**Phase 1 (15 min): Explore your corpus coverage**

Run the diagnostic queries. For each query result, answer:
- Is every work in my corpus inventory represented in the database?
- Do the row counts per work match my expectations (number of chunks the chunk script reported)?
- Do the chapter names look accurate, or are there false positives?
- Do 5 random content rows look readable?

Fill in a coverage worksheet: work title, expected rows, actual rows, notes.

**Phase 2 (15 min): Threshold tuning**

Open the test-query script (provided by facilitator). Run 5 test questions at each of three threshold levels: 0.5, 0.65, 0.7. For each question at each threshold, note:
- Number of results returned
- Whether the top result is relevant
- Whether any results are clearly irrelevant

From this data, pick your recommended threshold. Write one sentence explaining your reasoning.

Facilitator circulates to help with any setup issues on the test-query script and to flag any participants whose results suggest ingestion problems rather than threshold issues.

## Synthesis / Gallery Share

**Threshold recommendations + anomalies (15 min)**

Round the room: each participant states their recommended threshold and one anomaly they found in their database.

Facilitator compiles on the whiteboard:
- Range of threshold recommendations across the group (usually 0.6–0.75)
- Most common anomalies: works missing from the database, chapters that look like false positives, content rows with poor quality

Discussion: Is there a relationship between corpus characteristics (size, OCR quality) and optimal threshold? (Generally: noisier corpora benefit from higher thresholds to cut out the noise, but this also reduces coverage on sparse topics.)

## Facilitator Notes
- The per-work row count comparison (expected vs. actual) is often where participants first discover ingestion gaps — help them understand that gaps can be diagnosed and fixed, not just accepted
- Threshold tuning is the most immediately impactful thing a Builder can do to improve archive quality — invest time here even if it means compressing the presentation
- Some participants will try to fix database problems with direct SQL UPDATE statements during the workshop — redirect them: fix the source data (chunk files, TITLE_MAP) and re-run ingestion rather than patching the database directly
- The coverage worksheet is a good artifact to keep — it becomes the baseline for quality monitoring in Unit 9
