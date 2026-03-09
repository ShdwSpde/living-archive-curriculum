# Unit 3: Sourcing the Corpus — Virtual Lesson
**Pathway:** Archive Developer
**Duration:** 75 min
**Materials:** Screen share for live coding, terminal with Node.js/Python environment, Internet Archive API accessible, participants' prep task output

## Agenda
| Time | Activity |
|------|----------|
| 0:00–0:10 | Check-in: share your `getAllItemIds` output — what did you get? |
| 0:10–0:35 | Presentation: full download script walkthrough with pagination, verification, and logging |
| 0:35–1:00 | Breakout: implement or extend the download script for your corpus |
| 1:00–1:15 | Debrief: edge cases, unexpected results, what would you do differently |

## Slide Outline

**Slide 1: What the Download Script Must Do**
- Paginate through search results to collect all item identifiers
- For each item, fetch metadata to identify available text files
- Download text files with retry and backoff on failures
- Skip already-downloaded files (resume support)
- Log all actions to a file for post-run review
- Verify file integrity (size, word count, non-ASCII ratio)
- These are not nice-to-haves — they're requirements for a script you'll run on 200+ items

**Slide 2: Live Code Walkthrough — Pagination**
- Show the advancedsearch.php endpoint with all parameters
- Walk through the response structure (numFound, docs array)
- Implement the page loop live: `while (collected < total)`
- Run it for a model figure — show the console output
- Ask the room: what does your figure's `numFound` look like? Did anyone get 0?

**Slide 3: Live Code Walkthrough — Download + Verification**
- Fetch item metadata, filter for DjVuTXT and Text formats
- Construct the download URL (`archive.org/download/{id}/{filename}`)
- Write to local file, then run size and content checks
- Show the `downloadWithBackoff` function — explain exponential backoff
- Run one item download live and show the integrity check output

**Slide 4: Resume Logic and Logging**
- The simplest resume pattern: `if (fs.existsSync(localPath)) { skip }`
- Why this works: idempotent downloads — running the script twice produces the same result
- Structured logging: every action to stdout AND a logfile
- The log file is your audit trail — keep it with the corpus
- Show what a log looks like after a 50-item run

**Slide 5: Rate Limiting — Being a Good API Citizen**
- Internet Archive has no published rate limit but will block aggressive scripts
- 1 second delay between items is polite; 500ms is the minimum
- If you see HTTP 503: slow down, don't retry immediately
- The exponential backoff pattern: 1s, 2s, 4s, 8s, 16s
- Consider: at 1 second per item, a 200-item corpus takes ~3 minutes. That's acceptable.

## Breakout Activity (25 min)
**Solo coding, facilitator available for troubleshooting**

Participants extend their prep task code into a full download script:
1. Add the file metadata fetch step (get available text files for each item) (10 min)
2. Add the download + integrity check step (10 min)
3. Add resume logic (check if file exists before downloading) (5 min)

Participants who finish early: add the structured logging step (write to `download.log`).

Share-back: each participant either shows a successful download of one item OR describes the specific error they hit and what they've tried.

## Debrief Questions
1. Did anyone's item metadata return no text files at all — only PDFs or images? How would you handle that in the script?
2. What was the most surprising part of the Internet Archive API response structure?
3. If you had to hand this script to the Builder on your team (someone who doesn't write code), what would you need to document about how to run it?

## Facilitator Notes
- The pagination loop is where most participants get tripped up — walk through the off-by-one logic carefully (page 1 through ceil(total/size))
- Some figures have items on Internet Archive that aren't in a named collection — the participant will need to modify their query (e.g., search by creator field instead of collection)
- The integrity verification step is often seen as optional — make the case that it's not: a 200-item download that silently includes 20 corrupt files is worse than a 180-item download with clean files
- Encourage participants to run the script for real during the breakout, not just read through it — hands-on debugging is the best learning here
