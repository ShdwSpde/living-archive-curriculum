# Unit 9: Pitfalls & Quality Control — Async Materials
**Pathway:** Archive Builder
**Duration:** 30–45 min

## Learning Objectives
- Diagnose and fix the four main operational pitfalls: Supabase row limit, chapter dedup issues, batch UPDATE timeouts, and stalled ingestion
- Run provided diagnostic SQL queries and interpret the results
- Safely stop and restart the ingestion process

## Reading

### The Four Main Pitfalls

Every archive builder encounters the same four problems at some point. Knowing them in advance means you can diagnose and fix them quickly rather than spending hours troubleshooting.

**Pitfall 1: The Supabase 1000-Row Default Limit**

When you query the database without specifying a limit, Supabase returns at most 1,000 rows by default. This affects any script that reads chunks from the database for processing (e.g., a batch update or a full-corpus export).

Symptom: You run `SELECT * FROM document_chunks` and get exactly 1,000 rows even though you know there are 5,000 in the database.

Fix: Always specify a range in your queries:
```javascript
// Wrong — silently returns max 1000 rows
const { data } = await supabase.from('document_chunks').select('*');

// Right — explicit range
const { data } = await supabase
  .from('document_chunks')
  .select('*')
  .range(0, 999); // rows 0–999 (first batch)

// For full table: paginate with .range(0, 999), .range(1000, 1999), etc.
```

For any operation that processes the full corpus, always paginate explicitly. Never trust a single query result count to represent the full table.

**Pitfall 2: Chapter Dedup Issues in the Sidebar**

After ingestion, the corpus sidebar sometimes shows duplicate chapter entries for the same chapter — or shows chapters that don't exist in the original text. This usually comes from two sources:

*Whitespace normalization:* The same chapter name appears as "Of Our Spiritual Strivings" in some chunks and "  Of Our Spiritual Strivings  " (with leading/trailing spaces) in others. The sidebar treats these as different chapters.

*OCR variation:* The chapter detection regex caught "Chapter I — Title" in some chunks and "Chapter 1 — Title" in others (Roman numeral vs. Arabic numeral).

Fix — run this normalization SQL:
```sql
UPDATE document_chunks
SET chapter = TRIM(REGEXP_REPLACE(chapter, '\s+', ' ', 'g'))
WHERE chapter IS NOT NULL;
```

This collapses multiple spaces to one and removes leading/trailing whitespace. For Roman numeral / Arabic numeral variation, apply a more specific normalization.

**Pitfall 3: Batch UPDATE Timeouts Over 2000 Rows**

The Supabase free tier silently times out on UPDATE queries that affect more than approximately 2,000 rows. The request appears to succeed (no error returned) but only the first ~2,000 rows are actually updated.

This affects: bulk title corrections (TITLE_MAP changes), chapter normalization, metadata backfills.

Fix — always batch large UPDATEs:
```sql
-- Instead of:
UPDATE document_chunks SET source_title = 'New Title' WHERE source_title = 'Old Title';

-- Do this in batches (check row count first):
UPDATE document_chunks
SET source_title = 'New Title'
WHERE source_title = 'Old Title'
  AND id IN (
    SELECT id FROM document_chunks
    WHERE source_title = 'Old Title'
    LIMIT 1000
  );
-- Run again until no more rows are updated
```

Or use the paginated update script in `scripts/batch-update.ts`.

**Pitfall 4: Killing and Restarting Ingestion Safely**

If the ingestion script stalls, crashes, or needs to be interrupted, you can kill it safely at any point with Ctrl+C. The resume logic (row count check per source file) will pick up from where it left off.

**What "stalled" looks like:**
- Terminal shows no new log lines for 10+ minutes
- The last log line was a batch-level operation (not a file-completion summary)
- Supabase row count is no longer increasing

**Steps to safely kill and restart:**
1. Press Ctrl+C to interrupt the script
2. Check Supabase row count: `SELECT source_title, COUNT(*) FROM document_chunks GROUP BY source_title;`
3. Compare counts to expected: any file with fewer rows than expected is the resume point
4. Restart the script: it will skip fully-ingested files and restart from the first incomplete one

**Do not:**
- Delete rows from the database before restarting (the dedup logic will re-insert correctly)
- Run two ingestion processes simultaneously (they'll conflict on the rate limit and dedup logic)
- Change the source chunk files while ingestion is in progress

### Diagnostic SQL Queries

These queries help you identify problems before they affect users:

**Check for suspiciously short chapters (OCR noise):**
```sql
SELECT chapter, COUNT(*) as chunk_count
FROM document_chunks
WHERE chapter IS NOT NULL
  AND LENGTH(chapter) < 10
GROUP BY chapter
ORDER BY chunk_count DESC;
```

Short chapter names (under 10 characters) are usually page numbers or OCR artifacts.

**Check for duplicate chapters (whitespace issue):**
```sql
SELECT source_title,
       TRIM(chapter) AS normalized_chapter,
       COUNT(DISTINCT chapter) AS variant_count,
       COUNT(*) AS chunk_count
FROM document_chunks
WHERE chapter IS NOT NULL
GROUP BY source_title, TRIM(chapter)
HAVING COUNT(DISTINCT chapter) > 1;
```

Any row where `variant_count > 1` indicates the same chapter exists with different whitespace variants.

**Check for works with unexpectedly low chunk counts:**
```sql
SELECT source_title, COUNT(*) AS chunk_count
FROM document_chunks
GROUP BY source_title
HAVING COUNT(*) < 10
ORDER BY chunk_count ASC;
```

Works with fewer than 10 chunks are probably short texts (acceptable) or partially-failed ingestion (investigate).

## Reflection Questions
1. You run the chunk count query and find that "Southern Horrors" has 3 chunks when you expected 45. The script logged successful ingestion. What are the possible causes?
2. You need to update the `source_title` for 3,000 rows. You write a single UPDATE query. It returns success after 5 seconds. You then count the affected rows and find only 1,800 were updated. What happened? How do you fix it?
3. Your ingestion script has been running for 4 hours on a 12,000-chunk corpus. Terminal shows it on chunk 8,200 of the current file. Should you let it run or restart it? What would you check?

## Prep Task
Before your next session: Run all three diagnostic SQL queries on your corpus. Record the output. Identify any: chapters under 10 characters (false positives), duplicate chapter variants (whitespace issues), works with unexpectedly low chunk counts. For each finding, write one sentence describing what action you'll take.
