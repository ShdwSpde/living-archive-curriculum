# Unit 7: Metadata & Organization — In-Person Lesson
**Pathway:** Archive Builder
**Duration:** 75 min
**Room setup:** Developer workstations, projector for demo, whiteboard for metadata sync diagram
**Materials:** Local dev server running on all machines, `worksMetadata.ts` accessible, duplicate check command on a reference card

## Agenda
| Time | Activity |
|------|----------|
| 0:00–0:10 | Warm-up: show the sidebar — what's missing, what's wrong? |
| 0:10–0:30 | Facilitated presentation: metadata sync flow + common failure modes |
| 0:30–1:00 | Workshop: complete TITLE_MAP + `worksMetadata.ts` + verify sidebar |
| 1:00–1:15 | Gallery share: sidebars side by side + sync problems resolved |

## Warm-Up Activity

**Show the sidebar — what's missing, what's wrong? (10 min)**

All participants open the archive in a local dev server (`npm run dev`). Open the Corpus sidebar. Each person notes:
- How many works appear?
- Are any showing raw filenames instead of display titles?
- Are any missing descriptions?
- Do any appear twice?

Quick round: each person names one problem they see. Facilitator writes a tally on the whiteboard of the problem types. This becomes the repair agenda for the workshop.

## Facilitated Presentation

**Metadata sync flow + common failure modes (20 min)**

**Part 1: The sync flow diagram (7 min)**

Draw on the whiteboard: four connected boxes with arrows:

```
[Source file: wells-southern-horrors-1892.txt]
    ↓ TITLE_MAP lookup
[Database: source_title = "Southern Horrors: Lynch Law..."]
    ↓ sidebar loads source_title values from DB
[worksMetadata.ts: title = "Southern Horrors: Lynch Law..."]  ← must match exactly
    ↓ display renders from worksMetadata.ts
[Sidebar: "Southern Horrors: Lynch Law..." with description]
```

Mark the failure point at each arrow:
- Arrow 1 fails: TITLE_MAP missing → raw filename in database
- Arrow 2–3 mismatch: database has correct title but `worksMetadata.ts` has different spelling → work appears with blank description or not at all
- Arrow 3–4 fails: `worksMetadata.ts` entry missing → work is in database but not in sidebar

**Part 2: Common failure modes with live demos (8 min)**

On the projector, deliberately introduce and then fix three common failures:

1. **Missing TITLE_MAP entry:** Comment out one entry in TITLE_MAP. Re-run ingestion (or just update that one row in Supabase directly for speed). Show the raw filename appearing in the sidebar. Uncomment, fix, refresh.

2. **Title mismatch:** Change the title in `worksMetadata.ts` to add an extra period at the end. Show what breaks in the sidebar. Correct the typo, refresh, confirm fix.

3. **Missing `worksMetadata.ts` entry:** Comment out one entry. Refresh the sidebar. Show that the work disappears from the UI even though it's still in the database. Uncomment, refresh, confirm fix.

**Part 3: Series handling for periodicals (5 min)**

Show the prefix match pattern in the ingestion script. Run a grep for `sim_crisis` in the corpus directory to count how many files the pattern covers. Explain: without this pattern, the TITLE_MAP would need 218 individual entries for the Crisis alone. The pattern reduces that to one rule.

For participants with their own periodical series: walk them through adapting the pattern for their figure's publications.

## Workshop Activity

**Complete TITLE_MAP + `worksMetadata.ts` + verify sidebar (30 min)**

**Phase 1 (10 min): Audit the TITLE_MAP**

Open the ingestion script. Compare TITLE_MAP entries against the list of files in `corpus/chunks/`. For every file that has no TITLE_MAP entry (or falls through to the filename), add an entry now. Confirm the complete coverage: every chunk file should map to a readable display title.

**Phase 2 (15 min): Complete `worksMetadata.ts`**

For every TITLE_MAP entry, verify there's a corresponding entry in `worksMetadata.ts` with matching title, a description, a year, and a source URL. Add any missing entries. Fix any descriptions that are placeholder text or incomplete.

After each addition, save the file — the dev server hot-reloads instantly, so you can see the sidebar update in real time.

**Phase 3 (5 min): Duplicate check and final verification**

Run the duplicate check commands in the terminal. Fix any duplicates. Then do a final review of the sidebar:
- Count of works matches the number of works you intended to include
- Every work has a description
- No raw filenames or obvious title errors

Facilitator circulates to help with the title matching problem (the most common issue).

## Synthesis / Gallery Share

**Sidebars side by side + sync problems resolved (15 min)**

Each participant projects their corpus sidebar for 30 seconds. Quick round: count of works, any remaining issues. Facilitator notes which problems were resolved during the workshop and which require post-session follow-up.

Five-minute discussion: of all the sync failure modes demonstrated today, which was the hardest to diagnose? The answer is almost always the title mismatch — it doesn't produce an error, just a silent missing display.

Close by naming the prevention practice: run the duplicate check before every commit to `worksMetadata.ts`. If possible, write a test or script that verifies all database source_titles have matching `worksMetadata.ts` entries — this is a good contribution for anyone in the Developer pathway.

## Facilitator Notes
- The hot-reload on `npm run dev` is very satisfying for participants who have been working in static files — emphasize this as a feedback loop and encourage them to save often and watch the sidebar update
- Title mismatches that don't cause visible errors are the hardest class of problem for beginners — the deliberate demo of introducing and diagnosing one is essential
- Some participants will want to add custom fields to the `worksMetadata.ts` schema (e.g., volume number for periodicals) — this is fine as long as the TypeScript interface is updated; note that custom fields won't automatically appear in the sidebar without frontend changes
- For participants who haven't completed ingestion: their sidebar will be empty or nearly empty; have them focus on getting TITLE_MAP and `worksMetadata.ts` ready for when ingestion completes
