# Unit 6: Database Design — Virtual Lesson
**Pathway:** Archive Advocate
**Duration:** 75 min
**Materials:** Slides, Supabase dashboard access, vendor comparison checklist template

## Agenda
| Time | Activity |
|------|----------|
| 0:00–0:10 | Check-in: what did you find in the Supabase ToS? |
| 0:10–0:35 | Presentation: vector database concepts + institutional ownership |
| 0:35–1:00 | Breakout: vendor assessment + stakeholder presentation prep |
| 1:00–1:15 | Debrief: how would you present this to leadership? |

## Slide Outline

**Slide 1: The Reference Librarian Analogy**
- Card catalog: tells you what exists and where; you interpret meaning yourself
- Vector database: has "pre-read" everything; can find relevant passages based on meaning
- Not magic — the "reading" was done by a machine learning model trained on billions of sentences
- The consequence: it finds relevant things you didn't know to search for (serendipitous discovery)
- The limitation: it sometimes finds things that seem relevant but aren't (false positives)

**Slide 2: Similarity Scores Demystified**
- What 0.0 means vs. 0.7 vs. 0.9
- Live demo: run a query on the Du Bois archive and show the similarity scores in the response
- The archive's default threshold: passages below 0.7 are not shown to users
- Why higher threshold isn't always better: very high thresholds miss genuinely relevant passages that are expressed differently
- Why lower threshold isn't better: too many loosely related passages that confuse users

**Slide 3: Institutional Ownership — What You Own**
- You own: the text (public domain), the vectors (derived from your corpus), the metadata labels
- The vendor provides: infrastructure, not ownership
- How to verify: check the ToS data ownership section
- The interpretive frame: chunking decisions, title mapping, quality standards — these are yours, not the technology's
- Portability: a full export of your database contains everything needed to rebuild on another platform

**Slide 4: The Vendor Portability Checklist**
- Walk through the 6-criterion table from the async reading
- Run it live for Supabase: confirm each criterion with specific evidence from the Supabase docs/ToS
- Show the export function in the Supabase dashboard
- Show that the exported data is standard CSV — readable in any spreadsheet, importable to any database
- The governance takeaway: you can prove to IT leadership that this is not vendor lock-in

**Slide 5: Communicating About "The Database" to Stakeholders**
- What a library director needs to know: who owns the data, can we export it, what does it cost at scale
- What a faculty committee needs to know: how is it different from existing library databases, what questions can it answer that those can't
- What a funder needs to know: the infrastructure is stable, the data is portable, the project can survive vendor changes
- The framing that works: "a research database your institution fully owns and controls"

## Breakout Activity (25 min)
**Groups of 3–4 by institutional type (library, museum, community organization, university)**

Each group prepares a 5-minute "database briefing" for a specific stakeholder:
1. Who is your stakeholder? What do they care most about? (3 min)
2. What are the two most important things they need to know about the database? (5 min)
3. What question are they most likely to ask — and what's your answer? (7 min)
4. Draft the 2-minute verbal explanation you'd give them (10 min)

Groups come back with: the stakeholder type, the 2 key points, the anticipated question + answer, and a practiced 2-minute explanation.

## Debrief Questions
1. What was the hardest thing to explain to your stakeholder type? What made it hard?
2. If a stakeholder asked "what's the difference between this and a regular search engine?" — how would you answer in 30 seconds?
3. Is there any database design decision (vendor choice, schema, thresholds) that you'd want input on as the institutional advocate — and how would you make sure you get it?

## Facilitator Notes
- The "reference librarian" analogy is the most effective metaphor for most library and museum stakeholders — use it consistently
- The ToS review exercise from the prep task often produces interesting findings: some participants find the relevant clause easily, others struggle to locate it — this variation is instructive about how institutional legal review works
- Some participants will ask whether the archive could be built on open-source infrastructure with no external vendor — validate this as a genuine option (self-hosted Postgres + pgvector on a university server) and note it requires more technical maintenance; useful for IT-savvy institutions
- The breakout works best when groups are genuinely from different institutional contexts — if all participants work at similar institutions, give them different hypothetical stakeholder roles
