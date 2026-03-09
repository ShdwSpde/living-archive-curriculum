# Unit 3: Sourcing the Corpus — In-Person Lesson
**Pathway:** Archive Builder
**Duration:** 75 min
**Room setup:** Developer workstations or laptops per participant, projector for live demo, whiteboard for troubleshooting notes
**Materials:** Corpus inventory spreadsheet template (pre-loaded on machines or shared link), terminal access on all machines, Internet Archive accessible

## Agenda
| Time | Activity |
|------|----------|
| 0:00–0:10 | Warm-up: what do you have so far, and what do you still need? |
| 0:10–0:30 | Facilitated presentation: download workflow + naming + quality check |
| 0:30–1:00 | Workshop: live corpus build — download, rename, spot-check, document |
| 1:00–1:15 | Gallery share: inventory snapshots and problem log |

## Warm-Up Activity

**Corpus inventory check-in (10 min)**

Participants open their corpus inventory spreadsheet (or create one from the template). Each person answers:
- How many texts do you have downloaded so far?
- How many more do you think you need?
- Have you hit any format or quality problems?

Facilitator writes a quick tally on the whiteboard: total files downloaded across the group, number with quality issues flagged, number of PDF-only items. This gives the room a sense of collective progress and surfaces shared problems before the workshop.

## Facilitated Presentation

**Download workflow + naming + quality check (20 min)**

**Part 1: Live download demo (8 min)**

Facilitator shares screen on projector. Walk through the complete process with a real figure:
- Open archive.org, search for figure name, filter to Texts
- Find the collection page — note the difference between it and the main search results
- Open an item detail page, locate the Download Options box, click "Show All"
- Identify .txt, _djvu.txt, and .pdf options in the file list
- Download a .txt file, then download a _djvu.txt file
- Show both in a text editor — confirm both are readable text

**Part 2: Renaming and directory structure (6 min)**

On the terminal (still on projector):
- Show the `corpus/raw/` directory structure
- Rename the downloaded files using the convention: `mv dubois_souls_of_black_folk.txt dubois-souls-of-black-folk-1903.txt`
- Walk through the naming rules: lowercase, hyphens, year at end, no special characters
- For _djvu.txt files: `mv dubois-darkwater_djvu.txt dubois-darkwater-1920.txt`
- Practical tip: rename files as you download them, not in a batch afterward — you'll lose track of which file is which

**Part 3: OCR quality spot-check (6 min)**

Open 3 pre-prepared .txt files (one quality 3, one quality 2, one quality 1) on the projector. Read 3–4 sentences from the middle of each aloud. Ask the room to rate them before you do. Demonstrate:
- Quality 3: smooth reading, only minor errors
- Quality 2: readable but noticeable errors; meaning is clear
- Quality 1: fragmented, incoherent, large chunks of nonsense

Show how to enter the quality rating in the inventory spreadsheet. Note: always check files from the middle of the document, not the beginning — beginning pages sometimes have manual correction applied.

## Workshop Activity

**Live corpus build: download, rename, spot-check, document (30 min)**

Structured in three overlapping phases — participants move through phases at their own pace:

**Phase 1 (first 10 min): Build your download list**
Search Internet Archive for your figure. Find everything available. Add rows to your inventory spreadsheet for every item you find — don't download yet. This catalog step prevents downloading files you later realize you already have or that you later realize you should have avoided.

**Phase 2 (next 15 min): Download and rename**
Download files in priority order (most important texts first). Rename each file immediately after downloading. Save to `corpus/raw/`. Aim for at least 10 files downloaded and renamed.

**Phase 3 (last 5 min): Spot-check and document**
Open 3–5 downloaded files, read 3 paragraphs from the middle of each, rate quality 1–3. Update inventory spreadsheet. Flag any problems with a note.

Facilitator circulates during all phases. Common issues to watch for:
- Participants downloading files without renaming them
- Participants forgetting to update the spreadsheet
- _djvu.txt files being saved with the original Internet Archive filename (often has spaces or colons)

## Synthesis / Gallery Share

**Inventory snapshots and problem log (15 min)**

Each participant opens their inventory spreadsheet and shares their screen or passes the machine to a neighbor. Quick round-robin:
- How many texts? What's the quality distribution?
- What's your biggest remaining problem?

Facilitator creates a shared "problem log" on the whiteboard: file format issues, quality issues, naming confusion, missing texts. For each problem, ask: who else in the room hit this? Does anyone have a solution?

Close with: what does each participant need to do before the next session to complete their corpus download? Each person states one specific action.

## Facilitator Notes
- Renaming files with spaces or colons in the original Internet Archive filename is the most common technical stumble — demo the `mv` command with quotes around filenames that have spaces
- Some participants will be tempted to process files through the chunking script before completing the download — discourage this; completing the corpus before chunking prevents inconsistent coverage
- The inventory spreadsheet is the most important artifact from this session — participants who don't maintain it will struggle to know what they have later
- If Internet Archive is slow or down, have a backup: pre-downloaded sample files for a model figure that participants can practice the renaming and quality-check process on
