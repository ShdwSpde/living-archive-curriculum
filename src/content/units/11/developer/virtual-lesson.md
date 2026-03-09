# Unit 11: Deployment & Going Live — Virtual Lesson
**Pathway:** Archive Developer
**Duration:** 75 min
**Materials:** Slides, Vercel CLI installed, vercel.json open in editor, DNS provider access (for domain exercise)

## Agenda
| Time | Activity |
|------|----------|
| 0:00–0:10 | Check-in: share your vercel.json + analytics screenshot — what worked, what didn't? |
| 0:10–0:30 | Code review: vercel.json configurations and edge function routing |
| 0:30–1:00 | Hands-on: multi-environment variable management + custom domain setup |
| 1:00–1:15 | Group debrief: production monitoring and the deployment lifecycle |

## Slide Outline

**Slide 1: The Vercel Deployment Model**
- Build pipeline: source → build → deploy → CDN
- Every deploy is immutable and addressable by URL
- Production = the most recently promoted deployment (not the latest build)
- Preview deploys: every branch gets its own URL, never touches production traffic

**Slide 2: vercel.json Configuration Patterns**
- Minimal config vs. explicit config — when each is appropriate
- Function routing: `/api/*` → serverless functions, `/*` → static files
- Edge vs. Node runtime: tradeoffs for the chat function (latency vs. module compatibility)
- Timeout configuration: Hobby (10s), edge on Hobby (30s), Pro (60s)
- Show a real `vercel.json` with annotations

**Slide 3: Multi-Environment Variable Strategy**
- Three environments: development (.env), preview (Vercel preview), production (Vercel production)
- Why separate Supabase projects per environment prevent corpus corruption
- CLI workflow: `vercel env ls`, `vercel env add`, `vercel env pull`
- The rotation workflow: rm → add → deploy (never update in place)

**Slide 4: Custom Domains and DNS**
- A record vs. CNAME: which to use for apex vs. subdomain
- Vercel's DNS requirements: `76.76.21.21` for A records, `cname.vercel-dns.com` for CNAMEs
- SSL: automatic via Let's Encrypt once DNS propagates
- Subdomain for institutional embedding: `dubois.university.edu` pattern

**Slide 5: Production Monitoring Stack**
- Vercel function logs: `vercel logs --follow` for live streaming
- Vercel Analytics: built-in, privacy-focused, zero-config after npm install
- Anthropic Console: per-day API usage, model breakdown, latency percentiles
- Supabase dashboard: query count, storage growth, active connections
- Alert thresholds to set before launch

## Hands-On Activity (30 min)

**Part 1: Multi-Environment Variables (15 min)**
Each participant:
1. Uses `vercel env ls production` to audit current production variables
2. Uses `vercel env ls preview` to compare with preview variables
3. Identifies any variables that exist in production but not preview (or vice versa)
4. For one variable (choose a non-sensitive one like a feature flag), practices the full rotation workflow: `env rm` → `env add` → `vercel` (preview deploy to verify)

Report: were your environments in sync? What was missing?

**Part 2: Custom Domain Walk-Through (15 min)**
Participants who have a domain available:
1. Run `vercel domains add [domain]` in CLI
2. Note the required DNS records Vercel provides
3. Log into their DNS provider and enter the records
4. Confirm Vercel shows "DNS pending" → do not wait for propagation during the session; note the time and check 24 hours later

Participants without a domain:
1. Using a partner's project or a practice environment, walk through the `vercel.json` edge function configuration
2. Deploy a preview with the edge runtime enabled for the chat function
3. Compare response time between edge and node runtime (make 3 queries to each, note latency)

## Debrief Questions
1. You're deploying an update that changes the system prompt. You want to test it in preview without affecting production. Walk through the exact CLI commands to: (a) deploy to preview, (b) test the preview URL, and (c) promote to production.
2. Your Vercel Analytics shows 90% of traffic is from one US city and 10% from your institution's location. The archive is theoretically open to anyone. What explains this pattern, and does it concern you?
3. You're monitoring function logs and see 50 requests per minute between 2am and 4am — more than during peak afternoon hours. What do you investigate, and what do you implement if the diagnosis confirms automated traffic?

## Facilitator Notes
- The multi-environment variable exercise surfaces a genuine operational habit — most developers maintain dev and production environments but neglect staging/preview parity. The audit step reliably finds discrepancies.
- Custom domain DNS propagation cannot be completed during the session. Set the expectation clearly: you'll start the process today and verify 24 hours later. This is normal; it's not a sign that something went wrong.
- The 2am traffic question in debrief is designed to surface the bot/crawler issue. The correct response is: check IP distribution (a handful of IPs making many requests = bot), implement rate limiting (from Unit 10), and check the user-agent header. Rate-limiting bots is the developer's job; deciding whether to block search engine crawlers (which might actually be desirable for discoverability) is a policy question for the advocate.
- Participants may ask about CI/CD integration (GitHub Actions triggering Vercel deploys). This is a valid advanced topic: the answer is that Vercel handles this automatically for the main branch; custom GitHub Actions workflows add value for running tests before promoting to production.
