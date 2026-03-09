# Archive Builder Pathway — 6-Week Schedule
**Pathway:** Archive Builder
**Duration:** 6 weeks
**Sessions:** 18 (3 per week, ~75 min each)
**Final Deliverable:** Two deployed archives (two different figures) + replication guide

## Overview
The 6-week builder pathway is the most ambitious practitioner track. Participants build one complete archive across the first four weeks, then replicate the process for a second historical figure in weeks five and six. The experience of building twice — with the lessons of the first build in hand — is the pedagogical core. The replication guide produced is a contribution to the field.

## Week-by-Week Schedule

| Day | Unit | Topic | Async Prep | Session Goal |
|-----|------|-------|------------|--------------|
| Day 1 | Unit 1 | Why Living Archives | Read Unit 1 async: what a living archive is, browse the Du Bois demo | Set up development environment; clone and run the Du Bois archive locally |
| Day 2 | Unit 2 | Choosing a Historical Figure | Read Unit 2 async: figure selection criteria, corpus availability | Commit to Figure 1; create the project repo; begin corpus folder structure |
| Day 3 | Unit 3 | Sourcing the Corpus | Read Unit 3 async: Internet Archive, HathiTrust, copyright assessment | Download primary corpus texts for Figure 1; verify file integrity |
| Day 4 | Unit 4 | Text Quality & Preparation | Read Unit 4 async: OCR noise, cleaning strategies, metadata fields | Assess and clean corpus files; document quality issues |
| Day 5 | Unit 5 | Embedding & AI | Read Unit 5 async: how embeddings work | Run the chunking script on Figure 1 corpus; verify chunk counts |
| Day 6 | Unit 6 | Database Design | Read Unit 6 async: Supabase schema, chunk table, HNSW index | Set up Supabase project for Figure 1; run schema migration |
| Day 7 | Unit 7 | Metadata & Cataloging | Read Unit 7 async: worksMetadata structure, TITLE_MAP | Write worksMetadata.ts and TITLE_MAP entries for Figure 1 corpus |
| Day 8 | Unit 8 | RAG Pipeline | Read Unit 8 async: the query flow, ingestion pipeline | Run embedding and ingestion for Figure 1; verify in Supabase |
| Day 9 | Unit 8 (continued) | Ingestion Completion | Review ingestion results | Complete ingestion for all Figure 1 texts; run test similarity queries |
| Day 10 | Unit 9 | Quality Auditing | Read Unit 9 async: how to evaluate answers, common failure modes | Run 20-question quality audit for Figure 1; document errors and fixes |
| Day 11 | Unit 10 | Cost & Sustainability | Read Unit 10 async: cost categories, traffic scenarios, sustainability models | Build cost projection for Figure 1 archive; set Anthropic Console billing alert |
| Day 12 | Unit 11 | Deployment | Read Unit 11 async: Vercel deployment steps, env var configuration | Deploy Figure 1 archive to Vercel; verify with 3 test questions |
| Day 13 | Unit 12 | Scaling to Community | Read Unit 12 async: replication guides, Supabase architecture for multiple archives | Begin replication guide; decide: one Supabase project or two for Figure 2? |
| Day 14 | Replication | Figure 2 — Corpus Acquisition | Identify Figure 2 before this session; begin corpus download | Download and assess Figure 2 corpus; document in replication guide |
| Day 15 | Replication | Figure 2 — Ingestion Setup | Read replication guide notes before session | Set up Figure 2 in Supabase (or new table); configure TITLE_MAP and worksMetadata |
| Day 16 | Replication | Figure 2 — Ingestion & Testing | Complete Figure 2 TITLE_MAP and worksMetadata | Run ingestion for Figure 2; verify; run 10-question quality spot-check |
| Day 17 | Replication | Figure 2 — Deployment | Deploy Figure 2 to Vercel before this session | Verify both archives are live; compare quality across the two |
| Day 18 | Replication | Replication Guide Completion | Complete replication guide before this session | Present both archives to the cohort; swap replication guides for peer review |

## Final Deliverable

**Two Deployed Archives + Replication Guide**

**Two live archives** accessible at separate Vercel URLs:
- Each responds to natural language questions with cited answers
- Each corpus sidebar shows all ingested works with accurate titles
- Figure 2 archive built faster than Figure 1 — replication demonstrates learning

**Replication guide** (6–10 page document):
- **Corpus acquisition**: exact sources, download methods, edition choices, and copyright rationale for both figures
- **TITLE_MAP documentation**: every entry with the raw filename pattern and the reason for the mapping
- **Schema and ingestion log**: SQL migrations run, scripts executed in order, parameters used, any manual fixes
- **Quality issues and fixes**: a running log of every problem encountered across both builds and how each was resolved
- **Verification protocol**: the 5–10 test queries you use to confirm a fresh ingestion worked correctly
- **Time log**: how long each phase took for Figure 1 vs. Figure 2 — evidence of the learning curve

## Assessment Criteria
- **Two working archives**: Both Vercel URLs are live and respond to queries correctly — not just deployed but functional
- **Replication evidence**: The Figure 2 build time is documented and the replication guide explains what made it faster
- **Guide usability**: A cohort peer can follow the replication guide without additional explanation from the author (tested in the Day 18 peer review)
- **Quality across both archives**: Both archives pass a 10-question spot-check with at least 70% accurate, cited responses
