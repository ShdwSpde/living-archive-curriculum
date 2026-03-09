# Unit 4: Text Quality & Preparation — In-Person Lesson
**Pathway:** Archive Builder
**Duration:** 75 min
**Room setup:** Developer workstations, projector for demo, whiteboard for problem log
**Materials:** Chunk script running on all machines, corpus files from Unit 3 available locally, JSON viewer installed or browser available for viewing JSON

## Agenda
| Time | Activity |
|------|----------|
| 0:00–0:10 | Warm-up: show your chunk output — what's the best and worst file you found? |
| 0:10–0:30 | Facilitated presentation: diagnosing chunk quality issues |
| 0:30–1:00 | Workshop: triage and fix quality problems in your corpus |
| 1:00–1:15 | Gallery share: problem log and decisions |

## Warm-Up Activity

**Best and worst chunk files (10 min)**

Each participant opens their chunk output directory and picks two files: the one that looks cleanest and the one that looks worst. They each show one passage from each file on their screen to a neighbor. Quick round:
- What makes the "best" file good? What specific features?
- What makes the "worst" file bad? What specific problem does it have?
- How many files are in between?

Facilitator writes the problem types on the whiteboard as participants describe them: garbled content, false chapters, missing overlap, empty output. This becomes the group's shared problem taxonomy for the workshop.

## Facilitated Presentation

**Diagnosing chunk quality issues (20 min)**

**Part 1: Reading a chunk file (6 min)**

Live demo on projector. Open a chunk output JSON file in a text editor. Walk through the structure: source_title, chapter, chunk_index, content. Show a clean chunk — note what makes it clean: readable, complete sentence at the start, complete sentence at the end (or near-complete), chapter name that corresponds to an actual chapter.

Show a bad chunk — garbled content. Ask: if this chunk appeared in an answer to a user's question, what would happen? (The answer would cite a garbled passage. Users would lose trust in the archive.)

**Part 2: False chapter detection (8 min)**

Open a chunk file from a text that has page headers in the OCR. Show the chapter field values: "47", "W. E. B. DU BOIS", "CHAPTER THE THIRD Part 2 (cont'd)". Explain why each is wrong:
- "47": page number mistaken for a chapter heading
- "W. E. B. DU BOIS": running title from the top of each page
- "CHAPTER THE THIRD Part 2 (cont'd)": OCR merged two different page headers into a single line

Walk through the fix for the most common case (page number headers): open the source .txt file, use Find/Replace to remove the repeated pattern.

Demo the fix live — remove the page number headers from a sample file, re-run the chunk script, show the improved chapter output.

**Part 3: When to fix vs. when to exclude (6 min)**

The decision criteria in practice:
- Minor false chapters (1–3 in an otherwise clean file): fix the source file
- Pervasive false chapters (every page produces a false chapter): consider setting chapter = null for all chunks from this file
- Garbled content throughout: this is a quality-1 file; apply the four-tier decision from the Advocate pathway
- Garbled content in one section only: the scan degraded in the middle; remove or null the affected section from the source file if it's a minor portion of the text

## Workshop Activity

**Triage and fix quality problems (30 min)**

Participants work on their own corpus. Three phases:

**Phase 1 (10 min): Full triage**
Open every chunk output file and classify it quickly (under 30 seconds per file):
- Clean (green)
- Minor issues — fixable (yellow)
- Significant issues — needs decision (red)

Write the filename and classification in your inventory spreadsheet. Don't start fixing yet.

**Phase 2 (15 min): Fix priority items**
Start with your yellow files — these are fixable and worth fixing. The most common fixes:
- Remove running page headers from the source .txt file
- Fix a single garbled proper name that appears throughout (find/replace)
- Remove a library stamp or catalog page at the beginning of the scan

After fixing, re-run the chunk script on that file and verify the fix worked.

**Phase 3 (5 min): Document red files**
For each red file: write one sentence in your inventory — what is the problem, what is your recommendation (fix later / exclude). You don't need to fix them today, but you do need to document the decision.

Facilitator circulates during all phases. Common issues:
- Participants who try to fix quality-1 files with find/replace (usually not sufficient — redirect to the exclusion decision)
- Participants who can't find the pattern causing false chapters (help them look at the original source .txt to identify repeating page header text)

## Synthesis / Gallery Share

**Problem log and decisions (15 min)**

Each participant shares their inventory spreadsheet — specifically the "significant issues" (red) files and their recommendations. Facilitator writes a group problem log on the whiteboard:
- How many red files across the group?
- What types of problems came up most frequently?
- Did anyone reach a "fix vs. exclude" decision they want to discuss?

Close with: what does each participant need to do before the next session to have a chunk-ready corpus? Each person states one specific action.

## Facilitator Notes
- The hands-on fix in Phase 2 is the most valuable part of the workshop — participants who do it successfully remember the pattern; participants who only read about it often forget
- Some participants will spend too long on a single difficult file — time-box Phase 2 strictly and redirect anyone who's been on one file for more than 8 minutes
- For participants with many red files: help them accept that exclusion is a valid outcome, not a failure
- Keep the whiteboard problem log visible throughout the session — it helps participants see that their problems are shared, not unique
