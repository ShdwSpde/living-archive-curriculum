# Unit 4: Text Quality & Preparation — Virtual Lesson
**Pathway:** Archive Developer
**Duration:** 75 min
**Materials:** Screen share for live coding, participants' quality audit script output from prep task, corpus files accessible

## Agenda
| Time | Activity |
|------|----------|
| 0:00–0:10 | Check-in: share your quality audit table — what did the flags reveal? |
| 0:10–0:35 | Presentation: chapter detection patterns + edge cases + quality audit architecture |
| 0:35–1:00 | Breakout: extend chapter detection for your corpus type |
| 1:00–1:15 | Debrief: regex edge cases and the limits of automated quality detection |

## Slide Outline

**Slide 1: What the Developer Owns in Quality Preparation**
- Chapter detection logic: the Advocate decides what counts as a chapter; the Developer implements it
- Quality audit script: automated statistics to surface files needing manual review
- The minimum-length filter: every chunk must carry enough content to be meaningful
- Pre-processing pass: optional, for corpora with systematic OCR errors
- These are code decisions with curatorial consequences — keep the Advocate in the loop

**Slide 2: Chapter Detection — Patterns and Anti-Patterns**
- Walk through the three corpus types: books, periodicals, speeches
- Live demo: test the book chapter regex against 5 real examples — show which pass and which false-positive
- The 5–60 character constraint on the title: why it helps and what it misses
- The uniqueness filter: real chapter names are unique; page headers repeat
- Show: `const seen = new Set()` pattern to filter duplicate chapter values

**Slide 3: Edge Cases That Break Regex Detection**
- Merged OCR columns: line-start anchors help but don't solve it
- Lowercase Roman numerals: extend the character class
- "CHAPTER THE THIRD Part 2 (cont'd)": OCR merged lines — show the symptom and the filter (max-length cap on chapter values)
- The single rule that catches the most false positives: if the same chapter value appears more than twice in a file, it's a page header, not a chapter
- Live test: implement the uniqueness filter on a real example

**Slide 4: The Quality Audit Script Architecture**
- Walk through the output table structure: per-file stats
- The three flag thresholds: non-ASCII > 2%, short-line ratio > 15%, chapter count > 40
- Why these thresholds are heuristics, not rules: a flag means "review this" not "exclude this"
- Em-dashes and curly quotes will trigger the non-ASCII flag — add a whitelist for common Unicode text characters
- Show the script's output from a real corpus with a mix of flagged and clean files

**Slide 5: Pre-processing — When to Write Cleanup Code**
- Pre-processing is warranted when a systematic OCR error pattern affects many files
- Most common patterns: "rn" → "m" substitution, "tbe" → "the", broken hyphenation at line ends
- Warning: pre-processing changes the source files — always work on copies, never originals
- The diminishing returns rule: if your regex substitution improves < 5% of chunks, it's probably not worth the maintenance burden
- When pre-processing is not worth it: unique, one-off errors that vary by file

## Breakout Activity (25 min)
**Solo coding**

Each participant works on chapter detection for their specific corpus type. Tasks:
1. Identify the chapter pattern(s) your corpus uses — look at 3–5 actual texts (5 min)
2. Write or modify the chapter detection regex to match your corpus type (10 min)
3. Test against 10 real chapter headings and 10 non-chapter lines — measure precision and recall (10 min)

Share-back: each participant shows their regex and one false positive they couldn't eliminate — group discusses potential fixes.

## Debrief Questions
1. Did anyone find a corpus type that the standard book/periodical/speech patterns don't cover? What did you build?
2. What was the hardest false positive to eliminate? What made it ambiguous?
3. At what point should you give up on regex chapter detection and accept null chapters for a difficult file?

## Facilitator Notes
- Regex testing is harder than it looks in a virtual environment — recommend participants use regex101.com to test patterns interactively before implementing in code
- The uniqueness filter (reject chapter values that appear more than N times in a document) is often the most impactful single addition to chapter detection — demo it clearly
- Some participants will want to use machine learning for chapter detection ("can't we just fine-tune a model to detect chapter headings?") — validate the instinct but redirect to the practical constraint: you're building on pre-1931 texts with non-standard formatting; a regex approach is more maintainable and explainable for this use case
- The pre-processing discussion often runs long — timebox it to 5 minutes; it's the least universally applicable topic in this unit
