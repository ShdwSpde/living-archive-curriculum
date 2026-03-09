# Unit 7: Metadata & Organization — In-Person Lesson
**Pathway:** Archive Advocate
**Duration:** 75 min
**Room setup:** Tables for pairs, projector for live archive demo, wall space for posting metadata cards
**Materials:** Blank index cards (for writing metadata entries), the 4-criterion rubric handout, live archive accessible on participant devices

## Agenda
| Time | Activity |
|------|----------|
| 0:00–0:10 | Warm-up: "citation check" — rate a real citation from the live archive |
| 0:10–0:30 | Facilitated presentation: metadata architecture + description standards |
| 0:30–1:00 | Workshop: write, review, and revise metadata entries |
| 1:00–1:15 | Gallery share: metadata cards on the wall |

## Warm-Up Activity

**Citation check (10 min)**

Facilitator projects 4 example citations from a live archive — one at each trust level from the async reading:
1. "The Souls of Black Folk (1903), Of the Dawn of Freedom — a passage about..."
2. "The Souls of Black Folk — (no chapter)"
3. "dubois-souls-of-black-folk-1903.txt"
4. "sim_crisis_1915-01_5_1_djvu.txt — chapter: LIBRARY OF CONGRESS"

Participants rate each citation on a 1–4 trust scale (1=would not use, 4=would cite in scholarship). Round the room: what score did you give #3? Why?

The discussion usually reveals that most participants instinctively accept level 2 citations without noting the quality gap to level 1. This motivates the session's focus on what separates level 2 from level 1.

## Facilitated Presentation

**Metadata architecture + description standards (20 min)**

**Part 1: Two layers, two purposes (7 min)**

Draw a diagram on the whiteboard showing the two metadata layers:
- Database layer: the `source_title` string and `chapter` string stored in each chunk row — functional, consistent, used for grouping and citation
- Application layer: the `worksMetadata.ts` file — the curatorial record, with display title, description, year, URL, category

Show on the live archive: open the sidebar. Each entry in the sidebar corresponds to one entry in `worksMetadata.ts`. Open a citation from a query response — the source_title matches a key in `worksMetadata.ts`. The display pulls from `worksMetadata.ts`; the citation source comes from the database field.

The practical implication: if you rename a work in `worksMetadata.ts` but don't update the `source_title` in the database (via the TITLE_MAP), the sidebar entry and the citation will diverge. The Builder handles the synchronization; the Advocate specifies what both should say.

**Part 2: What makes a description good (7 min)**

Live exercise on the projector: show an example description and evaluate it against the three components:
- What is it: "Du Bois's 1903 collection of essays..."
- Why it matters: "...establishing the concept of double consciousness and the psychological impact of racism..."
- Coverage note: "...includes the complete original 1903 text."

Then show a bad description: "Essays by W.E.B. Du Bois about race." Ask: what's missing? (Year, significance, coverage, specificity.) What's wrong with it? (Too vague to help a user decide if this source is relevant to their question.)

**Part 3: Curatorial framing as intellectual responsibility (6 min)**

This is the part of the session that goes beyond "how to write metadata" to "why it matters." A description is always an interpretation. Phrases like "foundational work" or "controversial argument" or "response to Booker T. Washington" frame the reader's understanding before they've read a word.

Challenge the room: what would it mean to write a description that lets the text speak for itself? Is that even possible? The point is not to eliminate interpretation but to be intentional about it — and to review descriptions with subject-matter scholars before they go live.

## Workshop Activity

**Write, review, and revise metadata entries (30 min)**

**Phase 1 (10 min): Write on index cards**

Each participant writes 3 metadata entries on index cards (one work per card):
- Front: display title, year, category
- Back: 2–3 sentence description + source URL

Work from memory and prior research. Don't look up descriptions — write from your knowledge of the figure's work. You'll revise after peer review.

**Phase 2 (15 min): Peer review in pairs**

Exchange cards with a partner. Review each card against the 4-criterion rubric:
1. Title: display-ready, not a filename or raw identifier
2. Description: has all three components (what/why/coverage)
3. Description: centers the figure's voice, not an external scholarly verdict
4. Year and URL: complete and plausible (not just "TBD")

Write specific improvement notes on a sticky note for each card. Return cards. Read feedback. Revise your 2 weakest cards.

**Phase 3 (5 min): Post revised cards**

Post all revised cards on the wall, organized by work type: books / periodicals / essays & speeches.

## Synthesis / Gallery Share

**Metadata cards on the wall (15 min)**

5-minute silent gallery walk. Participants use stickers: green dot (good example), yellow dot (description needs revision), red dot (title issue). Each person places one sticker per card they read.

10-minute discussion, led by the patterns in the dots:
- Which cards got green dots across the board? What made them strong?
- Which descriptions most consistently got yellow dots? What pattern do they share?
- Did any card get a red dot that surprised the author? What was the disconnect?

## Facilitator Notes
- The index card format works better than screens for this activity — it slows participants down and makes the writing feel more deliberate
- The "centering the figure's voice" criterion is the one most participants struggle with — bring 2–3 concrete examples of what a description-from-the-outside vs. description-from-the-inside sounds like before the workshop phase
- Participants whose figures are less familiar to them will write thinner descriptions — this is useful data about where their research needs to go before launch
- The sticker gallery walk generates honest feedback more efficiently than verbal critique — the anonymity of dot placement lets participants respond honestly
