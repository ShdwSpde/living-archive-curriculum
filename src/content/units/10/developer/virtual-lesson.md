# Unit 10: Cost Modeling & Sustainability — Virtual Lesson
**Pathway:** Archive Developer
**Duration:** 75 min
**Materials:** Slides, codebase open in editor, Supabase dashboard open in browser, Anthropic Console open

## Agenda
| Time | Activity |
|------|----------|
| 0:00–0:10 | Check-in: did the cache hit/miss logging work? Share results. |
| 0:10–0:30 | Code review: caching + model routing implementations |
| 0:30–1:00 | Hands-on: rate limiter implementation and integration testing |
| 1:00–1:15 | Architecture review: putting cost controls together |

## Slide Outline

**Slide 1: The Cost Control Stack**
- Three layers: caching (reduce calls), routing (reduce cost per call), rate limiting (prevent abuse)
- Each layer is independently useful; together they give fine-grained control
- Expected savings: caching alone can cut LLM calls by 20–40% for archives with repeat visitors

**Slide 2: Cache Key Design Decisions**
- Why not cache on raw string: "What did Du Bois think about education?" vs. "what did du bois think about education?" → same answer, different cache entries
- Normalization strategy: lowercase, strip punctuation, collapse whitespace, MD5 hash
- TTL policy: stable corpus → 24–72hr; actively expanding → 6–12hr
- Show the hit_count field — a free analytics layer on popular questions

**Slide 3: Model Router Heuristics**
- The core insight: question structure predicts answer complexity better than length alone
- Walk through the factual signal patterns: when/where/what year/how many/list
- Show false positive case: "What are Du Bois's most important works?" → grammatically similar to factual, semantically interpretive
- Discussion: what additional signals improve accuracy?

**Slide 4: Rate Limiting Architecture Choices**
- In-memory (per-process): doesn't survive restarts, useless for serverless
- Supabase table: adds DB roundtrip, works at modest scale, no extra infrastructure
- Redis/Upstash: correct solution for production, adds external dependency
- Vercel KV: natively integrated with Vercel, simplest for this stack
- Recommendation: Supabase table for hobby/moderate scale; Vercel KV for growth scale

**Slide 5: Putting It Together — The Cost-Aware Request Path**
- Diagram: Request → Rate Limit Check → Cache Lookup → (cache hit: return) → (cache miss: embed + retrieve + route + LLM + cache write + return)
- Each step that short-circuits saves money
- Log the path taken for every request — essential for understanding real-world cost vs. estimates

## Hands-On Activity (30 min)

**Part 1: Code Review Pairs (15 min)**
Participants pair up and share their async prep implementations (caching functions). Each pair:
1. Reviews each other's `buildCacheKey` function — are the normalization choices consistent?
2. Reviews the TTL choice — is it appropriate for the corpus update frequency?
3. Checks for the upsert on `query_hash` conflict — this is the dedup guard on concurrent writes
4. Identifies one improvement to make before merging

**Part 2: Rate Limiter Implementation (15 min)**
Working individually, participants implement the Supabase-based rate limiter from the async reading. Steps:
1. Create the `query_log` table (add to Supabase schema)
2. Write the `checkRateLimit(ip)` function
3. Integrate into the chat handler before the cache check
4. Test: send 25 rapid queries from the same IP (use a curl loop or simple test script)
5. Verify the 429 response appears after the 20th query

Facilitator circulates and helps with the curl loop testing syntax.

## Debrief Questions
1. Your cache implementation is live. After two weeks, you look at the hit_count distribution and find 80% of cached entries have hit_count = 1 (only one cache hit each). What does this tell you about your archive's query patterns?
2. Your model router sends 30% of queries to Haiku. Your average monthly cost drops from $300 to $230. If a researcher complains that "the cheaper model gives worse answers on complex questions," how do you respond technically and institutionally?
3. The university library wants to know: "If we lose our Anthropic API key for two weeks (billing dispute), can we keep the archive running?" What does the cache layer do for this scenario? What doesn't it solve?

## Facilitator Notes
- Participants at different experience levels may have implemented the async prep tasks differently. The code review pairs work best when there's genuine variance in implementation choices to compare.
- The `upsert` with `onConflict: 'query_hash'` is the key concurrency detail in the caching implementation. Two simultaneous identical queries could both miss the cache and both try to write — the upsert handles this gracefully.
- The rate limiter exercise may take longer than 15 minutes for participants setting up the query_log table for the first time. Have a ready-made schema migration file available in the meeting chat as a backup.
- The debrief question about the library losing their API key is deliberately provocative — the correct answer is that caching helps (cached questions are served without an API key) but doesn't solve the problem (new questions fail). This opens a discussion about local LLM fallbacks, which is beyond this unit but worth acknowledging.
