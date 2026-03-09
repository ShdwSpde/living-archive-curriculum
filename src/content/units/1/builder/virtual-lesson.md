# Unit 1: Why Living Archives — Virtual Lesson
**Pathway:** Archive Builder
**Duration:** 75 min
**Materials:** Slides, Du Bois archive, screen share

## Agenda
| Time | Activity |
|------|----------|
| 0:00–0:10 | Check-in: accounts set up? Any blockers? |
| 0:10–0:30 | Architecture walkthrough: what you're building |
| 0:30–0:55 | Breakout: figure selection + corpus scoping |
| 0:55–1:15 | Debrief + environment setup walkthrough |

## Slide Outline

**Slide 1: What You'll Have by End of This Program**
- Show the Du Bois archive
- "You will deploy something exactly like this for your chosen figure."
- Timeline: 2/4/6 weeks depending on your format

**Slide 2: The Stack — Visual Diagram**
- Draw the pipeline: text files → chunk script → embedding script → Supabase → query → Claude → frontend
- Each arrow is a script you'll run or configure
- You are not writing the arrows — you're connecting them

**Slide 3: Your First Decisions**
- Choose a historical figure (today)
- Choose your corpus sources (next session)
- Configure your `.env` file (today)

**Slide 4: Environment Setup — Live Demo**
- Screen share: show a `.env` file structure (redacted)
- Walk through where each API key comes from
- Show the Supabase dashboard — where the database will live

## Breakout Activity (25 min)
**Groups of 3–4**

Each person shares:
1. Their chosen figure and why
2. Where they expect to find the corpus (Internet Archive, Project Gutenberg, etc.)
3. One question they want the archive to answer

Group gives feedback: Is the corpus likely to be public domain? Are there known digitization challenges?

## Debrief
Walk through `.env` template live. Confirm everyone has their API keys. Troubleshoot any account issues.

## Facilitator Notes
- Have a working `.env.example` file ready to screen-share (with fake keys)
- Some participants will not have completed account setup — budget 10 extra minutes for this
- The Anthropic account requires a credit card for the $5 minimum — flag this in advance so participants aren't surprised
