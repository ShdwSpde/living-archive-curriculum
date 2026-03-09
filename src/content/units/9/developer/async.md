# Unit 9: Pitfalls & Quality Control — Async Materials
**Pathway:** Archive Developer
**Duration:** 30–45 min

## Learning Objectives
- Write a quality audit script that outputs per-file statistics for chunk count, chapter quality, and adjacent chunk similarity
- Implement batched UPDATE operations with correct row-range pagination for large corpus modifications
- Build a test suite of 20 representative questions with expected source titles to verify retrieval precision

## Reading

### The Quality Audit Script

A quality audit script gives you a numerical picture of your corpus's health without manually inspecting every chunk. It produces per-file statistics that flag files needing attention.

**Statistics to compute:**

```typescript
interface FileQualityReport {
  sourceTitle: string;
  chunkCount: number;
  nullChapterPercent: number;
  suspiciousChapterCount: number;  // chapters < 10 chars or > 100 chars
  avgSimilarityToNeighbor: number; // for verifying overlap quality
}
```

**Computing adjacent chunk similarity:**

For each file, compute the similarity between each chunk and the next one. If chunks overlap correctly (200-token overlap), adjacent chunks should be somewhat similar (typically 0.6–0.8). Very low similarity between adjacent chunks suggests the chunking broke at unusual boundaries.

```typescript
async function computeAdjacentSimilarity(sourceTitle: string): Promise<number> {
  const { data: chunks } = await supabase
    .from('document_chunks')
    .select('embedding')
    .eq('source_title', sourceTitle)
    .order('chunk_index');

  if (!chunks || chunks.length < 2) return 0;

  let totalSim = 0;
  for (let i = 0; i < chunks.length - 1; i++) {
    const sim = cosineSimilarity(chunks[i].embedding, chunks[i + 1].embedding);
    totalSim += sim;
  }
  return totalSim / (chunks.length - 1);
}

function cosineSimilarity(a: number[], b: number[]): number {
  const dot = a.reduce((sum, ai, i) => sum + ai * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum, ai) => sum + ai * ai, 0));
  const magB = Math.sqrt(b.reduce((sum, bi) => sum + bi * bi, 0));
  return dot / (magA * magB);
}
```

**Flag thresholds:**

```typescript
const FLAGS = {
  MIN_CHUNKS_PER_WORK: 5,           // fewer than 5 chunks → likely ingestion gap
  MAX_NULL_CHAPTER_PERCENT: 95,     // >95% null chapters on a non-periodical → likely missed chapter detection
  SUSPICIOUS_CHAPTER_THRESHOLD: 40, // >40 suspicious chapters → OCR false positives
  MIN_ADJACENT_SIMILARITY: 0.4,     // <0.4 avg similarity → chunking may have broken incorrectly
};
```

### Batch UPDATE with Row-Range Pagination

Large UPDATE operations on Supabase free tier time out silently at approximately 2,000 rows. The fix is to batch updates using explicit row-range pagination.

```typescript
async function batchUpdate(
  updates: { id: string; newValue: string }[],
  column: string,
  batchSize = 500
): Promise<void> {
  let processed = 0;

  for (let i = 0; i < updates.length; i += batchSize) {
    const batch = updates.slice(i, i + batchSize);
    const ids = batch.map(u => u.id);

    // All rows in this batch use the same new value
    // For mixed-value updates, use individual upserts instead
    const { error } = await supabase
      .from('document_chunks')
      .update({ [column]: batch[0].newValue })
      .in('id', ids);

    if (error) {
      console.error(`[ERROR] Batch ${i / batchSize + 1} failed: ${error.message}`);
    } else {
      processed += batch.length;
      console.log(`[INFO] Updated rows ${i + 1}–${i + batch.length} (${processed}/${updates.length})`);
    }

    await sleep(200); // small delay to avoid overwhelming the connection pool
  }
}
```

For mixed-value updates (different rows need different values), use upsert with `onConflict: 'id'`:

```typescript
const rows = updates.map(u => ({ id: u.id, source_title: u.newTitle }));
await supabase
  .from('document_chunks')
  .upsert(rows, { onConflict: 'id' });
```

### The Retrieval Precision Test Suite

A test suite of representative questions with expected source titles verifies that the archive retrieves the right passages for known queries. It's the automated equivalent of the Advocate's expert test.

**Structure:**

```typescript
interface TestCase {
  question: string;
  expectedSources: string[];  // at least one of these should appear in top results
  minSimilarity: number;      // top result should be at least this similar
  shouldHaveResult: boolean;  // false for thin-coverage questions
}

const TEST_SUITE: TestCase[] = [
  {
    question: 'What is double consciousness?',
    expectedSources: ['The Souls of Black Folk'],
    minSimilarity: 0.75,
    shouldHaveResult: true
  },
  {
    question: 'What did Du Bois think about Black women?',
    expectedSources: ['Darkwater: Voices from Within the Veil', 'The Souls of Black Folk'],
    minSimilarity: 0.65,
    shouldHaveResult: true
  },
  {
    question: 'How did Du Bois describe his grandmother?',
    expectedSources: ['The Souls of Black Folk', 'Darkwater: Voices from Within the Veil'],
    minSimilarity: 0.6,
    shouldHaveResult: true
  },
  // ... 17 more test cases
];
```

**Running the test suite:**

```typescript
async function runTestSuite(threshold = 0.7, topK = 5): Promise<TestResult[]> {
  const results: TestResult[] = [];

  for (const test of TEST_SUITE) {
    const passages = await retrievePassages(test.question, threshold, topK);
    const topSources = passages.map(p => p.source_title);

    const hasExpectedSource = test.expectedSources.some(s => topSources.includes(s));
    const topSimilarity = passages[0]?.similarity ?? 0;

    const passed =
      (!test.shouldHaveResult && passages.length === 0) ||
      (test.shouldHaveResult && hasExpectedSource && topSimilarity >= test.minSimilarity);

    results.push({
      question: test.question,
      passed,
      topSources,
      topSimilarity,
      expectedSources: test.expectedSources
    });
  }

  const passCount = results.filter(r => r.passed).length;
  console.log(`Test suite: ${passCount}/${TEST_SUITE.length} passed`);
  return results;
}
```

**Building 20 good test cases:**
- Cover at least 8 different topics
- Include questions that span different works (test cross-corpus retrieval)
- Include at least 3 questions where you're confident of the exact source
- Include 2–3 questions where the expected source is a secondary option (tests recall depth)
- Include 2 questions that should return no results (tests the "no passages" path)

## Reflection Questions
1. Your adjacent similarity audit shows that one work has average adjacent similarity of 0.2 — much lower than the 0.6–0.8 expected range. What does this tell you, and what do you investigate?
2. You have 3,500 rows to update across two values: 2,000 rows need one new title and 1,500 rows need a different new title. Write the pseudocode for a batch UPDATE that handles both groups correctly.
3. Your test suite has 20 cases and 15 pass. The 5 failures are all about the same topic area. What's the most likely explanation, and how do you investigate?

## Prep Task
Before your next session: Write the quality audit script that computes the four per-file statistics. Run it on your corpus. Produce the full output table. Flag any files that trigger the threshold conditions. Also write 10 test cases for the retrieval precision test suite and run them. Report pass/fail count. Bring both outputs to the next session.
