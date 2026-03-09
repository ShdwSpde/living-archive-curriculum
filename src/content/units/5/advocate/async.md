# Unit 5: Embedding & AI — Async Materials
**Pathway:** Archive Advocate
**Duration:** 30–45 min

## Learning Objectives
- Explain the concept of embedding — turning meaning into location in mathematical space — in plain language suitable for an institutional audience
- Describe why semantic search finds related ideas even when exact words don't match
- Evaluate embedding quality by testing the live archive with multiple formulations of the same question

## Reading

### What Embedding Means

When you put a text into the living archive, the system doesn't store it the way a search engine stores keywords. Instead, it transforms the text into a **location** — a specific point in a vast mathematical space with 768 dimensions.

You can think of this space like a city map, but instead of north-south and east-west, there are 768 different directions at once. Each direction represents some aspect of meaning — maybe one direction represents "formal vs. conversational tone," another represents "abstract vs. concrete," another represents "political vs. personal." No single direction is labeled or interpretable; they emerge from the model's training on billions of sentences.

What matters is that texts with similar meaning end up near each other in this space, even if they use completely different words. "The color of one's skin should not determine one's future" and "racial destiny ought not be fixed by ancestry" are far apart alphabetically, but they would land very close to each other in this 768-dimensional space because they express the same idea.

### Why Semantic Search Is Different from Keyword Search

A traditional keyword search — like what you'd use in a library catalog or a word processor — finds passages that contain the specific words you typed. If you search for "double consciousness" in a keyword system, you'll find every passage that uses that phrase. If a passage expresses the same idea but calls it "twoness" or "divided self," a keyword search won't find it.

Semantic search works differently: it converts your question into a location in the same mathematical space as all the text passages, then finds the passages whose locations are nearest to your question's location. Because similar meanings end up near each other regardless of word choice, semantic search can find relevant passages even when there's no word overlap between the question and the passage.

This is why the Du Bois archive can answer questions like "what did Du Bois think about education" and surface relevant passages from speeches where Du Bois never uses the word "education" — he might say "the training of the mind" or "the development of the race" — and the semantic search finds them anyway.

### What 768 Dimensions Means (Without the Math)

The number 768 refers to the length of the list of numbers that represents each text passage — each passage becomes a list of 768 decimal numbers, its "address" in the mathematical space. You don't need to understand how those numbers are calculated to use the system.

What you do need to understand: **more dimensions is not automatically better.** The Google Gemini embedding-001 model that the Du Bois archive uses produces 768-dimensional vectors. OpenAI's text-embedding-3-large produces 3,072 dimensions. The difference in practical retrieval quality for a historical text archive is typically small — far smaller than the difference in quality between a clean corpus and a noisy one.

The critical insight for institutional advocacy: embedding quality is a function of the **input text quality** more than the model's dimensionality. A 768-dimensional embedding of clean, readable text outperforms a 3,072-dimensional embedding of garbled OCR.

### Evaluating Embedding Quality Without Technical Tools

You don't need access to the database or the code to evaluate whether the archive's retrieval is working well. The test is simple: ask the same question multiple ways and check that the answers are consistent.

**The consistency test:**
1. Ask the archive a question in three different ways:
   - Using the exact language the figure would have used (e.g., "What is the Talented Tenth?")
   - Using modern paraphrase (e.g., "What did Du Bois think about educated Black leadership?")
   - Using a completely different framing (e.g., "Who has the responsibility to advance racial equality in Du Bois's view?")
2. Compare the three responses: Do they cite the same passages? Do they make the same claims? Do they surface different but complementary aspects of the topic?
3. A high-quality archive gives consistent, complementary answers. A low-quality archive gives inconsistent, contradictory, or irrelevant answers to variations of the same question.

This test can be done by anyone — curators, librarians, subject-matter experts, community partners. It doesn't require technical knowledge, but it does require knowing the figure's work well enough to evaluate whether the answers are accurate.

## Reflection Questions
1. A university librarian asks you: "What's the difference between your archive and just running a Google search?" How do you answer in two sentences, using the concepts from this reading?
2. You run the consistency test and find that three phrasings of "what did this figure think about labor" produce three completely different responses with no overlapping citations. What does this tell you about the archive?
3. A funder asks whether your archive uses "AI." How do you describe the role of embedding in honest, plain language — neither overhyping nor understating?

## Prep Task
Before your next session: Log into the live Du Bois archive (or your own archive if it's running) and run the consistency test on one topic. Ask the same question in three different ways. Write down: the three questions you asked, a summary of each response, and whether the responses were consistent. Bring your notes to the next session.
