# Unit 12: Scaling to Community — Virtual Lesson
**Pathway:** Archive Developer
**Duration:** 75 min
**Format:** Synchronous video session with screen share

## Session Goals
- Review the template repository architecture as a group and agree on design principles
- Design the `config.ts` schema in breakout pairs
- Converge on a shared group spec by merging the best elements from each pair's design

## Facilitator Agenda

### Opening (5 min)
Framing: Today we're not building a feature — we're building the infrastructure that makes the next archive 10x faster to build. The deliverable is a design spec, not running code.

### Architecture Review (20 min)
Facilitator shares screen. Walk through the template repository design:

**The key question for each piece of the codebase:**
"Does this belong in `config.ts` (per-figure) or in the shared code (unchanged across archives)?"

Walk through the directory tree together:
- `corpus/` → config (per-figure files)
- `scripts/ingest-corpus.ts` → mostly shared, but `TITLE_MAP` → config
- `web/src/data/worksMetadata.ts` → config
- `web/src/styles/theme.ts` → config (colors, figure name)
- `web/src/content/` → config (copy)
- `api/chat.ts` → shared (unchanged)
- `supabase/migrations/` → shared (unchanged)
- `scripts/chunk-text.ts` → shared (unchanged)
- `scripts/embed-corpus.ts` → shared (unchanged)

Then: what does `bootstrap.ts` do? Walk through the bootstrap flow:
1. Read `config.ts`
2. Validate all required fields are present
3. Generate `.env.template` with the right variable names
4. Check if tables exist in Supabase; run migration if not
5. Print the ingestion command with the right parameters

### Breakout Pairs (25 min)
Pairs design the `config.ts` schema. Each pair must answer:
1. What are the required top-level sections? (figure, theme, corpus, content, ?)
2. For each section, what are the required fields? What are optional with defaults?
3. How do you handle `worksMetadata` — inline in config, or imported from a separate file?
4. What does the TypeScript type signature look like? Write it out.

Pairs also answer: what does the README's "Quick Start" section look like for a non-technical librarian? Write the first 5 steps.

### Debrief and Spec Convergence (20 min)
Each pair presents their schema. Facilitator notes:
- Common fields everyone agreed on → goes straight into the group spec
- Fields that differ → group votes on the better design and reason
- Fields one pair has that the other doesn't → evaluate whether they belong in config or in docs

Facilitator writes the converged spec into a shared document in real time.

### Synthesis (5 min)
Group spec is now the starting point for the in-person implementation session. Each person commits to: "I will implement X section of the bootstrap script before we meet in person."

Closing: The best open-source projects start with exactly this — a design conversation where people bring different intuitions and converge on something better than any individual would have built alone.

## After This Session
Review the converged `config.ts` spec. Identify any fields you're unsure about and prepare questions for the in-person session.
