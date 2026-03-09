# Unit 11: Deployment & Going Live — In-Person Lesson
**Pathway:** Archive Builder
**Duration:** 75 min
**Room setup:** Laptop tables with power and good WiFi, projection screen
**Materials:** Printed functional test checklist (one per participant), environment variable reference cards

## Agenda
| Time | Activity |
|------|----------|
| 0:00–0:10 | Warm-up: "What's the scariest part of going live?" |
| 0:10–0:30 | Live demo: deployment on the projection screen |
| 0:30–1:00 | Workshop: deploy + test + simulate rollback |
| 1:00–1:15 | Synthesis: launch readiness checklist review |

## Warm-Up Activity (10 min)
Ask the room: "What's the part of going live that makes you most anxious?" Take answers on the whiteboard.

Common responses: something breaking in public, a surprise bill, giving out a URL that's embarrassing, the archive returning a wrong answer that someone screenshotted.

Acknowledge each anxiety, then frame the session: "Every item on this board has a specific mitigation. By the end of today, you'll have addressed each one."

## Facilitated Presentation / Live Demo (20 min)

### The Deployment Process

On the projection screen, walk through a live deployment (or a recorded walkthrough if live demo is impractical):

**Connect the repository:**
Go to vercel.com → Add New Project → Import from GitHub. Select the archive repo. Walk through the build configuration:
- Framework: Vite
- Build command: the specific command for this project structure
- Output directory: `dist` or `web/dist`

**Set environment variables:**
Show the environment variables tab before clicking Deploy. Use the reference card to walk through each variable: what it is, where to find it, what happens if it's missing. This is the step most builders skip — "I'll add it later" — and it causes the first deploy to fail.

**Deploy and watch:**
Click Deploy. Walk through the build log in real time. Point to: the install step, the build step, the function compilation step. Each one can fail for different reasons.

**First deploy checklist:**
After the build completes, run the functional test checklist live on the projection screen. Ask the room to evaluate each result.

### The Rollback Procedure

Demo the rollback process:
1. Go to Deployments in the Vercel dashboard
2. Find the previous deployment
3. Click "Promote to Production"
4. Show the instant traffic redirect

"This is your safety net. It takes 30 seconds and requires no code changes. Know where it is before you need it."

## Workshop Activity (30 min)

Participants work individually (or in pairs for those without a ready archive).

**For participants with a deployable archive:**

1. **Deploy (or verify):** Connect to Vercel, set environment variables, deploy. OR confirm existing deployment is up to date.

2. **Run the functional test checklist:** Use the printed checklist. Check off each item. Note any failures.

3. **Simulate a rollback:** In the Vercel dashboard, find the previous deployment. Practice the "Promote to Production" flow (or just practice finding where the button is). You don't need to actually promote unless you've broken something.

4. **Check environment variables:** Confirm all four required variables are present. Remove one temporarily and trigger a query — note the error. Restore the variable. Trigger a new deployment.

**For participants without a deployable archive:**

1. **Partner testing:** Use a partner's deployed URL and run the full functional test checklist as an external tester. Document your findings in detail.

2. **Environment variable exercise:** Given a list of six strings (mix of real and fake API keys), identify which are Supabase URLs, which are Anthropic keys, and which are anon keys. (Use format recognition, not content — this is a pattern exercise, not a security exercise.)

3. **Draft your deployment readiness list:** What three things do you need to complete before you can deploy? Make the list specific and actionable.

## Synthesis / Launch Readiness Checklist (15 min)

Each participant reviews the launch readiness checklist:
- [ ] Archive deployed to Vercel with production URL
- [ ] All four environment variables confirmed in Vercel dashboard
- [ ] Functional test checklist: all five items pass
- [ ] Spending alert set in Anthropic Console
- [ ] Rollback procedure: know where the button is
- [ ] Soft launch testers identified (minimum 3 people)
- [ ] Named steward committed for Year 1

For any unchecked item, write the specific next action and when you'll complete it.

Share with the room: what's the one item that's hardest to complete? Facilitator notes patterns — typically it's either "soft launch testers identified" or "named steward committed."

## Facilitator Notes
- The warm-up anxiety list almost always includes "what if something breaks." Frame the rollback demo as the direct answer to this anxiety — the specific, 30-second fix.
- WiFi reliability is critical for this session. Have a backup plan: a recorded deployment video, or a partner's deployed archive that can be used for the functional test demo.
- During the workshop, the most common issue is the build failing because of a path mismatch (build command or output directory). Have common error messages and fixes ready:
  - "Cannot find module 'dist/index.html'" → output directory set wrong
  - "Error: VITE_SUPABASE_URL is not defined" → environment variable naming mismatch (some vars need VITE_ prefix for the frontend)
  - Build succeeds but API returns 500 → missing server-side environment variable (no VITE_ prefix)
- The VITE_ prefix distinction is a common gotcha: frontend environment variables (used in React components) need the `VITE_` prefix to be exposed. Backend environment variables (used in API functions) should NOT have the prefix — they're server-only secrets.
