# Unit 7: Metadata & Organization — Async Materials
**Pathway:** Archive Advocate
**Duration:** 30–45 min

## Learning Objectives
- Explain why metadata matters for scholarly trust and citability
- Distinguish between what the system stores internally and what users see as display labels
- Articulate questions to ask a technical team about metadata standards before implementation

## Reading

### Why Metadata Matters for Trust

When a scholar uses the Du Bois archive and receives an answer to their question, the first thing they look for is the citation: where did this come from? Can I verify it? Can I cite it in my work?

If the citation says "sim_crisis_1915-01_5_1_djvu.txt — Chapter: None," that scholar will not trust the answer. If it says "The Crisis: Editorials by W.E.B. Du Bois — October 1915," they might.

This is not a superficial difference. The display title, the chapter name, the source year, and the source URL are signals of curatorial care. An archive with clean, accurate metadata communicates that someone has invested in making the sources trustworthy. An archive with raw filenames and null fields communicates that the technical work was done but the intellectual work was skipped.

**The trust hierarchy for scholarly users:**
1. Clean citation: "The Souls of Black Folk (1903), Chapter II: Of the Dawn of Freedom" → trusted source
2. Incomplete citation: "The Souls of Black Folk — Chapter: null" → usable, but raises questions
3. Raw filename citation: "dubois-souls-1903.txt" → technically a citation, but undermines credibility
4. Garbled or obviously wrong citation → destroys trust in the archive entirely

Your metadata decisions determine where your archive falls on this hierarchy.

### What the System Stores vs. What Users See

The archive stores information in a database using identifiers that work for computation but not for display. Understanding the distinction between internal identifiers and display labels is the key to curatorial oversight of metadata.

**Internal identifiers (stored in the database):**
- `source_title`: "The Crisis: Editorials by W.E.B. Du Bois" — a consistent string used to group chunks from the same work
- `chapter`: "Of Our Spiritual Strivings" — detected from the source text
- `content_hash`: "a3f8c2..." — a technical fingerprint, never shown to users

**Display labels (what users see in the interface):**
- The sidebar work title: "The Crisis Magazine (1910–1928)" — this is different from the `source_title`
- The description below a work title: "Du Bois's landmark periodical..." — this is written by the curatorial team and stored in `worksMetadata.ts`
- The chapter name in a citation: same as the database `chapter` field, but formatted and truncated if too long

The curatorial team controls the display layer. A developer can change the internal `source_title` mapping, but the display label is the curator's call. This is the Advocate's domain.

**The two places metadata lives:**
1. **Database (`document_chunks` table):** `source_title`, `chapter`, `content_hash`, `embedding`
2. **`worksMetadata.ts` file:** title, description, year, source URL, category — the curatorial record of each work

When these two are out of sync — when the database `source_title` doesn't match any entry in `worksMetadata.ts` — the work may not appear in the sidebar, or may appear without a description. Keeping them synchronized is the Builder's job, but the Advocate specifies what the values should be.

### Curatorial Framing: Descriptions Matter

The description field in `worksMetadata.ts` is a short curatorial introduction to each work. For the Du Bois archive, the description for *The Souls of Black Folk* might read: "Du Bois's foundational work, published in 1903, articulating the concept of double consciousness and the psychological dimensions of American racism."

That description is not neutral. It makes claims. It highlights some aspects of the text and not others. It frames how users approach the work before they've read any of it.

**Questions to ask about every description:**
- Is this framing consistent with current scholarly consensus, or is it contested?
- Does it foreground the figure's own voice, or does it impose an external interpretation?
- Is it appropriate for the full range of users — students, researchers, community members?
- Does it acknowledge the limits of the archive's coverage (e.g., "includes editorials through 1928 — later editorials are not included")?

Writing good descriptions is editorial work. It takes time, requires subject-matter expertise, and should be reviewed by scholars with relevant knowledge. Don't treat it as a minor task.

### Questions to Ask Your Technical Team About Metadata

Before your technical team implements metadata handling, get answers to these questions:

1. **How does the sidebar determine what to display?** (Is it from the database or a static file?)
2. **What happens if a work is in the database but not in `worksMetadata.ts`?** (Does it disappear? Show with a blank description? Throw an error?)
3. **How do you add a new work to the system after initial launch?** (Is there a procedure, or does it require code changes?)
4. **Can you add fields to the metadata without rebuilding the database?** (The JSONB metadata column supports this, but confirm it)
5. **Where do citations come from — the database fields or the static metadata file?** (The answer affects what you need to keep accurate in each place)

Getting clear answers to these questions before implementation prevents surprises when the archive launches and users start questioning citations.

## Reflection Questions
1. You receive a spreadsheet from your developer with a list of all `source_title` values in the database. Three of them are filenames (not display titles). What do you do, and whose job is it to fix them?
2. Write a 2-sentence description for a work in your proposed corpus. Now ask: whose voice does this description center — the scholar's or the figure's? How would you change it to center the figure's?
3. A visiting scholar emails after using your archive: "The citation for your Crisis material gives the issue date but not the volume and number. Is this intentional?" How do you respond?

## Prep Task
Before your next session: Draft complete metadata entries for 5 works in your corpus. For each work, write: display title, description (2–3 sentences), publication year, source URL, and category. Bring these drafts to the next session — they will become the `worksMetadata.ts` entries for your archive.
