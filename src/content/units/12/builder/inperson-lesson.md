# Unit 12: Scaling to Community — In-Person Lesson
**Pathway:** Archive Builder
**Duration:** 75 min
**Format:** Computer lab (1 machine per participant)

## Room Setup
- One computer per participant with repo access and a text editor open
- A shared Google Doc or Notion workspace projected at the front for collective documentation
- Printed one-page prompt sheet: "Your Replication Guide — What to Include"

## Session Goals
- Every participant writes a complete replication guide for their archive by end of session
- Participants practice following each other's guides and identify gaps
- Each person leaves with a polished, shareable document

## Facilitator Agenda

### Warm-Up (5 min)
Prompt: "If you had to hand your archive to a colleague tomorrow with no verbal explanation, what document would you give them?"

Take 3–4 quick answers. Surface the tension: most people would give something informal — a Slack message, a README with gaps, a list of steps that assumes too much. Today we fix that.

### Presentation: Replication as Documentation Discipline (10 min)
Frame the core idea: replication is not just about your next archive. It's about institutional memory. The archive you build today should not depend on you being available to explain it.

Walk through the structure of a strong replication guide:
1. **Corpus acquisition** — where you got each file, the exact source URL or download method, which edition/scan you used and why
2. **TITLE_MAP entries** — the raw filename pattern, the mapped title, why the mapping is needed
3. **Schema and ingestion** — which SQL migrations you ran, which scripts, in what order, with what parameters
4. **Quality issues and fixes** — a running log of problems encountered and how each was resolved
5. **Verification steps** — the 5 queries you ran to confirm ingestion worked correctly
6. **Cost and maintenance** — your Anthropic Console settings, your Supabase plan tier, your Vercel deployment URL

### Workshop: Write Your Complete Replication Guide (40 min)
Participants work individually. Facilitator circulates every 8–10 minutes and asks:
- "Can someone who's never seen your corpus figure out where to download it from this?"
- "If your TITLE_MAP breaks, does this explain why each entry exists?"
- "What do you write when the problem you hit doesn't have a clean answer?"

Milestone check at 20 minutes: each person should have sections 1–3 complete. Sections 4–6 for the second half.

If a participant is stuck on what to write: "Describe to me what you did. I'll write down what you say. That's your documentation."

### Swap and Follow (15 min)
Participants exchange guides with a neighbor. Task: try to follow the guide for 10 minutes — specifically, try to answer:
- Where would I go to download the corpus?
- What's the first command I'd run after cloning the repo?
- What would I do if the ingestion script errored on file X?

Give structured feedback: one thing the guide does well, one specific step that needs more detail, one question the guide left unanswered.

### Synthesis (5 min)
Return guides. Each person notes the top gap identified by their reviewer. Commit to closing that gap before sharing the guide publicly.

Final prompt: "Who at your institution could you send this to this week? Name one person."

## Materials
- Printed prompt sheet: "Replication Guide — What to Include" (6-section checklist)
- Shared doc for collecting cross-participant replication tips
- Optional: timer on screen for the workshop segment

## After This Session
Publish or share your replication guide somewhere it will persist — a GitHub repo README, a shared drive folder, or an institutional wiki page. Send the link to one person who might use it.
