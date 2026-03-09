# Unit 9: Pitfalls & Quality Control — In-Person Lesson
**Pathway:** Archive Developer
**Duration:** 75 min
**Room setup:** Developer workstations, projector for live coding, whiteboard for quality baseline comparison
**Materials:** Participants' quality audit output from prep task, test suite starter code, Supabase accessible

## Agenda
| Time | Activity |
|------|----------|
| 0:00–0:10 | Warm-up: "quality audit bingo" — how many flags did you get? |
| 0:10–0:30 | Facilitated presentation: live audit run + batched UPDATE + test suite design |
| 0:30–1:00 | Workshop: extend test suite + fix one flagged issue + measure improvement |
| 1:00–1:15 | Gallery share: quality baselines across the cohort |

## Warm-Up Activity

**Quality audit bingo (10 min)**

Facilitator reads out flag types one at a time. Participants raise a hand for each flag they found in their prep task output:
- At least 1 work with < 10 chunks
- At least 1 suspicious chapter (< 10 characters)
- At least 1 chapter whitespace duplicate
- At least 1 work with adjacent similarity < 0.4
- 0 flags (clean corpus)

Write the counts on the whiteboard. A rough benchmark: corpora derived primarily from Internet Archive OCR typically have 3–4 flags; corpora from high-quality digitization projects may have 1–2.

The warm-up establishes that quality issues are normal, not exceptional — and that the audit script's purpose is to surface them systematically, not to produce a "passing grade."

## Facilitated Presentation

**Live audit run + batched UPDATE + test suite (20 min)**

**Part 1: Live quality audit run (8 min)**

Run the quality audit script live on the projector against a model corpus. Show the output table as it builds. Walk through each flagged file: what flag was triggered? what does the flag tell you? what is the likely cause?

Show the adjacent similarity computation: pick one file with low adjacent similarity and open its chunks in Supabase. Do the adjacent chunks look like they share content? (They should — low similarity on readable text usually means the chunking broke at a section boundary rather than an OCR problem.)

**Part 2: Batched UPDATE in practice (6 min)**

Take one flag from the live audit: a suspicious chapter name (too short or clearly OCR noise). Run the normalization SQL in a controlled way:

1. First, SELECT only — count rows that will be affected: `SELECT COUNT(*) FROM document_chunks WHERE LENGTH(chapter) < 5 AND chapter IS NOT NULL;`
2. If count > 2,000: use the batch UPDATE function
3. If count ≤ 2,000: single UPDATE is fine
4. After updating: re-run the diagnostic to confirm 0 rows flagged

Walk through the batch UPDATE function line by line, emphasizing the 500-row batch size and the 200ms delay.

**Part 3: Test suite design principles (6 min)**

Show a well-designed test suite on the projector: the 20 test cases from the async reading implemented in full. Walk through:
- How the `expectedSources` array handles multiple valid sources
- What the `minSimilarity` threshold should be per-question (lower for vague questions, higher for specific ones)
- The `shouldHaveResult: false` cases and why they're important (verify graceful degradation)
- Running the suite: walk through the output, show a pass and a fail side by side

## Workshop Activity

**Extend test suite + fix one flagged issue + measure improvement (30 min)**

Three phases:

**Phase 1 (10 min): Extend test suite to 20 cases**

Each participant adds 10 cases to their 10-case prep task suite. Requirements for the new cases:
- At least 2 cases covering topics not in the original 10
- At least 1 `shouldHaveResult: false` case
- At least 1 case with `expectedSources` containing 2+ works

Run the 20-case suite. Record pass rate.

**Phase 2 (12 min): Fix one flagged issue**

Choose the most impactful flag from the quality audit output. Apply the fix:
- Chapter normalization SQL (for whitespace or false chapter flags)
- Batch UPDATE for source_title corrections
- Re-ingest trigger for low-chunk-count works

After fixing, re-run the relevant quality audit statistic to confirm improvement.

**Phase 3 (8 min): Re-run test suite**

Re-run the 20-case test suite after the fix. Did any test case that was previously failing now pass? If yes: the fix improved retrieval precision. If no: the fix improved corpus data quality but the test cases were already passing — both are valid outcomes.

Record: pass rate before fix, pass rate after fix.

## Synthesis / Gallery Share

**Quality baselines across the cohort (15 min)**

Each participant writes on the whiteboard:
- Quality audit flag count (before fixes)
- Test suite pass rate (before fixes)
- Test suite pass rate (after fixes)

The whiteboard produces a collective quality baseline. Facilitator notes:
- Range of flag counts: what's the highest? what drove it?
- Range of initial pass rates: what's the lowest? is it correlated with flag count?
- Improvement from fixes: did fixing flags improve pass rates?

The final discussion: what does a "good enough" quality baseline look like for your archive to launch? There's no universal answer — depends on use case, audience, and available time for improvement. But the baselines developed today give each participant an empirical starting point.

## Facilitator Notes
- The "bingo" warm-up is intentionally light — it normalizes quality flags as expected findings, not failures, before participants get defensive about their corpus quality
- Some participants will find no flags on their corpus — this can mean genuinely clean data, or it can mean the corpus is too small to trigger the thresholds; help them distinguish
- The "re-run test suite after fix" step is the session's most important verification — participants who skip it can't confirm that their fix actually improved anything
- Connecting the test suite to a CI pipeline is worth mentioning as a long-term goal; for most participants in this curriculum, running it manually before each corpus update is sufficient
