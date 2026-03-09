# Unit 5: Embedding & AI — Async Materials
**Pathway:** Archive Builder
**Duration:** 30–45 min

## Learning Objectives
- Run the ingestion script with correct environment variables and understand each variable's purpose
- Read the script's progress logs to monitor ingestion status and identify problems
- Recognize 429 rate-limit errors and understand why the script's automatic backoff handles them

## Reading

### Setting Up Your Environment Variables

The ingestion script requires three environment variables to run. These are stored in a `.env` file at the project root. You should have received these credentials from your project's developer — never hardcode them in the script itself.

```env
GEMINI_API_KEY=your-gemini-api-key
SUPABASE_URL=https://yourproject.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```

**What each variable does:**
- `GEMINI_API_KEY`: authenticates your requests to Google's Gemini embedding API, which converts each text chunk into a vector
- `SUPABASE_URL`: the address of your project's database — unique to your Supabase project
- `SUPABASE_SERVICE_ROLE_KEY`: the master key for your database — allows the script to write new rows. Keep this secret and never share it.

To verify your environment is set up correctly before running the full ingestion:
```bash
npx ts-node scripts/ingest-corpus.ts --verify-env
```

This checks that all three variables are present and that your Supabase connection is reachable, without uploading anything.

### Running the Ingestion Script

Once your environment is verified, start ingestion with:
```bash
npx ts-node scripts/ingest-corpus.ts
```

The script processes files in the `corpus/chunks/` directory — the output from the chunk script you ran in Unit 4. It processes batches of 5 chunks at a time, with a 4-second delay between batches, to stay within the Gemini free tier's rate limit.

**What you'll see in the terminal:**
```
[INFO] Starting ingestion — 847 chunks found across 12 files
[INFO] Processing: dubois-souls-of-black-folk-1903.txt (143 chunks)
[INFO] Batch 1/29 (chunks 1–5) — embedded + uploaded
[INFO] Batch 2/29 (chunks 6–10) — embedded + uploaded
...
[INFO] dubois-souls-of-black-folk-1903.txt complete — 143 chunks ingested
[INFO] Processing: dubois-darkwater-1920.txt (89 chunks) ...
```

Each batch line shows how many batches are left for the current file. When a file completes, you see the total chunk count. When all files are complete, the script exits with a final summary.

**How long it takes:** At 4 seconds per 5 chunks, ingesting 5,000 chunks takes approximately 67 minutes. For a large corpus, plan for the script to run overnight or across multiple sessions (it resumes automatically — see below).

### Reading the Logs and Recognizing 429 Errors

The most common problem during ingestion is a 429 rate-limit error from the Gemini API. This means your script sent too many requests too quickly. **You don't need to do anything when this happens — the script handles it automatically.**

**What a 429 looks like in the logs:**
```
[WARN] Batch 14 — 429 rate limit hit, waiting 8000ms before retry
[WARN] Batch 14 — retry 1 of 5, waiting 16000ms
[INFO] Batch 14 — retry succeeded
```

The script uses exponential backoff: each retry waits twice as long as the last one (4s → 8s → 16s → 32s → 64s). If all 5 retries fail, the script logs an error for that batch and continues with the next one. You'll see failed batches in the final summary and can re-run the script to retry them (resume logic handles this).

**What not to do during a 429 error:**
- Don't stop the script. Let it run — it will resolve itself.
- Don't increase the batch size to "make it faster" — that will increase the rate of 429s, not decrease them.
- Don't open a second ingestion process. Two concurrent processes will hit the rate limit faster and interfere with each other.

### Checking Progress in Supabase

While the script is running, you can check progress in the Supabase dashboard:
1. Go to app.supabase.com and open your project
2. Click "Table Editor" in the left sidebar
3. Open the `document_chunks` table
4. The row count shown at the top updates as the script inserts new rows

This gives you a real-time view of how many chunks are in the database. If the count stops increasing for more than 10 minutes, the script may have stalled — check the terminal for error messages.

### Resume Logic — Starting and Stopping Safely

The ingestion script tracks progress by counting how many chunks already exist in the database for each source file. If you stop the script (Ctrl+C) and restart it later, it will skip files that are already fully ingested and continue from the first file that isn't complete.

**Safe to do:**
- Stop the script at any point with Ctrl+C
- Restart the script after stopping — it resumes automatically
- Run the script on a new computer with the same `.env` credentials — it will pick up from where it left off

**Not safe:**
- Deleting the `document_chunks` table and re-running without re-running the chunk script first
- Changing `CHUNK_SIZE` in the chunk script and re-running ingestion without first deleting the existing chunks for that file (this creates duplicate chunks at different sizes)

## Reflection Questions
1. The ingestion script has been running for 20 minutes and you see this log line: `[WARN] Batch 47 — retry 5 of 5 failed, skipping`. What does this mean? What do you do?
2. You check Supabase and the row count is 1,240. The script's output said you had 3,400 chunks total. How do you estimate how much longer the ingestion will take?
3. A colleague suggests running the ingestion script on two computers at the same time to "finish twice as fast." Why is this a bad idea?

## Prep Task
Before your next session: Set up your `.env` file and run `--verify-env`. If verification passes, start the ingestion script and let it run until the first file completes. Check Supabase to confirm that rows are appearing in the `document_chunks` table. Record: how many chunks did the first file produce? What was the batch count?
