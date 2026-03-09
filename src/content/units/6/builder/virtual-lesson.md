# Unit 6: Database Design — Virtual Lesson
**Pathway:** Archive Builder
**Duration:** 75 min
**Materials:** Supabase dashboard access for all participants, SQL editor accessible, migration SQL file available

## Agenda
| Time | Activity |
|------|----------|
| 0:00–0:10 | Check-in: share your query results from the prep task |
| 0:10–0:35 | Presentation: understanding the schema + running manual queries |
| 0:35–1:00 | Breakout: explore your database and tune the similarity threshold |
| 1:00–1:15 | Debrief: what did you find, what does it tell you about your corpus? |

## Slide Outline

**Slide 1: What the Migration Created**
- The `document_chunks` table: all columns explained
- The pgvector extension: what it enables
- The `match_documents` RPC: the function that powers similarity search
- The `get_corpus_titles` RPC: the function that powers the sidebar
- A unique constraint on content_hash: dedup protection
- Everything is inspectable in the dashboard — there's no mystery here

**Slide 2: Reading a Row**
- Screen share: open one row in Table Editor in "Expanded" view
- Walk through each field: id (auto), source_title (your label), chapter (detected heading), content (the actual text), content_hash (MD5), embedding (768 numbers, truncated in UI), created_at (insert timestamp)
- Ask: what does this row represent in terms of the original book? (One passage of ~800 tokens)
- Ask: what would the archive do with this row when a user asks a question? (Compare its embedding to the query embedding, return it if similarity > threshold)

**Slide 3: The Three Diagnostic Queries**
- Walk through each query from the prep task live in SQL editor
- `COUNT(*)`: is the expected number of rows there?
- `GROUP BY source_title`: is every work represented? Are any over- or under-represented?
- `DISTINCT chapter LIMIT 20`: do the chapter names look real? Any obvious false positives?
- These three queries together tell you whether your ingestion worked correctly

**Slide 4: Adjusting the Similarity Threshold**
- The threshold lives in the application code (the RAG API function), not in the database
- To test different thresholds without changing code: use the provided test-query script
- The effect of increasing the threshold: fewer results, higher precision
- The effect of decreasing it: more results, lower precision
- The tuning process: test with 5–10 questions that should be well-covered; find the highest threshold that still returns relevant results

**Slide 5: Unexpected Results — The Diagnostic Sequence**
- Result 1: no results returned → check row count, then try lower threshold
- Result 2: irrelevant results → check content field quality, check source_title mapping
- Result 3: wrong work cited → check if the correct work is ingested, check TITLE_MAP
- Result 4: "no relevant passages" on a topic that's definitely in the corpus → lower threshold or check that the specific work is ingested
- The golden rule: every unexpected result has a diagnosable cause

## Breakout Activity (25 min)
**Solo work with Supabase + check-ins**

Each participant runs a database exploration session:
1. Verify the three diagnostic queries from prep task are giving expected output (5 min)
2. Find one row from each major work in the corpus — confirm content is readable (5 min)
3. Run 3 test questions using the test-query script at thresholds 0.5, 0.6, and 0.7 — record which threshold gives the best results (10 min)
4. Identify one chapter name in the database that looks like a false positive — note it (5 min)

Share-back: each participant reports their recommended similarity threshold and the test that drove the recommendation.

## Debrief Questions
1. Did anyone find a work that appeared in their corpus files but not in the database? What steps would you take to diagnose the gap?
2. What was the threshold sweet spot for your corpus? What happened when you went above and below it?
3. If you had to brief your project's Advocate on the database status — "here's what we have, here's what we don't, here's what I recommend" — what would you say?

## Facilitator Notes
- Some participants will find false chapter names in the `DISTINCT chapter` query and want to clean them up immediately — validate the instinct, redirect to Unit 4's cleanup workflow rather than direct SQL UPDATE
- The threshold tuning exercise is the most immediately practical part of this session — budget full time for it in the breakout
- Participants who haven't completed ingestion (still ingesting or ingested only some files) can still run the diagnostic queries on partial data — help them understand what "expected" vs. "actual" means for a partial corpus
- If anyone got an error running the migration (table already exists, extension not found), address these in the first 5 minutes of the session before the presentation starts
