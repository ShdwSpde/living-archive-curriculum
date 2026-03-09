# Unit 6: Database Design — In-Person Lesson
**Pathway:** Archive Developer
**Duration:** 75 min
**Room setup:** Developer workstations, Supabase SQL editor accessible, projector for live SQL demo and EXPLAIN ANALYZE output
**Materials:** Migration SQL file as reference (not as a copy source), Supabase project credentials, test-query script available

## Agenda
| Time | Activity |
|------|----------|
| 0:00–0:10 | Warm-up: write the table definition from memory — no reference |
| 0:10–0:30 | Facilitated presentation: HNSW parameters + distance math + RPC design |
| 0:30–1:00 | Workshop: write migration from scratch, run EXPLAIN ANALYZE, build RPC |
| 1:00–1:15 | Gallery share: EXPLAIN ANALYZE outputs and schema extensions |

## Warm-Up Activity

**Write the table definition from memory (10 min)**

Participants close all browser tabs showing the migration SQL. On paper or in a blank editor:

Write a CREATE TABLE statement for `document_chunks` with these columns: id (UUID, primary key, auto-generated), source_title (text, required), chapter (text, optional), content (text, required), content_hash (fixed-length string, required), embedding (768-dimensional vector), metadata (flexible JSON), created_at (timestamp with timezone).

Don't look up the syntax — make your best attempt from memory. After 7 minutes, participants share what they missed or got wrong. Facilitator reveals the correct syntax.

This exercise makes participants aware of what they actually understand vs. what they were just reading. The gaps in the recall exercise direct attention for the presentation.

## Facilitated Presentation

**HNSW parameters + distance math + RPC design (20 min)**

**Part 1: The index, in depth (8 min)**

Draw the HNSW structure on the whiteboard at a conceptual level: a graph where each node (chunk) is connected to its neighbors. Multiple layers: the top layer has few connections (long-range), the bottom layer has many (short-range). A query starts at the top layer, navigates down through progressively more local neighborhoods.

The two parameters:
- `m`: the number of connections per node per layer. Think of it as: "how well-connected is each document to its neighbors?" More connections = faster navigation but larger index.
- `ef_construction`: the search breadth during index building. Think of it as: "how carefully did we search for good neighbors when building the graph?" Higher ef = better neighbors found, slower build.

For corpus sizes up to 50,000 rows: m=16, ef_construction=64. For production archives expecting 100,000+ rows: m=32, ef_construction=128. Run EXPLAIN ANALYZE after index creation to verify query times are acceptable.

**Part 2: The distance math (5 min)**

Live demonstration in the Supabase SQL editor:

```sql
-- Cosine distance (what pgvector computes natively)
SELECT id, embedding <=> '[0.1, 0.2, ...]'::vector AS distance
FROM document_chunks
ORDER BY distance ASC
LIMIT 3;

-- Converting to similarity
SELECT id, 1 - (embedding <=> '[0.1, 0.2, ...]'::vector) AS similarity
FROM document_chunks
ORDER BY similarity DESC
LIMIT 3;
```

Show that both queries return the same rows in the same order. The conversion is cosmetic but matters for: (a) the WHERE clause threshold (intuitive at 0.7 vs. non-intuitive at distance 0.3), and (b) display to users (similarity 0.85 is meaningful; distance 0.15 is not).

**Part 3: RPC function design principles (7 min)**

Walk through the `match_documents` function design decisions:
- Parameters with defaults: callers can omit match_threshold and match_count and get sensible behavior
- Return type as TABLE: callers get typed rows, not unstructured JSON
- LANGUAGE SQL STABLE: declarative, cacheable, safer than PL/pgSQL for pure queries
- The LIMIT: set in the function, then always slice again in application code — defense in depth against pgvector's approximate result count behavior

## Workshop Activity

**Write migration from scratch, EXPLAIN ANALYZE, build RPC (30 min)**

**Phase 1 (10 min): Write the full migration SQL**

In a blank SQL file, write the complete migration: extension, table, unique constraint, HNSW index, match_documents RPC, get_corpus_titles RPC. No copying from the reference file — use the presentation and the warm-up recall as your guide.

Run it in the Supabase SQL editor. If you get errors, debug until it runs cleanly.

**Phase 2 (10 min): EXPLAIN ANALYZE**

Run:
```sql
EXPLAIN ANALYZE SELECT id, 1 - (embedding <=> embedding) AS similarity
FROM document_chunks
ORDER BY similarity DESC
LIMIT 5;
```

(Using `embedding <=> embedding` as a self-similarity query to avoid needing a real query vector in the SQL editor.)

Read the output: Is it using the HNSW index? What is the execution time? What is the estimated row count vs. actual row count?

If seeing a seq scan on a table with > 1,000 rows: run `REINDEX INDEX CONCURRENTLY document_chunks_embedding_idx;` and re-run EXPLAIN ANALYZE.

**Phase 3 (10 min): Add a schema extension**

Add a `source_year INT` column to the table:
```sql
ALTER TABLE document_chunks ADD COLUMN source_year INT;
```

Write a migration to backfill source_year from the JSONB metadata field:
```sql
UPDATE document_chunks
SET source_year = (metadata->>'year')::INT
WHERE metadata->>'year' IS NOT NULL;
```

Verify with `SELECT source_title, source_year FROM document_chunks LIMIT 10;`.

## Synthesis / Gallery Share

**EXPLAIN ANALYZE outputs and schema extensions (15 min)**

Each participant pastes their EXPLAIN ANALYZE output on the projector (or reads the key line: index scan or seq scan, execution time). Compare across participants: how does table size correlate with query time? Who's using the HNSW index?

Discussion: at what table size did you first see the HNSW index kick in vs. seq scan? (Postgres typically prefers seq scan below ~1,000 rows regardless of index presence.) What does this mean for testing — you need a realistically large corpus to validate index performance?

Close by showing the connection to Unit 8: the `match_documents` RPC the group just built is the function the RAG pipeline calls for every user query. Its performance and correctness determine the archive's responsiveness and accuracy.

## Facilitator Notes
- The write-from-memory warm-up is intentionally challenging — it's fine if participants miss several columns; the gaps are the point
- EXPLAIN ANALYZE with a self-similarity query (`embedding <=> embedding`) is a useful trick for testing without a real query vector — explain why it's technically valid (produces real execution plan) but not a realistic performance benchmark
- Some participants will want to add more columns during the schema extension phase (author, genre, tags) — encourage them to use the metadata JSONB field first and promote to columns only if they need query performance on that field
- The discussion connecting the RPC to Unit 8 is important for motivation — participants who see the full pipeline (corpus → ingestion → database → query → RAG) understand why each component matters
