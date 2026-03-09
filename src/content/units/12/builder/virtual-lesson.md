# Unit 12: Scaling to Community — Virtual Lesson
**Pathway:** Archive Builder
**Duration:** 75 min
**Format:** Synchronous video session

## Session Goals
- Walk through a replication guide together and identify what makes it useful or confusing
- Help each participant identify the 3 hardest steps from their own build experience
- Produce peer-reviewed replication guides that another builder could follow

## Facilitator Agenda

### Opening (5 min)
Welcome and framing: You've built one archive. The measure of mastery is whether you can do it again — faster, cleaner, and with someone else able to follow in your footsteps. Today we're turning your build experience into a document.

### Screen Share: Replication Guide Walkthrough (20 min)
Facilitator shares screen and walks through a sample replication guide together. Call out the elements that matter most:
- **What corpus files you downloaded** — exact filenames and source URLs (Internet Archive, HathiTrust, university digital collections)
- **What TITLE_MAP entries you added** — why each mapping exists, what the raw filename looked like, what the clean title needed to be
- **What worksMetadata.ts changes you made** — fields added, fields corrected, duplicates removed
- **What SQL patches you ran** — any manual database fixes, clearing bad chapter data, re-running ingestion for specific works
- **What quality issues you hit** — OCR noise, character encoding problems, truncated files, wrong metadata — and how you fixed each one

Pause at each section and ask: "Is this the level of detail that would help you? What's missing?"

### Breakout Rooms (25 min)
Groups of 2–3. Each person answers:
1. What were the 3 hardest steps in your build? Why were they hard?
2. What would you have needed — a code snippet? a screenshot? an example file? — to make each step easier?
3. How would you document that step so a colleague who hasn't seen your setup could follow it?

Each group designates a note-taker. Hard steps and documentation strategies go into a shared doc for debrief.

### Debrief (15 min)
Groups report back. Facilitator builds a running list of the 5–10 hardest steps across all participants. For each: "What does a good documentation entry for this look like?"

Common hard steps to expect:
- Getting Supabase connection string right
- Finding the correct Internet Archive download URL for a specific edition
- Understanding why chunking is cutting text at the wrong place
- Debugging why embeddings are returning wrong results
- Figuring out what TITLE_MAP entry to use for a file with a non-standard name

### Synthesis (10 min)
Each participant shares a link to their draft replication guide (Google Doc, Notion, repo README). Peer feedback: one thing that's clear, one thing that's missing.

Closing: Your replication guide is the most important artifact you produce beyond the archive itself. It's the difference between a one-time project and a repeatable practice.

## After This Session
Complete your replication guide before the in-person session. Aim for: someone who has done units 1–5 of this curriculum could follow it with no additional explanation from you.
