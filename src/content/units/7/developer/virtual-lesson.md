# Unit 7: Metadata & Organization — Virtual Lesson
**Pathway:** Archive Developer
**Duration:** 75 min
**Materials:** Screen share, local dev environment, Supabase SQL editor, participants' validation script output from prep task

## Agenda
| Time | Activity |
|------|----------|
| 0:00–0:10 | Check-in: share your validation script output — how many mismatches did you have? |
| 0:10–0:35 | Presentation: interface extension + migration patterns + validation architecture |
| 0:35–1:00 | Breakout: write the validation script + one interface extension |
| 1:00–1:15 | Debrief: synchronization as an ongoing maintenance concern |

## Slide Outline

**Slide 1: Metadata Synchronization as a System Property**
- The archive works correctly only when DB and metadata file are synchronized
- Synchronization can break silently — no runtime error, just missing display data
- The validation script is a proactive check, not a diagnostic tool
- Run it: before deployment, after adding new works, after any TITLE_MAP changes
- The goal: make the synchronized state verifiable, not just assumed

**Slide 2: Extending the WorkMeta Interface**
- Optional vs. required fields: `field?: type` vs. `field: type`
- Non-breaking changes: add optional fields; existing data still typechecks
- Breaking changes: add required fields; all 30 existing entries must be updated
- Where consumers live: sidebar component, About page, any scripts that create WorkMeta objects
- The typecheck command: `npx tsc --noEmit` — catches all consumer issues without building

**Slide 3: Migration Patterns for Schema Extensions**
- The non-breaking ADD COLUMN pattern (all rows get NULL by default)
- Backfill options: from JSONB metadata, from title-keyed UPDATE statements, from external CSV
- Migration naming: ISO date + description + .sql
- The idempotency concern: what happens if a migration runs twice? (ADD COLUMN fails if column exists — wrap in a conditional)
- `ALTER TABLE ... ADD COLUMN IF NOT EXISTS` — safe for re-runs

**Slide 4: The Validation Script Architecture**
- What it compares: unique `source_title` values in DB vs. `title` values in `worksMetadata.ts`
- Two failure modes: in-DB-not-in-meta (display gap), in-meta-not-in-DB (curation gap)
- Output format: warnings with specific titles, not just counts
- When to run it: as a pre-deploy check; add to CI pipeline if one exists
- Extension: add a check for duplicate slugs in `worksMetadata.ts`

**Slide 5: Handling Special Cases**
- Multi-volume works: map multiple filenames to one title, or separate entries with volume suffix
- Anonymous texts: "Attributed to X" convention vs. source-based title
- Multi-lingual works: store in native language title as `source_title`, add English translation in description
- Works published posthumously: year = publication year of the source you're using (not year written)
- The documentation principle: every special case should be documented in a methodology note

## Breakout Activity (25 min)
**Solo coding**

Each participant implements two tasks:

1. **Write the metadata validation script** (15 min): implement `validateMetadataSync()` as described in the async reading. Run it against your corpus. Fix all mismatches. Run it again and confirm synchronized.

2. **Add one extension field** (10 min): choose one field your corpus needs that WorkMeta doesn't have (e.g., `seriesName` for periodicals, `volumeNumber` for multi-volume works, `collaborators` for co-authored texts). Add it to the interface as an optional field. Update 3–5 existing entries to include the field. Run `npx tsc --noEmit` to confirm no type errors.

Share-back: each participant shows their validation script output (synchronized state) and the interface extension they added.

## Debrief Questions
1. After the validation script reported "synchronized," you added 3 new texts to the corpus and re-ran it. It found 3 mismatches. What happened and what's the fix?
2. If you were setting up a CI pipeline, at what point in the process would you run the validation script — before or after ingestion? Before or after deployment?
3. Is there any case where a mismatch between DB and `worksMetadata.ts` is acceptable — where you'd want something in the database but not displayed in the UI?

## Facilitator Notes
- The validation script exercise reveals mismatches that participants didn't know existed — budget time for the "fixing mismatches" part, not just the script-writing part
- Some participants will want to automate the fix as well (add missing entries automatically to `worksMetadata.ts`) — validate this as a legitimate automation but note that it requires the script to generate descriptions, which is a curatorial decision that can't be fully automated
- The interface extension exercise sometimes produces fields that would require significant frontend changes to display — note this as a design question: adding a field to the interface is free; adding it to the UI is work
- The "acceptable mismatch" debrief question generates interesting discussion — the answer is yes (staging/preview data, works in progress, excluded works that are still in the DB) and this nuance is worth exploring
