# Unit 10: Cost Modeling & Sustainability — Async Materials
**Pathway:** Archive Builder
**Duration:** 30–45 min

## Learning Objectives
- Calculate expected monthly LLM costs for your archive at three traffic levels using the playbook cost calculator
- Set a spending alert in the Anthropic Console before going live
- Locate the model parameter in `api/chat.ts` and describe the steps to switch to a less expensive model

## Reading

### What You're Actually Paying For

When you run a living archive, money flows in one main direction: the LLM API call that generates each answer. Understanding this cost at the code level lets you manage it intelligently.

**The per-query anatomy:**

Every time a user asks a question, the archive makes one significant API call. That call sends:
- A system prompt (~200–400 tokens): defines the archive's behavior and persona
- Retrieved passages (~1,000–1,400 tokens): the top-K chunks from vector search
- The user's question (~50–200 tokens): the actual query

And receives:
- An answer (~300–500 tokens): the synthesized response with citations

Total: roughly 1,500–2,500 input tokens + 350–500 output tokens per query.

At Claude Sonnet pricing ($3/1M input tokens, $15/1M output tokens):
- Input cost: 2,000 tokens × $3/1M = $0.006
- Output cost: 400 tokens × $15/1M = $0.006
- **Total per query: ~$0.012–0.030** (varies with passage length and response length)

At Claude Haiku pricing ($0.80/1M input, $4/1M output):
- **Total per query: ~$0.003–0.008**

At GPT-4o-mini pricing ($0.15/1M input, $0.60/1M output):
- **Total per query: ~$0.0005–0.0014**

### The Cost Calculator

Use this formula to model your archive's expected monthly costs:

```
Monthly queries = DAU × avg_queries_per_user × 30
Monthly cost = monthly_queries × cost_per_query
```

**Reference scenarios:**

| Scenario | DAU | Queries/user | Monthly queries | Sonnet/mo | Haiku/mo |
|----------|-----|-------------|----------------|-----------|----------|
| Hobby | 10 | 3 | 900 | $27 | $7 |
| Seminar | 30 | 5 | 4,500 | $135 | $36 |
| Moderate | 100 | 5 | 15,000 | $450 | $120 |
| Growth | 500 | 4 | 60,000 | $1,800 | $480 |

At hobby scale, the archive effectively costs nothing. At seminar scale, it costs less than a textbook per month. The cost only becomes a real budget question at moderate scale and above.

### Setting a Spending Alert

Before your archive receives its first external visitor, set up a spending alert. This takes two minutes and protects you from the scenario where a spike in traffic generates a surprise bill.

**Steps:**
1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Navigate to Settings → Billing (or Usage Limits, depending on the current UI)
3. Set a notification threshold at $25 (early warning) and $75 (action required)
4. Confirm your billing email is correct — the alert goes there, not to a dashboard

**Important limitation:** Anthropic spending alerts are notifications, not hard caps. Your API will continue to accept calls even after the alert threshold is passed. The alert tells you to act; it does not act for you. If you want a hard cap, you need either a prepaid credit balance (API calls stop when the balance hits zero) or a per-user rate limit implemented in your API code.

### How to Switch to a Cheaper Model

The model is configured in your API route handler. In the Du Bois Living Archive codebase, find this in `api/chat.ts` or `web/api/chat.ts`:

```typescript
const response = await anthropic.messages.create({
  model: 'claude-sonnet-4-5',   // ← this is the model parameter
  max_tokens: 1024,
  messages: [...],
});
```

To switch to Haiku:
```typescript
model: 'claude-haiku-4-5',
```

**What changes:** Response latency (Haiku is faster), answer length (Haiku tends to be more concise), and answer depth (Haiku handles factual queries well; complex interpretive synthesis may be less rich).

**What stays the same:** All citations, all source retrieval, the sidebar, the tour player — everything except the synthesis step.

**When to switch:**
- Budget constraint: switching Sonnet → Haiku saves ~75% of LLM cost
- Traffic spike: if a surge threatens to exceed your monthly budget, switch models temporarily
- Testing: use Haiku during development and beta testing, switch to Sonnet for production launch

### What to Do If You Get a Surprise Bill

1. Check the Anthropic Console usage tab for the dates and volumes that generated the spike
2. Look at your server logs for the same date range — was it normal usage, a specific IP making hundreds of calls, or a crawler?
3. If it was a bot or crawler, add IP-based rate limiting (discussed in the Developer path)
4. If it was genuine usage, calculate whether this traffic level is sustainable at your current model tier or whether you need to switch

Anthropic's support team is responsive to billing questions from new accounts, especially if the spike appears anomalous. If you believe charges were erroneous, contact support immediately.

## Reflection Questions
1. Your archive uses Claude Sonnet and you expect 75 users/day asking 4 questions each. Calculate your expected monthly cost. Now calculate the monthly savings from switching to Haiku. Is the quality tradeoff worth it at this traffic level?
2. You set a $25 spending alert and it fires on Day 8 of the month. What does this tell you about your traffic estimate? What's the first thing you check in the Anthropic Console?
3. The playbook recommends setting spending alerts before your first external visitor. Why is this timing important? What is the risk of setting the alert after the archive is already in use?

## Prep Task
Before your next session: Open the Anthropic Console, navigate to billing settings, and set a spending alert at $25. Take a screenshot confirming the alert is set. Also find the model parameter in your archive's `api/chat.ts` file and note the current model name. Bring both to the next session.
