# Archive Builder Pathway — 2-Week Schedule
**Pathway:** Archive Builder
**Duration:** 2 weeks
**Sessions:** 6 (3 per week, ~75 min each)
**Final Deliverable:** Cleaned corpus folder + configured Supabase account + completed `.env` file

## Overview
The 2-week builder pathway gives practitioners — librarians, digital humanities staff, graduate students with some technical comfort — a foundation in archive construction. Covering Units 1–4, participants move from concept to corpus acquisition, text quality assessment, and environment configuration. The deliverable is not a running archive, but the essential prerequisites: a clean corpus ready to ingest and an environment correctly configured.

## Week-by-Week Schedule

| Day | Unit | Topic | Async Prep | Session Goal |
|-----|------|-------|------------|--------------|
| Day 1 | Unit 1 | Why Living Archives | Read Unit 1 async: what a living archive is, RAG vs. fine-tuning, browse the Du Bois demo | Set up Node.js environment; clone the Du Bois archive repo; explore the codebase structure |
| Day 2 | Unit 2 | Choosing a Historical Figure | Read Unit 2 async: figure selection criteria, corpus availability, institutional fit | Commit to one figure; create the corpus folder structure; make the first Internet Archive download |
| Day 3 | Unit 3 | Sourcing the Corpus | Read Unit 3 async: Internet Archive and HathiTrust download methods, copyright assessment | Download 5+ primary corpus texts; verify file integrity and encoding |
| Day 4 | Unit 4 | Text Quality & Preparation | Read Unit 4 async: OCR noise patterns, what a good corpus file looks like, metadata fields | Assess each file for quality; flag files needing remediation; run basic cleaning on 2–3 files |
| Day 5 | Unit 4 (continued) | Corpus Cleaning | Review any Unit 4 materials not covered in Day 4 | Complete text cleaning for all corpus files; document quality issues in a log |
| Day 6 | Setup | Environment Configuration | Create accounts: Supabase, Anthropic, Google AI Studio, Vercel | Complete `.env` configuration; verify API key connections; confirm Supabase project is accessible |

## Final Deliverable

**Three-component deliverable:**

1. **Cleaned corpus folder** (`corpus/` directory containing):
   - All downloaded text files with consistent naming convention
   - A `corpus-log.md` documenting: source URL, download date, edition/scan used, OCR quality rating (1–5), any cleaning steps applied
   - At minimum 5 primary texts (speeches, essays, books, or equivalent)

2. **Configured Supabase account** with:
   - A new project created (not the Du Bois project — a fresh project for your figure)
   - The schema migration run from `supabase/migrations/` — `document_chunks` table present
   - HNSW index created on the `embedding` column
   - `match_documents` RPC function deployed

3. **Completed `.env` file** with:
   - `SUPABASE_URL` — your project's URL
   - `SUPABASE_ANON_KEY` — your project's anon key
   - `ANTHROPIC_API_KEY` — your Anthropic API key
   - `GEMINI_API_KEY` — your Google Gemini API key (for embeddings)
   - Verified: `npm run dev` starts without environment errors

## Assessment Criteria
- **Corpus completeness**: At least 5 texts downloaded and cleaned, with a documented quality log showing each file was evaluated
- **Schema accuracy**: The Supabase `document_chunks` table matches the curriculum schema exactly — column names, types, and indexes correct
- **Environment integrity**: All four environment variables present and verified (each API key tested with at least one call)
- **Documentation discipline**: The corpus log documents source URLs, dates, and quality ratings — not just a list of filenames
