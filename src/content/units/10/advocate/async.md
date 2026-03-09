# Unit 10: Cost Modeling & Sustainability — Async Materials
**Pathway:** Archive Advocate
**Duration:** 30–45 min

## Learning Objectives
- Identify the three main cost categories of a living archive and explain which one dominates ongoing operating expenses
- Describe at least two sustainability models an institution can use to fund an archive beyond an initial grant
- Construct a simple monthly cost estimate for your archive at three traffic scenarios using the provided cost benchmarks

## Reading

### What Running a Living Archive Actually Costs

Before you can write a grant budget or propose an archive to your institution, you need to understand what it costs to operate one. The good news: running a living archive is far cheaper than most administrators assume. The challenging news: the largest cost is essentially invisible — it appears as small charges per query that can compound if the archive gets popular.

**Three cost categories:**

**1. Build cost (one-time)**
Building the archive — setting up the database, chunking and embedding the corpus, configuring the API, deploying the frontend — is primarily a labor cost. If a developer does this work, the *infrastructure* cost is near zero: Supabase free tier, Vercel free tier, and free embedding quota from Google Gemini handle everything up to a moderate-sized corpus. The cost is developer time, which may be $0 (internal staff), $500–2,000 (a student assistant), or $3,000–8,000 (an external contractor).

**2. Infrastructure cost (monthly)**
Database hosting (Supabase) and web hosting (Vercel) are free at modest traffic levels. Supabase free tier supports archives with hundreds of thousands of chunks and hundreds of daily users. Vercel free tier supports typical academic traffic easily. Infrastructure costs only enter the picture at sustained high traffic — roughly 10,000+ queries/day over multiple months.

**3. LLM API cost (per query)**
This is the dominant ongoing cost. Every time a user submits a question, the archive calls an AI language model (Claude, GPT-4o-mini, or similar) to synthesize the answer. That call costs money.

**Current benchmark costs per query:**
- Claude Sonnet: ~$0.030 per query
- Claude Haiku: ~$0.008 per query
- GPT-4o-mini: ~$0.0014 per query

### Monthly Cost at Three Traffic Scenarios

Use these benchmarks to model your archive's expected costs:

**Hobby / small seminar (5–50 users/day)**
- Queries/month: ~500–1,500
- Claude Sonnet: $15–45/month
- Claude Haiku: $4–12/month
- GPT-4o-mini: $0.70–2.10/month
- Practical range: **$5–15/month** (most small archives)

**Moderate academic use (50–500 users/day)**
- Queries/month: ~1,500–15,000
- Claude Sonnet: $45–450/month
- Claude Haiku: $12–120/month
- GPT-4o-mini: $2–21/month
- Practical range: **$90–195/month** if using a mid-tier model

**Growth / public attention (500+ users/day)**
- Queries/month: 15,000+
- LLM costs become significant: **$520+ per month** at Sonnet pricing
- This scenario requires planning

### The "Went Viral" Scenario

Every living archive administrator needs a financial plan for the scenario where the archive gets press coverage or goes viral on social media. A tweet from a major academic account can send 5,000 people to your archive in 24 hours. At $0.030/query with each user asking 3 questions, that's $450 in a single day.

**What to ask your technical team before launch:**
- Is there a per-user rate limit? (e.g., 20 queries per IP address per hour)
- Is there a daily spending cap set in the API console?
- What happens when we hit the cap — does the archive return an error, or silently stop responding?
- How quickly can we switch to a cheaper model if we need to reduce costs?

These questions aren't about being pessimistic — they're about protecting the archive's long-term availability. An archive that exhausts its API budget in one viral week and then goes dark is worse than one that rate-limits intelligently.

### Sustainability Models

Most living archives launch on grant funding. The harder question is what happens when the grant ends.

**Endowment model:** A one-time gift of $50,000–150,000 invested conservatively at 4% yields $2,000–6,000/year — enough to run a moderate archive indefinitely. This is the most sustainable model for permanent archives.

**Institutional subsidy:** The library, digital humanities center, or academic department absorbs the operating cost as a line item. At $100–200/month, this is comparable to a journal subscription and is easy to justify institutionally.

**Grant renewal:** Write a second grant before the first one ends. Many funders explicitly support archival infrastructure. NHPRC, NEH Digital Humanities, Andrew Mellon Foundation, and state humanities councils are common sources.

**Consortium model:** Multiple institutions share the cost. Four institutions at $25/month each cover a moderate archive entirely.

## Reflection Questions
1. Your institution's digital humanities center asks you to project the archive's annual operating cost. Assuming 100 users/day each asking 3 questions, and using Claude Haiku pricing ($0.008/query), what is your monthly estimate? What would you recommend building into the grant budget as an operating contingency?
2. A program officer asks why you can't just "turn it off when the grant ends." What do you say? What continuity commitment would you ask the institution to make before you launch?
3. You learn that 80% of your operating cost is the LLM API. The technical team says you could switch to GPT-4o-mini and cut costs by 95%, but answer quality may decline. How do you frame this tradeoff to your advisory board?

## Prep Task
Before your next session: Using the cost benchmarks in this reading, build a simple monthly cost spreadsheet for your archive. Model three scenarios: conservative (25 users/day, 2 queries each), moderate (150 users/day, 3 queries each), and ambitious (500 users/day, 4 queries each). For each scenario, calculate monthly LLM cost at Haiku and Sonnet pricing. Bring the spreadsheet to your next session.
