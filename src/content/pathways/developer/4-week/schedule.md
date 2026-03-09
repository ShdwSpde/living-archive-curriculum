# Archive Developer Pathway — 4-Week Schedule
**Pathway:** Archive Developer
**Duration:** 4 weeks
**Sessions:** 12 (3 per week, ~75 min each)
**Final Deliverable:** Full RAG backend with test suite of 20 questions and documented quality metrics

## Overview
The 4-week developer pathway builds the complete backend of a living archive — schema, ingestion pipeline, vector search, RAG query function — and adds a systematic quality evaluation process. Covering Units 1–9, participants implement every layer from corpus text to API response and verify the system's behavior with a documented test suite. The deliverable is a production-quality backend, ready for a frontend to be attached.

## Week-by-Week Schedule

| Day | Unit | Topic | Async Prep | Session Goal |
|-----|------|-------|------------|--------------|
| Day 1 | Unit 1 | Architecture Overview | Read Unit 1 async: full stack overview, trace a query in the Du Bois source code | Run the archive locally; read `api/chat.ts` end to end; understand the RAG loop |
| Day 2 | Unit 2 | Figure & Corpus Selection | Read Unit 2 async: corpus considerations, file formats, volume estimation | Commit to one figure; set up the project repo; download initial corpus texts |
| Day 3 | Unit 3 | Corpus Acquisition | Read Unit 3 async: batch downloading, encoding normalization, copyright metadata | Implement batch download script; normalize all files; document sources |
| Day 4 | Unit 4 | Text Processing | Read Unit 4 async: chunking strategy, overlap logic, quality assessment | Implement and tune the chunking pipeline; run on full corpus; inspect output |
| Day 5 | Unit 5 | Embeddings | Read Unit 5 async: Gemini embedding API, batch size limits, rate limiting | Implement embedding pipeline with batching (50/batch, 2s delay); test on 100 chunks |
| Day 6 | Unit 6 | Schema & Database | Read Unit 6 async: Supabase pgvector schema, HNSW index, match_documents RPC | Set up Supabase; run migrations; deploy RPC function; verify with direct SQL query |
| Day 7 | Unit 7 | Metadata & Ingestion | Read Unit 7 async: TITLE_MAP, worksMetadata, deduplication strategy | Configure TITLE_MAP; write worksMetadata; run full ingestion; verify chunk counts |
| Day 8 | Unit 8 | RAG Pipeline | Read Unit 8 async: the full query flow — retrieval, context assembly, LLM call, citation extraction | Implement or audit `api/chat.ts`; trace a query end to end with logging |
| Day 9 | Unit 8 (continued) | Pipeline Optimization | Review pipeline logs from Day 8 | Tune retrieval parameters (topK, match_threshold); test edge cases |
| Day 10 | Unit 9 | Quality Auditing | Read Unit 9 async: designing a test suite, evaluating citations, common failure patterns | Design 20-question test suite spanning factual, interpretive, and comparative questions |
| Day 11 | Unit 9 (continued) | Test Suite Execution | Complete test suite design before session | Run all 20 questions; document results; identify top 5 failure patterns |
| Day 12 | Unit 9 (continued) | Quality Fixes & Documentation | Analyze failure patterns from Day 11 | Fix top 3 issues; document quality metrics; present backend to cohort |

## Final Deliverable

**Full RAG Backend with Test Suite and Quality Metrics**

**Backend components** (all committed to the project repo):
- `supabase/migrations/` — all SQL migrations run against the Supabase project
- `scripts/chunk-text.ts` — tuned for your corpus (parameters documented in comments)
- `scripts/embed-corpus.ts` — batch embedding pipeline with error handling and resume support
- `scripts/ingest-corpus.ts` — TITLE_MAP configured, deduplication logic present
- `api/chat.ts` — the RAG query function with retrieval, context assembly, LLM call, and citation extraction

**Supabase database state**:
- All corpus chunks ingested with no null embeddings
- HNSW index built and verified
- `match_documents` RPC returning results under 200ms

**Test suite documentation** (`docs/quality-audit.md`):
- 20 test questions with category labels (factual / interpretive / comparative)
- For each question: the answer, top 3 retrieved passages with cosine similarity scores, accuracy rating (correct / partial / incorrect), and notes
- Summary metrics: overall accuracy rate, average citation quality, retrieval precision at k=5
- Top 5 failure patterns with root cause analysis
- Three fixes implemented with before/after comparison

## Assessment Criteria
- **Backend completeness**: All five code components present, tested, and committed; zero ingestion errors in the final run
- **Test suite rigor**: 20 questions span all three types with at least 5 in each category; questions are substantive enough to require actual retrieval (not just metadata lookups)
- **Quality metrics**: Accuracy rate, citation quality, and retrieval precision are calculated and documented — not just reported qualitatively
- **Fix documentation**: Each fix includes the failure mode, the root cause, the code change, and a measurement of improvement — engineering-grade documentation
