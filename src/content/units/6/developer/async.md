# Unit 6: Database Design — Async Materials
**Pathway:** Archive Developer
**Duration:** 30–45 min

## Learning Objectives
- Write the full migration SQL from scratch: table definition, vector index with HNSW parameters, and RPC functions
- Explain why `1 - (embedding <=> query_embedding)` converts cosine distance to similarity
- Use EXPLAIN ANALYZE to verify index usage on similarity queries

## Reading

### The Full Migration SQL

The migration creates the vector table, the index, the unique constraint, and the two RPC functions the frontend depends on. Writing it from scratch (rather than modifying a provided migration) forces you to understand every decision.

**Step 1: Enable the pgvector extension**

```sql
CREATE EXTENSION IF NOT EXISTS vector;
```

This must run before any vector columns can be created. Supabase enables it in the database settings, but the migration includes it for completeness.

**Step 2: Create the table**

```sql
CREATE TABLE document_chunks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_title TEXT NOT NULL,
  chapter TEXT,
  content TEXT NOT NULL,
  content_hash CHAR(32) NOT NULL,
  embedding VECTOR(768),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);
```

Column decisions:
- `id`: UUID is standard for Supabase; auto-generated
- `chapter TEXT` (nullable): chapters are optional; periodicals don't have them
- `embedding VECTOR(768)`: must match the output dimension of your embedding model (Gemini embedding-001 = 768)
- `metadata JSONB`: flexible field for future extension without schema changes
- `created_at TIMESTAMPTZ`: timezone-aware timestamp, Supabase default

**Step 3: Add the unique constraint for dedup**

```sql
ALTER TABLE document_chunks
ADD CONSTRAINT unique_content_hash UNIQUE (content_hash);
```

This must be separate from the table creation because it affects an existing column. The constraint enforces that no two rows can have the same content_hash — this is what makes upsert-based dedup work.

**Step 4: Create the HNSW vector index**

```sql
CREATE INDEX ON document_chunks
USING hnsw (embedding vector_cosine_ops)
WITH (m = 16, ef_construction = 64);
```

**Why HNSW?** Hierarchical Navigable Small World indexes are the current best practice for approximate nearest-neighbor search on vector data. They build a multi-layer graph structure that allows very fast approximate search at high dimensionality. The alternative — IVFFlat — is faster to build but slower to query for corpora above ~10,000 rows.

**The parameters:**
- `m = 16`: the number of connections per node in the graph. Higher m = better recall but larger index size. 16 is a safe default for corpora up to 100,000 rows.
- `ef_construction = 64`: the search depth during index construction. Higher ef_construction = better index quality but slower build. 64 is appropriate for offline index building; increase to 128 for very large corpora.

### The Distance-to-Similarity Conversion

pgvector's `<=>` operator computes **cosine distance**, not cosine similarity. These are related but inverse:

- Cosine distance = `1 - cosine_similarity`
- Cosine similarity = `1 - cosine_distance`

So to get similarity from pgvector:
```sql
SELECT 1 - (embedding <=> query_embedding) AS similarity
```

**Why this matters:** Without the `1 -` conversion, the ORDER BY would sort in the wrong direction (distance 0 = identical, distance 2 = opposite; you want lowest distance first, not highest). The conversion also normalizes the range: similarity 1.0 = identical, 0.0 = unrelated, which is the intuitively correct scale for displaying similarity scores to users.

### The `match_documents` RPC Function

```sql
CREATE OR REPLACE FUNCTION match_documents(
  query_embedding VECTOR(768),
  match_threshold FLOAT DEFAULT 0.7,
  match_count INT DEFAULT 5
)
RETURNS TABLE (
  id UUID,
  source_title TEXT,
  chapter TEXT,
  content TEXT,
  similarity FLOAT
)
LANGUAGE SQL STABLE
AS $$
  SELECT
    id,
    source_title,
    chapter,
    content,
    1 - (embedding <=> query_embedding) AS similarity
  FROM document_chunks
  WHERE 1 - (embedding <=> query_embedding) > match_threshold
  ORDER BY similarity DESC
  LIMIT match_count;
$$;
```

The `STABLE` annotation tells Postgres this function doesn't modify the database and returns the same results for the same inputs within a transaction — this enables query plan caching.

**Always `.slice(0, match_count)` results in application code** even though LIMIT is set in the function. pgvector may return slightly more rows than requested due to approximate search behavior. Slicing in the application layer guarantees the count.

### Using EXPLAIN ANALYZE to Verify Index Usage

After creating the index, verify it's being used:

```sql
EXPLAIN ANALYZE
SELECT id, 1 - (embedding <=> '[0.1, 0.2, ...]'::vector) AS similarity
FROM document_chunks
ORDER BY similarity DESC
LIMIT 5;
```

Look for `Index Scan using document_chunks_embedding_idx` in the output. If you see `Seq Scan` instead, the index isn't being used — common causes:
- The table has too few rows (Postgres prefers sequential scan under ~1,000 rows)
- The index wasn't created correctly
- `SET enable_seqscan = OFF;` to force index use and check if the results differ

For production use: ensure the HNSW index is built before ingesting large batches, or rebuild it after ingestion completes with `REINDEX INDEX CONCURRENTLY`.

## Reflection Questions
1. You create a table with `embedding VECTOR(1536)` but your embedding model produces 768-dimensional vectors. What happens when you try to insert a row? What's the fix?
2. Your `EXPLAIN ANALYZE` shows a sequential scan on a table with 15,000 rows. What are two possible reasons the index isn't being used, and how would you diagnose each?
3. The `match_documents` function has `match_count INT DEFAULT 5` but the frontend calls it with `match_count: 10`. Then the application does `.slice(0, 5)`. What is retrieved from the database, and what does the user see? Is this a problem?

## Prep Task
Before your next session: Write the full migration SQL from scratch in a text editor (don't copy — write it fresh to memorize the structure). Include all four parts: extension, table, unique constraint, HNSW index, match_documents RPC, get_corpus_titles RPC. Run it on your Supabase project and verify it executes without error. Run EXPLAIN ANALYZE on a test query and paste the output — note whether you see an index scan or a sequential scan.
