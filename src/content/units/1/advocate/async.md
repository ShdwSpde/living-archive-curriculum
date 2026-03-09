# Unit 1: Why Living Archives — Async Materials
**Pathway:** Archive Advocate
**Duration:** 30–45 min

## Learning Objectives
- Define what a "living archive" is and how it differs from a static digital collection
- Explain the difference between RAG and fine-tuning to a non-technical audience
- Identify one historical figure whose archive you would want to steward

## Reading

### What Is a Living Archive?

A living archive is a digital research tool that lets users ask questions in natural language — "What did Du Bois believe about the relationship between art and politics?" — and receive answers grounded in the figure's actual writings, with citations to specific texts and chapters.

The word "living" distinguishes it from a static digital library. A digital library lets you search for keywords and browse documents. A living archive *synthesizes* across documents, surfaces connections across a body of work, and responds to interpretive questions, not just keyword matches.

Under the hood, a living archive uses a technique called **Retrieval-Augmented Generation (RAG)**:
1. The corpus (all the figure's writings) is broken into small passages and converted into mathematical vectors.
2. When a user asks a question, the system finds the most relevant passages using vector similarity.
3. Those passages are handed to an AI language model, which synthesizes a response and cites its sources.

### RAG vs. Fine-tuning: What Funders and Administrators Need to Know

There are two main ways to make an AI system "know" about a specific body of work. Understanding the difference matters for institutional decision-making.

**Fine-tuning** trains a new AI model on the corpus. Think of it as teaching the AI to absorb the figure's voice and knowledge. The result is a model that "knows" the work — but can't easily point to where it learned something, and is expensive to update when you add new texts.

**RAG** never modifies the AI model. Instead, it keeps the corpus in a searchable database and retrieves relevant passages on demand. Every answer comes with a citation. Updating the archive means adding rows to a database — not retraining a model.

For scholarly archives, RAG is almost always the right choice:
- Every answer is attributable and verifiable
- The corpus can be updated without retraining
- Build costs are near zero; operational costs are predictable
- Curators control exactly what the system knows

## Reflection Questions
1. Think of a research question you've wanted to ask about a historical figure's body of work. What made it hard to answer with existing digital library tools?
2. The playbook describes RAG as a system where "users need to trust the answers and verify them." Who are the users of an archive you might steward? What would make them trust it?
3. What would a "living archive" change about how scholars engage with the figure you're thinking of?

## Prep Task
Before your next session: Browse the Du Bois Living Archive at https://dubois-living-archive.vercel.app. Ask it at least 3 questions — factual, interpretive, and comparative. Take notes on what surprised you about the answers and the citations.
