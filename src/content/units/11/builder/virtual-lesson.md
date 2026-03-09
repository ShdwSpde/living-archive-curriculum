# Unit 11: Deployment & Going Live — Virtual Lesson
**Pathway:** Archive Builder
**Duration:** 75 min
**Materials:** Slides, Vercel dashboard open in browser, archive GitHub repo open, functional test checklist shared in chat

## Agenda
| Time | Activity |
|------|----------|
| 0:00–0:10 | Check-in: share your functional test checklist results — what passed, what failed? |
| 0:10–0:30 | Live demo: full Vercel deployment walkthrough |
| 0:30–1:00 | Hands-on: deploy or verify + test + troubleshoot |
| 1:00–1:15 | Group debrief: rollback exercise and launch readiness |

## Slide Outline

**Slide 1: What Vercel Is Doing for You**
- Vercel = build server + CDN + serverless function runner
- Every push to main triggers a new build; preview deploys on every PR branch
- The production URL is always the most recently promoted deployment
- Key constraint: serverless functions have a 10-second timeout on Hobby tier (sometimes an issue for slow LLM responses)

**Slide 2: The Five Required Environment Variables**
- Table: SUPABASE_URL, SUPABASE_ANON_KEY, ANTHROPIC_API_KEY, GEMINI_API_KEY — what each is used for
- Where to find each one (Supabase → Settings → API; console.anthropic.com; Google AI Studio)
- Critical reminder: environment variables are not auto-applied to existing deployments — trigger a redeploy after adding
- Security: never put these in your code or in a .env file committed to Git

**Slide 3: The Functional Test Checklist**
- Walk through all five test categories: page load, query, UI features, error handling, mobile
- Live demo: run a query on the deployed Du Bois archive and narrate each check
- Emphasize the error handling test — many builders skip it and discover problems from user reports instead

**Slide 4: How to Roll Back**
- Show the Vercel deployments list on screen (screen share)
- Walk through: find previous deployment → promote to production → verify
- 30-second process; no code changes required
- When to roll back vs. when to push a hotfix: roll back for complete breakage; hotfix for minor issues

**Slide 5: What "Launch Ready" Looks Like**
- All five checklist items: pass
- Spending alert set: confirmed
- Soft launch testers contacted: yes
- Rollback procedure: practiced
- Steward named: yes
- When to advance to public launch: 1–4 weeks after soft launch, based on tester feedback

## Hands-On Activity (30 min)

**For participants with an archive ready to deploy (15–20 min):**
1. Connect GitHub repo to Vercel (or verify it's connected)
2. Confirm all four environment variables are set
3. Trigger a deployment and wait for it to complete
4. Run the functional test checklist against the production URL
5. Identify any failures and attempt to diagnose

**For participants whose archive is not yet at deploy-ready state (15–20 min):**
1. Open a partner's already-deployed archive (partner shares URL)
2. Run the functional test checklist as an external tester
3. Document findings: what passes, what seems slow, what is confusing for a new user
4. Write two tester feedback items that would prompt the builder to make a change

Both groups come back and share their checklist results in the group chat.

## Debrief Questions
1. Your Vercel build failed with "Error: Cannot find module 'web/dist/index.html'." What does this tell you and where do you look first?
2. A tester reports: "The first query takes 15 seconds; subsequent ones are much faster." What causes this and is it a problem you need to fix before public launch?
3. You pushed a hotfix for a broken citation link, but the fix isn't appearing on the live site. You've been waiting 10 minutes. What do you check?

## Facilitator Notes
- Before the session, verify that the Vercel dashboard UI hasn't changed significantly. Vercel updates their dashboard regularly; the specific menu locations ("Add New Project," "Environment Variables") may shift.
- The serverless function timeout on Hobby tier (10 seconds) is a real constraint. If a participant's archive regularly takes 12–15 seconds to respond, they have two options: upgrade to Pro tier (increases timeout to 60 seconds) or optimize the retrieval step. This is worth raising if it comes up.
- The "first query is slow" phenomenon is caused by serverless cold starts — Vercel spins up a new function instance for the first request. This is expected behavior, not a bug. Mention it proactively so participants don't misinterpret slow first queries as a quality problem.
- For the hands-on section, screen sharing is valuable here — ask a volunteer to share their screen while deploying. It allows the group to see the real Vercel UI and troubleshoot together.
