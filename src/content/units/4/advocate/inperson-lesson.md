# Unit 4: Text Quality & Preparation — In-Person Lesson
**Pathway:** Archive Advocate
**Duration:** 75 min
**Room setup:** Tables for groups of 3–4, projector, whiteboard, wall space for posting tiered decision lists
**Materials:** Printed quality audit template, printed examples of quality 1/2/3 text (3 pages each), colored stickers (red/yellow/green) for visual tiering exercise, large paper for tier lists

## Agenda
| Time | Activity |
|------|----------|
| 0:00–0:10 | Warm-up: read a passage and rate it |
| 0:10–0:30 | Facilitated presentation: quality framework + remediation scoping |
| 0:30–1:00 | Workshop: tiered decision-making for your corpus |
| 1:00–1:15 | Gallery share: tier lists on the wall |

## Warm-Up Activity

**Read a passage and rate it (10 min)**

Each table has three printed passages — one at each quality level — face-down. Participants don't know the quality levels yet. Each person reads all three passages silently for 2 minutes, then the group ranks them 1st/2nd/3rd (best to worst quality) without discussion. Then groups share their rankings aloud. Facilitator reveals the actual quality levels.

Key questions to prompt after reveal:
- Did everyone agree on which was worst?
- What specific features of the text signaled quality to you?
- Did anyone rate a quality-2 passage lower than a quality-1 passage? Why?

The goal is to ground everyone's intuition in concrete textual features, not abstract ratings.

## Facilitated Presentation

**Quality framework + remediation scoping (20 min)**

**Part 1: Why quality is a curatorial decision (7 min)**

Lay out the core argument directly: the archive cannot tell good OCR from bad. When it retrieves a response, it draws from everything in the corpus with equal confidence. The Advocate sets the quality floor; everything else in the system operates above or below it.

Three claims to make explicitly:
1. Including quality-1 texts doesn't just fail to help — it actively harms the archive's precision
2. A smaller, clean corpus outperforms a larger, noisy corpus for most query types
3. Remediation is a legitimate budget item — not just "cleaning up files" but curatorial investment with measurable impact on archive quality

**Part 2: The four-tier framework (7 min)**

Introduce the tiers with concrete examples from real corpus files (or prepared examples):
- Tier 1: Include as-is — clean text, important primary source
- Tier 2: Include with minor cleanup — readable but specific fixable problems (consistently misread character, broken paragraph breaks)
- Tier 3: Remediation or alternative — quality 1 but this is the only surviving source for a significant topic in the figure's thought
- Tier 4: Exclude — quality 1, not unique, covered by other texts in the corpus

Walk through two real decisions using a prepared example: one easy case (clearly Tier 4) and one genuinely hard case (a quality-1 text on a unique topic). The hard case is the point — show the reasoning process, not just the conclusion.

**Part 3: Scoping remediation for your institution (6 min)**

Practical framing: remediation is either a budget item or a volunteer commitment, and both have limits. Name the three remediation approaches:
- Minor OCR cleanup: fix character-level errors with find/replace or light scripting — 30 min per text, feasible in-house
- Full OCR re-run: use Tesseract on a fresh scan — 2–4 hours per text, requires technical support
- Manual transcription: the ultimate quality guarantee — days per text, typically only for the most historically significant materials

Help participants think about their institution's realistic capacity for each. A library with a digitization program may be able to do OCR re-runs; a community organization probably isn't. Be honest about this when scoping.

## Workshop Activity

**Tiered decision-making for your corpus (30 min)**

Each participant works on their own quality audit data (from prep task or from today's audit session for those who didn't complete it). Using the printed template and the colored stickers (green = Tier 1, yellow = Tier 2, orange = Tier 3, red = Tier 4):

**Phase 1 (10 min):** Apply tier labels to your audited texts. Don't agonize — make a quick judgment and move on. You can revise.

**Phase 2 (10 min):** For every orange (Tier 3) text: write down (a) what makes it irreplaceable, (b) what remediation approach is realistic for your institution, (c) who would own the remediation work.

**Phase 3 (10 min):** Write a draft quality standards statement for your archive: "All texts in [figure]'s archive will meet the following standard: ___." This statement should be concrete enough that a developer could implement it and a funder could evaluate it.

Groups can share and discuss decisions during Phase 1 but each participant produces their own tier list.

## Synthesis / Gallery Share

**Tier lists on the wall (15 min)**

Post all tier lists on the wall. 5-minute silent gallery walk: read the Tier 3 and Tier 4 decisions on other people's lists. Note any text that multiple people listed as Tier 3.

10-minute discussion:
- Are there any texts where participants' tier assignments diverged significantly? What drove the divergence?
- Did anyone have to make a "Tier 3 vs. Tier 4" decision for a text that they personally found historically compelling? How did they resolve the conflict between curatorial standards and personal interest?
- What does your quality standards statement assume about your technical team's capabilities?

## Facilitator Notes
- The Tier 3 vs. Tier 4 decision is genuinely hard, and it's okay to say so — it requires judgment that comes with experience and domain knowledge about the figure's scholarship
- Participants sometimes want to add a "Tier 5" (include but with a quality disclaimer shown to users) — this is a valid approach and worth acknowledging; it requires frontend support but is architecturally possible
- The quality standards statement exercise almost always produces statements that are too vague on first attempt ("include texts that are readable and make sense") — push for specificity: "quality 2 or above, where quality 2 means readable with errors at the word/character level but coherent at the sentence and paragraph level"
- Bring extra copies of the quality rating example passages — participants often want to refer back to them during the workshop
