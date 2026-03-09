# Unit 4: Text Quality & Preparation — In-Person Lesson
**Pathway:** Archive Developer
**Duration:** 75 min
**Room setup:** Developer workstations with Node.js, projector, whiteboard for regex drafting
**Materials:** Quality audit script starter code pre-loaded, corpus files from Unit 3 accessible, regex101.com accessible in browser

## Agenda
| Time | Activity |
|------|----------|
| 0:00–0:10 | Warm-up: quality audit numbers — what does your corpus look like statistically? |
| 0:10–0:30 | Facilitated presentation: live-build chapter detection + quality audit script |
| 0:30–1:00 | Workshop: write and test chapter detection for your corpus type |
| 1:00–1:15 | Gallery share: regex patterns and test results |

## Warm-Up Activity

**Quality audit numbers (10 min)**

Participants open their quality audit script output (from prep task, or run it now if needed). Each person reports three numbers aloud:
1. Number of files flagged for high non-ASCII ratio
2. Number of files flagged for high short-line ratio
3. Number of files flagged for high chapter count

Facilitator writes the totals on the whiteboard. Ask: What's the most common flag type in this room? For anyone whose numbers seem unexpectedly high or low — what might explain it?

Note: if multiple participants report high non-ASCII flags that turn out to be em-dashes and curly quotes, address the Unicode whitelist fix immediately — it'll come up again in the presentation.

## Facilitated Presentation

**Live-build chapter detection + quality audit script (20 min)**

**Part 1: Chapter detection from scratch (12 min)**

Start with a blank function on the projector:
```typescript
function detectChapter(line: string): string | null {
  // TODO
}
```

Walk through building it incrementally for books, then extending for each edge case:

1. Basic CHAPTER N pattern: `^CHAPTER\s+[IVXLCDM\d]+`
2. Add title capture: `^CHAPTER\s+[IVXLCDM\d]+\.?\s*[-—]?\s*(.{5,60})`
3. Add Roman numeral standalone headings: `^[IVXLCDM]+\.\s+[A-Z][A-Za-z\s]{5,60}$`
4. Add uniqueness filter: maintain a `seenChapters` Set, return null if the value was seen before

Test each addition against real examples from your corpus displayed on the projector. Show when a new case breaks the previous regex before adding the fix.

After building the book regex, show the periodical approach (extract from filename/date) and the short-text approach (return null if file < 5,000 tokens).

**Part 2: Quality audit script additions (8 min)**

Show the audit script's flag logic. Walk through adding the Unicode whitelist for em-dash and curly quotes to the non-ASCII check:

```typescript
const NON_PROSE_UNICODE = /[^\x00-\x7F\u2013\u2014\u2018\u2019\u201C\u201D]/g;
const nonAsciiRatio = (content.match(NON_PROSE_UNICODE) || []).length / content.length;
```

Show how adding this whitelist eliminates most false non-ASCII flags from well-typeset historical texts. The remaining high-non-ASCII files after this filter are genuinely problematic.

## Workshop Activity

**Write and test chapter detection for your corpus type (30 min)**

**Phase 1 (15 min): Pattern development on regex101.com**

Open regex101.com. Each participant:
1. Identifies 5 real chapter headings from their corpus texts (copy from source .txt files)
2. Identifies 5 non-chapter lines that should not be detected (page headers, mid-sentence text, short fragments)
3. Builds a regex that matches all 5 real headings and rejects all 5 non-chapter lines
4. Documents the pattern with a comment explaining each part

Phase 1 is done entirely in regex101.com — don't touch code yet.

**Phase 2 (10 min): Implementation and integration**

Implement the tested regex in the chapter detection function. Add the uniqueness filter. Run the chunk script in `--dry-run` mode on 3–5 files and check the chapter output.

**Phase 3 (5 min): False positive check**

Scan the chapter output for your test files. Look for any values that don't correspond to actual structural divisions in the text. If false positives remain, note them — they'll drive the debrief discussion.

## Synthesis / Gallery Share

**Regex patterns and test results (15 min)**

Each participant shares:
1. Their regex pattern (paste on whiteboard or project it)
2. Precision and recall on their 10-line test set
3. One false positive they couldn't eliminate

Group discussion: Are there patterns in the false positives? (Often: they cluster around a specific OCR artifact or text format that the group can solve together.) Is anyone using the same pattern as someone else — and if so, are they getting different results? Why?

Facilitator closes by naming the tradeoffs explicitly: a regex that achieves high precision (few false chapters) often sacrifices recall (misses some real chapters). For this application, precision is more important — a missed chapter just means the chunk gets a null chapter; a false chapter creates a misleading sidebar entry.

## Facilitator Notes
- regex101.com is significantly better for iterative regex development than embedding regexes directly in code and re-running; strongly encourage participants to use it for Phase 1
- Some participants will build a regex that works perfectly for their test set but fails on files they haven't tested — encourage testing on a diverse sample, not just obvious examples
- The uniqueness filter is the single most effective addition and often surprises participants with how many false positives it eliminates — demo it early so participants can apply it
- If time runs short, compress Phase 3 of the workshop; the false positive check is valuable but can be done independently after the session
