# Unit 10: Cost Modeling & Sustainability — In-Person Lesson
**Pathway:** Archive Developer
**Duration:** 75 min
**Room setup:** Laptop tables with power, projection screen, pair-programming pairs encouraged
**Materials:** Schema migration files pre-loaded in repo, cost monitoring dashboard mockup printed

## Agenda
| Time | Activity |
|------|----------|
| 0:00–0:10 | Warm-up: cost estimation challenge |
| 0:10–0:30 | Presentation: cost control architecture and implementation patterns |
| 0:30–1:00 | Workshop: implement caching + routing + rate limiting |
| 1:00–1:15 | Architecture review and production readiness checklist |

## Warm-Up Activity (10 min)
Post this scenario on the board:

> Your archive went live last Monday. This morning you opened the Anthropic Console and found $480 in charges over 7 days. Your monthly budget is $150. What happened, and what do you do in the next 30 minutes?

Take responses from the room. Good answers include:
- Check usage by day to identify the spike date
- Check server logs for that date — query volume, IP distribution
- Look for bots (sequential queries, identical patterns, unusual hours)
- Switch to Haiku immediately if the traffic is legitimate
- Add rate limiting if it was abuse

This establishes the "cost crisis" scenario that all three cost controls are designed to prevent.

## Facilitated Presentation (20 min)

### The Cost Control Stack

Present the three-layer cost control architecture on the projector:

```
Request arrives
      ↓
[Rate Limit Check] — reject over-limit IPs before any processing
      ↓
[Cache Lookup] — return cached answer without LLM call
      ↓
[Model Router] — send to cheaper model if question is simple
      ↓
[LLM Call] — the expensive step, now much rarer
```

Each layer independently reduces cost. Together, they can reduce effective per-query cost by 50–80% for a mature archive with recurring visitors.

### Implementation Tradeoffs

Walk through the three implementation options for each layer:

**Caching:**
- Session-only (in-memory): simplest, lost on restart — useless for serverless
- Supabase table: correct, persistent, adds ~10ms roundtrip
- External CDN cache: fastest, requires cache-control headers — advanced topic

**Rate limiting:**
- Supabase table: works at small scale, DB roundtrip on every request
- Vercel KV / Upstash Redis: correct production solution, sub-millisecond check
- IP blocking: too blunt — universities have shared IPs with hundreds of users

**Model routing:**
- Keyword heuristics: fast, no extra API calls, tunable
- LLM-based classification: accurate, but requires an extra LLM call to decide which LLM to call (ironic and expensive)
- Embedding-based: classify query by similarity to examples — interesting but over-engineered for most archives

Recommendation: Supabase caching + Supabase rate limiting + keyword routing is the right combination for archives at moderate scale.

## Workshop Activity (30 min)

### Step-by-Step Implementation

Participants work in pairs with the facilitator circulating. The workshop implements all three layers in sequence.

**Step 1: Create the cache table (5 min)**
Run the migration against their Supabase instance:
```sql
CREATE TABLE IF NOT EXISTS query_cache (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  query_hash TEXT NOT NULL UNIQUE,
  question TEXT NOT NULL,
  response JSONB NOT NULL,
  model_used TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL,
  hit_count INTEGER DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_query_cache_hash ON query_cache(query_hash);
```

**Step 2: Integrate cache into chat handler (10 min)**
Open `api/chat.ts`. Add the `cachedQuery` check before the vector retrieval step and the `writeCache` call after the LLM response. Use the implementations from the async reading.

**Step 3: Add model routing (10 min)**
Add the `routeQuery` function after the vector retrieval step. Pass the retrieved passage count and question to the router. Use the returned model name in the `anthropic.messages.create` call.

**Step 4: Verify with test queries (5 min)**
Make the same query twice; confirm the second returns instantly (cache hit). Make a factual query ("When was Du Bois born?") and confirm it routes to Haiku via console log. Make an interpretive query and confirm Sonnet.

## Synthesis / Gallery Share (15 min)

Each pair posts their "production readiness checklist" on the board — a list of cost controls they've confirmed are in place:

- [ ] Spending alert set at $25 in Anthropic Console
- [ ] query_cache table deployed with correct indexes
- [ ] Cache lookup integrated before LLM call
- [ ] Model router implemented with at least 3 factual signal patterns
- [ ] Rate limiter integrated in chat handler
- [ ] Rate limit 429 response tested

Facilitator walks the board and asks: which items are checked across all pairs? Which are missing? Unchecked items become the participant's next-session homework.

## Facilitator Notes
- The warm-up scenario is effective precisely because it's anxiety-inducing. Don't soften it. The goal is to motivate all three layers by showing what happens without them.
- During the workshop, the most common stumbling block is the cache integration order. The correct order is: rate limit → cache check → embed question → retrieve passages → route → LLM call → cache write → return. Any other order either misses optimization opportunities or introduces bugs (e.g., caching before rate limiting means rate-limited users can circumvent limits by querying popular questions).
- Pair composition matters: pair experienced developers with less experienced ones. The implementation is short enough (50–80 lines) that stronger developers can guide the approach while less experienced developers do the typing.
- The production readiness checklist is designed to be revisited at the Unit 11 (Deployment) session. Remind participants to save it.
