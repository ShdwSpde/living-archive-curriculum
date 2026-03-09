# Unit 9: Pitfalls & Quality Control — Async Materials
**Pathway:** Archive Advocate
**Duration:** 30–45 min

## Learning Objectives
- Recognize quality problems in a living archive without technical tools
- Document and communicate quality issues to a technical team in actionable terms
- Develop a curatorial quality audit process appropriate for ongoing archive maintenance

## Reading

### Recognizing Quality Problems Without Technical Tools

An Advocate doesn't need access to the database or the code to recognize when a living archive has quality problems. The signs are visible in ordinary use.

**Bad answers:**

A bad answer is one that is factually wrong, contradictory to what you know of the figure's work, or unsupported by the cited passages. Bad answers often look plausible — the language is confident, the claims sound reasonable — which makes them more dangerous than obviously wrong answers.

How to spot a bad answer:
- Read the cited passages. Does the response accurately reflect what the passages say?
- Ask the same question a different way. If you get a completely different answer, something is wrong.
- Ask about something you know well. If the archive contradicts your expertise without a compelling reason, investigate.

**Wrong citations:**

A wrong citation is when the response cites a work that has nothing to do with the question. If you ask about labor rights and the response cites a passage from a travel essay, that's a wrong citation — the retrieval system found the wrong passage.

Wrong citations are usually caused by: OCR noise in the cited source (which causes bad embeddings), too-low similarity threshold, or a coverage gap (the right source isn't in the corpus, so the system retrieved the nearest available thing).

**Inconsistency:**

If asking the same question on different days — or in the same session rephrased slightly — produces substantially different answers with different citations, the archive is inconsistent. Some inconsistency is acceptable (different passages may surface different aspects of a complex topic). Systematic inconsistency (completely contradictory answers) is not.

### Setting Realistic Expectations With Stakeholders

A living archive is a research tool, not an oracle. Part of the Advocate's job is setting expectations with stakeholders before they encounter quality problems on their own — because the first person to notice a quality problem is often a new user, not a team member.

**What to communicate before launch:**
- The archive covers [specific corpus] and is strongest on [specific topics/periods]
- Responses should be verified against primary sources for scholarly use
- Factual questions (dates, bibliography) are better answered by standard reference sources
- The archive improves over time as quality issues are identified and addressed

**What not to say:**
- "The AI knows everything Du Bois wrote" — overclaims coverage
- "The archive will revolutionize research on this figure" — overpromises utility
- "This is better than the library catalog" — sets up an unfair comparison

**When a scholar reports a quality problem:**

Take it seriously. Write it down. Describe it in specific terms (what question was asked, what response was given, what the scholar expected). Forward it to your technical team with the specific details. Follow up to confirm it was investigated.

A quality problem that goes unaddressed trains users to distrust the archive. A quality problem that is acknowledged, investigated, and fixed trains users to trust the archive's responsiveness.

### What a Curatorial Quality Audit Looks Like

A quality audit is a structured review of the archive's performance on a defined set of test questions. Unlike an ad-hoc quality check (running a question when you think of it), an audit produces comparable results over time and across versions of the archive.

**The audit process:**

1. Build a test question set: 20–30 questions covering the full range of topics, query types, and historical periods in your figure's corpus. Include at least:
   - 5 well-covered topics (you expect strong responses)
   - 5 moderately covered topics (you expect acceptable responses)
   - 5 thin-coverage topics (you expect "passages don't address" responses)
   - 5 factual questions (you expect hedged, limited responses)
   - 5 comparative questions

2. Run all questions at the start of each archive version cycle

3. Rate each response: strong / acceptable / poor

4. Document the percentage at each level

5. Compare to the previous audit: is quality trending up, stable, or down?

**What to include in the audit report:**

- Date and archive version (corpus count, last ingestion date)
- Quality distribution: strong / acceptable / poor percentages
- Any new failure modes not seen in previous audits
- Specific questions that degraded since the last audit
- Recommendations for the technical team

The audit report is a living document. File it somewhere accessible to the whole team, not just the Advocate.

### How to Document Quality Issues for a Technical Team

The difference between a useful quality report and an unhelpful one is specificity.

**Unhelpful:** "The AI gives wrong answers sometimes."

**Useful:** "Queries about Du Bois's views on Pan-Africanism consistently cite passages from *The Crisis* that discuss African American domestic politics rather than international solidarity. I've tested 5 variations of the query and all return the same irrelevant passages. I suspect either a corpus coverage gap (the relevant works on Pan-Africanism may not be well-ingested) or an OCR quality problem in the ingested Pan-Africanism texts."

The useful version gives the developer: the specific topic, the pattern of failure, the test evidence, and two hypotheses to investigate. They can act on this immediately.

## Reflection Questions
1. A faculty member emails to report that the archive gave a "completely wrong" answer to her question about Du Bois's socialist views. She didn't save the question or the response. What do you ask her for, and what do you tell her about next steps?
2. You're presenting the archive to a donor. They ask, "What happens if the AI makes something up?" How do you answer honestly without undermining their confidence in the project?
3. Draft the first paragraph of a quality audit report for an imaginary archive version, using the format described in this reading. Include a quality distribution and one specific failure observation.

## Prep Task
Before your next session: Build a 10-question test set for your figure's archive (or the Du Bois archive). Cover at least 4 different topics and 3 different query types. Run all 10 questions and rate each response: strong / acceptable / poor. Write one sentence for each "poor" response describing what specifically went wrong. Bring your test set and ratings to the next session.
