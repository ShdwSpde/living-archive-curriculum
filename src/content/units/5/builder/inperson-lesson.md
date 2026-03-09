# Unit 5: Embedding & AI — In-Person Lesson
**Pathway:** Archive Builder
**Duration:** 75 min
**Room setup:** Developer workstations with `.env` pre-configured (or setup guide available), projector for demo, Supabase dashboard accessible
**Materials:** `.env` configuration guide (one per person), ingestion script available on all machines, Supabase project access shared with all participants

## Agenda
| Time | Activity |
|------|----------|
| 0:00–0:10 | Warm-up: environment setup check — who's ready to run? |
| 0:10–0:30 | Facilitated presentation: ingestion pipeline + rate limits + monitoring |
| 0:30–1:00 | Workshop: run ingestion, monitor, troubleshoot |
| 1:00–1:15 | Gallery share: Supabase row counts + one thing each participant learned |

## Warm-Up Activity

**Environment setup check (10 min)**

Before the presentation, participants run `--verify-env`. Each person stands (or raises their hand) when they see a successful verification message. Facilitator helps anyone who doesn't succeed.

Common setup problems to address quickly:
- GEMINI_API_KEY missing or typo'd: check for extra spaces, quote characters in the key
- SUPABASE_URL format: must start with `https://`, must end with `.supabase.co`
- SUPABASE_SERVICE_ROLE_KEY: make sure it's the service role key, not the anon key

Goal: everyone at "verified" before the presentation starts. If 2+ people are still blocked after 10 minutes, move the presentation forward and pair those people with a helper.

## Facilitated Presentation

**Ingestion pipeline + rate limits + monitoring (20 min)**

**Part 1: What the script does, step by step (8 min)**

Live demo on projector. Run the ingestion script on a sample file (small corpus, < 20 chunks) so participants can see the full cycle in under 2 minutes:

1. Script reads chunk JSON file
2. Calls Gemini API with chunk text → gets back array of 768 numbers
3. Inserts row into Supabase with title, chapter, content, embedding
4. Repeats for all chunks
5. Prints completion summary

Open the Supabase dashboard simultaneously on a second window — show the row count increasing in real time as the script runs. This makes the abstract process concrete.

**Part 2: Rate limits and the 4-second delay (6 min)**

Explain the Gemini free tier rate limit: approximately 1,000 embeddings per minute, but practically the limit kicks in faster with burst requests. The script's 4-second delay between batches of 5 works out to approximately 75 chunks per minute — safely under the limit.

Show what a 429 error looks like in the logs. Run the demo quickly enough to trigger a rate limit (optional — if time allows). Show the automatic backoff behavior. Emphasize: **let the script handle it, don't intervene.**

**Part 3: Monitoring and resume logic (6 min)**

Show how to check progress: both in terminal logs and in Supabase row count. Run a count query in the Supabase SQL editor: `SELECT COUNT(*) FROM document_chunks;` and `SELECT source_title, COUNT(*) FROM document_chunks GROUP BY source_title;` — this gives a per-file view of ingestion status.

Demo the resume logic: stop the script mid-run (Ctrl+C), restart it, watch the SKIP log lines for the already-ingested file. Confirm the row count doesn't change for the completed file.

## Workshop Activity

**Run ingestion, monitor, troubleshoot (30 min)**

Participants run the ingestion script for their own corpus. Three tracks based on where they are:

**Track A (ready to go):** Start ingestion immediately. Monitor in terminal and Supabase. Run the per-file count query at the 15-minute mark. Note any 429 errors and confirm they self-resolved.

**Track B (small or no chunk files yet):** Use the provided sample corpus (pre-prepared by facilitator) for at least the first file. Run ingestion on the sample, then start preparing your own chunk files if time allows.

**Track C (environment issues):** Pair with a facilitator or a Track A peer to resolve the remaining setup issue. Don't fall behind — get environment working first.

Facilitator circulates and notes any issues on the whiteboard as they come up (these become the debrief discussion points).

## Synthesis / Gallery Share

**Supabase row counts + one thing learned (15 min)**

Each participant opens their Supabase dashboard and shares their screen or calls out their row count. Quick round: "My corpus has X rows so far. I started Y minutes ago. I estimate Z more hours to complete."

Then: each person names one thing they learned during the workshop that they didn't know at the start. Facilitator writes them on the whiteboard. Common themes: the 4-second delay is actually necessary (not arbitrary), the resume logic is simpler than expected, Supabase row counts are a reliable progress indicator.

Close with: each participant names what they'll do between now and the next session to complete ingestion. For anyone with a large corpus, confirm that the script can run overnight unattended.

## Facilitator Notes
- The biggest source of frustration is `.env` issues — front-load setup help in the warm-up rather than discovering problems mid-workshop
- Participants often want to speed up ingestion by reducing the 4-second delay — demo what happens when you reduce it too aggressively (429 cascade that takes longer to recover from than the original delay would have saved)
- For participants with very large corpora (15,000+ chunks), set expectations clearly: ingestion will take multiple overnight runs; this is normal and the resume logic handles it
- The per-file count query in Supabase (`GROUP BY source_title`) is often new to participants who haven't used SQL much — walk through it slowly and let them copy it
