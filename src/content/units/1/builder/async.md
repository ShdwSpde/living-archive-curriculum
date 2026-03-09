# Unit 1: Why Living Archives — Async Materials
**Pathway:** Archive Builder
**Duration:** 30–45 min

## Learning Objectives
- Understand what RAG is and how it differs from fine-tuning
- Know the technology stack you will be building with (Supabase, Gemini embeddings, Claude, Vercel)
- Set up accounts for the tools you'll need throughout the program

## Reading

### The Stack You're Building

By the end of this program, you will have deployed a working living archive. Before you write a line of configuration, here's what the system does:

1. **Corpus ingestion:** Raw text files → chunks (~800 tokens each) → vector embeddings stored in Supabase
2. **Query:** User question → vector embedding → similarity search → top 5 passages → Claude synthesizes answer + cites sources
3. **Frontend:** React web app hosted on Vercel → calls Supabase and Claude APIs

You won't write the logic for this from scratch. You'll configure the Du Bois archive's existing scripts for your chosen historical figure — changing filenames, title mappings, and metadata.

### Why These Tools

**Supabase** is a hosted Postgres database with vector search built in. You'll use their web UI to set up the database — no terminal commands needed for this part.

**Google Gemini embedding-001** is free. Converting 10,000 text chunks to vectors costs $0 and takes a few hours. You'll need a Google account.

**Vercel** deploys your web app from a GitHub repository. Free tier. You'll need a GitHub account.

**Claude (Anthropic)** generates the answers. You'll need an Anthropic API key — costs a few cents per query.

### What "Guided Scripts" Means

You will use TypeScript scripts that are already written and tested in the Du Bois archive. Your job is to:
- Change the corpus folder path to point to your texts
- Update the `TITLE_MAP` with your figure's works
- Set environment variables (API keys) in a `.env` file
- Run the scripts with `npx tsx script-name.ts`

You are not writing code. You are configuring existing code.

## Reflection Questions
1. Which part of the stack are you most uncertain about? (Supabase setup? Running scripts? Something else?)
2. What historical figure are you planning to archive? Why?
3. What's one question you'd want users to be able to ask your archive?

## Prep Task
Before your next session, create accounts for all four services:
1. [Supabase](https://supabase.com) — free account
2. [Google AI Studio](https://aistudio.google.com) — get a Gemini API key (free)
3. [Anthropic Console](https://console.anthropic.com) — get a Claude API key ($5 minimum load)
4. [Vercel](https://vercel.com) — free account, connect to GitHub
5. [GitHub](https://github.com) — if you don't have one

Bring your account credentials to the next session. You'll configure them then.
