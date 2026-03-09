# Unit 11: Deployment & Going Live — Async Materials
**Pathway:** Archive Builder
**Duration:** 30–45 min

## Learning Objectives
- Deploy a living archive to Vercel via the web dashboard by connecting a GitHub repository and setting all required environment variables
- Verify the live deployment by running a functional test checklist against the production URL
- Execute a rollback to the previous deployment when a bad deploy is detected

## Reading

### Deploying to Vercel via the Web Dashboard

Vercel is the hosting platform the Du Bois Living Archive uses. It builds and serves the frontend React app and handles the serverless API functions. Deployment takes about 5 minutes the first time; subsequent deploys happen automatically when you push to the main branch.

**Step-by-step first deployment:**

**Step 1: Create a Vercel account**
Go to vercel.com and sign up (free tier is sufficient). Connect your GitHub account when prompted.

**Step 2: Import your repository**
In the Vercel dashboard, click "Add New Project" → "Import Git Repository." Select your archive repository from the list.

**Step 3: Configure the project**
Vercel will auto-detect that this is a Vite/React project. Confirm:
- Framework preset: Vite
- Build command: `npm run build` (or `cd web && npm run build` if your React app is in a `web/` subdirectory)
- Output directory: `dist` (or `web/dist`)
- Install command: `npm install`

**Step 4: Set environment variables**
This step is critical. Before clicking "Deploy," add all required environment variables:

| Variable | Description |
|----------|-------------|
| `SUPABASE_URL` | Your Supabase project URL (from Supabase → Settings → API) |
| `SUPABASE_ANON_KEY` | Your Supabase anon/public key |
| `ANTHROPIC_API_KEY` | Your Anthropic API key (from console.anthropic.com) |
| `GEMINI_API_KEY` | Your Google Gemini API key (for question embedding) |

These variables are secret — they are encrypted at rest and never exposed to users. Do not put them in your codebase or `.env` files committed to GitHub.

**Step 5: Deploy**
Click "Deploy." Vercel builds the app (1–2 minutes) and assigns a URL like `your-project-name.vercel.app`. The first build may take 3–4 minutes.

### Testing the Live Deployment

After deployment, run this functional test checklist before sharing the URL:

**1. Page load test**
- Open the URL in an incognito/private window
- Confirm the homepage loads without errors (no blank screen, no console errors)
- Check: does the archive title appear? Does the chat input field show?

**2. Query test**
- Ask three questions: one factual, one interpretive, one that spans multiple texts
- Confirm: answers appear within 10 seconds, citations are shown, passages are highlighted
- Check the Supabase dashboard to confirm query logs are being written (if you have a query_log table)

**3. UI feature test**
- Navigate to the corpus sidebar: does it load all works?
- Navigate to the About page: does it display correctly?
- If you have plate visualizations or tour features, test those

**4. Error handling test**
- Submit an empty question: does the UI handle it gracefully?
- Temporarily remove the Anthropic API key from environment variables (via Vercel dashboard) and test a query — does the error message make sense?
- Restore the API key after the test

**5. Mobile test**
- Open the URL on a mobile device or browser dev tools in mobile view
- Confirm the layout is usable on a small screen

### How to Roll Back a Bad Deployment

Every Vercel deployment is permanent in the deployment history. If a new deploy breaks something, you can roll back to the previous version in one click.

**Steps:**
1. In the Vercel dashboard, click on your project
2. Navigate to "Deployments" (left sidebar or top menu)
3. Find the last known-good deployment (the one before the bad one)
4. Click on it → click "..." menu → "Promote to Production"
5. Vercel immediately routes production traffic back to the older deployment

The rollback takes approximately 30 seconds. No code changes are required — you're just redirecting which deployment serves the production URL.

**After rolling back:**
- Identify what changed between the good and bad deploys (`git diff <good_commit>..<bad_commit>`)
- Fix the issue in a branch, test locally, then merge and re-deploy

### Managing Environment Variables After Deployment

If you need to add or change an environment variable after the first deployment:
1. Vercel dashboard → your project → Settings → Environment Variables
2. Add, edit, or delete variables
3. **Trigger a new deployment** — Vercel does not automatically redeploy when you change environment variables

Common mistake: adding an environment variable but forgetting to trigger a redeploy. The old deployment still runs with the old variables.

## Reflection Questions
1. You deploy successfully and share the URL with your soft launch testers. Two days later, a tester reports: "It's just showing a blank white page." What do you check first?
2. You need to add a new environment variable (`CORPUS_VERSION=v2`) to the live deployment. What are the exact steps? What can go wrong if you skip the final step?
3. A tester reports that the Supabase query returns results but the LLM answer is empty. You check the Anthropic Console and see no API calls for the last two hours. What is the most likely cause?

## Prep Task
Before your next session: Deploy your archive to Vercel (or verify it's already deployed). Run all five items on the functional test checklist and document the result of each (pass / fail / not applicable). If any item fails, note what you tried to diagnose it. Bring the checklist results to the next session.
