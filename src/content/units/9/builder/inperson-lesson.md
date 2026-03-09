# Unit 9: Pitfalls & Quality Control — In-Person Lesson
**Pathway:** Archive Builder
**Duration:** 75 min
**Room setup:** Developer workstations with Supabase accessible, projector for diagnostic demo, whiteboard for running pitfall tally
**Materials:** Diagnostic SQL cheat sheet (one per person), batch-update.ts script accessible, ingestion script accessible for restart demo

## Agenda
| Time | Activity |
|------|----------|
| 0:00–0:10 | Warm-up: "which pitfall hit you?" — hands up for each of the four |
| 0:10–0:30 | Facilitated presentation: live diagnosis and fix for each pitfall |
| 0:30–1:00 | Workshop: run diagnostics + fix issues + verify |
| 1:00–1:15 | Gallery share: before/after row counts + issues resolved |

## Warm-Up Activity

**Which pitfall hit you? (10 min)**

Facilitator asks for a show of hands (or voice in virtual): "Who has hit [pitfall]?" for each of the four pitfalls:
1. Queried Supabase and got exactly 1,000 rows back when you expected more
2. Seen duplicate chapter entries in the sidebar from what should be the same chapter
3. Run a large UPDATE and found it only partially applied
4. Had the ingestion script stall or crash and been unsure how to restart

Facilitator writes the counts on the whiteboard. Most groups will have several hands up for each pitfall — this normalizes the experience ("everyone hits these") and focuses the room's attention on the fixes rather than the diagnosis.

## Facilitated Presentation

**Live diagnosis and fix for each pitfall (20 min)**

All four demos run live in the Supabase SQL editor on the projector.

**Pitfall 1: The 1,000-row limit (4 min)**

Run `SELECT * FROM document_chunks` on a corpus with > 1,000 rows. Show the row count in the results header: exactly 1,000. Now show the actual count: `SELECT COUNT(*) FROM document_chunks` — it's higher.

Show the fix: `SELECT * FROM document_chunks LIMIT 1000 OFFSET 0` + `LIMIT 1000 OFFSET 1000` — explicit pagination.

Key message: if you ever get exactly 1,000 rows, be suspicious.

**Pitfall 2: Chapter dedup (5 min)**

Run the duplicate chapter variant query. Show results with variant_count > 1. Open one problematic row and show the whitespace difference between the variants.

Run the normalization SQL. Re-run the diagnostic — show 0 rows in the result. This is the fix and the verification in two steps.

**Pitfall 3: Batch UPDATE timeout (5 min)**

Simulate the problem by creating a test table with 3,000 rows and running a large UPDATE. Show the response time and then `SELECT COUNT(*) WHERE updated_column = 'new_value'` — it's under 2,000.

Show the batch fix: `UPDATE ... WHERE id IN (SELECT id ... LIMIT 1000)`. Run it twice. Show first batch updates 1,000, second batch updates 0.

**Pitfall 4: Stalled ingestion restart (6 min)**

Demonstrate stopping and restarting the ingestion script. Stop it mid-file (Ctrl+C). Show the terminal output. Run the per-file count query in Supabase. Show which file was incomplete.

Restart the script. Watch the SKIP log lines for completed files. Confirm the incomplete file is resumed from the correct point.

## Workshop Activity

**Run diagnostics + fix issues + verify (30 min)**

Structured in three phases:

**Phase 1 (8 min): Run all diagnostic queries**

Each participant runs the three diagnostic SQL queries on their corpus using the provided cheat sheet. Record the output in the printed template:
- Number of chapters under 10 characters
- Number of works with duplicate chapter variants
- Number of works with unexpectedly low chunk counts

**Phase 2 (15 min): Fix identified issues**

Priority order: fix all short chapters (easy), then fix chapter whitespace variants (use normalization SQL), then investigate low-chunk-count works.

For low-chunk-count works: first verify whether the chunk count is expected for the text (some texts are short). If not expected, check: (1) is the chunk output file correct? (2) was ingestion completed? (3) did a batch UPDATE timeout affect this work?

For each fix: run the verification query to confirm the issue is resolved before moving on.

**Phase 3 (7 min): Verify and document**

Re-run all three diagnostic queries after fixes. Record the new output. Note the improvement: how many issues were resolved?

Write one sentence for any issue that could not be fixed during the session (needs more investigation, requires re-ingestion, etc.).

## Synthesis / Gallery Share

**Before/after row counts + issues resolved (15 min)**

Each participant reports:
1. Total issues found in diagnostics
2. Total issues resolved during the workshop
3. One issue still open — what's needed to fix it?

Facilitator writes a group tally on the whiteboard: total issues found vs. resolved. Discussion: what percentage of issues found were fixable in one session? What types of issues required more work?

Close by framing the ongoing maintenance practice: run the diagnostic queries monthly (or after any significant ingestion or update operation). Keep a log of diagnostic results over time — this is the technical complement to the Advocate's quality audit.

## Facilitator Notes
- The 1,000-row limit demo almost always surprises participants who haven't encountered it — the exact-1000-row count is a classic "why is this happening" mystery before you know about the default limit
- The normalization SQL is the fastest win in the session — run it, see the sidebar improve, show the verification query confirming 0 duplicates
- Some participants will find low-chunk-count works that are legitimately short texts (pamphlets, short speeches) rather than ingestion failures — help them distinguish expected from unexpected by checking the source file word count
- Budget at least 5 minutes at the end for participants to document open issues — these become the prep task for whatever session follows
