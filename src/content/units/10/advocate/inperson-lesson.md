# Unit 10: Cost Modeling & Sustainability — In-Person Lesson
**Pathway:** Archive Advocate
**Duration:** 75 min
**Room setup:** Tables of 4, projection screen, whiteboard
**Materials:** Printed cost modeling worksheets (one per participant), markers, sticky notes, calculators or phones

## Agenda
| Time | Activity |
|------|----------|
| 0:00–0:10 | Warm-up: what's the most expensive database subscription your institution pays for? |
| 0:10–0:30 | Presentation: How living archive costs actually work |
| 0:30–1:00 | Workshop: Cost modeling + budget narrative drafting |
| 1:00–1:15 | Gallery share + sustainability model mapping |

## Warm-Up Activity (10 min)
Ask participants: "What's the most expensive digital resource your institution pays for annually? Ballpark figure."

Take a few answers — typically $5,000–$50,000 for databases, journal packages, software licenses. Note the range on the board.

Then: "A well-run living archive costs $90–$195/month at moderate academic use. That's $1,080–$2,340/year. Where does that fit in what you just described?"

This reframes the cost conversation immediately: the question isn't whether institutions can afford it, but whether they'll prioritize it.

## Facilitated Presentation (20 min)

### The Build vs. Operate Distinction
On the whiteboard, draw two columns: Build (one-time) and Operate (monthly).

Build column: Developer time is the cost. Infrastructure (database, hosting, embedding) is near-zero. A working archive can be built for $0–$5 in direct costs.

Operate column: LLM API is 80%+ of cost. Write on the board: "Sonnet: $0.030/query. Haiku: $0.008/query. GPT-4o-mini: $0.0014/query."

Ask: "If 100 people use the archive today and each asks 4 questions, how much does that cost?" Let the room calculate: 400 queries × $0.030 = $12. That's one day. $12 × 30 days = $360/month. At Haiku: $96/month.

### The Traffic Scenarios
Walk through the three scenarios from the reading. Emphasize: these aren't hypothetical — these are the actual cost tiers the Du Bois Living Archive operates within.

The key message for advocates: You don't need to track this daily, but you need to know the number and have a plan if it changes.

### The Four Questions to Ask Your Technical Team
Write these on the board. Tell participants: before any launch conversation, get written answers to all four:
1. What is our current monthly cost at expected traffic?
2. What safeguards prevent runaway costs (rate limits, spending caps)?
3. What is the minimum cost to keep the archive in maintenance mode?
4. How quickly can we switch to a cheaper model?

## Workshop Activity (30 min)

### Round 1: Cost Modeling (15 min)
Distribute the printed cost modeling worksheet. Each participant works individually to model their archive (or a hypothetical one) at three traffic scenarios:
- Conservative: 25 users/day, 2 queries each
- Moderate: 150 users/day, 3 queries each
- Ambitious: 500 users/day, 4 queries each

For each scenario, calculate monthly cost at Haiku and Sonnet pricing. The worksheet provides the formula.

### Round 2: Sustainability Model Selection (15 min)
Each table reviews the three sustainability models together:
- Endowment: what would it take to fund this in perpetuity?
- Institutional subsidy: which budget line absorbs this cost?
- Grant renewal: which funder is the most likely Year 3 source?

Tables answer in writing: which model (or combination) fits their institution, and what specific commitment they'd need before launch.

## Gallery Share (15 min)
Each table posts two things on the wall:
1. Their monthly cost estimate (moderate scenario, Haiku pricing)
2. Their sustainability plan in one sentence: "After the launch grant ends, [institution/model] covers operations."

Facilitator walks the gallery. Note: the range of monthly estimates (likely $20–$250) and the range of sustainability models. Point out commonalities and differences.

Close with: "Every post-it on that wall is a budget conversation waiting to happen. You now have the numbers to have it."

## Facilitator Notes
- Check Anthropic and OpenAI pricing before this session. Prices change; the relative ordering (Sonnet > Haiku > GPT-4o-mini) is stable, but specific numbers may shift.
- The warm-up reliably generates useful anchors. Participants who work in large research libraries will cite $50,000+ subscriptions; community college staff may cite $3,000 packages. Both illustrate the point.
- Some participants will worry that they don't know their institution's budget process well enough to complete the sustainability section. Encourage them to focus on who they'd ask, rather than the specific answer.
- The "minimum maintenance mode" cost question is important. The answer is typically $20–$50/month (using a cheap model, minimal traffic). Knowing this helps advocates argue for institutional subsidy even in lean budget years.
