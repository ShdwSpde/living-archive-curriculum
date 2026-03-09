# Unit 5: Embedding & AI — In-Person Lesson
**Pathway:** Archive Developer
**Duration:** 75 min
**Room setup:** Developer workstations, projector for live coding, Supabase dashboard accessible on all machines
**Materials:** Starter ingestion code pre-loaded, Gemini API keys configured in `.env`, Supabase project credentials available

## Agenda
| Time | Activity |
|------|----------|
| 0:00–0:10 | Warm-up: anatomy of a 429 error — what does the logs look like? |
| 0:10–0:30 | Facilitated presentation: live-code the complete embedding loop |
| 0:30–1:00 | Workshop: build and test the full ingestion pipeline |
| 1:00–1:15 | Gallery share: similarity query outputs and failure mode discussion |

## Warm-Up Activity

**Anatomy of a 429 error (10 min)**

Facilitator posts a pre-prepared log excerpt on the projector — a transcript of an ingestion run that hit multiple 429 errors and recovered:

```
[INFO] Batch 12/40 — embedded + uploaded
[INFO] Batch 13/40 — embedded + uploaded
[WARN] Batch 14/40 — 429 rate limit, waiting 8000ms
[WARN] Batch 14/40 — retry 1, waiting 16000ms
[INFO] Batch 14/40 — retry succeeded
[INFO] Batch 15/40 — embedded + uploaded
```

Questions to the room:
- What happened between batch 13 and batch 14?
- How long did the script wait total before batch 14 succeeded?
- Is this a problem that requires intervention?
- What would you do if the script showed "retry 5 of 5 failed" for batch 14?

This grounds the session in a real operational scenario before introducing the underlying code.

## Facilitated Presentation

**Live-code the complete embedding loop (20 min)**

Build the full ingestion script from scratch on the projector, explaining each decision:

**Step 1 (5 min): The outer structure**
```typescript
async function ingestFile(chunkFile: string) {
  const chunks = JSON.parse(fs.readFileSync(chunkFile, 'utf8'));
  // resume check
  // batch loop
}
```

Add the resume check (row count from Supabase). Show the query. Run it against a real file that's already ingested — confirm the SKIP output.

**Step 2 (7 min): Batch loop with delay**

Add the `for` loop with slice, the sleep call between batches (not after the last one), and the call to `embedAndInsertBatch`. Run it on a small test file (10 chunks) — show the log output in real time.

**Step 3 (5 min): The 429 retry**

Add the try/catch with the 429 branch. Show the exponential backoff calculation: `DELAY_MS * Math.pow(2, attempt)`. Deliberately trigger a 429 by reducing DELAY_MS to 100ms — watch the backoff kick in. Then restore DELAY_MS to 4000 and show normal operation.

**Step 4 (3 min): Content hash upsert**

Add MD5 hash generation and the upsert with `onConflict: 'content_hash'`. Run the ingestion twice on the same file — show that the row count doesn't increase on the second run.

## Workshop Activity

**Build and test the full ingestion pipeline (30 min)**

Participants extend the live-coded script to add two testing features:

**Phase 1 (15 min): Error log file**
Add a `logError` function that writes to `ingestion-errors.log` whenever a batch fails after all retries. Test it by temporarily lowering MAX_RETRIES to 1 and triggering a controlled error, then restore MAX_RETRIES to 5.

**Phase 2 (15 min): Similarity verification**
Implement the `testSimilarity` function. Run it with 5 questions covering different topics in your figure's work. Record:
- Top similarity score for each question
- Whether the top result is topically relevant
- Any questions where the top result seems wrong — note the actual result and why it's surprising

Facilitator circulates and notes any participants whose similarity scores are all below 0.6 — this is a signal to investigate corpus quality or taskType configuration.

## Synthesis / Gallery Share

**Similarity query outputs and failure mode discussion (15 min)**

Each participant reads aloud their best and worst similarity result from the testing phase. Facilitator collects the "worst" cases on the whiteboard: what were the questions, what did the archive return, why was it wrong?

For each "wrong" result, the group diagnoses: OCR quality issue? Corpus coverage gap? TaskType mismatch? Threshold too low? This real-time debugging session is often the most valuable part of the session — participants see that bad results have diagnosable causes.

Close by noting the connection to Unit 9 (Pitfalls & Quality Control): the similarity verification function they wrote today is the seed of the quality test suite they'll build in Unit 9.

## Facilitator Notes
- Live-coding the 429 backoff trigger is optional but highly recommended — seeing the retry loop in action makes it memorable; without it, participants often don't believe the backoff works until they see it
- The error log file exercise is frequently dismissed as unnecessary; emphasize that it's the difference between an ingestion that "seemed to work" and one you can verify worked
- Participants whose similarity scores are low across the board: check (1) are they using RETRIEVAL_QUERY for the query, (2) is their corpus ingested at all (check row count), (3) are they calling the right RPC function name
- Some participants will want to add a progress bar to the terminal output — this is a nice-to-have that can be added with a simple counter; acknowledge it as a valid improvement and suggest the `cli-progress` npm package
