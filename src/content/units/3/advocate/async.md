# Unit 3: Sourcing the Corpus — Async Materials
**Pathway:** Archive Advocate
**Duration:** 30–45 min

## Learning Objectives
- Explain public domain law in plain terms to institutional stakeholders
- Evaluate digitized scan quality as part of a grant reporting or curatorial workflow
- Document corpus provenance in a way that supports scholarly trust and institutional accountability

## Reading

### Public Domain Law in Plain Terms

The public domain is not a gray area — it is a defined legal status. In the United States, any work published before 1931 is in the public domain as of 2026. This threshold advances automatically each January 1: in 2027, works published before 1932 become public domain.

For archival work, this means:
- **Safe to use without permission:** Any text your figure published before 1931
- **Requires research:** Texts published 1931–1977, where the copyright status depends on registration and renewal records
- **Almost certainly under copyright:** Texts published after 1978

**Government publications are always public domain**, regardless of date. If your figure testified before Congress, gave speeches at federal events, or published in government reports, those texts are usable without restriction.

**The periodical issue:** Each issue of a magazine or newspaper must be evaluated individually. A figure's editorial in an 1895 issue of *The Atlantic* is clearly public domain. Their piece in a 1935 issue requires copyright research. Don't assume an entire periodical run is safe — check dates issue by issue.

**What to tell your institution's legal counsel:** You are building an archive from public-domain texts. You are not reproducing or distributing the texts themselves — you are using them as source material to train a retrieval system. The relevant legal framework is the public domain, not fair use.

### Working with a Library Digitization Team

Most living archive projects will involve some collaboration with a library or archives digitization program. These teams have expertise in scanning, OCR quality standards, metadata, and preservation — but they work on different timescales and with different priorities than a digital humanities project.

**What to ask a digitization team:**
- What file formats do you produce? (Aim for .txt or at minimum high-quality PDF with text layer)
- What DPI do you scan at? (400 DPI minimum for clean OCR; 600 DPI preferred for degraded originals)
- Do you have a quality review process for OCR output?
- What metadata do you capture with each scan?
- What are your turnaround timelines for a corpus of N documents?

**What to offer in return:**
- Clear specifications: list of texts needed, in priority order
- Technical context: explain what the text files will be used for (not just "digitization" but specifically "feeding an AI retrieval system that requires clean text")
- Feedback loop: commit to sharing quality assessments back so they can improve future scans

### Evaluating Scan Quality for Grant Reporting

If your archive is funded by a grant, the funder will likely want documentation of collection quality. Scan quality is often listed in grant deliverables as a percentage of the corpus meeting a specified standard.

**A practical quality evaluation workflow:**
1. Sample 10–15% of your corpus randomly — don't cherry-pick good or bad examples
2. For each sampled text, read 3–5 paragraphs and rate quality 1–3 (1=poor, 2=acceptable, 3=clean)
3. Record results in a simple spreadsheet: filename, title, quality rating, notes
4. Calculate the percentage at quality 2 or above — that's your reportable quality metric
5. Document the evaluation date and the name of the person who conducted it

**What to do when a text you need is under copyright:**
- Write around it: describe the work's contents and significance in your curatorial notes without quoting extensively
- Seek permissions: contact the rights holder (often an estate or academic press) — small archives often receive permission for non-commercial scholarly use
- Find a substitute: a later edition may be in the public domain even if an earlier edition isn't, or a related work by the same figure may cover similar ground
- Don't guess: if you're uncertain about a text's copyright status, consult your institution's legal counsel before including it

### Documenting Provenance

Provenance documentation serves two purposes: scholarly trust (users want to know where the archive's sources came from) and institutional accountability (you need to be able to answer questions about your sources). For each work in your corpus, document:
- Full title and author
- Publication year and place
- Original source (which library, which digitization project, which URL)
- Date accessed
- Any known quality issues or restrictions

This documentation should live somewhere outside the code repository — a shared institutional document, a research data management system, or at minimum a well-organized spreadsheet. It is a curatorial record, not a technical artifact.

## Reflection Questions
1. A colleague proposes including a 1935 essay by your figure that is available as a clean .txt file on Internet Archive. What do you need to investigate before approving its inclusion?
2. Your institution's library digitization team has a 6-month backlog. Your grant deliverable requires a complete corpus in 3 months. What are your options?
3. Draft a one-paragraph provenance statement for a single work in your proposed corpus: title, year, source, access date, quality note.

## Prep Task
Before your next session: Identify 3 texts in your proposed corpus that require copyright research (published 1931 or later, or unknown date). For each one, write down what you would need to find out before including it. Then identify 3 texts that are clearly public domain and document their provenance in the format described in this reading.
