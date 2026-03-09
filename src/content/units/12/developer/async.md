# Unit 12: Scaling to Community — Async Materials
**Pathway:** Archive Developer
**Duration:** 45–60 min

## Learning Objectives
- Abstract the archive codebase into a reusable template repository
- Design a bootstrap configuration system that separates per-figure settings from shared infrastructure
- Document the template in a way that non-technical collaborators can understand and use

## Reading

### What Changes Per Figure, What Stays the Same

After building one living archive, the clearest architectural insight is that the codebase splits into two distinct layers: things that change per figure, and things that don't.

**What changes per figure:**
- `corpus/` — the raw text files and their filenames
- `TITLE_MAP` in `scripts/ingest-corpus.ts` — filename-to-display-title mappings
- `web/src/data/worksMetadata.ts` — the structured work entries driving the About page and corpus sidebar
- `web/src/styles/theme.ts` (or equivalent) — color scheme, figure name, archive title
- Copy in `web/src/content/` — landing page text, about text, usage guidelines
- Environment variable values — Supabase project URL, API keys

**What doesn't change:**
- The entire database schema (`document_chunks` table, HNSW index, `match_documents` RPC)
- All script logic in `scripts/chunk-text.ts`, `scripts/embed-corpus.ts`, `scripts/ingest-corpus.ts`
- The entire RAG pipeline in `api/chat.ts`
- The frontend component structure — `CorpusSidebar`, `ChatPanel`, `PlatesGallery`, `TabBar`
- The Vercel deployment configuration and `vercel.json`

This split makes a template architecture obvious: extract everything in the first list into a single configuration file, and let the shared infrastructure read from it.

### Designing config.ts

A well-designed `config.ts` file should answer every figure-specific question the codebase needs to ask. Minimum fields:

```typescript
export const archiveConfig = {
  figure: {
    name: "W.E.B. Du Bois",
    shortName: "Du Bois",
    years: "1868–1963",
    description: "Sociologist, historian, civil rights activist",
  },
  theme: {
    primaryColor: "#8B0000",
    secondaryColor: "#D4A017",
    fontFamily: "Georgia, serif",
  },
  corpus: {
    path: "./corpus/",
    titleMap: { /* filename prefix → display title */ },
  },
  worksMetadata: [ /* work entries */ ],
  content: {
    heroHeadline: "Explore the mind and work of W.E.B. Du Bois",
    aboutText: "...",
    usageGuidelines: "...",
  },
};
```

A `bootstrap.ts` script reads `archiveConfig` and generates the correct `.env` template, validates that all required environment variables are set, runs the schema migration if the tables don't exist, and kicks off ingestion in the right order.

### Publishing as a GitHub Template Repository

The template repository should be structured so a non-technical librarian with a patient technical colleague can follow it. Key documentation layers:

1. **README.md** — Quick start in under 10 steps, with no assumed terminal knowledge
2. **CONFIGURATION.md** — Every field in `config.ts` explained with examples
3. **TROUBLESHOOTING.md** — The 10 most common errors and how to fix them (build from your own experience)
4. **CORPUS-GUIDE.md** — How to find and download corpus files for different types of historical figures

A GitHub template repository (set in repo Settings → General → "Template repository") lets any user click "Use this template" and start a fresh repo with the same structure. They never need to fork or clone the original.

Open-source contribution: If other institutions use your template to build archives, their bug reports and improvements make the template better for everyone. This is the consortium model at the code level.

## Reflection Questions
1. What is the minimum set of fields in `config.ts` that would be enough to configure a completely different archive — say, an Ida B. Wells archive — without touching any other file?
2. If you were writing the README for someone who has never used a terminal, what would step 1 be? What would you not assume they know?
3. Looking at the Du Bois archive codebase now, what is one architectural decision you'd redo differently in the template? Why?

## Prep Task
Before your next session: Read `web/src/styles/theme.ts` (or the closest equivalent in the repo) and `web/src/data/worksMetadata.ts`. Make a complete list of every value in those two files that would need to change for a new figure. Bring that list to the session — it becomes the first draft of your `config.ts` schema.
