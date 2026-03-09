# Unit 10: Cost Modeling & Sustainability — Async Materials
**Pathway:** Archive Developer
**Duration:** 30–45 min

## Learning Objectives
- Implement a query result caching layer using a Supabase table with TTL expiry to reduce LLM API call volume
- Build a model router that detects simple factual questions and routes them to a cheaper model
- Write a per-IP rate limiter in a Vercel edge function that enforces a 20-query-per-hour limit

## Reading

### Query Result Caching

The most cost-effective optimization for a living archive is avoiding LLM calls entirely for repeated questions. Users often ask similar questions — "What did Du Bois believe about education?" gets asked in many phrasings. A caching layer stores previous answers and returns them without calling the LLM again.

**Schema:**
```sql
CREATE TABLE query_cache (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  query_hash TEXT NOT NULL UNIQUE,
  question TEXT NOT NULL,
  response JSONB NOT NULL,         -- full response including passages + answer
  model_used TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL,
  hit_count INTEGER DEFAULT 0
);

CREATE INDEX idx_query_cache_hash ON query_cache(query_hash);
CREATE INDEX idx_query_cache_expires ON query_cache(expires_at);
```

**Cache key strategy:**
Don't cache on the raw question string — minor phrasing differences would miss the cache. Use a normalized form:

```typescript
import { createHash } from 'crypto';

function buildCacheKey(question: string): string {
  const normalized = question
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s]/g, '')  // strip punctuation
    .replace(/\s+/g, ' ');         // collapse whitespace
  return createHash('md5').update(normalized).digest('hex');
}
```

**Cache lookup and write:**
```typescript
async function cachedQuery(question: string, ttlHours = 24): Promise<QueryResponse | null> {
  const hash = buildCacheKey(question);

  // Check cache
  const { data: cached } = await supabase
    .from('query_cache')
    .select('*')
    .eq('query_hash', hash)
    .gt('expires_at', new Date().toISOString())
    .single();

  if (cached) {
    // Update hit count
    await supabase
      .from('query_cache')
      .update({ hit_count: cached.hit_count + 1 })
      .eq('id', cached.id);
    return cached.response as QueryResponse;
  }

  return null;
}

async function writeCache(
  question: string,
  response: QueryResponse,
  model: string,
  ttlHours = 24
): Promise<void> {
  const hash = buildCacheKey(question);
  const expiresAt = new Date(Date.now() + ttlHours * 3600 * 1000).toISOString();

  await supabase.from('query_cache').upsert({
    query_hash: hash,
    question,
    response,
    model_used: model,
    expires_at: expiresAt,
  }, { onConflict: 'query_hash' });
}
```

**TTL considerations:**
- For a stable corpus (no new texts being added), 24–72 hour TTL is appropriate
- For an archive being actively expanded, use 6–12 hours to prevent stale citations
- Store the TTL as a configurable parameter, not a hardcoded value

### Model Routing

Not every question requires your most capable (and expensive) model. A simple factual question — "When was Du Bois born?" or "What is the title of Du Bois's dissertation?" — can be answered adequately by a faster, cheaper model. Complex interpretive questions — "How did Du Bois's views on emigration change between 1900 and 1960?" — benefit from the more capable model.

**Simple heuristic router:**
```typescript
type ModelTier = 'fast' | 'capable';

function routeQuery(question: string, passageCount: number): ModelTier {
  const q = question.toLowerCase();

  // Signals for simple factual queries
  const factualSignals = [
    /^when (was|did|were)/,
    /^where (was|did|were)/,
    /^what (year|date|city|country)/,
    /^who (was|is|are|were)/,
    /^how many/,
    /^list /,
  ];

  const isLikelyFactual = factualSignals.some(pattern => pattern.test(q));

  // Short questions with few retrieved passages → likely factual
  if (isLikelyFactual && passageCount <= 3 && question.length < 80) {
    return 'fast';
  }

  return 'capable';
}

function modelForTier(tier: ModelTier): string {
  return tier === 'fast' ? 'claude-haiku-4-5' : 'claude-sonnet-4-5';
}
```

**Integration in the chat handler:**
```typescript
// After vector retrieval, before LLM call
const tier = routeQuery(question, retrievedPassages.length);
const model = modelForTier(tier);

const response = await anthropic.messages.create({
  model,
  // ...
});
```

**Monitoring routing decisions:**
Log the routing decision (along with the question and model used) to understand what fraction of queries route to each tier. Over time, you can tune the heuristics based on actual query patterns.

### Per-IP Rate Limiting in a Vercel Edge Function

Vercel edge functions run in the CDN edge network, before your serverless function executes. This makes them ideal for rate limiting — you can reject over-limit requests without incurring LLM API costs.

**Using Vercel's built-in KV store or an upstash Redis client for rate limit state:**

```typescript
// api/chat.ts — add at the top of the handler

const RATE_LIMIT_WINDOW_SECONDS = 3600; // 1 hour
const RATE_LIMIT_MAX_REQUESTS = 20;     // 20 queries per IP per hour

export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request): Promise<Response> {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown';
  const rateLimitKey = `rl:${ip}`;

  // Check rate limit using Upstash Redis (or Vercel KV)
  const client = Redis.fromEnv();
  const current = await client.incr(rateLimitKey);

  if (current === 1) {
    // First request — set expiry
    await client.expire(rateLimitKey, RATE_LIMIT_WINDOW_SECONDS);
  }

  if (current > RATE_LIMIT_MAX_REQUESTS) {
    return new Response(
      JSON.stringify({
        error: 'Rate limit exceeded. Please try again in an hour.',
        retryAfter: RATE_LIMIT_WINDOW_SECONDS,
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': String(RATE_LIMIT_WINDOW_SECONDS),
          'X-RateLimit-Limit': String(RATE_LIMIT_MAX_REQUESTS),
          'X-RateLimit-Remaining': String(Math.max(0, RATE_LIMIT_MAX_REQUESTS - current)),
        },
      }
    );
  }

  // Proceed with normal query handling
  // ...
}
```

**Without Redis (simpler, less accurate):**
For archives without a Redis/KV store, you can implement a softer rate limit using a Supabase table:

```typescript
async function checkRateLimit(ip: string): Promise<boolean> {
  const windowStart = new Date(Date.now() - 3600 * 1000).toISOString();

  const { count } = await supabase
    .from('query_log')
    .select('*', { count: 'exact', head: true })
    .eq('ip_hash', hashIp(ip))
    .gt('created_at', windowStart);

  return (count ?? 0) < RATE_LIMIT_MAX_REQUESTS;
}
```

Note: this approach adds a database roundtrip to every query. For high-traffic archives, the Redis-based approach is preferable.

## Reflection Questions
1. Your cache has a 24-hour TTL. A user asks "What did Du Bois say about Pan-Africanism?" at 9am and gets a cached response at 3pm. You added three new Crisis magazine issues to the corpus at noon. Will the 3pm cached response reflect the new passages? What are the implications for your TTL policy?
2. Your model router incorrectly routes "What are Du Bois's most important works on sociology?" to the 'fast' tier because it starts with "What are." Write two additional heuristics that would correctly route this to 'capable.'
3. You implement IP-based rate limiting at 20 queries/hour. A professor assigns the archive to 200 students in a lab session, all accessing from the same university proxy IP. What happens, and how do you design around it?

## Prep Task
Before your next session: Implement the `query_cache` table schema in your Supabase instance. Write the `buildCacheKey`, `cachedQuery`, and `writeCache` functions and integrate them into your chat handler. Test by making the same query twice — verify the second call hits the cache (add a log line that prints "CACHE HIT" or "CACHE MISS"). Bring the log output to the next session.
