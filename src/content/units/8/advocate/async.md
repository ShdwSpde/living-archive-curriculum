# Unit 8: RAG Query Pipeline — Async Materials
**Pathway:** Archive Advocate
**Duration:** 30–45 min

## Learning Objectives
- Describe what makes a query "good" for a living archive: specific, interpretive, and comparative
- Evaluate answer quality using citation checking, rephrasing, and consistency tests
- Draft archive usage guidelines appropriate for scholarly and public users

## Reading

### What Makes a Good Query

Not all questions work equally well in a living archive. Understanding what makes a good query helps you set user expectations, write documentation, and diagnose poor results.

**The anatomy of a good query:**

*Specific:* "What did Du Bois believe about the relationship between Black colleges and political organizing in the 1910s?" is better than "What did Du Bois think about education?" Specific queries surface targeted passages; vague queries return broad swaths of loosely related material.

*Interpretive:* The archive is designed for questions about meaning, argument, and intellectual development — not just factual retrieval. "How did Du Bois's position on Pan-Africanism evolve between 1903 and 1920?" is interpretive. "When was Du Bois born?" is factual — a standard reference is faster and more reliable.

*Comparative:* The archive can hold multiple passages in context at once. "Compare Du Bois's view of Booker T. Washington in 1903 and his assessment in 1924" is a powerful query type that uses the full corpus breadth.

**What works poorly:**
- Very long, multi-part questions (the archive answers the first recognizable question in a compound query)
- Questions about specific page numbers, publication dates, or bibliographic facts
- Questions about events or people not in the corpus
- Questions that require arithmetic, counting, or calculation

**The useful framing for users:** "Ask questions about what this figure *thought*, *argued*, *believed*, and *wrote* — not about what happened to them or around them."

### Evaluating Answer Quality

You don't need technical access to evaluate whether the archive is working well. The evaluation framework:

**Check the citations:**
Every response should include citations to specific works. A response without citations, or with citations to obviously unrelated works, is a quality failure. Ask: Does the cited passage actually say what the response claims it says? You can verify this by finding the passage in the original text.

**Rephrase the question:**
Ask the same question using different words. If the answers are completely different — different claims, different citations — the archive's retrieval is inconsistent. If they're similar in substance with complementary details, the retrieval is working well.

**Ask about something you know:**
Use a question where you already know the answer from your expertise in the figure's work. Does the archive return the right passages? Does it miss something important? Does it get anything wrong? Expert testing is the most reliable quality check.

**Look for overclaiming:**
Responses that assert facts not grounded in the cited passages are a sign of language model "hallucination" — the model is generating plausible-sounding content beyond what the sources support. This is the most serious quality failure mode and requires technical remediation (prompt engineering, threshold adjustment).

### Writing Archive Usage Guidelines

Every archive should have usage guidelines that help users get the best results and understand the archive's limitations. The guidelines should be written for non-technical users and live somewhere prominent in the interface — ideally on the About page or in a dedicated "How to Use This Archive" section.

**Essential content for usage guidelines:**

*What this archive is for:*
"Use this archive to explore [figure]'s writings through interpretive questions about their ideas, arguments, and intellectual development."

*What questions work best:*
"Ask questions that are specific, interpretive, or comparative. Avoid factual questions (dates, page numbers, biographical facts) — standard reference sources are faster for these."

*How to evaluate responses:*
"Every response includes citations to specific works. Verify important claims by reading the cited passages directly. For scholarly use, always confirm citations against the original source."

*What the archive doesn't cover:*
"This archive includes [figure]'s published writings from [date range]. It does not include unpublished letters, materials published after [date], or works under copyright."

*How to get better results:*
"If your first question doesn't return relevant passages, try rephrasing it with more specific language, or ask about a narrower aspect of the topic."

*A note on limitations:*
"This archive is a research tool, not an authoritative source. Responses reflect the content of the corpus and the capabilities of AI language modeling — they may not capture all relevant passages or may occasionally misrepresent nuance. For definitive scholarly claims, consult primary sources directly."

Each paragraph should be short, specific, and written at an 8th-grade reading level for accessibility.

## Reflection Questions
1. A graduate student asks: "What year did Du Bois write 'Of Our Spiritual Strivings'?" Is this a good query for the archive? What would you tell the student?
2. You run a query and the response cites a passage from *The Souls of Black Folk* that doesn't seem relevant to the question. What do you do first to investigate?
3. Draft the "What this archive is for" and "What questions work best" sections of usage guidelines for your figure's archive.

## Prep Task
Before your next session: Run 10 test queries on the live archive (or the Du Bois archive if yours isn't live). Include at least 2 specific queries, 2 interpretive queries, 2 comparative queries, 2 vague queries, and 2 factual queries. Record: the question, whether you got a response, the citations, and your assessment of quality (good / acceptable / poor). Bring the log to the next session.
