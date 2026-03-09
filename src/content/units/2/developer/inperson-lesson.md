# Unit 2: Choosing a Historical Figure — In-Person Lesson
**Pathway:** Archive Developer
**Duration:** 75 min
**Room setup:** Developer workstations or laptops, projector for live demo, whiteboard for architecture diagrams
**Materials:** Printed ADR template (one per person), corpus estimation calculator spreadsheet open on all machines, Internet Archive accessible

## Agenda
| Time | Activity |
|------|----------|
| 0:00–0:10 | Warm-up: corpus estimation — how big is your archive? |
| 0:10–0:30 | Facilitated presentation: corpus characteristics → architecture decisions |
| 0:30–1:00 | Workshop: write 3 ADRs and diagram your ingestion pipeline |
| 1:00–1:15 | Gallery share: pipeline diagrams on the wall |

## Warm-Up Activity

**Corpus estimation (10 min)**

Participants open the shared estimation calculator spreadsheet. Enter: number of texts, estimated average pages per text, target chunk size (800 tokens), overlap (200 tokens). The spreadsheet calculates approximate chunk count automatically.

Each person says their number aloud. Facilitator writes them all on the whiteboard in a rough range (low / medium / high). Questions to the group:
- Who has the largest corpus? What's special about it? (Usually a figure with extensive periodical runs)
- Who has the smallest? What does that mean for their architecture?
- Did anyone get a number that surprised them? In what direction?

The point of the warm-up is to anchor the session in concrete numbers — architecture discussion without numbers tends to stay abstract.

## Facilitated Presentation

**Corpus characteristics → architecture decisions (20 min)**

**Part 1: The corpus shape problem (7 min)**

Every corpus has a shape: its size, its format distribution, its OCR quality profile, and its structural regularity (all books vs. mixed books + periodicals + ephemera). The architecture that serves one shape poorly serves another well.

Draw on the whiteboard: a 2×2 grid with "corpus size" on one axis (small / large) and "corpus regularity" on the other (uniform / heterogeneous). Discuss what architectural choices fit each quadrant:
- Small + uniform: simple synchronous ingestion, single title mapping dict, no resume logic
- Small + heterogeneous: needs custom chunking for different source types, more careful metadata
- Large + uniform: batch ingestion with resume, rate limit management, row-count dedup
- Large + heterogeneous: all of the above plus a principled title mapping approach

**Part 2: OCR quality as a technical variable (6 min)**

Introduce the "garbage attractor" problem with a concrete example: a quality-1 chunk from an OCR-garbled Crisis issue produces an embedding that happens to match queries about unrelated topics because the garbled text has random semantic proximity to common concepts. This causes the archive to confidently surface irrelevant passages.

The decision tree:
- Quality 3 → ingest
- Quality 2 → ingest, document the quality limitation
- Quality 1 → decide: Is this text uniquely valuable? If yes, attempt remediation (Tesseract re-run, manual cleanup). If no, exclude and document.

**Part 3: The Architecture Decision Record framework (7 min)**

Walk through the ADR format on the projector. Show a completed example:
- Decision: Use sliding-window chunking rather than sentence-boundary chunking
- Context: 30% of corpus is quality 1–2 OCR; sentence detection breaks frequently on garbled text
- Choice: Sliding window on character count (3,200 chars per chunk, 800 chars overlap)
- Consequences: Chunks may split mid-sentence on clean text; simpler implementation; more predictable chunk count

## Workshop Activity

**Write 3 ADRs and diagram your ingestion pipeline (30 min)**

**Phase 1 (15 min): Write 3 ADRs**

Using the printed template, each participant writes ADRs for three decisions from this list:
1. Chunking strategy
2. Ingestion approach (synchronous vs. batched with resume)
3. Title mapping approach
4. Embedding model choice
5. OCR quality handling policy

Each ADR must reference a specific corpus characteristic in the Context field — not a generic statement.

**Phase 2 (15 min): Pipeline diagram**

On a blank sheet of paper (or whiteboard section), draw the ingestion pipeline for your corpus. Boxes and arrows. Label each step. Include:
- Input (corpus/ directory)
- Chunking step (what logic?)
- Embedding step (which model, what batch size?)
- Storage step (Supabase table)
- Resume point (where does the script restart if interrupted?)

Note on your diagram which steps are affected by each ADR you wrote.

## Synthesis / Gallery Share

**Pipeline diagrams on the wall (15 min)**

Post all diagrams on the wall or around the room. 5-minute silent gallery walk — read everyone's diagrams. Then, 10-minute discussion:
- Which pipeline looks most different from others? Why?
- Where did the most participants draw the resume/restart point? Is that the right place?
- Which step is the most dangerous failure point? (Usually: embedding, because a failed batch can cause partial ingestion without obvious error)

Facilitator closes by naming the connection between today's architectural decisions and the next unit: the Builder will be assembling the corpus files that the Developer's architecture will need to process. The shape of the corpus directory — filenames, structure, format consistency — needs to match the pipeline's expectations.

## Facilitator Notes
- The 2×2 corpus shape grid often generates good conversation — let it run a few extra minutes if the group is engaged
- Pipeline diagrams vary enormously in detail level; resist the urge to standardize them. The variation is informative
- If a participant's pipeline diagram has no resume point, ask them directly: "What happens if this script fails at step 4 of 200?" This usually motivates the resume logic discussion
- ADRs are harder to write than they look — the Context field is where people struggle most. Push back on generic context statements: "My corpus is large" is not a context, "My corpus has 218 periodical issues from Internet Archive with auto-generated filenames" is a context
