# Unit 7: Metadata & Organization — Virtual Lesson
**Pathway:** Archive Advocate
**Duration:** 75 min
**Materials:** Slides, shared `worksMetadata.ts` template, live archive access for sidebar demo

## Agenda
| Time | Activity |
|------|----------|
| 0:00–0:10 | Check-in: share one metadata draft entry — title and description |
| 0:10–0:35 | Presentation: metadata architecture + description standards |
| 0:35–1:00 | Breakout: peer review of metadata entries |
| 1:00–1:15 | Debrief: what makes a good metadata entry? consensus standards |

## Slide Outline

**Slide 1: The Two Layers of Metadata**
- Layer 1: database fields (`source_title`, `chapter`) — used for computation and citation
- Layer 2: `worksMetadata.ts` — used for display, description, and sidebar organization
- They must be synchronized: database `source_title` must match the key in `worksMetadata.ts`
- Who controls each: developers control the mapping, curators control the content
- What happens when they're out of sync: the work may disappear from the sidebar or show without a description

**Slide 2: What's in a Good Display Title**
- Not a filename: `dubois-souls-1903.txt` is not a display title
- Not raw metadata: "sim_crisis_1915-01_5_1" is not a display title
- Specific enough to distinguish the work: "The Souls of Black Folk" works; "Du Bois Essay" does not
- Consistent enough for the sidebar: all Crisis issues should share a consistent title format
- The publication year adds context: "The Souls of Black Folk (1903)" vs. "The Souls of Black Folk"

**Slide 3: Writing Good Descriptions**
- The three components: what it is, why it matters, any coverage notes
- Centering the figure's voice vs. imposing scholarly framing
- Length: 2–3 sentences is the sweet spot — enough context, not so much that it overwhelms
- Scholarly accuracy vs. accessibility: these don't conflict; good descriptions are both
- Coverage notes: "includes editorials published 1910–1928" is useful; unstated coverage limits are misleading

**Slide 4: The Trust Hierarchy**
- Show the four levels: clean citation / incomplete / raw filename / garbled
- Live demo: show a live archive citation and identify which level it's at
- Ask: what would a scholar do at each level? (Level 4: abandon the source. Level 3: verify manually. Level 2: note the limitation. Level 1: cite confidently.)
- The Advocate's job: ensure that every citation reaches at least level 2, ideally level 1

**Slide 5: Questions to Ask Your Technical Team**
- Walk through the 5 questions from the async reading
- Emphasize: ask before implementation, not after
- The most important question: "What happens if a work is in the database but not in the metadata file?" — the answer tells you how fragile the system is to metadata gaps
- The second most important: "How do you add a new work after launch?" — the answer tells you whether the archive is curationally open or frozen at launch

## Breakout Activity (25 min)
**Pairs for peer review**

Each participant shares their 5 metadata entries from the prep task. Partner reviews each entry against a 4-criterion rubric:
1. Title: Is it a display-ready title, not a filename?
2. Description: Does it have all three components (what/why/coverage)?
3. Description: Does it center the figure's voice or impose external framing?
4. Year and source URL: Are they complete and accurate?

Partners mark each criterion met/not met and write one specific improvement suggestion per entry.

After review, each participant revises their 2 weakest entries based on feedback.

## Debrief Questions
1. What was the most common problem you found in your partner's metadata? In your own?
2. Did any pair disagree about whether a description was centering the figure's voice — what was the example, and how did you resolve it?
3. What's one metadata standard you'd recommend every living archive adopt — and why?

## Facilitator Notes
- The "centering the figure's voice" criterion generates the most interesting discussion — examples where this is ambiguous are valuable
- Some participants will write descriptions that are too academic for general users; others will write descriptions that are too simplified for scholars — the goal is language that works for both
- The peer review pairs work best if participants are building archives of different figures — external perspective is more useful than internal review
- The question "what happens if a work is in the database but not in the metadata file" is worth testing live on the archive if time permits — open the sidebar and look for any works with empty descriptions
