# Unit 1: Why Living Archives — In-Person Lesson
**Pathway:** Archive Developer
**Duration:** 75 min
**Room setup:** Computer lab, whiteboard visible to all
**Materials:** Printed schema reference card, laptops with repo cloned and running

## Agenda
| Time | Activity |
|------|----------|
| 0:00–0:10 | Warm-up: draw the system from memory |
| 0:10–0:35 | Code walkthrough: trace a query live |
| 0:35–1:00 | Setup verification + first code exploration |
| 1:00–1:15 | Synthesis: what you're building |

## Warm-Up (10 min)
No slides, no projector. Each person draws the system architecture from memory on paper — just what they recall from the async reading. Compare drawings at your table:
- What did everyone include?
- What did people miss or place incorrectly?
- Where is there genuine disagreement about how it works?

## Code Walkthrough (25 min)
Facilitator live-codes the query path on the projector. Participants follow in their own repo, opening the same files. Stop at each layer and ask:
- What goes in? What comes out?
- What would break if this step failed?
- Where are your API keys actually used?

Key files to open in order:
1. `web/src/context/ChatContext.tsx` — where the user's question enters
2. `api/chat.ts` — the Vercel edge function
3. `supabase/migrations/` — the schema and `match_documents` RPC
4. `scripts/ingest-corpus.ts` — how chunks get into the database

## Setup Verification (25 min)
Everyone runs: `cd web && npm run dev`

Verify the app loads at `http://localhost:5173`. Ask the archive a question and watch the network request in DevTools.

**Pair activity:** Code-review the chunking script together (`scripts/chunk-text.ts`):
- What does the chapter detection regex match?
- What happens to a chunk that's under 100 characters?
- How would you modify it for a corpus with no chapters?

## Synthesis (15 min)
Each person writes two things on the whiteboard:
1. Their chosen figure
2. One thing about the architecture they would change for their corpus (and why)

Facilitator notes patterns — these become the group's custom implementation agenda for later weeks.

## Facilitator Notes
- The draw-from-memory warm-up reveals who actually read the async material — use gaps constructively, not punitively
- The pair code review works best when one person reads the code aloud and the other asks questions
- The synthesis board becomes a living document — photograph it and reference it in future sessions
