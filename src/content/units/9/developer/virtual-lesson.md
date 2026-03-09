# Unit 9: Pitfalls & Quality Control — Virtual Lesson
**Pathway:** Archive Developer
**Duration:** 75 min
**Materials:** Screen share for live coding, participants' quality audit output + test suite results from prep task, Supabase accessible

## Agenda
| Time | Activity |
|------|----------|
| 0:00–0:10 | Check-in: share your quality audit output — any flags? your test suite pass rate? |
| 0:10–0:35 | Presentation: audit script deep-dive + batched UPDATE + test suite design |
| 0:35–1:00 | Breakout: extend test suite to 20 cases + run batched UPDATE for one issue |
| 1:00–1:15 | Debrief: quality baselines and what maintenance looks like |

## Slide Outline

**Slide 1: The Quality Audit Script as a Maintenance Tool**
- Designed to run regularly, not just once
- Per-file statistics give you comparable data across versions
- Flag thresholds are heuristics, not rules — adjust based on your corpus characteristics
- The output is a snapshot: useful when compared to previous runs
- Make it part of your release process: run before deploying corpus changes

**Slide 2: Adjacent Chunk Similarity — What It Tells You**
- High adjacent similarity (0.6–0.8): chunks overlap correctly, continuous text
- Very high adjacent similarity (0.9+): chunks may be too short or too overlapping
- Low adjacent similarity (< 0.4): chunking may have broken at page or section boundaries
- The diagnostic value: flags files where the chunking algorithm may have misbehaved
- Show a plot of adjacent similarities across files — the outliers are the ones to investigate

**Slide 3: Batched UPDATE — The Correct Pattern**
- Walk through the `batchUpdate` function: batch size 500, explicit pagination, error logging
- Mixed-value updates: use upsert with `onConflict: 'id'` rather than separate UPDATE calls
- The 200ms sleep between batches: prevents connection pool exhaustion on free tier
- Idempotency: running the batch twice should produce the same result (no double-updates)
- The verification step: after batching, run a count query to confirm expected rows updated

**Slide 4: Building a Good Test Suite**
- Coverage: 8+ different topics, multiple works per topic
- Specificity levels: questions with one expected source vs. questions with multiple valid sources
- Edge cases: thin-coverage questions, comparative questions, follow-up style questions
- The `shouldHaveResult: false` cases: verify the "no relevant passages" path works correctly
- Test suite size: 20 minimum; 40 for production archives with active scholarly use

**Slide 5: What a Healthy Test Suite Looks Like**
- Pass rate > 85%: good quality baseline
- Pass rate 70–85%: acceptable; specific failure patterns should be investigated
- Pass rate < 70%: systematic issue requiring diagnosis before launch
- Failures clustered by topic: coverage gap — check ingestion for those works
- Failures clustered by similarity threshold: tune the threshold
- Failures clustered by expected source: metadata issue — check source_title mapping

## Breakout Activity (25 min)
**Solo coding**

Each participant extends their work from the prep task:

1. **Extend test suite to 20 cases** (15 min): add 10 more test cases covering: (a) at least 2 new topic areas not in the original 10, (b) at least 1 `shouldHaveResult: false` case, (c) at least 1 comparative question expecting sources from 2+ different works. Run the full 20-case suite and report pass rate.

2. **Fix one flagged file from the audit** (10 min): take the most significant flag from the quality audit output. Run the appropriate fix (normalization SQL, batch UPDATE, re-ingest). Verify by re-running the relevant diagnostic.

Share-back: pass rate on 20-case suite + the fix that was applied and its result.

## Debrief Questions
1. Did extending to 20 cases change your pass rate? In which direction?
2. What's the most common failure pattern across participants — topic clustering, threshold issues, or metadata issues?
3. How often should you run the quality audit and test suite in production? What would trigger an unscheduled run?

## Facilitator Notes
- Participants who have high pass rates (> 90%) early are often testing only well-covered topics — push them to add test cases for peripheral topics and thin coverage areas
- The adjacent chunk similarity metric is often the most surprising to participants — low scores on specific files often reveal chunking issues that weren't visible through manual inspection
- The "how often to run" debrief question has a practical answer for most archives: monthly audit + test suite run, with an additional run any time corpus is significantly modified
- Some participants will want to automate the test suite as a CI/CD step — validate this as the ideal end state, and note that it requires a stable API endpoint accessible from the CI environment
