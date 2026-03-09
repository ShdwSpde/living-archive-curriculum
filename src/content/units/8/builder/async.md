# Unit 8: RAG Query Pipeline — Async Materials
**Pathway:** Archive Builder
**Duration:** 30–45 min

## Learning Objectives
- Run test queries through the archive UI and evaluate their quality against the corpus
- Recognize and document bad retrievals — irrelevant passages returned with high similarity scores
- Adjust the similarity threshold configuration and report the effect on result quality

## Reading

### Running Test Queries Through the Archive UI

The most direct way to evaluate the archive's query pipeline is to use it as a user would. Open the archive in a browser, type a question in the chat interface, and examine the response carefully.

**What to look at in a response:**
- The generated text: does it make accurate claims about the figure's views?
- The citations: what works are cited? What specific passages?
- The confidence level: is the response hedged appropriately, or does it assert things beyond what the sources support?

**A structured test query session:**

Run at least 10 queries before drawing conclusions. Cover different topics, different query types (specific vs. vague, interpretive vs. comparative), and different historical periods of the figure's career. Record each query and response in a test log.

For each response, assess:
1. **Relevant?** Does the response address the question?
2. **Supported?** Are the claims supported by the cited passages?
3. **Complete?** If you know the corpus well, did the response miss important relevant material?

### Recognizing Bad Retrievals

A bad retrieval is when the similarity search returns a passage that isn't relevant to the query but scores highly anyway. This happens for a few reasons:

**High-scoring irrelevant passages — the common causes:**
- **OCR garbage:** A garbled passage with fragmented words may happen to share statistical proximity in embedding space with your query, not because of meaningful similarity but because of noise
- **Too-low threshold:** If the threshold is set to 0.5, passages with only loose relevance will be included in responses
- **Thin corpus coverage:** If few chunks exist on the queried topic, the retrieval system returns the most-similar available passages even if they're not closely relevant

**How to identify bad retrievals in practice:**
1. Run a query about a topic that should be well-covered in the corpus
2. Read the cited passages carefully — not just the generated summary but the actual source text
3. Ask: would you independently choose this passage to support the response's claims?
4. If no: this is a bad retrieval. Note the query, the bad passage, and the `source_title`

**The bad retrieval log format:**
```
Query: "What was Du Bois's view on labor unions?"
Bad passage: [first 100 characters of the irrelevant content]
Source title: [where it came from]
Similarity score (if visible): [e.g., 0.64]
Why it's bad: [e.g., "passage discusses religion, not labor, despite high score"]
Suspected cause: [threshold too low / OCR noise / thin coverage]
```

This log is a deliverable: you bring it to your developer and they can diagnose and fix each type of problem.

### Adjusting the Similarity Threshold

The similarity threshold is the configuration value that determines how close a retrieved passage must be to the query to be included in the response. It lives in the application code, typically in the API handler.

In the Du Bois archive, it appears as:
```typescript
const match_threshold = 0.7; // adjustable
```

You can't change this directly in the UI — but you can test different values by asking the developer to temporarily adjust it and re-running your test queries.

**The effect of threshold changes:**

| Threshold | Effect |
|-----------|--------|
| 0.5 | More results, more false positives, better coverage of sparse topics |
| 0.65 | Moderate balance — good starting point for a noisy corpus |
| 0.7 | Default — good for clean corpora |
| 0.75–0.8 | Higher precision, fewer results, risks missing relevant passages |

**How to communicate a threshold adjustment request:**

"I've been testing queries about [topic] and consistently getting irrelevant passages in the responses. The passages being returned seem loosely related but not specifically about the topic. Could you try raising the threshold from 0.7 to 0.75 and re-running the same queries? I can tell you whether the relevant ones are still returned."

This is a concrete, testable request — not a vague "the results are bad." And you've committed to evaluating the result after the change.

### Documenting Query Quality Issues

Good documentation of query quality issues makes your developer's job much easier. For each issue type, the documentation format differs:

**Coverage gap:** "Queries about [topic X] consistently return passages from [works A, B] rather than [work C], which discusses this topic extensively. [Work C] has [N] chunks in the database. I ran queries: [list them]. Is this a retrieval issue or a threshold issue?"

**False positive:** "The response to [query] cited [passage] from [work], but that passage is about [Y] not [X]. The similarity score was [Z]. Is this an OCR quality problem in that passage or a threshold issue?"

**Hallucination (overclaiming):** "The response to [query] says '[specific claim]' but the cited passage only says '[what it actually says].' The response is going beyond the source. Can the prompt be adjusted to prevent this?"

For each issue type, your developer will follow a different diagnostic path. Clear documentation gets you faster fixes.

## Reflection Questions
1. You run a query about labor and get a response that cites a passage about religion. The similarity score is 0.68. What are the two most likely causes, and how would you determine which one it is?
2. You raise the threshold from 0.7 to 0.75 and re-run 5 test queries. Two now return "no relevant passages found" even though you know the topic is covered in the corpus. What does this tell you? What do you try next?
3. Write a bug report for this scenario: "I asked 'what did Wells think about the federal government's responsibility for lynching?' and the response cited a passage from *Southern Horrors* about newspaper coverage of lynching, not about federal responsibility."

## Prep Task
Before your next session: Run 10 test queries on the live archive. Identify at least 2 bad retrievals — irrelevant passages returned with high scores. For each bad retrieval, fill out the log format (query, bad passage, source, suspected cause). Also identify at least 1 query where the response seems to overclaim beyond what the cited passages say. Bring your test log to the next session.
