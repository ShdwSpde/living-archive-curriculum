# Unit 8: RAG Query Pipeline — In-Person Lesson
**Pathway:** Archive Builder
**Duration:** 75 min
**Room setup:** Developer workstations with archive and Supabase dashboard accessible, projector for threshold demo, whiteboard for bad retrieval taxonomy
**Materials:** Printed bad retrieval log template (one per person), threshold test script available

## Agenda
| Time | Activity |
|------|----------|
| 0:00–0:10 | Warm-up: read a bad retrieval aloud — group diagnoses the type |
| 0:10–0:30 | Facilitated presentation: bad retrieval taxonomy + threshold tuning |
| 0:30–1:00 | Workshop: threshold comparison + bad retrieval documentation |
| 1:00–1:15 | Gallery share: threshold recommendations + documented issues |

## Warm-Up Activity

**Read a bad retrieval — group diagnoses (10 min)**

Each participant reads aloud their worst bad retrieval from the prep task log: the query, the passage that came back, and why it was bad. The room votes on the type: OCR garbage? threshold too low? coverage gap?

Facilitator writes a running tally on the whiteboard:
- OCR garbage retrievals: [count]
- Threshold too low retrievals: [count]
- Coverage gap retrievals: [count]

This gives the room a collective picture of where quality problems cluster in this cohort's corpora.

## Facilitated Presentation

**Bad retrieval taxonomy + threshold tuning (20 min)**

**Part 1: Three types, three diagnoses (8 min)**

Walk through each bad retrieval type on the projector with a real example from a prepared corpus:

*Type 1 — OCR garbage:* Show a passage in the database where the content field is garbled. Show it appearing in a query response. The passage scores above the threshold because its garbled embedding happens to be numerically near the query embedding. The fix: improve the source text quality or exclude the file.

*Type 2 — Threshold too low:* Show a response where all cited passages are topically related but none is specifically about the question. Lower the threshold live and show even less relevant passages appearing. Raise it and show that the response improves. The fix: raise the threshold.

*Type 3 — Coverage gap:* Show a query where the response should cite Work X but instead cites Work Y. Go to Supabase — confirm Work X exists in the database with sufficient rows. Lower the threshold to 0.4 — does Work X now appear? If yes, it's a threshold issue (Work X chunks are scoring just below the cutoff). If no, it's an ingestion or quality issue.

**Part 2: Threshold tuning process (7 min)**

Live demo on projector: run the test-query script with four threshold values (0.5, 0.6, 0.7, 0.75) on the same question. Show the results side by side. Ask the room:
- At which threshold do irrelevant results first appear? (Usually around 0.5–0.6)
- At which threshold do relevant results start disappearing? (Varies by corpus)
- Where's the sweet spot?

Discuss: there is no universal right answer. The sweet spot depends on corpus quality (cleaner corpus → higher threshold is safe) and query type (interpretive queries benefit from slightly lower thresholds for broader coverage).

**Part 3: The bad retrieval log as a technical communication tool (5 min)**

Walk through a completed bad retrieval log entry. Emphasize the "suspected cause" field: this is what turns the Builder's observation into something the Developer can act on immediately. Without it, the developer investigates from scratch. With it, they confirm or disconfirm the diagnosis and implement the fix.

## Workshop Activity

**Threshold comparison + bad retrieval documentation (30 min)**

**Phase 1 (15 min): Threshold comparison**

Using the test-query script, run 5 queries at three threshold levels: 0.55, 0.7, 0.8. For each query, note:
- How many results at each threshold?
- Did any results change between thresholds (new ones appear or disappear)?
- Was the change an improvement or a degradation?

After testing all 5 queries: pick your recommended threshold. Write one sentence explaining your reasoning.

**Phase 2 (15 min): Document 5 bad retrievals**

Using the printed log template, document 5 bad retrievals from your test sessions:
- If you found 5 genuine bad retrievals: document those
- If you found fewer: generate additional test queries targeting your corpus's weakest areas to find more
- If your archive is performing cleanly: document 5 coverage gaps instead (topics you'd expect to be covered that return no results)

For each entry, fill in: query, bad passage excerpt, source_title, suspected cause, recommended fix.

## Synthesis / Gallery Share

**Threshold recommendations + documented issues (15 min)**

Quick round: each participant states their recommended threshold and the one piece of evidence that most influenced the decision.

Facilitator collects on the whiteboard: range of recommended thresholds. Ask: does higher recommended threshold correlate with better corpus quality? (It usually does.) Are there any outliers — participants with clean corpora who recommend lower thresholds? Why?

Then: each participant reads aloud their most actionable bad retrieval log entry — the one where the diagnosis is clearest and the fix is most specific. These are the entries worth implementing before the archive goes live.

## Facilitator Notes
- The live threshold demo is the most convincing part of the session — make sure it's prepared and tested before the session
- Some participants will have difficulty filling out 5 bad retrieval logs if their archive is genuinely performing well — validate this as a good outcome and redirect to coverage gap documentation
- The "suspected cause" field is where Builders often underperform — they write "the results are bad" instead of "the passage appears to be OCR noise" — coach them toward specificity
- The connection between this session and Unit 9 (pitfalls) is important: bad retrievals discovered here become the test cases for the quality audit script in Unit 9
