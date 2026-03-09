# Archive Developer Pathway — 2-Week Schedule
**Pathway:** Archive Developer
**Duration:** 2 weeks
**Sessions:** 6 (3 per week, ~75 min each)
**Final Deliverable:** Ingested corpus in Supabase with HNSW index, verified with test similarity queries

## Overview
The 2-week developer pathway is for software engineers, data engineers, and technical practitioners who want to understand the full stack of a living archive from schema to query. Covering Units 1–5, participants move through the architecture quickly and end with a functioning database backend — corpus ingested, embeddings stored, HNSW index built, and retrieval verified. No frontend work; pure backend infrastructure.

## Week-by-Week Schedule

| Day | Unit | Topic | Async Prep | Session Goal |
|-----|------|-------|------------|--------------|
| Day 1 | Unit 1 | Architecture Overview | Read Unit 1 async: the full stack — from corpus to RAG query — with developer emphasis | Run the Du Bois archive locally; trace a single query from browser to LLM response in the source code |
| Day 2 | Unit 2 | Figure & Corpus Selection | Read Unit 2 async: corpus considerations from a developer's perspective — file formats, encoding, volume | Download 5+ primary corpus texts; identify encoding issues; sketch the TITLE_MAP |
| Day 3 | Unit 3 | Corpus Acquisition at Scale | Read Unit 3 async: batch downloading, format conversion, encoding normalization | Implement a corpus download script; normalize all files to UTF-8; count total tokens |
| Day 4 | Unit 4 | Text Processing Pipeline | Read Unit 4 async: chunking strategies, overlap logic, why 800/200 is the right default | Run `chunk-text.ts` on your corpus; inspect chunk quality; tune parameters if needed |
| Day 5 | Unit 5 | Embeddings & Schema | Read Unit 5 async: embedding models, vector dimensions, Supabase pgvector, HNSW index | Set up Supabase schema; run embedding batch (50/batch with 2s delay); ingest first 500 chunks |
| Day 6 | Unit 5 (continued) | Full Ingestion & Verification | Complete embedding run before session | Complete ingestion for all corpus; build HNSW index; run 10 test similarity queries |

## Final Deliverable

**Ingested corpus in Supabase with HNSW index, verified with test similarity queries**

**Database state** (verified via Supabase dashboard or `psql`):
- `document_chunks` table with all corpus chunks ingested
- `embedding` column populated (no null rows) with 768-dimensional vectors
- HNSW index on `embedding` column: `CREATE INDEX ON document_chunks USING hnsw (embedding vector_cosine_ops)`
- `match_documents` RPC function deployed and returning results

**Verification report** (markdown file committed to the repo):
- Total chunk count ingested
- Breakdown by source title (how many chunks per work)
- 10 test similarity queries with results: query text, top-3 returned passages, cosine similarity scores
- At least 2 queries that demonstrate the retrieval is working semantically (not just keyword matching)
- Any ingestion errors and how they were resolved

**Code artifacts**:
- `scripts/ingest-corpus.ts` with your TITLE_MAP configured for your figure
- `scripts/chunk-text.ts` with any parameter adjustments documented in comments
- Schema migration SQL (if you modified the default schema)

## Assessment Criteria
- **Ingestion completeness**: Zero null embeddings in the `document_chunks` table; chunk count consistent with corpus size (within 5%)
- **Index correctness**: HNSW index present and the `match_documents` RPC returns results in under 200ms for a test query
- **Semantic retrieval quality**: At least 8 of 10 test queries return a top passage that is genuinely relevant to the query — not just a text match
- **Code quality**: TITLE_MAP entries are complete (no raw filenames appearing as titles in query results), ingestion script handles errors without silent failures
