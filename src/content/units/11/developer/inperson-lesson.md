# Unit 11: Deployment & Going Live — In-Person Lesson
**Pathway:** Archive Developer
**Duration:** 75 min
**Room setup:** Laptop tables with power and reliable WiFi, projection screen
**Materials:** Printed vercel.json reference card, DNS record worksheet, deployment lifecycle diagram

## Agenda
| Time | Activity |
|------|----------|
| 0:00–0:10 | Warm-up: deployment war stories |
| 0:10–0:30 | Presentation: production deployment architecture and Vercel configuration |
| 0:30–1:00 | Workshop: multi-environment setup + CLI deployment + domain walkthrough |
| 1:00–1:15 | Production readiness review and monitoring stack check |

## Warm-Up Activity (10 min)
Ask the room: "Has anyone deployed something to production and immediately discovered a problem? What happened?"

Collect 2–3 stories. Common themes: environment variable missing, build succeeded but runtime error, database query that worked in development but timed out in production, a hardcoded URL pointing to localhost.

Frame: "Every one of these failures has a systematic prevention. Today we build those systems."

## Facilitated Presentation (20 min)

### The Production Deployment Architecture

On the projection screen, draw the deployment pipeline:

```
Developer pushes code to GitHub main branch
    → Vercel build triggered automatically
    → Build compiles React frontend + TypeScript API functions
    → Successful build becomes a deployment candidate
    → Developer promotes deployment to production
    → Vercel routes production traffic to new deployment
    → Previous deployment remains in history (rollback available)
```

Key concepts to cover:

**Immutable deployments:** Every successful build is permanently stored. Production is just a pointer to one of them. Rolling back = changing the pointer. This is why rollbacks are fast and safe.

**Environment isolation:** Development, preview, and production are separate environments with separate configuration. A mistake in development cannot affect production.

**The vercel.json contract:** This file tells Vercel exactly how to build and route your project. Without it, Vercel guesses — usually correctly, but not always. The reference card shows the configurations for common archive structures.

### The VITE_ Prefix Problem

Walk through the environment variable naming convention, which trips up nearly every new Vercel deployer:

```
VITE_SUPABASE_URL=...    ← exposed to frontend React code (unsafe for secrets)
SUPABASE_URL=...         ← available only to server-side API functions (safe for secrets)
```

Consequences of getting this wrong:
- Secret API key with VITE_ prefix: exposed in the browser, security risk
- Non-prefixed variable used in frontend code: `undefined` at runtime, silent failure
- Missing variable on server: 500 error with cryptic message

Rule: only variables explicitly needed by frontend React components get the VITE_ prefix. Everything else does not.

## Workshop Activity (30 min)

Participants work in pairs. Each pair has at least one participant with an archive codebase.

**Step 1: CLI Setup and Environment Audit (8 min)**
```bash
npm install -g vercel
vercel login
vercel link  # link to existing project or create new
vercel env ls production
vercel env ls preview
```

Compare the two lists. Are they identical? If not, add the missing variables:
```bash
vercel env add [VARIABLE_NAME] preview
```

**Step 2: vercel.json Configuration (10 min)**
Using the reference card, create or update `vercel.json` for the correct project structure. Key decisions:
- Is the React app in `web/` or root? (affects build path)
- Should the chat function use edge or node runtime? (affects timeout)
- What's the correct output directory?

Deploy a preview to test:
```bash
vercel  # preview deploy — does not touch production
```

Check the preview URL. Does the archive work correctly?

**Step 3: Custom Domain Walkthrough (12 min)**
Using the DNS record worksheet, work through the domain configuration:
1. Run `vercel domains add [domain or subdomain]`
2. Record the A record and CNAME record Vercel provides
3. Log into DNS provider, enter the records
4. Note the expected propagation time (0–48 hours)
5. Set a calendar reminder to check DNS propagation tomorrow

If no domain is available: work through a simulated DNS configuration using the worksheet — match record types to Vercel's requirements without actually submitting them.

## Production Readiness Review (15 min)

Working through the printed deployment lifecycle diagram, each participant marks their current status:

**Build and Deploy:**
- [ ] vercel.json committed to repository
- [ ] All environment variables confirmed in production environment
- [ ] Preview deploy tested and functional
- [ ] Production deployment active

**Monitoring:**
- [ ] Vercel Analytics enabled and collecting data
- [ ] Anthropic Console spending alert set
- [ ] Function logs accessible via CLI (`vercel logs --follow`)
- [ ] Supabase dashboard bookmarked

**Operations:**
- [ ] Rollback procedure practiced
- [ ] Key rotation procedure documented
- [ ] Rate limiter deployed (from Unit 10)
- [ ] Cache implemented (from Unit 10)

Any unchecked item becomes a specific next action. Pairs share their highest-priority unchecked item.

## Facilitator Notes
- The VITE_ prefix discussion is the highest-value technical content in this session. Spend time on it. Show a real example of a variable that should and shouldn't have the prefix.
- During the CLI setup, participants may have trouble with `vercel link` if they're using an organization account. Have the Vercel dashboard method available as a backup for the environment variable audit.
- The production readiness checklist combines Unit 10 (cost controls) and Unit 11 (deployment) items deliberately. By Unit 11, participants should have most of the Unit 10 items done. Any gaps are visible here.
- DNS propagation cannot complete during the session. Manage expectations: entering the records is the achievement; verification is a next-day task.
- For participants working with institutional infrastructure (university servers, self-hosted alternatives to Vercel): the concepts apply, but the specific CLI commands do not. Have a brief alternate path prepared: the core ideas (immutable deploys, environment separation, rollback) apply to any modern deployment platform.
