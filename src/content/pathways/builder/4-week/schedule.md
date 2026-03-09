# Archive Builder Pathway — 4-Week Schedule
**Pathway:** Archive Builder
**Duration:** 4 weeks
**Sessions:** 12 (3 per week, ~75 min each)
**Final Deliverable:** Working live archive with functional RAG queries and documented quality audit

## Overview
The 4-week builder pathway takes practitioners through all nine curriculum units. Participants move from concept and corpus acquisition all the way through deployment and quality auditing. The deliverable is a live, publicly accessible archive on Vercel that responds to queries with citations — not a prototype, but a working tool someone else could use.

## Week-by-Week Schedule

| Day | Unit | Topic | Async Prep | Session Goal |
|-----|------|-------|------------|--------------|
| Day 1 | Unit 1 | Why Living Archives | Read Unit 1 async: what a living archive is, browse the Du Bois demo | Set up development environment; clone and run the Du Bois archive locally |
| Day 2 | Unit 2 | Choosing a Historical Figure | Read Unit 2 async: figure selection criteria, corpus availability | Commit to one figure; create the project repo; begin corpus folder structure |
| Day 3 | Unit 3 | Sourcing the Corpus | Read Unit 3 async: Internet Archive, HathiTrust, copyright assessment | Download primary corpus texts; verify file integrity |
| Day 4 | Unit 4 | Text Quality & Preparation | Read Unit 4 async: OCR noise, cleaning strategies, metadata fields | Assess and clean corpus files; document quality issues |
| Day 5 | Unit 5 | Embedding & AI | Read Unit 5 async: how embeddings work, what vectors mean | Run the chunking script on your corpus; verify chunk counts |
| Day 6 | Unit 6 | Database Design | Read Unit 6 async: Supabase schema, chunk table, HNSW index | Set up Supabase project; run schema migration; verify table structure |
| Day 7 | Unit 7 | Metadata & Cataloging | Read Unit 7 async: worksMetadata structure, TITLE_MAP, cataloging decisions | Write worksMetadata.ts entries for all corpus works; configure TITLE_MAP |
| Day 8 | Unit 8 | RAG Pipeline | Read Unit 8 async: the query flow, what api/chat.ts does, how citations are generated | Run the embedding and ingestion scripts; verify chunk counts in Supabase |
| Day 9 | Unit 8 (continued) | Ingestion Completion | Review any issues from Day 8 ingestion run | Complete ingestion for all corpus texts; run test similarity queries |
| Day 10 | Unit 9 | Quality Auditing | Read Unit 9 async: how to evaluate archive answers, common failure modes | Run 10-question quality audit; document errors and fixes |
| Day 11 | Unit 11 | Deployment | Read Unit 11 async: Vercel deployment steps, env var configuration, rollback | Deploy archive to Vercel; verify with 3 test questions; set production URL |
| Day 12 | Review | Quality Audit Completion | Complete the 20-question audit before this session | Document quality audit results; present live archive to cohort |

## Final Deliverable

**Working Live Archive with Quality Audit Documentation**

**Live archive** accessible at a Vercel URL:
- Responds to natural language questions with cited answers
- Corpus sidebar shows all ingested works with accurate titles
- At least 5 primary texts fully ingested (no embedding errors)
- All environment variables set correctly in Vercel production environment

**Quality audit document** (structured text file or spreadsheet):
- 20 test questions spanning factual, interpretive, and comparative types
- For each question: the question, the archive's answer, citation quality rating (1–5), accuracy assessment (correct / partially correct / incorrect / no answer), and notes
- Summary section: overall accuracy rate, most common failure mode, recommended corpus additions or fixes
- At least 3 issues identified and resolved before submitting the deliverable

## Assessment Criteria
- **Archive functionality**: The live URL works, responds to queries, and displays citations for at least 80% of questions in the quality audit
- **Ingestion completeness**: All 5+ corpus texts appear in the corpus sidebar with correct titles, indicating successful ingestion
- **Audit thoroughness**: The 20-question audit covers at least 3 different types of questions and includes at least one interpretive question requiring synthesis across multiple texts
- **Issue resolution**: At least 3 quality issues are documented with both the problem and the fix — not just identified but addressed
