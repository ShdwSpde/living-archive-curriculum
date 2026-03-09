# Unit 6: Database Design — Virtual Lesson
**Pathway:** Archive Developer
**Duration:** 75 min
**Materials:** Screen share for SQL demo, Supabase SQL editor accessible, participants' EXPLAIN ANALYZE output from prep task

## Agenda
| Time | Activity |
|------|----------|
| 0:00–0:10 | Check-in: share your EXPLAIN ANALYZE output — index scan or sequential scan? |
| 0:10–0:35 | Presentation: migration SQL deep-dive + HNSW tuning + RPC design |
| 0:35–1:00 | Breakout: write the get_corpus_titles RPC + test it |
| 1:00–1:15 | Debrief: database design tradeoffs and what to change for your corpus |

## Slide Outline

**Slide 1: The Migration as a Design Document**
- Every CREATE statement is a design decision with tradeoffs
- `VECTOR(768)` vs. `VECTOR(1536)`: must match your embedding model exactly
- `TEXT` vs. `VARCHAR(n)` for content: TEXT is correct — chunks are variable length
- `JSONB` for metadata: flexible, queryable, no schema migration needed for new fields
- The index must be created before queries run at scale — not after ingestion

**Slide 2: HNSW Index Parameters**
- m=16 and ef_construction=64: safe defaults for corpora up to 100,000 rows
- When to increase m: very high recall requirements (research applications where missing a relevant passage is costly)
- When to increase ef_construction: you have build time to spare and want index quality over build speed
- Index size vs. query time tradeoff: higher m = larger index on disk, faster queries
- Show the EXPLAIN ANALYZE output from a well-indexed query vs. a seq scan — the difference in milliseconds is dramatic at 10,000+ rows

**Slide 3: The Distance-to-Similarity Conversion**
- Live demo: run a raw `<=>` query without the `1 -` conversion — show what the numbers look like
- Then run with `1 -` — show how the scale changes
- Why ORDER BY similarity DESC vs. ORDER BY embedding <=> query ASC give the same results but look different
- The WHERE clause: `WHERE 1 - (embedding <=> query_embedding) > match_threshold` — not `WHERE embedding <=> query_embedding < (1 - match_threshold)` — both work but the first is more readable
- Show what happens with an empty result set when the threshold is too high

**Slide 4: The match_documents RPC**
- Walk through the function signature: parameters, return type, LANGUAGE SQL, STABLE annotation
- Why STABLE matters: Postgres can cache the query plan, improving performance on repeated queries
- The match_count LIMIT: why you still slice in application code
- Always return `id` in the RPC: application code needs it for dedup and citation tracking
- Test the RPC from the Supabase client: `supabase.rpc('match_documents', { query_embedding: [...], match_threshold: 0.7, match_count: 5 })`

**Slide 5: Extending the Schema**
- Adding a new column: `ALTER TABLE document_chunks ADD COLUMN source_year INT;` — non-breaking, all existing rows get NULL
- The metadata JSONB pattern: store new fields in `metadata` first, promote to a column later if queried frequently
- Adding a composite index for filtered queries: `CREATE INDEX ON document_chunks (source_title) WHERE chapter IS NOT NULL;`
- What NOT to do: don't add columns to the embedding vector type — vectors are fixed-dimension
- Migration versioning: name migrations with timestamps (`20240901_add_source_year.sql`) for reproducible deployment

## Breakout Activity (25 min)
**Solo coding**

Each participant writes and runs the `get_corpus_titles` RPC function — the function the frontend uses to populate the corpus sidebar:

```sql
CREATE OR REPLACE FUNCTION get_corpus_titles()
RETURNS TABLE (
  source_title TEXT,
  chapter TEXT,
  chunk_count BIGINT
)
LANGUAGE SQL STABLE
AS $$
  SELECT source_title, chapter, COUNT(*) AS chunk_count
  FROM document_chunks
  GROUP BY source_title, chapter
  ORDER BY source_title, chapter;
$$;
```

Tasks:
1. Write the function (don't copy — type it out) (8 min)
2. Run it in Supabase SQL editor, verify output (3 min)
3. Modify it to also return the year from the metadata JSONB field: `metadata->>'year' AS source_year` (7 min)
4. Test that the Supabase JS client can call it: `supabase.rpc('get_corpus_titles')` in a test script (7 min)

Share-back: each participant shows their extended function output.

## Debrief Questions
1. Your `get_corpus_titles` RPC returns 150 rows for a corpus of 30 works. Why? Is this a problem?
2. A team member wants to add a `tags` array column to filter chunks by topic. What column type would you use? What index would you add?
3. If your corpus grows from 5,000 to 50,000 chunks next year, which parameter would you consider increasing — m or ef_construction — and why?

## Facilitator Notes
- EXPLAIN ANALYZE output varies significantly between participants depending on table size — participants with < 500 rows will likely see seq scans (this is correct for small tables), participants with 5,000+ rows should see index scans
- The `STABLE` annotation is often missed or misunderstood — it's a performance hint to Postgres, not a constraint; the function works correctly without it
- The metadata JSONB pattern for adding fields without schema changes is underused by most beginners — it's worth emphasizing as a way to avoid schema migrations during development
- The breakout's extension task (adding source_year from JSONB) often reveals that participants haven't populated the metadata field during ingestion — this is fine; note it as a gap and address it in Unit 7
