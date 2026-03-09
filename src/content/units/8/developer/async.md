# Unit 8: RAG Query Pipeline — Async Materials
**Pathway:** Archive Developer
**Duration:** 30–45 min

## Learning Objectives
- Implement the full RAG function: embed query, call match_documents, assemble prompt, stream Claude response, extract source metadata
- Apply prompt engineering techniques to maintain scholarly tone and prevent overclaiming
- Implement conversation history truncation and caching for repeated queries

## Reading

### The Full RAG Function

The RAG (Retrieval-Augmented Generation) function is the core of the archive's query pipeline. It takes a user question, finds relevant passages from the corpus, and generates a response using those passages as context.

```typescript
async function* ragQuery(
  question: string,
  history: Message[],
  threshold = 0.7,
  topK = 5
): AsyncGenerator<string> {
  // Step 1: Embed the query
  const queryEmbedding = await genai.embedContent({
    content: question,
    taskType: 'RETRIEVAL_QUERY'
  });

  // Step 2: Retrieve relevant passages
  const { data: passages } = await supabase.rpc('match_documents', {
    query_embedding: queryEmbedding.embedding.values,
    match_threshold: threshold,
    match_count: topK + 5 // fetch extra, slice to topK
  });

  const topPassages = (passages ?? []).slice(0, topK); // always slice

  if (topPassages.length === 0) {
    yield "I couldn't find relevant passages in the corpus for that question. Try rephrasing with more specific language.";
    return;
  }

  // Step 3: Assemble the prompt
  const context = topPassages
    .map((p, i) => `[${i + 1}] ${p.source_title}${p.chapter ? ` — ${p.chapter}` : ''}\n${p.content}`)
    .join('\n\n---\n\n');

  const systemPrompt = buildSystemPrompt();
  const messages = buildMessages(question, context, history);

  // Step 4: Stream the response
  const stream = await anthropic.messages.stream({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 1024,
    system: systemPrompt,
    messages
  });

  for await (const chunk of stream) {
    if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
      yield chunk.delta.text;
    }
  }
}
```

### Prompt Engineering for Scholarly Tone

The system prompt shapes how Claude responds. For a scholarly archive, the key goals are: grounded responses (no claims beyond the sources), appropriate hedging, and scholarly register.

```typescript
function buildSystemPrompt(): string {
  return `You are a scholarly research assistant for the Du Bois Living Archive.

Your role is to help researchers explore W.E.B. Du Bois's writings through interpretive, analytical questions.

GUIDELINES:
- Base ALL claims on the provided corpus passages. Do not draw on knowledge outside the provided context.
- Use scholarly language appropriate for academic research.
- When the passages support only partial answers, say so explicitly.
- Cite sources by their number in brackets [1], [2], etc.
- If the passages don't address the question, say: "The provided passages don't directly address this question."
- Never fabricate quotes, dates, or specific claims not present in the passages.

The user's question will be followed by numbered corpus passages. Synthesize these passages to answer the question. Do not repeat passage text verbatim — synthesize and analyze.`;
}
```

**Key prompt engineering decisions:**
- "Base ALL claims on the provided corpus passages" — explicit grounding instruction reduces hallucination
- "Do not draw on knowledge outside the provided context" — constrains the model to corpus-only responses
- "If the passages don't address the question, say so" — prevents invented answers when coverage is thin
- "Do not repeat passage text verbatim — synthesize and analyze" — encourages genuine analysis rather than quotation

### Conversation History Truncation

Conversation history provides context for follow-up questions ("what about her views on the following year?"). But including the full conversation history in every API call increases token cost and can cause the model to lose focus on the most recent question.

Truncate to the last 3 exchanges (6 messages: 3 user + 3 assistant):

```typescript
function buildMessages(
  question: string,
  context: string,
  history: Message[]
): Anthropic.MessageParam[] {
  const HISTORY_LIMIT = 3; // exchanges
  const recentHistory = history.slice(-(HISTORY_LIMIT * 2));

  const userContent = `${question}\n\nRelevant corpus passages:\n\n${context}`;

  return [
    ...recentHistory.map(m => ({
      role: m.role as 'user' | 'assistant',
      content: m.content
    })),
    { role: 'user', content: userContent }
  ];
}
```

Why 3 exchanges: enough context for follow-up questions to be coherent; few enough that the model stays focused on the current topic.

### Caching Repeated Queries

If users frequently ask the same or very similar questions, re-embedding and re-retrieving for every request wastes API calls and adds latency. A simple in-memory cache:

```typescript
const queryCache = new Map<string, { passages: Passage[]; timestamp: number }>();
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

async function getCachedPassages(
  question: string,
  threshold: number,
  topK: number
): Promise<Passage[]> {
  const cacheKey = `${question}|${threshold}|${topK}`;
  const cached = queryCache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.passages;
  }

  // ... embed and retrieve
  const passages = await retrievePassages(question, threshold, topK);
  queryCache.set(cacheKey, { passages, timestamp: Date.now() });
  return passages;
}
```

For a production archive, use Redis instead of in-memory cache (the cache survives server restarts and is shared across multiple server instances).

### Extracting Source Metadata from Responses

The response needs to carry source metadata — the list of passages cited — so the frontend can render the sources panel alongside the response.

After assembling `topPassages`, extract the metadata the frontend needs:

```typescript
export interface SourceRef {
  number: number;
  sourceTitle: string;
  chapter: string | null;
  contentPreview: string;
}

function extractSources(passages: Passage[]): SourceRef[] {
  return passages.map((p, i) => ({
    number: i + 1,
    sourceTitle: p.source_title,
    chapter: p.chapter,
    contentPreview: p.content.slice(0, 200) + '...'
  }));
}
```

The frontend uses `SourceRef.number` to match the `[1]` `[2]` citation markers in the generated text to their respective source cards.

## Reflection Questions
1. The system prompt says "Do not draw on knowledge outside the provided context," but Claude sometimes still answers questions using its training knowledge when the corpus doesn't have coverage. What would you add to the prompt to prevent this more reliably?
2. A user asks 5 questions in a single session. With `HISTORY_LIMIT = 3`, what messages are included in the 5th API call? Write out the message array structure.
3. Your cache key is `${question}|${threshold}|${topK}`. A user asks "What is double consciousness?" — then asks "What is double consciousness?" again with a typo fixed. Do they get cached results? Is this the right behavior?

## Prep Task
Before your next session: Implement the full `ragQuery` function with the prompt from this reading. Test it with 5 questions and verify: (1) responses only cite content from the corpus, (2) the [1][2] citation format appears in responses, (3) responses say "The provided passages don't address this question" when corpus coverage is thin. Record any failures and bring them to the next session.
