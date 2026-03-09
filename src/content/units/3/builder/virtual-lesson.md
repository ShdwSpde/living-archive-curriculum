# Unit 3: Sourcing the Corpus — Virtual Lesson
**Pathway:** Archive Builder
**Duration:** 75 min
**Materials:** Internet Archive browser tab, terminal window (for `ia` CLI demo), corpus inventory spreadsheet, file manager or terminal for showing local directory structure

## Agenda
| Time | Activity |
|------|----------|
| 0:00–0:10 | Check-in: how many files did you download in the prep task? What surprised you? |
| 0:10–0:35 | Presentation: full download walkthrough + djvu handling + bulk download |
| 0:35–1:00 | Breakout: complete your corpus download and inventory update |
| 1:00–1:15 | Debrief: what problems did people hit, how did they solve them? |

## Slide Outline

**Slide 1: What "Done" Looks Like After This Unit**
- A local `corpus/raw/` directory with all your texts
- Every file named using the naming convention (lowercase, hyphens, year)
- An updated inventory spreadsheet with local filenames and quality ratings
- A note for every file that required a decision (PDF-only, poor quality, uncertain date)
- You are not done when you've downloaded files — you're done when you've documented what you downloaded

**Slide 2: Internet Archive Navigation — Live Demo**
- Walk through searching and filtering by Texts
- Find the collection page vs. individual scattered items
- Show the "Download Options" box and "Show All" link
- Identify the .txt vs. _djvu.txt vs. .pdf options
- Click through to download a .txt file live — show the resulting file in a text editor
- Key takeaway: always look for .txt first; _djvu.txt is fine; PDF is a last resort

**Slide 3: Handling _djvu.txt Files**
- What DJVU is and why it exists (library digitization history)
- The _djvu.txt file is plain text — it just has an unusual suffix
- Download → rename (drop the _djvu suffix) → verify it's readable text, not binary
- Occasionally a _djvu.txt download is corrupted: open it, look for readable words in the first 5 lines
- If it's binary/garbled, try the PDF download and extract text with pdftotext as a fallback

**Slide 4: Bulk Download with the `ia` CLI**
- When to use it: 20+ items in a collection
- Installation: `pip install internetarchive`
- Search syntax: `ia search "collection:(name)" --itemlist`
- Download command: `ia download ITEMID --formats="DjVuTXT,Text"`
- How to loop over a list of item IDs
- Caveat: the `ia` CLI still needs manual naming cleanup afterward — filenames come from Internet Archive's conventions, not yours

**Slide 5: Quality Spot-Check Process**
- The 5-file representative sample (not cherry-picked)
- Read 3 paragraphs from the middle of the file
- Rate 1–3: poor / acceptable / clean
- The decision tree: all clean → download rest; mostly acceptable → proceed with caution; multiple poor → investigate before continuing
- Log quality ratings in the inventory spreadsheet now, before you forget which files you checked

## Breakout Activity (25 min)
**Solo work with check-ins**

Participants continue or start their corpus download during the breakout. Tasks:
1. Download at least 10 files (more if they're fast) (10 min)
2. Rename all files using the naming convention (5 min)
3. Spot-check 3–5 files and update the inventory spreadsheet with quality ratings (10 min)

At the 15-minute mark, breakout groups of 2–3 check in: "What problems did you hit? Any PDF-only items? Any quality surprises?"

Share-back: each participant names one file they're uncertain about — format issue, quality issue, or date issue — and the group problem-solves together.

## Debrief Questions
1. Did anyone hit a file that was supposed to be .txt but opened as garbled binary or HTML? What did you do?
2. How did the renaming step go? Did anyone find naming edge cases the convention didn't cover?
3. For people with large collections (50+ items), was the `ia` CLI faster? What was the tradeoff?

## Facilitator Notes
- The bulk download demo with the `ia` CLI is optional — skip it if most participants have small corpora (under 20 files); it adds complexity that's not necessary for everyone
- Renaming files takes longer than people expect — budget 5 minutes just for renaming in the breakout, and warn participants about this upfront
- Some participants will try to rename files using file manager GUIs and hit issues with special characters; recommend using the terminal (mv command) for bulk renaming
- The quality check step is frequently skipped when participants are in "download mode" — explicitly prompt them to stop downloading at the 15-minute mark and switch to spot-checking
