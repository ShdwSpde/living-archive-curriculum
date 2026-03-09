# Unit 5: Embedding & AI — Async Materials
**Pathway:** Archive Developer
**Duration:** 30–45 min

## Learning Objectives
- Implement the batch embedding loop with correct batching, delay, retry logic, and resume via row count
- Implement upsert with content hash dedup to prevent duplicate chunks on re-ingestion
- Compare Gemini free tier and OpenAI embedding cost and speed tradeoffs for a given corpus size

## Reading

### The Batch Embedding Loop

The embedding loop is the core of the ingestion script. It converts each text chunk into a vector by calling the Gemini API, then writes the result to Supabase. The loop must handle rate limits, partial failures, and resume safely.

**Full implementation:**

```typescript
const BATCH_SIZE = 5;
const DELAY_MS = 4000;
const MAX_RETRIES = 5;

async function ingestChunks(chunks: Chunk[]): Promise<void> {
  // Check existing row count for resume
  const { count: existingCount } = await supabase
    .from('document_chunks')
    .select('*', { count: 'exact', head: true })
    .eq('source_title', chunks[0].source_title);

  if (existingCount === chunks.length) {
    console.log(`[SKIP] ${chunks[0].source_title} — already fully ingested`);
    return;
  }

  for (let i = 0; i < chunks.length; i += BATCH_SIZE) {
    const batch = chunks.slice(i, i + BATCH_SIZE);
    await embedAndInsertBatch(batch);
    if (i + BATCH_SIZE < chunks.length) {
      await sleep(DELAY_MS);
    }
  }
}
```

**The embed + insert function with retry:**

```typescript
async function embedAndInsertBatch(batch: Chunk[], attempt = 1): Promise<void> {
  try {
    const embeddings = await Promise.all(
      batch.map(chunk =>
        genai.embedContent({ content: chunk.content, taskType: 'RETRIEVAL_DOCUMENT' })
      )
    );

    const rows = batch.map((chunk, i) => ({
      source_title: chunk.source_title,
      chapter: chunk.chapter,
      content: chunk.content,
      content_hash: md5(chunk.content), // for dedup
      embedding: embeddings[i].embedding.values,
    }));

    await supabase
      .from('document_chunks')
      .upsert(rows, { onConflict: 'content_hash' });

    console.log(`[INFO] Batch embedded + uploaded (${batch.length} chunks)`);
  } catch (error: any) {
    if (error.status === 429 && attempt <= MAX_RETRIES) {
      const delay = DELAY_MS * Math.pow(2, attempt);
      console.warn(`[WARN] 429 — retry ${attempt}, waiting ${delay}ms`);
      await sleep(delay);
      return embedAndInsertBatch(batch, attempt + 1);
    }
    console.error(`[ERROR] Batch failed after ${attempt} attempts: ${error.message}`);
  }
}
```

### Content Hash Dedup with Upsert

Running ingestion twice without dedup creates duplicate rows. The content hash approach prevents this: before inserting, generate an MD5 or SHA256 hash of the chunk content, store it as a unique-constrained column, and use `upsert` with `onConflict: 'content_hash'`. If the hash already exists, the row is updated in place rather than duplicated.

```typescript
import { createHash } from 'crypto';

function md5(text: string): string {
  return createHash('md5').update(text).digest('hex');
}
```

The database must have a unique constraint on `content_hash`:
```sql
ALTER TABLE document_chunks ADD CONSTRAINT unique_content_hash UNIQUE (content_hash);
```

**Why MD5 rather than SHA256 for this purpose:** MD5 is faster, produces a shorter hash (32 hex chars vs. 64), and collision probability for corpus-sized datasets is negligible. SHA256 is more appropriate for security applications.

### Verifying Embedding Quality via Test Similarity Query

After ingesting a test batch, run a direct similarity query to verify that embeddings are working correctly:

```typescript
async function testSimilarity(question: string, topK = 5) {
  const queryEmbedding = await genai.embedContent({
    content: question,
    taskType: 'RETRIEVAL_QUERY'
  });

  const { data } = await supabase.rpc('match_documents', {
    query_embedding: queryEmbedding.embedding.values,
    match_threshold: 0.5,
    match_count: topK
  });

  console.log(`Results for: "${question}"`);
  data.forEach((row: any, i: number) => {
    console.log(`  ${i + 1}. [${row.similarity.toFixed(3)}] ${row.source_title}: "${row.content.slice(0, 100)}..."`);
  });
}

// Test it
await testSimilarity('What is the Talented Tenth?');
await testSimilarity('How should Black Americans respond to racism?');
```

Expected: results at similarity 0.7+ that are clearly topically relevant to the query. If results are below 0.5 or topically irrelevant, suspect: OCR quality issues in the source corpus, incorrect `taskType` (RETRIEVAL_DOCUMENT for ingestion, RETRIEVAL_QUERY for queries), or model output dimension mismatch.

### Cost and Speed Comparison

| | Gemini embedding-001 (free tier) | OpenAI text-embedding-3-small |
|---|---|---|
| Cost | Free up to ~1M tokens/month | $0.02 per 1M tokens |
| Speed | ~75 chunks/min (with delay) | ~500 chunks/min |
| Dimensions | 768 | 1,536 |
| Quality | Good for English prose | Comparable or better |
| Multilingual | Supported | Better support |

For a corpus of 5,000 chunks at ~800 tokens each = 4M tokens:
- Gemini free tier: feasible in 3–4 ingestion sessions; $0 cost
- OpenAI 3-small: 8 minutes; ~$0.08 cost

For 20,000 chunks at ~800 tokens = 16M tokens:
- Gemini free tier: 12+ sessions over multiple days; $0 cost
- OpenAI 3-small: 40 minutes; ~$0.32 cost

The decision is usually time vs. money: if you have the time to manage rate-limited ingestion sessions, the Gemini free tier is fine. If you need to ingest a large corpus quickly or are rebuilding frequently, OpenAI's cost is trivial.

**Note:** Once you choose an embedding model and ingest your corpus, switching models requires re-ingesting everything (the vectors are model-specific). Choose your model before starting ingestion.

## Reflection Questions
1. Your ingestion script fails on batch 47 of 200 with a non-429 error (database timeout). The function logs the error and continues. When you check Supabase, batch 47 is missing. Your resume logic skips the file because 97% of chunks are present. How do you fix this?
2. Write the MD5 hash for the string "double consciousness". Now imagine two chunks that are nearly identical (one word different). Do they have the same hash? What are the implications for dedup?
3. Your corpus has 25,000 chunks. You want to complete ingestion in under 24 hours. What's the minimum you'd need to spend on OpenAI embeddings to achieve this?

## Prep Task
Before your next session: Implement the full `ingestChunks` function with batching, delay, exponential backoff on 429, and content hash upsert. Test it on a batch of 20 chunks. Run the test similarity query with 3 different questions and report the top result for each. Bring the similarity query output to the next session.
