# Unit 12: Scaling to Community — Async Materials
**Pathway:** Archive Builder
**Duration:** 30–45 min

## Learning Objectives
- Replicate the full archive-building process for a second figure, from corpus download through deployment, using your notes from the first build
- Evaluate the tradeoffs between using one Supabase project for multiple archives versus separate projects per archive
- Write a personal replication guide that another builder at a peer institution could use to build their own archive

## Reading

### The Second Archive: What Changes, What Doesn't

After building your first living archive, the second one is dramatically faster — not because the technical steps are easier, but because you've developed judgment about where to focus attention and which problems to anticipate.

**What stays the same:**
- Supabase schema (the `document_chunks` table structure)
- Embedding pipeline (Gemini embedding-001, 768 dimensions, batch of 50 with 2-second delay)
- RAG query logic (`match_documents` RPC, `match_threshold: 0.7`)
- Vercel deployment configuration
- React frontend structure and component architecture

**What changes:**
- The corpus files (different figure, different texts)
- The `TITLE_MAP` in the ingestion script (mapping filenames to display titles)
- `worksMetadata.ts` (the list of works for the sidebar and About page)
- The system prompt (should reference the new figure's name, era, and key works)
- The UI color scheme (optional — but distinguishes archives visually)
- The Supabase project (or the table prefix, if sharing a project)

The build time for a second archive, assuming the corpus is already assembled, is typically 4–8 hours rather than 4–6 weeks. The difference is all in corpus preparation — if the texts are already clean and well-named, setup is fast.

### One Supabase Project vs. Separate Projects

If you're building archives for multiple figures, you face a decision: share one Supabase project with multiple archives, or maintain separate projects.

**Single project, separate tables (or table prefix):**
```sql
-- Shared project, separate tables
CREATE TABLE document_chunks_dubois (...);
CREATE TABLE document_chunks_wells (...);

-- Or: shared table with a source_archive column
ALTER TABLE document_chunks ADD COLUMN archive_id TEXT;
CREATE INDEX idx_archive ON document_chunks(archive_id);
```

Advantages: simpler billing (one plan), shared infrastructure, easier to cross-query if you want multi-archive search.

Disadvantages: a mistake in one archive's ingestion can affect the shared project, permission management is harder, and you can't independently scale or migrate one archive without affecting others.

**Separate projects:**
Each archive has its own Supabase project, its own API keys, its own billing plan.

Advantages: complete isolation, independent scaling, clean deletion if one archive is retired, separate access controls for different teams.

Disadvantages: multiple billing accounts, duplicated configuration, more environment variables to manage.

**Recommendation for most builders:** Start with separate projects. The isolation is worth the small overhead, and consolidating later is easier than separating a shared project.

### Writing Your Personal Replication Guide

The most valuable thing you can produce after building your first archive is a guide that another builder — someone with similar technical skills but unfamiliar with the specific codebase — could follow to build their own.

**What a good replication guide covers:**

**1. Prerequisites** — What you need before you start:
- Technical skills required (what level of TypeScript, database familiarity, command-line comfort)
- Accounts to create (Supabase, Vercel, Anthropic, Google AI Studio)
- Time estimate (realistic, by phase: corpus prep / ingestion / deployment / testing)

**2. Corpus preparation** — The specific decisions that aren't in the code:
- Where to download public-domain texts (Internet Archive, Project Gutenberg, HathiTrust)
- What file naming convention to use (the `TITLE_MAP` depends on this)
- How to identify and handle OCR noise
- How to check if a text is actually public domain

**3. Configuration decisions** — The parameters that must match your figure:
- `TITLE_MAP` entries (every file needs one)
- `worksMetadata.ts` format (required fields: id, title, year, description, source)
- System prompt modifications (which figure? what years? what key works?)
- Color scheme (optional but recommended for visual distinction)

**4. Gotchas you encountered** — The most valuable part of your guide:
- The specific error you hit and how you fixed it
- The Supabase default 1000-row limit (always mention this)
- The batch UPDATE timeout at 2000 rows
- The ingestion resume pattern

**5. Testing checklist** — How you verified the archive worked:
- The three-question functional test (factual, interpretive, cross-corpus)
- The corpus sidebar spot-check (are all works visible?)
- The spending alert confirmation

This guide doesn't need to be a polished document. A README in your repository, a Notion page, or even a well-organized set of notes is sufficient. The goal is: could someone who hasn't used this codebase before follow these steps and produce a working archive?

## Reflection Questions
1. You're building an archive of Ida B. Wells. You already have the Du Bois archive running on a Supabase project. You're considering adding a `wells_` prefix to all table names and running both archives from the same project. What are the three risks you're accepting, and what's the one condition under which it's worth accepting them?
2. You share your replication guide with a colleague at a partner institution. They report back: "I got stuck at the `TITLE_MAP` step — I wasn't sure what to do with files that had multiple editions." Your guide didn't cover this. Write the paragraph you'd add to the guide.
3. A library director at an HBCU asks: "How long would it take your team to build an archive like yours for one of our historical figures?" What's your answer, and what conditions does your answer assume?

## Prep Task
Before your next session: Begin your personal replication guide. Start with the two sections that are most valuable to someone starting fresh: "Corpus preparation decisions" and "Gotchas and fixes." Write at least 300 words covering the specific decisions and problems you encountered in your first build. Bring the draft to the next session.
