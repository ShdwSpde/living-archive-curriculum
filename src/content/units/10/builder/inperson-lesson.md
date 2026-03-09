# Unit 10: Cost Modeling & Sustainability — In-Person Lesson
**Pathway:** Archive Builder
**Duration:** 75 min
**Room setup:** Laptop tables, projection screen, participants bring their own laptops
**Materials:** Printed cost modeling worksheets, spending alert checklist cards

## Agenda
| Time | Activity |
|------|----------|
| 0:00–0:10 | Warm-up: cost estimation game |
| 0:10–0:30 | Presentation: From tokens to dollars — how API pricing works |
| 0:30–1:00 | Workshop: Configure alerts + model switching exercise |
| 1:00–1:15 | Synthesis: budget conversations and the sustainability handoff |

## Warm-Up Activity (10 min)
Write on the board: "A user asks your archive one question. How much does that cost?"

Take guesses from the room. Most participants will be off by at least one order of magnitude in one direction or another. Some will say "a few cents" (close); others will say "nothing" or "$1–2."

Reveal the answer: approximately $0.012–$0.030 for a typical Claude Sonnet query. Then: "How many queries can you get for $1?" (~33–83). "For $100/month?" (~3,300–8,300). This immediately grounds the conversation in real numbers.

## Facilitated Presentation (20 min)

### Token Counting and API Pricing

Walk through the token anatomy of a query on the projection screen. Open the archive's system prompt in an editor and show its approximate length (200–400 tokens). Open a sample retrieved passage and show its length (~200 tokens × 5 passages = ~1,000 tokens). Add the user question (~100 tokens) and estimate the total input: ~1,500 tokens.

Show the calculation live:
```
Input cost:  1,500 tokens × $3/1,000,000  = $0.0045
Output cost:   400 tokens × $15/1,000,000 = $0.006
Total: ~$0.010–0.030 per query
```

Walk through the comparison table on the projected slide: Sonnet / Haiku / GPT-4o-mini side by side.

### The Monthly Math

Build the cost model live on the whiteboard:
```
100 DAU × 4 queries/day × 30 days = 12,000 queries/month
12,000 × $0.025 (Sonnet avg) = $300/month
12,000 × $0.007 (Haiku avg)  = $84/month
```

Ask: "At what DAU does Sonnet become unsustainable without institutional funding?" Let the group work it out: around 150–200 DAU, the monthly cost (~$450–$600) requires a formal budget conversation.

### Hard vs. Soft Cost Controls

The alert vs. hard cap distinction is critical:
- **Alert (email notification):** tells you when you've hit a threshold; API keeps running
- **Prepaid credit balance:** API stops when balance hits $0; requires manual reloading
- **Code-level rate limiting:** the only way to prevent individual users from driving up costs

Recommendation for builders: set both a spending alert AND a prepaid credit balance. The combination gives you both warning and protection.

## Workshop Activity (30 min)

### Part 1: Spending Alert Setup (10 min)
Each participant:
1. Opens Anthropic Console on their laptop
2. Navigates to billing settings
3. Sets a $25 alert threshold
4. Confirms their billing email
5. Checks the spending alert confirmation card (distributed at the start)

Facilitator circulates to help. Common issue: participants using an institutional API key may not have billing access — they should note who to ask.

### Part 2: Model Switching Exercise (20 min)
Each participant opens their archive's `api/chat.ts` in their editor. Working with the person next to them:

1. Find the model parameter (facilitator shows location on projector)
2. Change `claude-sonnet-4-5` to `claude-haiku-4-5`
3. Start the local dev server and ask the archive 2–3 questions
4. Rate the answer quality on a 1–5 scale for each question
5. Switch back to Sonnet and ask the same questions; compare ratings
6. Based on the comparison, decide which model you'd use for your launch

Pairs share their findings: at what point (if any) did the model switch noticeably affect answer quality?

## Synthesis / Gallery Share (15 min)
Each participant writes their answer to two questions on a card posted on the wall:
1. "My monthly cost estimate at launch traffic: ____"
2. "My sustainability plan: ____" (one sentence)

Facilitator walks the gallery. Note: the range of cost estimates. Point out that most estimates cluster in a $15–$300/month range — all within institutional reach.

Close: "Now you have the numbers. The sustainability conversation is no longer abstract. You can tell your institution exactly what it costs and what commitment you need."

## Facilitator Notes
- Print the "spending alert checklist" cards in advance: a small card with the 4-step alert-setup process that participants can keep. Reduces fumbling during the hands-on section.
- During the model switching exercise, watch for participants who are not getting noticeably different answers. For straightforward factual queries, Sonnet and Haiku perform very similarly. For complex interpretive synthesis, the difference is more visible. Adjust the question prompts accordingly.
- Some participants may be on Windows and have different path conventions for the codebase. `api/chat.ts` vs. `web/api/chat.ts` vs. `src/api/chat.ts` — adjust to their specific project structure.
- The "prepaid credit balance" option for hard caps is less well-known. If time permits, show how to set it up in the Console. It's a meaningful protection for builders who are risk-averse about billing.
