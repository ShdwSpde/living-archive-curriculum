# Unit 6: Database Design — Async Materials
**Pathway:** Archive Advocate
**Duration:** 30–45 min

## Learning Objectives
- Explain the difference between a vector database and a traditional keyword catalog in institutional terms
- Articulate data ownership questions — who owns the vectors, can they be exported, what are the portability risks
- Evaluate a database vendor on data portability using a standard set of questions

## Reading

### Vector Database vs. Keyword Catalog

A traditional library catalog — whether a card catalog or a modern ILS — indexes text by keywords, subjects, call numbers, and metadata fields. When you search, the system returns items that contain matching terms. The catalog tells you *what is here* and *where to find it*. The meaning of the text lives in the human reader who retrieves and reads it.

A vector database works differently. It doesn't index keywords — it indexes *meaning*. Each passage of text is stored as a set of 768 numbers that represent its meaning's location in a mathematical space. When you search, the system finds the passages whose meaning is nearest to the meaning of your question. The meaning is partially pre-interpreted by the embedding model: the system can identify that "double consciousness" and "twoness" are semantically near each other without you asking it to.

The library analog: a vector database is less like a card catalog (index of terms) and more like an extremely well-read reference librarian who has read everything in the collection and can immediately point you to relevant passages even when you phrase your question in your own words.

**What a similarity score means:**
- Similarity of 0.0: the passage and the question are completely unrelated in meaning
- Similarity of 0.5: loosely related — shares some conceptual territory
- Similarity of 0.7: related — the passage is meaningfully relevant to the question
- Similarity of 0.9+: very closely related — nearly the same concept in different words
- Similarity of 1.0: identical (this would mean the passage *is* the question)

### Institutional Data Ownership

When your archive is built on a cloud database service like Supabase, the vectors live on that service's infrastructure. This is a straightforward choice for a project starting out, but it carries institutional risks that Advocates need to understand before recommending it to leadership.

**Questions to ask about any database vendor:**

1. **Can you export your data?** Supabase allows full data export including the vector columns. You can export the entire `document_chunks` table as a CSV or SQL dump at any time.

2. **In what format are vectors stored?** Vectors are arrays of floating-point numbers — a standard data type. They are not proprietary to any vendor; exported vectors can be imported into any other vector database (Pinecone, Weaviate, Chroma, self-hosted pgvector).

3. **What happens if the vendor changes pricing?** If Supabase raises prices significantly, you can migrate your database to a self-hosted Postgres instance with pgvector (the same underlying technology). Migration requires technical work but is not architecturally blocked.

4. **Who owns the data?** Your institution owns the text, the vectors derived from it, and the metadata. The database vendor provides infrastructure, not ownership. Confirm this is stated explicitly in the vendor's terms of service.

5. **What are the retention and deletion policies?** Can you permanently delete your data if the project ends or your institution withdraws? How long does the vendor retain backups after deletion?

**The portability principle:** Any archive project should be buildable on a different infrastructure stack without re-creating the corpus. If your archive can only exist on one vendor's platform, that is a design flaw, not a constraint.

### Evaluating a Vendor on Data Portability

A simple evaluation checklist for presenting to institutional leadership:

| Criterion | Supabase | What to ask if considering alternatives |
|-----------|----------|----------------------------------------|
| Data export | Yes — CSV/SQL dump anytime | Is export self-service or requires vendor support? |
| Vector format | Standard float arrays | Is the format proprietary or standard? |
| Vendor lock-in | Low — pgvector is open source | Is the underlying technology open source? |
| Migration path | To any Postgres + pgvector instance | Can you migrate without reingesting the corpus? |
| Terms of service | User owns data | Does the ToS claim any rights to your data? |
| Price at scale | Predictable by storage tier | What does the price look like at 100,000 chunks? |

Running this checklist takes 30 minutes and produces a one-page vendor assessment you can share with a library director or IT governance committee.

### What It Means to Own the Interpretive Frame

One often-overlooked dimension of institutional data ownership: the archive doesn't just store text, it stores *descriptions* of that text. The `source_title` field is a curatorial label. The `chapter` field is an editorial decision. The way texts are chunked affects what questions the archive can answer and which passages surface in response to what queries.

The institution that curates the archive owns these interpretive decisions. They are not embedded in the technology — they are made by the curatorial team and stored as metadata. This means an archive can be substantively different from another archive built on the same technical stack, because the curation differs.

This is why the Advocate's work in Units 3–4 (corpus selection, quality standards) is not just preparatory work for the technical team — it is the core intellectual contribution of the institution to the archive.

## Reflection Questions
1. A library director asks: "What happens to our archive if Supabase goes out of business?" How do you answer?
2. Your institution's IT governance committee asks whether the vendor has rights to your data. How do you find out, and what does the Supabase terms of service say?
3. You're presenting to a faculty advisory board who are used to library databases. How do you explain the difference between the archive's similarity-based retrieval and a standard keyword search, in terms they'll find meaningful?

## Prep Task
Before your next session: Review Supabase's terms of service specifically for the data ownership and export provisions. Write a 3-sentence summary of what you find. Then run the data export from your Supabase project (Table Editor → Export) and verify that your `document_chunks` table exports correctly. Note: for large tables, export may take a few minutes.
