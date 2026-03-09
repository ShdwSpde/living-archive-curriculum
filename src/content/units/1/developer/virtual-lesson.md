# Unit 1: Why Living Archives — Virtual Lesson
**Pathway:** Archive Developer
**Duration:** 75 min
**Materials:** Codebase open locally, DevTools, slides

## Agenda
| Time | Activity |
|------|----------|
| 0:00–0:10 | Check-in: what did you observe in DevTools? |
| 0:10–0:40 | Architecture deep-dive: follow a query end-to-end |
| 0:40–1:05 | Breakout: figure selection + architecture decisions |
| 1:05–1:15 | Debrief: decisions that will affect your build |

## Slide Outline

**Slide 1: Follow a Query End-to-End**
Live code walkthrough — open the repo in your editor and trace these files:
1. User types question → `web/src/context/ChatContext.tsx`
2. POST to Vercel function → `api/chat.ts`
3. Embed the question → Gemini API call
4. Vector similarity search → Supabase `match_documents` RPC
5. Assemble prompt with retrieved passages
6. Stream Claude response → back to frontend

**Slide 2: The Schema**
Open `supabase/migrations/` — the actual SQL. Walk through:
- `document_chunks` table fields: `content`, `source`, `source_title`, `chapter`, `chunk_index`, `metadata`, `embedding`
- HNSW index creation — why `vector_cosine_ops`?
- `match_documents` function — understand each parameter

**Slide 3: Your Build Decisions**
For each: keep as-is, or customize?
- Same Supabase schema? (Yes, unless corpus > 100k chunks)
- Same embedding model? (Yes, unless multilingual corpus)
- Same frontend? (Customize branding + metadata)
- Same Vercel deployment? (Yes)
- What's different about your figure's corpus vs. Du Bois?

## Breakout Activity (25 min)
**Pairs**

Each person walks their partner through their chosen figure's corpus:
- What's the public domain cutoff for this figure's work?
- Estimated chunk count: # texts × avg chunks per text
- Any unusual formats? (speeches, letters, multilingual, heavy OCR artifacts)
- Expected ingestion time at free-tier rate limits (15 RPM, batches of 5)

Partner gives one architectural concern or question.

## Debrief
Focus: what will diverge from the Du Bois implementation? Flag those as "custom work" items. The goal is to know exactly where you're following the playbook and where you're extending it.

## Facilitator Notes
- Participants should have the repo cloned and running locally before this session — if they don't, pair them with someone who does for the walkthrough
- The DevTools exercise reveals whether participants understand the client-server boundary — use their observations to frame the architecture discussion
- Common confusion: the difference between the Supabase anon key (used in the frontend) and service role key (used in scripts) — address this explicitly
