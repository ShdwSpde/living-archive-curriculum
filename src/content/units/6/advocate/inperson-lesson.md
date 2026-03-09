# Unit 6: Database Design — In-Person Lesson
**Pathway:** Archive Advocate
**Duration:** 75 min
**Room setup:** Tables for groups of 3–4, projector for live Supabase demo, whiteboard for similarity score visualization
**Materials:** Printed vendor portability checklist (one per person), live archive access on participant devices, sticky notes

## Agenda
| Time | Activity |
|------|----------|
| 0:00–0:10 | Warm-up: "what's in the database?" — explore the Supabase table editor |
| 0:10–0:30 | Facilitated presentation: what a vector database is + what you own |
| 0:30–1:00 | Workshop: vendor assessment + stakeholder communication |
| 1:00–1:15 | Gallery share: stakeholder briefings |

## Warm-Up Activity

**"What's in the database?" (10 min)**

Participants open the Supabase dashboard and navigate to the `document_chunks` table. Each person reads one actual row: title, chapter, content (first 100 characters), and notes what the `embedding` column looks like.

Questions to the room:
- What does one row represent? (One passage from the corpus)
- How many rows are in the table? (Run `SELECT COUNT(*) FROM document_chunks` in the SQL editor)
- What does the embedding column contain? (768 numbers — show a raw row to make this concrete)
- Can you export all of this? (Yes — show the Export button)

This ground-level exploration establishes that the database is a real, inspectable, exportable artifact — not a black box.

## Facilitated Presentation

**What a vector database is + what you own (20 min)**

**Part 1: Semantic library vs. card catalog (7 min)**

Draw on the whiteboard: two approaches to finding information.

Left: card catalog. User thinks of a keyword, searches the catalog, gets back items containing that keyword. The user must do all the interpretive work.

Right: vector database. User asks a question in natural language. The system finds passages whose meaning is nearest to the question's meaning. The system has "pre-read" the collection.

The practical difference: a user asking "what did Du Bois believe about the responsibilities of Black intellectuals" will get much better results from the vector database than from a keyword search, because the relevant passages may not use the word "responsibilities" or "intellectuals" at all.

Demonstrate live on the archive: type that exact question and show the results. Note the similarity scores.

**Part 2: What you own (7 min)**

Walk through each element of the database and clarify ownership:
- The text passages: public domain, your institution is the steward
- The vectors: derived from your corpus by running it through a model you chose — yours
- The metadata (titles, chapter names, source URLs): your curatorial decisions, stored as data — yours
- The schema (table structure, column names): designed by your development team — yours
- The infrastructure (servers, software): rented from Supabase — not yours, but fully exportable

The key message: everything that makes this archive *this archive* — the specific corpus, the specific quality standards, the specific metadata — is owned by your institution and fully portable.

**Part 3: The portability checklist (6 min)**

Hand out the printed checklist. Walk through it item by item, confirming each criterion for Supabase using either the documentation or the dashboard. Emphasize: this is the document you bring to IT governance or a library director when they ask "what happens to our data?"

## Workshop Activity

**Vendor assessment + stakeholder communication (30 min)**

**Phase 1 (15 min): Complete the portability checklist**

Each participant completes the vendor assessment checklist for Supabase using the dashboard and documentation. For the two criteria they can't verify in the dashboard (ToS language on ownership, deletion policy), they note the specific question to research after the session.

Produce a completed checklist that could be attached to a project proposal or IT governance submission.

**Phase 2 (15 min): Stakeholder briefing draft**

Choose a real stakeholder at your institution — someone you will actually need to brief about the archive. Write a one-page briefing document:
- What the database stores and how it's different from a library catalog (2–3 sentences)
- Who owns the data and how to access/export it (2–3 sentences)
- What the database costs and what happens if the vendor changes (2–3 sentences)
- One question this stakeholder is likely to ask — and your answer

The briefing should be written for the specific stakeholder (use their vocabulary, address their likely concerns).

## Synthesis / Gallery Share

**Stakeholder briefings (15 min)**

Each participant reads their briefing aloud — or summarizes it in 60 seconds. After each, one other participant responds in character as the stakeholder: "My first question would be..." or "That addresses my concern about..."

Facilitator notes: which briefings led to follow-up questions (good — means the content prompted engagement) and which were received without questions (consider whether they were too brief or too vague).

Close by naming: the completed portability checklist and the stakeholder briefing are real deliverables. If participants keep them current throughout the project, they'll have the documentation ready when their institution's IT governance process begins.

## Facilitator Notes
- The Supabase dashboard is intuitive but some participants will need help finding the SQL editor and running a query — walk through this explicitly in the warm-up
- The "what you own" discussion occasionally generates anxiety about the embedding model: "doesn't Google own the vectors because they ran through Google's model?" — clarify that the model produces a transformation of your text; the result belongs to you, not to Google
- Some participants will try to read the full Supabase ToS during the workshop — redirect them to the specific sections (data ownership, export, deletion) rather than reading the whole document
- The stakeholder briefing exercise works best when participants choose a real person they know rather than an abstract role — the specificity of "my provost" vs. "a university administrator" produces much better writing
