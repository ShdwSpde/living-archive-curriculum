# Unit 8: RAG Query Pipeline — Virtual Lesson
**Pathway:** Archive Developer
**Duration:** 75 min
**Materials:** Screen share for live coding, participants' RAG function from prep task, Anthropic API and Supabase accessible

## Agenda
| Time | Activity |
|------|----------|
| 0:00–0:10 | Check-in: share your prep task results — what passed, what failed? |
| 0:10–0:35 | Presentation: RAG function deep-dive + prompt engineering + streaming |
| 0:35–1:00 | Breakout: add reranking step + cache + test against failure cases |
| 1:00–1:15 | Debrief: failure modes and production readiness |

## Slide Outline

**Slide 1: The RAG Function's Four Steps**
- Step 1: Embed query (RETRIEVAL_QUERY task type — critical)
- Step 2: Retrieve passages (slice to topK, handle empty result)
- Step 3: Assemble prompt (context + system + history)
- Step 4: Stream response (yield chunks as they arrive)
- Each step has a failure mode: embedding API down / no relevant passages / prompt too long / stream interrupted
- All four failure modes need explicit handling — no silent failures

**Slide 2: Prompt Engineering for Scholarly Archives**
- The grounding instruction: "Base ALL claims on the provided corpus passages"
- The anti-hallucination instruction: "Do not draw on knowledge outside the provided context"
- The graceful degradation instruction: "If passages don't address the question, say so"
- The citation format instruction: "Cite by number [1][2]"
- Show: what happens without these instructions vs. with them
- The system prompt is a contract between you and the model — be explicit

**Slide 3: Streaming — Why and How**
- Without streaming: user waits 3–5 seconds for the full response before seeing anything
- With streaming: response appears word by word as it's generated
- The Anthropic streaming API: `anthropic.messages.stream()`, iterate with `for await`
- How to detect the text content chunks: `chunk.type === 'content_block_delta'`
- How to handle stream interruption: the stream can be abandoned mid-response; frontend should handle partial text gracefully

**Slide 4: Conversation History + Truncation**
- Why history matters: follow-up questions need context ("what about in 1920?")
- Why truncation matters: full history inflates token cost and can cause drift
- The 3-exchange rule: last 6 messages before the current one
- What happens if history is too long: Claude can lose the thread of the current question
- Test: ask a 6-message conversation; verify the first exchange is NOT included in the 7th API call

**Slide 5: Adding a Reranking Step**
- Initial retrieval returns topK passages ranked by embedding similarity
- Reranking: re-score the retrieved passages by a second, more precise signal
- Simple reranking: keyword overlap between question and passage content
- Score = similarity_score * (1 + keyword_bonus)
- Where keyword_bonus = number of question keywords found in passage / total question keywords
- After reranking, re-sort by new score and take top 5

## Breakout Activity (25 min)
**Solo coding**

Each participant adds two improvements to their RAG function:

1. **Simple reranking** (15 min): after retrieving `topK + 5` passages, score each one using the keyword overlap bonus formula. Re-sort by combined score, take `topK`. Compare responses before and after reranking on 3 test questions.

2. **In-memory cache** (10 min): implement the `queryCache` Map with TTL check. Verify that running the same question twice produces the same result (and show that the second call uses the cache by adding a console log: "Cache hit for [question]").

Share-back: each participant shows one test question where reranking changed the response vs. one where it didn't.

## Debrief Questions
1. Did reranking improve results for any of your test questions? Which question type benefited most — specific, comparative, or vague?
2. If a user's question contains a rare word that happens to appear in one passage, the keyword bonus will heavily favor that passage. Is this a problem? What would you add to mitigate it?
3. What's the most dangerous silent failure in the RAG function — the one most likely to produce a bad response without any visible error?

## Facilitator Notes
- The streaming exercise is satisfying to demo live — if possible, show side-by-side: non-streaming (waits, then dumps) vs. streaming (appears incrementally)
- The reranking exercise often produces unexpectedly large improvements on highly specific queries and minimal improvement on vague queries — this is the right behavior and worth discussing
- The "most dangerous silent failure" debrief question almost always generates the same answer: hallucination (overclaiming beyond corpus sources) — because it produces confident, readable, plausible-sounding wrong content with no error signal
- Some participants will want to use a cross-encoder model for reranking instead of keyword overlap — validate this as a genuine improvement and note that it requires an additional API call; the keyword approach is a good starting point
