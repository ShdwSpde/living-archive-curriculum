# Unit 11: Deployment & Going Live — Async Materials
**Pathway:** Archive Developer
**Duration:** 30–45 min

## Learning Objectives
- Configure `vercel.json` for correct edge function routing and timeout settings
- Manage environment variables across dev, staging, and production environments in the Vercel CLI
- Set up Vercel Analytics and configure a custom domain with DNS records

## Reading

### Vercel CLI and Production Deployments

While builders use the Vercel web dashboard, developers should use the Vercel CLI for production deployments. It integrates with CI/CD, supports environment-specific variable management, and provides access to function logs that the dashboard doesn't expose well.

**Installation and authentication:**
```bash
npm install -g vercel
vercel login  # authenticates via browser
vercel link   # links current directory to Vercel project
```

**Deploy to production:**
```bash
vercel --prod
```

This builds the project using your current branch and promotes the result to production immediately. Unlike a git push (which triggers an auto-deploy), `vercel --prod` is synchronous — your terminal shows the build progress and prints the production URL on completion.

**Preview deploys:**
```bash
vercel  # without --prod: creates a preview URL, does not affect production
```

Use preview deploys for testing environment variable changes or configuration updates before they go live.

### Configuring `vercel.json`

`vercel.json` controls how Vercel builds and routes your project. For a living archive with a React frontend and serverless API functions, a minimal configuration:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "web/package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "dist" }
    },
    {
      "src": "api/**/*.ts",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    { "src": "/api/(.*)", "dest": "/api/$1" },
    { "src": "/(.*)", "dest": "/web/dist/$1" }
  ]
}
```

**Edge function routing for the chat API:**
For lower latency (important for perceived responsiveness), move the chat function to the edge runtime:

```json
{
  "functions": {
    "api/chat.ts": {
      "runtime": "edge",
      "maxDuration": 30
    }
  }
}
```

Note: Edge functions cannot use all Node.js modules. Verify that `@supabase/supabase-js` and `@anthropic-ai/sdk` are edge-compatible before switching. (Both are as of 2025.)

**Timeout configuration:**
The default function timeout on Hobby tier is 10 seconds. LLM API calls can take 8–12 seconds. This creates intermittent timeouts. Solutions:
- Upgrade to Vercel Pro: 60-second timeout
- Switch to edge runtime: 30-second timeout available on Hobby
- Optimize retrieval to reduce input token count (faster LLM response)

### Environment Variable Management Across Environments

The Vercel CLI provides environment variable management at the project level:

```bash
# List all environment variables for production
vercel env ls production

# Add a variable to production
vercel env add ANTHROPIC_API_KEY production

# Add the same variable to preview (staging)
vercel env add ANTHROPIC_API_KEY preview

# Pull all env vars to a local .env.vercel file (for local testing with production values)
vercel env pull .env.vercel
```

**Three-environment strategy:**
- **Development:** `.env` file locally, pointing to a development Supabase project
- **Preview:** Vercel preview environment, pointing to a staging Supabase project
- **Production:** Vercel production environment, pointing to the production Supabase project

The key benefit of separate Supabase projects per environment: a bad ingestion script in development can't corrupt the production corpus.

**Rotating the Anthropic API key:**
When you need to rotate a key (security practice or key compromise):
```bash
# Generate a new key in console.anthropic.com first
vercel env rm ANTHROPIC_API_KEY production
vercel env add ANTHROPIC_API_KEY production
vercel --prod  # trigger new deployment to pick up the new key
```

Never update an environment variable without triggering a new deployment.

### Custom Domain Setup

**Step 1: Add the domain in Vercel**
```bash
vercel domains add yourdomain.com
# or: Vercel dashboard → your project → Settings → Domains → Add
```

**Step 2: Update DNS records**
Vercel provides the required DNS records after you add the domain:
- For apex domain (yourdomain.com): add an `A` record pointing to `76.76.21.21`
- For www subdomain: add a `CNAME` record pointing to `cname.vercel-dns.com`

DNS propagation takes 0–48 hours. Vercel checks automatically and issues an SSL certificate once DNS is confirmed.

**Step 3: Set the primary domain**
In the Vercel dashboard → Domains, set which domain is primary. Vercel will redirect all other domain variants (www, apex) to the primary.

### Monitoring Function Logs and Setting Up Analytics

**Function logs via CLI:**
```bash
vercel logs [deployment-url] --follow
```

This streams live logs from your serverless functions. Useful for debugging production issues without adding console.log statements.

**Vercel Analytics:**
Enable in the Vercel dashboard → your project → Analytics → Enable. This adds privacy-focused web analytics (no cookies, GDPR-compliant) that tracks:
- Page views and unique visitors
- Top pages
- Geographic distribution
- Referrer sources

Add to your React app:
```bash
npm install @vercel/analytics
```

```typescript
// web/src/main.tsx
import { inject } from '@vercel/analytics';
inject();
```

**Bandwidth and timeout alerts:**
In the Vercel dashboard → Usage, configure alerts for:
- Bandwidth approaching the Hobby tier limit (100GB/month)
- Function invocation count approaching the limit (100,000/month on Hobby)
- Edge function execution time

At moderate archive scale (100 DAU), you'll use roughly 500–2,000 function invocations/day — well within Hobby limits. Growth scale (500+ DAU) approaches the limit and may require upgrading to Pro.

## Reflection Questions
1. Your chat function occasionally times out at 12 seconds on the Hobby tier. You don't want to upgrade to Pro yet. What are the two alternatives, and what are the tradeoffs of each?
2. You add a new environment variable `CORPUS_VERSION=v3` to production via the Vercel dashboard but forget to trigger a new deployment. Your function is still reading `CORPUS_VERSION=v2`. How do you diagnose this? What's the fix?
3. A professor wants to embed your archive at `dubois.theiruniversity.edu`. You own `theiruniversity.edu`. Walk through the exact DNS and Vercel configuration steps to make this work.

## Prep Task
Before your next session: Create a `vercel.json` in your project root with the correct build configuration for your project structure. Deploy using the Vercel CLI (`vercel --prod`). Verify the deployment logs show no errors. Enable Vercel Analytics and confirm data is being collected by checking the analytics dashboard 24 hours later. Bring your `vercel.json` and the analytics dashboard screenshot to the next session.
