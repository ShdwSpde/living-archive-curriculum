# Unit 7: Metadata & Organization — In-Person Lesson
**Pathway:** Archive Developer
**Duration:** 75 min
**Room setup:** Developer workstations, projector for live coding, whiteboard for sync diagram
**Materials:** Local dev environment running, Supabase SQL editor accessible, TypeScript compiler available

## Agenda
| Time | Activity |
|------|----------|
| 0:00–0:10 | Warm-up: "find a mismatch" — check your corpus for unsynchronized metadata |
| 0:10–0:30 | Facilitated presentation: live-build the validation script |
| 0:30–1:00 | Workshop: validation + interface extension + SQL migration |
| 1:00–1:15 | Gallery share: synchronized outputs and interface additions |

## Warm-Up Activity

**Find a mismatch (10 min)**

Participants run two queries simultaneously — one in the Supabase SQL editor, one in the terminal:

**Supabase SQL editor:**
```sql
SELECT DISTINCT source_title FROM document_chunks ORDER BY source_title;
```

**Terminal (at project root):**
```bash
node -e "const d = require('./web/src/data/worksMetadata.ts'); console.log(d.worksMetadata.map(w => w.title).sort().join('\n'));"
```
(Or open `worksMetadata.ts` manually and list the titles)

Each participant compares the two lists. Any title in one but not the other is a mismatch. How many mismatches do you have? Write the number on a sticky note and post it on the whiteboard.

The range of numbers across the room (0 to potentially 10+) becomes a concrete data point: the archive state varies, and the validation script will provide a consistent way to check it.

## Facilitated Presentation

**Live-build the validation script (20 min)**

Build the `validateMetadataSync` function on the projector, explaining each decision:

**Step 1 (5 min): Get the database titles**
```typescript
const { data } = await supabase
  .from('document_chunks')
  .select('source_title');
const uniqueDbTitles = [...new Set(data?.map(r => r.source_title) ?? [])];
```

Show the output on a real corpus. Count the unique titles. Compare to the expected number.

**Step 2 (5 min): Get the metadata titles**
```typescript
const metadataTitles = new Set(worksMetadata.map(w => w.title));
```

Note: importing a TypeScript file from a script requires `ts-node` or compiled output. Show the import pattern used in the project.

**Step 3 (5 min): Find mismatches in both directions**
```typescript
const inDbNotMeta = uniqueDbTitles.filter(t => !metadataTitles.has(t));
const inMetaNotDb = worksMetadata.filter(w => !uniqueDbTitles.includes(w.title));
```

Walk through what each list means in terms of user experience: inDbNotMeta = works that can be cited but don't appear in the sidebar; inMetaNotDb = sidebar entries for works not in the database.

**Step 4 (5 min): Run it live and fix one mismatch**
Run the script on the demo corpus. Find one mismatch. Fix it (either add the metadata entry or update the TITLE_MAP). Run the script again and show the mismatch count decrease.

## Workshop Activity

**Validation + interface extension + SQL migration (30 min)**

Three sequential phases:

**Phase 1 (12 min): Validation and sync**

Run the validation script on your own corpus. For every mismatch:
- inDbNotMeta: add the entry to `worksMetadata.ts` or update TITLE_MAP if the title is wrong
- inMetaNotDb: either add the work to the corpus + re-ingest, or remove the phantom entry from `worksMetadata.ts`

Run until the script reports zero mismatches.

**Phase 2 (10 min): Interface extension**

Add one new optional field to the `WorkMeta` interface. Requirements: it must be meaningful for at least 3 works in your corpus. It must be optional (marked with `?`). It must compile without type errors.

Update 3–5 works in `worksMetadata.ts` to include the new field. Write a comment above the field explaining its intended use.

Run `npx tsc --noEmit`. Fix any type errors that appear.

**Phase 3 (8 min): SQL migration**

Write a SQL migration file for adding a corresponding column to the database. Include:
- The `ADD COLUMN IF NOT EXISTS` statement
- A backfill UPDATE statement for rows where the value is known
- A comment explaining what the column is for

Save the migration file with an ISO date prefix. Verify it runs without error in the Supabase SQL editor.

## Synthesis / Gallery Share

**Synchronized outputs and interface additions (15 min)**

Each participant:
1. Runs the validation script and shows the synchronized output (zero mismatches)
2. Shows the new field they added to `WorkMeta` and one entry that uses it
3. Shows the migration SQL file

Quick discussion: what interface extensions did people add? Are any of them the same (suggesting a commonly needed field that should be in the base interface)? Are any exotic or specific to one figure (suggesting it's right to keep them as optional)?

Facilitator closes by framing Unit 8: the metadata system built here — synchronized, validated, extended — is the foundation the RAG pipeline reads from when constructing citations. Clean metadata in Unit 7 means clean citations in Unit 8.

## Facilitator Notes
- The warm-up mismatch check sometimes reveals that participants have more mismatches than they thought — this is valuable; resist the urge to tell them their count is fine if it's high
- Phase 1 of the workshop often takes longer than 12 minutes for participants with many mismatches — timebox it firmly; they can continue after the session
- The interface extension exercise occasionally produces fields that don't compile because they conflict with TypeScript's strict type checking — these compile errors are learning opportunities, not failures; help participants read the error message
- The migration writing exercise often reveals that participants don't know the difference between a migration and a seed — clarify: a migration modifies schema (structure), a seed inserts initial data; backfill UPDATEs are closer to seeds but typically live in migration files for convenience
