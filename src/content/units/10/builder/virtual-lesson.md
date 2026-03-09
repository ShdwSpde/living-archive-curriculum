# Unit 10: Cost Modeling & Sustainability — Virtual Lesson
**Pathway:** Archive Builder
**Duration:** 75 min
**Materials:** Slides, Anthropic Console open in browser, archive codebase open in editor

## Agenda
| Time | Activity |
|------|----------|
| 0:00–0:10 | Check-in: show your spending alert screenshot — did everyone set one? |
| 0:10–0:30 | Presentation: Cost anatomy and the model switching workflow |
| 0:30–1:00 | Hands-on: live cost modeling + optional model switch exercise |
| 1:00–1:15 | Group debrief: sustainability and budget conversations |

## Slide Outline

**Slide 1: The Per-Query Cost Breakdown**
- Anatomy of one query: system prompt + retrieved passages + user question + answer
- Token counts: ~2,000 input + ~400 output per typical query
- Show the math live: 2,000 × $3/1M = $0.006 input; 400 × $15/1M = $0.006 output
- Total: ~$0.012–$0.030 depending on passage count and answer length

**Slide 2: The Cost Calculator in Action**
- Walk through the formula: DAU × queries/user × 30 × cost/query
- Live demo: calculator with three traffic scenarios side by side
- Key takeaway: hobby scale is essentially free; costs only matter above 50 DAU

**Slide 3: Spending Alerts — The Two-Minute Setup**
- Screen share: Anthropic Console → Billing → Notifications
- Show where to set the thresholds ($25 warning, $75 action)
- Critical clarification: alerts are notifications, not hard caps
- Options for hard caps: prepaid credit balance, IP-based rate limiting in code

**Slide 4: Model Switching**
- Screen share: `api/chat.ts`, highlight the model parameter
- Show the one-line change: `claude-sonnet-4-5` → `claude-haiku-4-5`
- Cost comparison: Sonnet at 100 DAU = $450/month; Haiku at 100 DAU = $120/month
- When to switch: budget pressure, traffic spikes, development/testing phases

**Slide 5: Responding to a Surprise Bill**
- Walk through the diagnostic steps: usage tab → date range → server logs → IP check
- Common culprits: bots/crawlers, testing scripts left running, unexpected press mention
- Anthropic support process for billing disputes

## Hands-On Activity (30 min)

**Part 1: Live Cost Modeling (15 min)**
Each participant opens the cost calculator spreadsheet (linked in meeting chat). Working individually:
1. Enter your estimated DAU for launch week and launch month 6
2. Calculate monthly cost at Sonnet and Haiku for both scenarios
3. Identify your "switch threshold" — the monthly cost that would trigger a model change

Share results in the group chat (just the numbers, not personal details).

**Part 2: Model Switch Exercise (15 min) — optional for those with a working archive**
Participants who have a deployed or local archive:
1. Locate the model parameter in `api/chat.ts`
2. Change from Sonnet to Haiku (or vice versa)
3. Make one query to the archive and note any quality difference
4. Revert to the original model (or keep Haiku if preferred)

Participants without a deployed archive: review the cost calculator and draft a Year 1 budget narrative (two paragraphs: build cost + Year 1 operations).

## Debrief Questions
1. At what traffic level does your cost estimate move from "negligible" to "requiring institutional sign-off"?
2. If you had to explain your model choice (Sonnet vs. Haiku) to a non-technical administrator, what would you say?
3. What's the one sustainability commitment you'd want from your institution before you officially launch? How would you get that commitment in writing?

## Facilitator Notes
- Verify the Anthropic Console UI before the session — the billing interface changes occasionally, and participants will be following along in real time.
- The "spending alerts are not hard caps" point consistently surprises builders. Emphasize it: the only way to prevent charges from exceeding a threshold is either a prepaid credit balance or code-level rate limiting.
- During the hands-on section, keep a chat log of participants' cost estimates — they're useful for the debrief and for participants' own reference.
- Some participants may not have access to the Anthropic Console if they're using an institution-managed API key. Have them work with the cost calculator and skip the console-configuration steps.
