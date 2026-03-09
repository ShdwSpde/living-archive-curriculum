# Unit 5: Embedding & AI — Virtual Lesson
**Pathway:** Archive Advocate
**Duration:** 75 min
**Materials:** Live archive access, slides, shared notes doc for consistency test results

## Agenda
| Time | Activity |
|------|----------|
| 0:00–0:10 | Check-in: share your consistency test results from the prep task |
| 0:10–0:35 | Presentation: what embeddings are + how to evaluate retrieval quality |
| 0:35–1:00 | Breakout: live archive evaluation — structured consistency testing |
| 1:00–1:15 | Debrief: what did you find? what does it tell you about the corpus? |

## Slide Outline

**Slide 1: Two Ways to Find Information**
- Keyword search: find passages that contain these specific words
- Semantic search: find passages whose meaning is near this question's meaning
- The advantage: semantic search finds relevant content even with no word overlap
- The limitation: semantic search finds content that seems relevant but may be tangentially related
- Both are useful; the archive uses semantic search

**Slide 2: The Embedding Metaphor**
- Each text passage gets converted to a location in a 768-dimensional space
- Passages with similar meaning end up near each other, regardless of word choice
- Your question gets converted to a location in the same space
- The archive finds the passages nearest to your question's location
- You don't need to understand the math — you need to understand what it enables and what it can't do

**Slide 3: What Affects Retrieval Quality**
- Input text quality (OCR quality is a ceiling, not a floor)
- Query formulation (specific, interpretive queries outperform vague or keyword queries)
- Corpus coverage (the archive can only find what's in it)
- The similarity threshold (how close is "close enough" to count as relevant)
- The Advocate's influence: corpus quality decisions directly affect retrieval quality

**Slide 4: The Consistency Test**
- Walk through the three-phrasings method: original language, modern paraphrase, different framing
- Show a live demo: ask one question three ways on the Du Bois archive
- What consistent results look like: overlapping citations, complementary responses
- What inconsistent results look like: different citations, contradictory claims, irrelevant passages surfaced
- Inconsistency is a diagnostic: it points to corpus coverage gaps or quality problems

**Slide 5: What to Tell Stakeholders About "AI"**
- The archive uses AI for two things: understanding the meaning of text (embedding) and generating responses (language model)
- What it doesn't do: make things up from outside the corpus (it's grounded in your texts)
- What it can't guarantee: perfect accuracy or exhaustive coverage
- The honest framing: "a research tool that helps users explore a historical figure's writings"
- Avoid both overclaiming ("AI that knows everything Du Bois wrote") and underclaiming ("just a search engine")

## Breakout Activity (25 min)
**Pairs**

Each pair runs a structured consistency test on the live archive:
1. Choose one topic central to your figure's work (5 min)
2. Formulate three questions about that topic using: original language / modern paraphrase / different framing (5 min)
3. Ask all three questions and record the responses — note the citations for each (10 min)
4. Evaluate: are the responses consistent? Do they cite the same passages? Are any responses clearly wrong or irrelevant? (5 min)

Pairs come back with: the three questions, a summary of each response, and a one-sentence evaluation of consistency.

## Debrief Questions
1. Did any pair find a formulation that got significantly better or worse results than the others? What was different about it?
2. If the archive gave inconsistent responses across your three phrasings, what are the possible causes? (List at least 3.)
3. What is one question you'd want to ask the archive that you're skeptical it would answer well — and why?

## Facilitator Notes
- Live archive access is required for this session — test it before the session starts; have a fallback plan (screenshots of example responses) if access is unreliable
- Some participants will ask long, multi-part questions rather than focused single-topic questions — coach them toward specificity for the test to be meaningful
- The debrief should focus on what inconsistency tells you about the corpus, not just that inconsistency is bad — participants who understand the diagnosis can advocate for specific improvements
- If participants run out of topics, provide a prepared list: Du Bois on self-determination, Du Bois on education, Du Bois on Black women, Du Bois on Africa, Du Bois on labor and capitalism
