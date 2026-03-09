# Unit 8: RAG Query Pipeline — Virtual Lesson
**Pathway:** Archive Advocate
**Duration:** 75 min
**Materials:** Live archive access, slides, shared query log template

## Agenda
| Time | Activity |
|------|----------|
| 0:00–0:10 | Check-in: share your most interesting finding from the 10-query test |
| 0:10–0:35 | Presentation: query types + evaluation framework + usage guidelines |
| 0:35–1:00 | Breakout: structured query testing + usage guidelines draft |
| 1:00–1:15 | Debrief: patterns in the data, recommendations for the technical team |

## Slide Outline

**Slide 1: The Four Query Types — What Works and What Doesn't**
- Specific + interpretive: the sweet spot for living archives
- Comparative: powerful and underused
- Factual: the archive is not faster than Wikipedia for this
- Vague: returns results, but unhelpfully broad
- Show the query quality spectrum with real examples from the Du Bois archive

**Slide 2: The Citation Check**
- Every response should cite specific works
- How to verify: find the cited passage in the original text; does it say what the response claims?
- The two failure modes: overclaiming (response says more than the source) and underclaiming (response misses the point of the source)
- The practical test: could you append this response to your research notes and cite it in good conscience?

**Slide 3: The Rephrasing Test**
- Same question, different words, three times
- What to look for: overlapping citations, similar main claims, complementary details
- What inconsistency looks like: completely different claims and citations across phrasings
- What inconsistency tells you: corpus coverage gap (topic not well-represented) OR retrieval issue (technical problem)
- The diagnostic: is it the same problem on all three phrasings, or do some work and others don't?

**Slide 4: Writing Usage Guidelines**
- Walk through the six-section framework: what it's for, what works best, how to evaluate, coverage note, how to improve results, limitations statement
- Live demo: open the Du Bois archive About page — show the existing usage guidance
- Critique it together: what's clear? what's missing? what's too technical?
- The design principle: guidelines should prevent the most common misuses, not cover every edge case

**Slide 5: Communicating Quality to Your Team**
- The Advocate communicates quality issues in terms of user experience, not code
- "The archive frequently returns irrelevant passages for broad questions" → the developer investigates threshold
- "Responses about X consistently cite Y instead of the more relevant Z" → possible corpus coverage gap
- "The response to this specific question is factually wrong" → overclaiming, needs prompt engineering
- Good bug reports: describe what you did, what you expected, what actually happened

## Breakout Activity (25 min)
**Groups of 3, using the shared query log**

Each group uses the shared query log to document 6 test queries together:
1. Two specific + interpretive queries on different topics (5 min)
2. One comparative query (3 min)
3. One vague query (2 min)
4. One factual query (2 min)
5. One "expert test" — a question where at least one group member knows what the answer should be (3 min)
6. Group quality rating for each query response: good / acceptable / poor (10 min)

Come back with: 6 logged queries, quality ratings, and 2 observations for the technical team.

## Debrief Questions
1. What was the difference in response quality between your specific queries and your vague queries? Were specific queries consistently better?
2. Did any group find a "factual" question where the archive actually performed well? What made it work?
3. If you had to choose one improvement to recommend to the technical team based on your testing, what would it be?

## Facilitator Notes
- The expert test is the most valuable query type for archive evaluation — make sure every group attempts it, even if only one person in the group has domain expertise
- Some groups will rate all responses "good" because they're not looking critically — prompt them: "Would you include this response in a research report without verification? Why or why not?"
- The "communications to your team" slide is important to close the feedback loop: Advocates who can articulate quality issues in specific, actionable terms are much more effective than those who say "the AI is bad"
- If the live archive is slow or unavailable, have participants work from the query logs they brought from the prep task
