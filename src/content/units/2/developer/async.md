# Unit 2: Choosing a Historical Figure — Async Materials
**Pathway:** Archive Developer
**Duration:** 30–45 min

## Learning Objectives
- Estimate corpus size in tokens and chunks to anticipate storage, embedding cost, and query performance
- Identify architectural decisions that depend on corpus characteristics (size, language, OCR quality)
- Evaluate OCR quality as a predictor of embedding quality and downstream retrieval accuracy

## Reading

### Corpus Size Estimation

Before writing a line of code, estimate your corpus size. The estimate drives decisions about embedding batch strategy, Supabase storage tier, query latency expectations, and whether custom chunking logic is warranted.

**The estimation formula:**

```
texts × average_pages_per_text × characters_per_page → total_characters
total_characters ÷ 4 → approximate_tokens
total_tokens ÷ (chunk_size - overlap) → approximate_chunks
```

Working numbers for a typical 19th–20th century print text:
- Average page: ~2,000–2,500 characters
- Chunk size: 800 tokens (≈ 3,200 characters)
- Overlap: 200 tokens (≈ 800 characters)
- Net tokens per chunk: 600

For the Du Bois corpus as a reference point: approximately 30 primary texts + 218 Crisis issues ≈ 21,000 chunks. A corpus of 20 texts with no periodical runs will be much smaller — perhaps 2,000–5,000 chunks. That's a meaningfully different operational profile.

**Why the number matters:**
- Under 5,000 chunks: Gemini free tier handles ingestion in one session, no resume logic needed
- 5,000–20,000 chunks: Gemini free tier works but requires batching and resume support; plan for 2–4 ingestion sessions
- Over 20,000 chunks: Consider whether the free tier is viable; OpenAI text-embedding-3-small at $0.02/million tokens is often cheaper than the time spent managing rate limits

### OCR Quality as a Predictor of Embedding Quality

Embedding models are not immune to noisy text. A garbled passage — full of fragmented words, misread characters, and broken sentence structure — produces an embedding that doesn't meaningfully represent the passage's semantic content. When a user asks a question that should surface that passage, it won't, because the embedding doesn't reliably capture what the passage is about.

**The practical implication:** OCR quality at ingestion time is a ceiling on retrieval quality at query time. You cannot embed your way past garbage input.

**Quality thresholds to use:**
- Quality 3 (clean): Ingest as-is
- Quality 2 (acceptable): Ingest; accept some retrieval imprecision on the affected passages
- Quality 1 (poor): Flag for remediation or exclusion. If you ingest quality-1 chunks, expect them to surface inappropriately on unrelated queries (the "garbage attractor" problem, where garbled text happens to match query embeddings by coincidence)

**Practical test:** After ingestion, query the archive with 5–10 test questions. If any responses cite passages that are obviously garbled or off-topic, look at the OCR quality of those source documents first.

### Architectural Decisions That Depend on Corpus Characteristics

**Size → Ingestion strategy**
A small corpus (under 3,000 chunks) can be ingested synchronously in a single script run. A large corpus needs resume logic — track progress by row count, skip already-ingested source files, restart from the last checkpoint without duplicating data.

**OCR quality distribution → Custom chunking logic**
Standard sentence-boundary chunking works well on clean text. Heavy OCR noise breaks sentence detection — fragment sentences don't end with periods, paragraphs run together, or page headers inject false breaks. If more than 20% of your corpus rates quality 1–2, consider:
- A sliding-window chunker that ignores sentence boundaries and just splits on character count
- A pre-processing pass to clean the most common OCR error patterns before chunking

**Multilingual corpus → Embedding model choice**
If your figure wrote in multiple languages (French, German, Spanish alongside English), `embedding-001` handles multilingual text but may underperform compared to a language-specific model for non-English passages. For a primarily English corpus with occasional foreign-language quotes, `embedding-001` is fine. For a corpus where 30%+ of text is non-English, research multilingual model options before committing to an architecture.

**Periodical structure → Title mapping**
Periodicals (magazines, newspapers) typically have hundreds of individual files on Internet Archive, each with auto-generated filenames like `sim_crisis-magazine_1915-01_5_1_djvu.txt`. These filenames need to map to display titles. Decide early whether your title mapping will be a hardcoded dictionary, a database table, or a filename pattern rule. The Du Bois archive uses a TITLE_MAP dictionary plus a prefix-pattern rule for Crisis files — adequate for one periodical series, but a larger periodical corpus would warrant a database-backed approach.

## Reflection Questions
1. Estimate your figure's corpus: how many texts, how many pages per text, what approximate token and chunk count do you get? What does that number tell you about your ingestion strategy?
2. Your corpus has 15 books (quality 2–3) and 50 pamphlets (quality 1 — heavily degraded). What is your recommendation for the pamphlets? What would you tell the project's Advocate?
3. You're building for a figure who wrote extensively in both English and Spanish. What would you research before choosing an embedding model?

## Prep Task
Before your next session: Write down five architectural decisions you'll need to make for your specific corpus. For each decision, write one sentence explaining what corpus characteristic drives it (size, format, OCR quality, language, periodical structure). Bring this list to the next session — it will frame the technical discussion.
