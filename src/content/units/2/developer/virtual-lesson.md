# Unit 2: Choosing a Historical Figure — Virtual Lesson
**Pathway:** Archive Developer
**Duration:** 75 min
**Materials:** Screen share for live coding demos, corpus estimation calculator (shared spreadsheet), Internet Archive API docs tab

## Agenda
| Time | Activity |
|------|----------|
| 0:00–0:10 | Check-in: what's your estimated chunk count and what surprised you? |
| 0:10–0:35 | Presentation: corpus estimation + architectural decision mapping |
| 0:35–1:00 | Breakout: architecture decision document for your corpus |
| 1:00–1:15 | Debrief: compare decisions across participants |

## Slide Outline

**Slide 1: Why Corpus Characteristics Drive Architecture**
- The archive's technical design is not neutral — it follows the shape of the corpus
- Small corpus (< 3,000 chunks): simple synchronous ingestion, no resume needed
- Large corpus (> 15,000 chunks): batch ingestion with resume, rate limit management, dedup strategy
- Periodical-heavy corpus: title mapping problem is significant — needs a principled solution
- Multilingual corpus: embedding model choice becomes a real decision, not a default

**Slide 2: The Estimation Formula**
- Walk through: texts × pages × chars/page → chars ÷ 4 → tokens ÷ net_chunk_size → chunks
- Reference points: 5,000 chunks ≈ manageable; 20,000 chunks ≈ plan for multiple sessions; 50,000+ ≈ cost analysis required
- Live: participants share their estimates, facilitator plots them on a shared scale
- The number you get is an order-of-magnitude estimate — that's enough for architecture decisions

**Slide 3: OCR Quality as a Technical Constraint**
- The "garbage attractor" problem: quality-1 chunks produce misleading embeddings that surface on irrelevant queries
- The 80/20 rule for OCR: if 80% of your corpus is quality 2–3, ingest the 20% quality-1 cautiously or exclude it
- Pre-processing options: regex-based character normalization, OCR re-run with Tesseract, manual remediation
- When to choose exclusion over remediation: if the text is not cited by scholars and doesn't add unique topical coverage

**Slide 4: Architectural Decision Points**
- Decision 1: Chunking strategy (sentence-boundary vs. sliding window vs. hybrid)
- Decision 2: Ingestion approach (synchronous single-run vs. batched with resume)
- Decision 3: Title mapping (hardcoded dict vs. pattern rules vs. database table)
- Decision 4: Embedding model (embedding-001 default vs. multilingual vs. OpenAI)
- Each decision should be traceable to a corpus characteristic — not chosen arbitrarily

**Slide 5: Writing an Architecture Decision Record (ADR)**
- ADR format: Context / Decision / Consequences
- Context: what is true about the corpus that creates this decision?
- Decision: what approach will you use?
- Consequences: what does this enable and what does it foreclose?
- You don't need formal ADR tooling — a section of a notes doc works fine
- The point is explicitness: you made a choice, you know why, and you can revisit it

## Breakout Activity (25 min)
**Solo work, pairs for review**

Each participant writes 3 Architecture Decision Records for their corpus. Template:

```
Decision: [name of the decision]
Context: [what corpus characteristic creates this decision?]
Choice: [what approach will you use?]
Consequences: [what does this enable? what does it foreclose?]
```

After 15 minutes of writing, swap ADRs with a partner. Partner reviews and asks: "Is the context statement grounded in something specific about your corpus, or is it a generic statement?" Revise once.

Share-back: each participant reads one ADR aloud. Facilitator notes any decisions that generated strong alternatives or disagreement.

## Debrief Questions
1. Did any participant choose the same architecture decision differently from others with similar corpus characteristics? What drove the divergence?
2. Which decision felt most uncertain — where the right answer depends most on information you don't yet have?
3. What's one corpus characteristic you don't yet know that would change one of your decisions?

## Facilitator Notes
- Participants often treat architecture decisions as purely technical, but corpus size and quality are ultimately curatorial — they depend on what the Advocate and Builder have surfaced about the figure's available materials
- The ADR exercise works best when participants are specific about corpus characteristics: "my corpus has 200+ periodical issues" is more useful than "my corpus is large"
- Some participants will resist writing ADRs before they've written any code — reframe it: these are hypotheses, not commitments. Writing them now means you'll notice when the implementation diverges from the plan
- If participants have very different corpus sizes (e.g., one has 50 texts and another has 500), pair them — the contrast is instructive
