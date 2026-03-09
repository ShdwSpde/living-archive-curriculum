# Unit 8: RAG Query Pipeline — In-Person Lesson
**Pathway:** Archive Developer
**Duration:** 75 min
**Room setup:** Developer workstations, Anthropic API accessible, Supabase accessible, projector for live coding
**Materials:** Participants' prep task RAG functions, test question set (shared), starter code for reranking

## Agenda
| Time | Activity |
|------|----------|
| 0:00–0:10 | Warm-up: run the RAG function live — show the streaming output |
| 0:10–0:30 | Facilitated presentation: live-build the complete production RAG function |
| 0:30–1:00 | Workshop: add reranking + hardening + integration test |
| 1:00–1:15 | Gallery share: live responses + comparison before/after reranking |

## Warm-Up Activity

**Live streaming demo (10 min)**

Each participant runs their prep task RAG function from the command line (or a simple test script) on a prepared question. Watch the streaming output appear character by character in the terminal.

Questions for the room:
- Did anyone see streaming working correctly? What did it look like?
- Did anyone get a response that seemed to go beyond the corpus sources?
- Did anyone get "The provided passages don't address this question" — for a question you expected to be covered?

These three outcomes map to: working correctly / hallucination / coverage gap. Categorize responses on the whiteboard. This sets the agenda for the hardening work in the workshop.

## Facilitated Presentation

**Live-build the complete production RAG function (20 min)**

Build on the prep task's implementation, improving it to production quality:

**Step 1 (5 min): The topK + 5 pattern and slicing**

Many participants will have implemented `match_count: topK` without the `+5` buffer. Explain: pgvector's approximate search can return slightly fewer results than requested. Fetching 5 extra and slicing guarantees the exact count needed.

Show live: call `match_documents` with match_count=5 and match_count=10 on the same query. Compare result counts.

**Step 2 (6 min): The system prompt**

Review the system prompt from the async reading. Live test: ask a question where the corpus doesn't have coverage. With a weak prompt: Claude answers from training knowledge. With the strong grounding instructions: Claude says "The provided passages don't address this question."

Show the difference side by side on the projector. This is the single most impactful prompt change for preventing hallucination.

**Step 3 (5 min): Conversation history truncation**

Implement `buildMessages` with the history truncation. Test it with a 6-message conversation and add a console log to show which messages are included in each API call. Confirm that message count stays bounded.

**Step 4 (4 min): Error handling for empty results**

Show the early return for empty results: `if (topPassages.length === 0) { yield "I couldn't find..."; return; }`. Without this, passing an empty context array to the model can cause it to hallucinate responses about nothing. The early return is both more efficient and safer.

## Workshop Activity

**Add reranking + hardening + integration test (30 min)**

**Phase 1 (12 min): Keyword reranking**

Implement the keyword overlap bonus:
```typescript
function rerank(passages: Passage[], question: string): Passage[] {
  const questionWords = new Set(
    question.toLowerCase().split(/\W+/).filter(w => w.length > 3)
  );
  return passages
    .map(p => {
      const passageWords = p.content.toLowerCase().split(/\W+/);
      const overlap = passageWords.filter(w => questionWords.has(w)).length;
      const bonus = overlap / Math.max(questionWords.size, 1);
      return { ...p, rerankScore: p.similarity * (1 + 0.3 * bonus) };
    })
    .sort((a, b) => b.rerankScore - a.rerankScore)
    .slice(0, 5);
}
```

Run 3 test questions before and after adding reranking. Record which responses changed and whether the changes were improvements.

**Phase 2 (10 min): Cache implementation**

Implement the in-memory cache as described in the async reading. Add a console log on cache hits. Verify by running the same question twice and confirming the second call skips the Supabase RPC call.

**Phase 3 (8 min): Integration test**

Run the integration test suite: 5 questions covering different quality scenarios:
1. A well-covered topic → should get relevant responses with citations
2. A barely-covered topic → should get a response with the "passages don't address" message
3. A factual question → should get a truthful but hedged response
4. A comparative question → should surface passages from multiple works
5. A follow-up question in context → should correctly use prior context

Document pass/fail for each.

## Synthesis / Gallery Share

**Live responses + before/after reranking (15 min)**

Each participant runs one test question live on the projector and shows the streaming response. The room evaluates together: does the response stay grounded? Are the citations appropriate?

Then: each participant shares one case where reranking changed their response for the better, and one where it changed it for the worse (or had no effect). Facilitator maps these on the whiteboard: which query types benefit from reranking? (Usually: specific, keyword-rich queries benefit most; vague queries are unaffected.)

Close by framing Unit 9: the integration test suite just built is the seed of the quality monitoring system. Adding 15 more test cases to it, with expected source titles, is the Unit 9 developer task.

## Facilitator Notes
- The live streaming demo in the warm-up is essential — participants who haven't seen streaming working don't have the same motivation to fix the edge cases
- Step 2 (system prompt hardening) should be done as a genuine A/B test with a question where hallucination is likely — the contrast is the most convincing argument for the stronger prompt
- The keyword reranking formula has an edge case: if `questionWords.size === 0` (all words in the question are 3 characters or fewer), the division produces infinity. The `Math.max(questionWords.size, 1)` guards against this; make sure participants include it
- Some participants will implement reranking and see no improvement on their test questions — this is fine; it means their similarity-based retrieval is already well-calibrated; note that reranking provides the most benefit when the top retrieval results are inconsistent across similar queries
