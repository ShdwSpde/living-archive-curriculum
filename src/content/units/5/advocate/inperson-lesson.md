# Unit 5: Embedding & AI — In-Person Lesson
**Pathway:** Archive Advocate
**Duration:** 75 min
**Room setup:** Tables for groups of 3–4, projector for live archive demo, whiteboard for mapping test results
**Materials:** Printed "What is an Embedding?" one-page explainer (one per person), live archive accessible on projector and participant devices, sticky notes for mapping exercise

## Agenda
| Time | Activity |
|------|----------|
| 0:00–0:10 | Warm-up: "Two Questions, Same Topic" — explore the archive live |
| 0:10–0:30 | Facilitated presentation: embedding concepts + evaluating retrieval quality |
| 0:30–1:00 | Workshop: structured archive evaluation + stakeholder communication exercise |
| 1:00–1:15 | Gallery share: evaluation findings and communication drafts |

## Warm-Up Activity

**Two Questions, Same Topic (10 min)**

Before any presentation, participants open the live archive on their devices. Facilitator gives a prompt: "Ask the archive one question about [your figure]'s views on something important. Now ask the same question using completely different words."

Each participant writes down both questions and the key difference between the two responses (if any). Share at tables: did the different wording change the response? How much?

This grounds the entire session in something concrete the participants experienced themselves, before the presentation explains why it works the way it does.

## Facilitated Presentation

**Embedding concepts + evaluating retrieval quality (20 min)**

**Part 1: The city map metaphor (7 min)**

Use the printed explainer as a reference. Present the core concept: every text passage gets converted to a location in a vast space. Similar meaning = nearby location. Your question gets a location too, and the archive finds the nearest passages.

Draw a simplified 2D version on the whiteboard: place 4–5 topic clusters (education, labor, race, religion, Africa) and show how a question lands near the relevant cluster. Emphasize: this is a dramatic simplification — the actual space has 768 dimensions — but the principle is the same.

Ask: "What would happen if a passage had very garbled OCR — would it land near the right cluster?" (Answer: it might not — garbled text produces an embedding that doesn't reliably capture the passage's meaning.)

**Part 2: What affects retrieval quality (6 min)**

Four factors, in order of the Advocate's influence over them:
1. **Corpus quality** (OCR quality — the Advocate controls this through the curatorial process)
2. **Corpus coverage** (what's in the archive — the Advocate controls this through text selection)
3. **Query formulation** (how users ask questions — the Advocate influences this through user documentation)
4. **Similarity threshold** (a technical parameter — the Advocate doesn't set this directly, but communicates needs to the developer)

The key message: the Advocate has more influence over retrieval quality than they might think — through curation decisions, not code.

**Part 3: Communicating about AI to stakeholders (7 min)**

Walk through the honest description of what the archive does: semantic search powered by embedding + language model response generation grounded in the corpus. Show three ways to describe this:
- **To a funder:** "Uses AI to help researchers find and explore [figure]'s writings through natural language questions"
- **To a faculty partner:** "Semantic search over the corpus, with Claude generating responses that synthesize relevant passages"
- **To a student user:** "You ask a question, the archive finds related passages from [figure]'s writings, and summarizes what they say"

Each is accurate. Each is calibrated to the audience.

## Workshop Activity

**Structured archive evaluation + stakeholder communication (30 min)**

**Phase 1 (15 min): Structured consistency test**

Using the three-phrasings method: each person chooses one topic and formulates three questions (original language, modern paraphrase, different framing). Ask all three on the live archive. Record:
- The three questions (exact wording)
- The top 2 citations for each response
- Whether the citations overlap across all three

Produce a mini-report: one page, three questions, citation comparison, one-sentence verdict on consistency.

**Phase 2 (15 min): Stakeholder communication draft**

Choose one audience type your institution regularly communicates with about digital projects (faculty, librarians, community partners, funders, press, students). Write a two-paragraph description of the archive's AI component for that audience:
- Paragraph 1: what the technology does, in plain language appropriate for that audience
- Paragraph 2: what limitations users should know about

Groups share and give feedback: Is it accurate? Is it appropriate for the stated audience? Does it over- or under-claim?

## Synthesis / Gallery Share

**Evaluation findings and communication drafts (15 min)**

Quick round: each person reports one finding from their consistency test — either "it was consistent and here's what that looked like" or "it was inconsistent and here's what I think caused it."

Post all stakeholder communication drafts on the wall. Gallery walk for 5 minutes. Discussion: which drafts are strongest? What makes the difference between a good explanation and a vague one?

## Facilitator Notes
- The warm-up works best if participants have already used the archive at least once before this session — if they haven't, budget extra time for the first question to orient them
- Some participants will want to debate whether "AI" is the right word for what the archive does — this is a legitimate and interesting conversation, but time-box it; the communication exercise is more valuable
- The stakeholder communication drafts almost always reveal different assumptions about audience knowledge level — surfacing and discussing those differences is productive
- If live archive access fails, have 3–4 screenshots prepared showing example query responses with citations — you can run the consistency test discussion from screenshots if needed
