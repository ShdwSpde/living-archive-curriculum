# Unit 4: Text Quality & Preparation — Async Materials
**Pathway:** Archive Advocate
**Duration:** 30–45 min

## Learning Objectives
- Explain how OCR quality directly affects answer quality in a living archive
- Conduct a curatorial quality audit without technical tools, using the random-sample method
- Communicate quality standards and remediation scope to a technical team

## Reading

### How OCR Quality Affects Answer Quality

The living archive answers questions by finding relevant passages from its corpus and using them to generate responses. If those passages are garbled — words fragmented, sentences broken, meaning obscured by scanning errors — the archive will do one of two things: fail to surface the passage at all (because its corrupted content doesn't match what users are asking), or surface it inappropriately (because garbled text happens to resemble something else).

Neither outcome is acceptable for a scholarly resource. A living archive that fails to find relevant passages is unreliable. One that surfaces irrelevant passages confidently is actively misleading.

The technical term for this is **retrieval precision**: of all the passages the archive returns in response to a query, what percentage are genuinely relevant? OCR quality is a direct ceiling on retrieval precision. You cannot achieve high precision on a corpus with pervasive quality problems.

**What this means for curation:** Every text you add to the corpus that is heavily garbled costs you precision on the texts that are clean. The archive doesn't distinguish "this passage is unreliable because the OCR was poor" from "this passage is relevant to your question." It treats all passages equally. Your curatorial job is to ensure that what you put in is worth having in.

### What a Quality Audit Looks Like

A curatorial quality audit is a structured review of a sample of your corpus. It doesn't require technical expertise — it requires reading. The goal is to produce a documented assessment of your corpus quality that you can share with your technical team and your institutional stakeholders.

**The random-sample method:**
1. Select 10–15% of your corpus files at random (or have a colleague pick the sample so you don't unconsciously pick the best files)
2. For each file, open it in a text editor and read 3–5 paragraphs from the middle of the document
3. Rate quality on a 1–3 scale:
   - **3 (Clean):** Readable prose with only minor character-level errors
   - **2 (Acceptable):** Readable, meaning clear, but with noticeable errors (common in scans of 19th-century typefaces)
   - **1 (Poor):** Fragmented, incoherent, large portions unreadable
4. Record the filename, title, rating, and a brief note
5. Calculate the percentage at quality 2 or above

A well-digitized corpus from a major library digitization project will typically have 80–90% at quality 2–3. Internet Archive OCR from older scans can be more variable.

### Scoping Remediation and Budgeting

Not every quality problem can or should be fixed. Remediation takes time, and some texts are not worth the investment. The framing question is: **What does this text add that nothing else in the corpus provides?**

**When to attempt remediation:**
- The text is a primary source unique to your figure's intellectual history
- No other digitized version exists
- Scholars frequently cite this specific text

**When to skip:**
- The text covers ground that other, cleaner texts already cover
- The text is a minor work with low scholarly citation count
- The OCR is so poor that automated or manual cleanup would take more time than the text's value justifies

**When to communicate with your technical team:**
- You have decided to exclude a significant text and want them to know why
- You have identified texts that require remediation and need to scope the work
- You have texts available only as PDFs and need to know whether PDF text extraction is feasible

The clearest thing an Advocate can do is produce a tiered list: **Tier 1** (include as-is), **Tier 2** (include with minor cleanup), **Tier 3** (attempt remediation or find alternative), **Tier 4** (exclude). This gives the technical team a clear mandate.

### Communicating Quality Standards to a Technical Team

Technical teams can implement whatever standards you specify — but they need the specifications in clear, concrete terms. Avoid phrases like "good enough quality" or "readable text." Use:

- "All texts rated quality 2 or above on the 1–3 scale, where quality 2 means readable with noticeable but non-disruptive errors"
- "Texts rated quality 1 should be excluded unless they appear on the Tier 3 list for remediation"
- "Any text with more than 10% of paragraphs classified as 'incoherent' (meaning the paragraph's intent cannot be determined from context) should be flagged for review before ingestion"

Written quality standards also serve a secondary purpose: they create accountability. When a user reports a bad answer that traces back to a garbled source, you can document that the text was rated quality 1 and flagged before ingestion — it was a known limitation, not an oversight.

## Reflection Questions
1. Your quality audit finds that 60% of your corpus is quality 1. What do you tell your institution? What do you tell your funder? Are those the same conversation?
2. A colleague argues that you should include even quality-1 texts because "some information is better than none." How do you respond?
3. You have one text that is quality 1 but is the only surviving record of your figure's views on a significant topic. What is your recommendation, and what conditions would you put on including it?

## Prep Task
Before your next session: Conduct a quality audit of your corpus. Sample at least 10% of your files (minimum 5 files), read 3 paragraphs from each, and rate them 1–3. Produce a one-page quality report: number of files at each quality level, percentage at quality 2+, and a list of files rated quality 1 with your recommendation (include, remediate, or exclude).
