# Unit 8: RAG Query Pipeline — Virtual Lesson
**Pathway:** Archive Builder
**Duration:** 75 min
**Materials:** Live archive access, screen share for demo, test query log (shared template), threshold adjustment capability

## Agenda
| Time | Activity |
|------|----------|
| 0:00–0:10 | Check-in: share the worst bad retrieval from your test log |
| 0:10–0:35 | Presentation: bad retrieval taxonomy + threshold tuning walkthrough |
| 0:35–1:00 | Breakout: systematic query testing + threshold comparison |
| 1:00–1:15 | Debrief: bad retrieval reports + recommendations |

## Slide Outline

**Slide 1: The RAG Pipeline from the Builder's Perspective**
- User asks a question → query gets embedded → similarity search finds relevant passages → language model generates response
- What the Builder can observe: the response (via UI) and the database (via Supabase)
- What the Builder can control: the threshold (with developer help) and the corpus quality
- What the Builder can document: bad retrievals, coverage gaps, overclaiming
- The Builder is the quality inspector — between the curator's expectations and the developer's code

**Slide 2: Three Types of Bad Retrievals**
- Type 1: OCR garbage retrieval — garbled text that scores high due to embedding noise
- Type 2: Threshold too low — loosely related passages that barely meet the cutoff
- Type 3: Coverage gap retrieval — the right content isn't there, so the system returns the next best thing
- How to distinguish them: Type 1 has garbled source content; Type 2 has readable but off-topic content; Type 3 has readable content that's in the right domain but wrong for the specific question
- Each type has a different fix — documentation must identify the type

**Slide 3: Live Threshold Demonstration**
- Run the same query at threshold 0.5, 0.65, 0.7, 0.75 and show the results side by side
- Show how additional results at 0.5 are often obviously less relevant
- Show how at 0.75 some valid results disappear
- The sweet spot depends on corpus quality: cleaner corpus → higher threshold is safe; noisier corpus → need lower threshold but more false positives
- How to tune: test 10 representative queries at each threshold; use the threshold that maximizes relevant results while minimizing false positives

**Slide 4: The Bad Retrieval Log**
- Walk through the log format: query, bad passage, source, score, why it's bad, suspected cause
- Show a completed example
- Why the format matters: without "suspected cause," the developer has to investigate from scratch; with it, they can go directly to the diagnosis
- How many logs to collect before reporting: at least 5–10 per issue type, to establish a pattern vs. one-off

**Slide 5: Documenting Coverage Gaps**
- A coverage gap is different from a bad retrieval — the passage exists, it's just not being returned
- How to diagnose: check the database directly for the expected source_title; count its chunks; run the test query with threshold 0.4 and see if the passage appears
- Coverage gap causes: work not ingested, ingested under wrong title, all chunks rated low similarity
- How to document: "Query X consistently returns passages from Y instead of Z. Z has [N] chunks in the database. Sample query at threshold 0.4: [result]."

## Breakout Activity (25 min)
**Pairs**

Each pair runs a systematic threshold comparison:
1. Choose 5 queries from your prep task test log (varied types) (2 min)
2. Partner A runs all 5 at threshold 0.6; Partner B runs all 5 at threshold 0.75 (10 min)
3. Compare: which queries returned different results at different thresholds? Were the extra results at 0.6 good or bad? Were the missing results at 0.75 missed or irrelevant? (10 min)
4. Agree on a recommended threshold: what's the best setting for your corpus? (3 min)

Share-back: each pair reports their recommendation + one case that most strongly influenced the decision.

## Debrief Questions
1. Did any pair recommend different thresholds for different query types? (e.g., higher threshold for factual questions, lower for interpretive?) Is this possible to implement?
2. What's the difference between a bad retrieval that the Builder can diagnose and one that requires developer investigation?
3. If you had to hand your test log to a developer who hadn't seen the archive, what context would they need to act on your bad retrieval reports?

## Facilitator Notes
- Some participants will struggle to tell the difference between a "bad retrieval" and a "coverage gap" — the diagnostic is key: bad retrieval = irrelevant passage retrieved; coverage gap = relevant passage not retrieved at all
- The threshold comparison exercise works best if both partners have access to a configurable test-query script rather than just the UI (the UI uses a fixed threshold)
- Some participants will find their archive performing very well and have trouble finding 5 bad retrievals — for these participants, shift the exercise to finding coverage gaps instead
- If time is short, skip Slide 5 (coverage gaps) and address it in the debrief only
