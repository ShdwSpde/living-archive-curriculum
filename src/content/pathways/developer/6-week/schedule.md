# Archive Developer Pathway — 6-Week Schedule
**Pathway:** Archive Developer
**Duration:** 6 weeks
**Sessions:** 18 (3 per week, ~75 min each)
**Final Deliverable:** Production-ready archive with custom React frontend, cost optimization implemented, and template repository published to GitHub

## Overview
The 6-week developer pathway is the most comprehensive technical track. Participants build the complete stack — backend, frontend, deployment infrastructure, and cost optimization — and finish by abstracting their work into a reusable template repository. The deliverable is not just a working archive but a contribution to the open-source ecosystem: a template others can use to build archives for their own historical figures.

## Week-by-Week Schedule

| Day | Unit | Topic | Async Prep | Session Goal |
|-----|------|-------|------------|--------------|
| Day 1 | Unit 1 | Architecture Overview | Read Unit 1 async: full stack overview; trace a query in the Du Bois source code | Run the archive locally; read all source files; draw the system architecture diagram |
| Day 2 | Unit 2 | Figure & Corpus Selection | Read Unit 2 async: corpus considerations, file formats, volume estimation | Commit to one figure; set up project repo; plan corpus acquisition |
| Day 3 | Unit 3 | Corpus Acquisition | Read Unit 3 async: batch downloading, encoding normalization, copyright metadata | Implement batch download script; normalize files; document all sources |
| Day 4 | Unit 4 | Text Processing | Read Unit 4 async: chunking strategy, overlap, quality assessment | Implement and tune chunking pipeline; run on full corpus |
| Day 5 | Unit 5 | Embeddings | Read Unit 5 async: Gemini API, batching, rate limiting | Implement embedding pipeline with full error handling and resume support |
| Day 6 | Unit 6 | Schema & Database | Read Unit 6 async: Supabase pgvector, HNSW, match_documents RPC | Set up Supabase project; run migrations; deploy RPC; verify |
| Day 7 | Unit 7 | Metadata & Ingestion | Read Unit 7 async: TITLE_MAP, worksMetadata, deduplication | Complete TITLE_MAP and worksMetadata; run full ingestion; verify chunk counts |
| Day 8 | Unit 8 | RAG Pipeline | Read Unit 8 async: the full query flow | Implement `api/chat.ts`; trace end to end with logging; tune retrieval parameters |
| Day 9 | Unit 9 | Quality Auditing | Read Unit 9 async: designing a test suite, evaluating citations | Run 20-question test suite; document failure patterns; implement top 3 fixes |
| Day 10 | Unit 9 (continued) | Quality Fixes | Complete test suite analysis before session | Fix remaining quality issues; achieve 80%+ accuracy on test suite |
| Day 11 | Frontend | React Frontend Customization | Review `web/src/` structure; identify all figure-specific values | Customize the React frontend: colors, copy, works metadata display |
| Day 12 | Frontend | Frontend Polish & Testing | Complete all frontend customization | End-to-end testing with the live frontend; fix UI issues; mobile check |
| Day 13 | Unit 10 | Cost Optimization | Read Unit 10 async: caching, model routing, rate limiting | Implement Supabase query cache table and cache lookup/store logic in `api/chat.ts` |
| Day 14 | Unit 10 (continued) | Model Routing & Rate Limiting | Review cache implementation from Day 13 | Implement model routing (Haiku for factual, Sonnet for interpretive); add IP rate limiting |
| Day 15 | Unit 11 | Deployment | Read Unit 11 async: Vercel CLI, env var management, edge function constraints | Deploy to production with Vercel CLI; configure custom domain if available; verify function timing |
| Day 16 | Unit 12 | Template Repository Design | Read Unit 12 async: config.ts architecture, bootstrap script design | Design `config.ts` schema; implement the interface; move Du Bois values into config |
| Day 17 | Unit 12 (continued) | Bootstrap Script Implementation | Implement config.ts before session | Implement `bootstrap.ts`; test by configuring a second figure (even hypothetically) |
| Day 18 | Unit 12 (continued) | Open-Source Publication | Complete template repo with README | Publish template repo to GitHub as a template repository; present to cohort |

## Final Deliverable

**Three-component deliverable:**

**1. Production-ready live archive**:
- Deployed on Vercel with a public URL
- Custom React frontend with figure-specific colors, copy, and branding
- Full corpus ingested with no embedding errors
- Passes 20-question test suite at 80%+ accuracy with citations

**2. Cost optimization implementation** (committed to the repo):
- `query_cache` table in Supabase with schema: `query_hash TEXT PRIMARY KEY, response JSONB, created_at TIMESTAMP, expires_at TIMESTAMP`
- Cache lookup and store logic in `api/chat.ts`
- Model routing logic: short factual queries routed to Haiku, longer interpretive queries to Sonnet
- IP-based rate limiting in the Vercel edge function (20 queries/hour, 429 response with Retry-After)
- Documentation of estimated monthly savings at 3 traffic scenarios

**3. Template repository** published to GitHub:
- Marked as a GitHub template repository
- `config.ts` with TypeScript interface and Du Bois values as the working example
- `bootstrap.ts` that validates config, generates `.env.template`, and checks schema
- `README.md` with quick start in 10 steps (written for a non-technical librarian with a technical colleague)
- `CONFIGURATION.md` documenting every field in `config.ts` with examples

## Assessment Criteria
- **Production quality**: The live archive handles concurrent queries without errors, responds within the Vercel edge function timeout, and recovers gracefully from API failures
- **Cost optimization correctness**: Cache hits are verified (same query returns the cached response on second call); model routing is tested with both short and long query types; rate limiting returns 429 correctly
- **Template usability**: A cohort peer can configure a new figure using only `config.ts` and the README — no source code changes required for figure-specific values
- **Open-source readiness**: The template repository README explains what the project is, who it's for, and how to start — in language accessible to a digital librarian who has never written TypeScript
