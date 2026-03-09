# Unit 1: Why Living Archives — Async Materials
**Pathway:** Archive Developer
**Duration:** 30–45 min

## Learning Objectives
- Understand the full system architecture and data flow
- Know why each technology was chosen and what the alternatives are
- Set up your development environment completely before Day 1

## Reading

Read the full **Why This Architecture** section of the playbook (Section 0 at https://dubois-living-archive.vercel.app). Pay particular attention to:
- The RAG vs. fine-tuning comparison table — understand each row
- The technology trade-offs for Supabase, Gemini, Vercel, and Claude
- The "when this architecture breaks down" section — these are the edge cases you'll hit

### Development Environment Checklist

Before Day 1, install and verify:

```bash
node --version       # needs 18+
npx tsx --version    # TypeScript execution
git --version
```

Clone the Du Bois archive repo and install dependencies:

```bash
git clone https://github.com/ShdwSpde/dubois-living-archive
cd dubois-living-archive
cp .env.example .env
npm install
cd web && npm install && cd ..
```

Create accounts and populate `.env`:
- **Supabase:** project URL + service role key (not anon key — scripts need write access)
- **Google AI Studio:** Gemini API key (free tier)
- **Anthropic Console:** Claude API key
- **Vercel CLI:** `npm install -g vercel && vercel login`

## Reflection Questions
1. The playbook chose pgvector over Pinecone. What would make you reconsider that decision for a different project?
2. The free tier of Gemini embedding-001 is 15 RPM. For a corpus of 300 texts × 50 chunks = 15,000 chunks at 5 per batch, estimate how long ingestion takes. Show your math.
3. Read the "when this architecture breaks down" section. Which of the four limits is your project most likely to hit first?

## Prep Task
Run the existing web app locally:
```bash
cd web && npm run dev
```
Browse to `http://localhost:5173`. Ask 5 questions. Open DevTools → Network tab and watch the API calls. Take notes:
- What requests go to Supabase?
- What goes to the Vercel API function?
- What is the shape of the response JSON?

Bring your notes to the first session.
