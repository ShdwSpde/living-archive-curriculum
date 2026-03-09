# Unit 9: Pitfalls & Quality Control — In-Person Lesson
**Pathway:** Archive Advocate
**Duration:** 75 min
**Room setup:** Tables for groups of 4, projector for live archive testing, whiteboard for quality mapping
**Materials:** Printed quality audit template (one per person), live archive accessible on participant devices, sticky notes in three colors (green/yellow/red for quality ratings)

## Agenda
| Time | Activity |
|------|----------|
| 0:00–0:10 | Warm-up: "spot the failure" — evaluate 3 prepared responses |
| 0:10–0:30 | Facilitated presentation: quality failure taxonomy + audit process |
| 0:30–1:00 | Workshop: collaborative quality audit |
| 1:00–1:15 | Gallery share: audit results and recommendations |

## Warm-Up Activity

**Spot the failure — evaluate 3 prepared responses (10 min)**

Facilitator projects 3 prepared responses to archive queries on the screen. Each response has been pre-selected to illustrate a different failure mode:
- Response 1: a factually correct response that cites an irrelevant passage (wrong citation)
- Response 2: a response that accurately cites passages but overclaims beyond what the sources say (bad answer — hallucination)
- Response 3: a response that is accurate for one phrasing of a question but would be completely different for an alternate phrasing (inconsistency — demonstrated by showing both)

For each response, participants vote: "Is this a quality problem?" and "What type?" Quick round of answers before the facilitator reveals the classification.

This establishes shared vocabulary (bad answer / wrong citation / inconsistency) before the presentation.

## Facilitated Presentation

**Quality failure taxonomy + audit process (20 min)**

**Part 1: The three failure modes in depth (8 min)**

Walk through each failure mode with the prepared examples from the warm-up as the anchor. For each:
- What it looks like to a user: describe the experience from a user's perspective (not a technical description)
- What causes it: the underlying technical issue (OCR noise / threshold too low / overclaiming model)
- What the Advocate can do: how to document it, what to communicate to the technical team
- What the developer will investigate: what technical diagnosis follows from the Advocate's report

Emphasize: the Advocate's documentation of the failure mode (with evidence and hypothesis) is what makes the developer's diagnosis possible. Without the Advocate's domain knowledge, the developer can see that something went wrong but can't always tell what.

**Part 2: The stakeholder communication matrix (5 min)**

Draw a 2x2 matrix: axis 1 = internal team / external stakeholder; axis 2 = before launch / after quality problem discovered. Fill in what the right communication looks like in each quadrant:
- Internal before launch: quality baseline, known gaps, threshold settings
- External before launch: what the archive covers, how to use it, its limitations
- Internal after problem: specific documentation, reproducible case, hypothesis
- External after problem: acknowledgment, investigation timeline, what will be fixed

The communication style varies significantly by audience and timing. The Advocate needs to be fluent in all four.

**Part 3: The quality audit structure (7 min)**

Walk through building the 20-question test set. Show a completed example with quality ratings and the aggregate quality distribution. Explain: the value of the audit increases with each iteration — the first audit establishes a baseline; subsequent audits measure trend.

The minimum viable audit: 20 questions, quarterly, with a one-page report. A well-resourced archive might do monthly audits with 40+ questions and a more formal report structure.

## Workshop Activity

**Collaborative quality audit (30 min)**

Groups of 4 conduct a complete quality audit using the printed template.

**Phase 1 (5 min): Build the 20-question set**
Each person contributes 5 questions to the group's test set. Ensure coverage of: well-covered topics, thin-coverage topics, factual questions, comparative questions, expert-test questions (at least one per group where someone has genuine domain expertise).

**Phase 2 (15 min): Run and rate**
Divide the 20 questions: each person runs their 5 questions on the live archive and rates each response (green sticker = strong, yellow = acceptable, red = poor). Write one sentence for each poor response describing the failure mode.

**Phase 3 (10 min): Compile and draft**
As a group, compile the results in the template: count the greens/yellows/reds, list the poor responses with their failure modes, write one recommendation for the technical team. Produce a 3-sentence quality audit summary paragraph.

## Synthesis / Gallery Share

**Audit results and recommendations (15 min)**

Each group shares:
1. Their quality distribution: X% strong, Y% acceptable, Z% poor
2. Their most important recommendation to the technical team (one sentence)
3. The most surprising poor response they found

Facilitator writes all quality distributions on the whiteboard. Compare across groups: is quality consistent across different topics and query types, or are there systematic gaps?

Discussion: if all groups have the same quality distribution, what does that tell you about the archive's overall quality level? If quality varies widely by group, what drives the variation? (Usually: groups that tested thin-coverage topics have lower quality percentages than groups that tested well-covered topics.)

## Facilitator Notes
- The "spot the failure" warm-up requires prepared examples — spend time before the session selecting examples that clearly illustrate each failure mode, ideally from the archive you're teaching
- The stakeholder communication matrix is often new thinking for Advocates — they've thought about quality in terms of fixing it, not communicating it; the matrix helps them see communication as a skill to develop
- Some groups will finish the audit quickly and have remaining time — direct them to draft a second audit paragraph focused on one specific failure pattern (not just the aggregate distribution)
- The gallery share quality distribution comparison is the session's most analytically interesting moment — coach participants to interpret the variation rather than just report it
