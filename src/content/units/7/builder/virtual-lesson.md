# Unit 7: Metadata & Organization — Virtual Lesson
**Pathway:** Archive Builder
**Duration:** 75 min
**Materials:** Screen share, local dev server running, `worksMetadata.ts` and ingestion script accessible, terminal for duplicate check

## Agenda
| Time | Activity |
|------|----------|
| 0:00–0:10 | Check-in: show your updated sidebar screenshot — what did you add? |
| 0:10–0:35 | Presentation: metadata synchronization + series handling + duplicate detection |
| 0:35–1:00 | Breakout: complete metadata for your full corpus |
| 1:00–1:15 | Debrief: common issues + what happens when metadata is wrong |

## Slide Outline

**Slide 1: The Metadata Flow**
- Source filename → TITLE_MAP → `source_title` in database → matches `title` in `worksMetadata.ts` → sidebar display
- Every step is a potential sync break — diagram it clearly
- What breaks at each step: missing TITLE_MAP → raw filename in DB; mismatched title → work doesn't appear in sidebar; missing `worksMetadata.ts` entry → work appears in DB but not in UI
- The Builder's job: keep all four steps synchronized

**Slide 2: TITLE_MAP — Patterns and Special Cases**
- Individual file mapping: one key-value pair per work
- Series prefix matching: one pattern rule handles hundreds of periodical files
- The fallback: if no match, use the filename — this is a bug trap, not a feature
- Live demo: show a TITLE_MAP entry, add a new one, re-run ingestion, confirm the title in Supabase
- Edge case: what if the same work appears in two different files (duplicate download)?

**Slide 3: `worksMetadata.ts` Structure**
- Walk through a complete entry: id, title, year, description, sourceUrl, category
- The critical constraint: title must exactly match `source_title` in the database
- Common sync error: updating the display title in `worksMetadata.ts` but forgetting to update TITLE_MAP
- The slug rules: lowercase, hyphens, URL-safe, stable after launch
- Category values: books / essays / speeches / periodicals — the sidebar uses these to group works

**Slide 4: Duplicate Detection**
- The grep commands to check for duplicate titles and ids
- What duplicates cause: sidebar shows work twice, About page count is wrong
- Two types of duplicates: copy-paste errors (delete one) vs. genuinely different editions (keep both with distinct slugs)
- Demo: show a duplicate in action, run the grep command, find the line numbers, remove one
- Prevention: run the duplicate check before every commit that modifies `worksMetadata.ts`

**Slide 5: Verifying Changes in the Dev Server**
- Run `npm run dev` in `web/`
- Open corpus tab — confirm new works appear
- Open a work in the sidebar — confirm chapters load if applicable
- Ask the archive a question about the new work — confirm it surfaces in responses
- If a work doesn't appear: check title match, check that it's in the database with the right source_title

## Breakout Activity (25 min)
**Solo work**

Each participant completes their TITLE_MAP and `worksMetadata.ts` for all works in their corpus:
1. Add any missing works to TITLE_MAP (5 min)
2. Add corresponding entries to `worksMetadata.ts` for any missing works (10 min)
3. Run the dev server and check the sidebar — every work should appear (5 min)
4. Run the duplicate check commands — fix any issues found (5 min)

Share-back: each participant shows their sidebar with all works visible, or describes one sync problem they're still troubleshooting.

## Debrief Questions
1. Did anyone find a work in the database (via Supabase) that wasn't in `worksMetadata.ts`? How did you discover it? What did you do?
2. What's the most error-prone step in the metadata sync flow — the one most likely to break if you're in a hurry?
3. If you had to hand your TITLE_MAP to a colleague who wasn't in this workshop, what documentation would they need to maintain it correctly?

## Facilitator Notes
- The most common problem is a title mismatch between TITLE_MAP and `worksMetadata.ts` — demo this deliberately: create a mismatch, show what breaks, fix it
- Some participants will have periodical runs with dozens of files — confirm they've implemented the prefix pattern rather than writing individual entries
- The slug uniqueness constraint causes confusion when two works have similar names — walk through the disambiguation convention (add year: `wells-southern-horrors-1892`, `wells-red-record-1895`)
- If participants haven't re-run ingestion after updating TITLE_MAP, their database still has old source_title values — remind them that TITLE_MAP changes require re-ingestion (or a manual SQL UPDATE) to take effect
