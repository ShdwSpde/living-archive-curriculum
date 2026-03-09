# Unit 1: Why Living Archives — In-Person Lesson
**Pathway:** Archive Builder
**Duration:** 75 min
**Room setup:** Computer lab (1 per person)
**Materials:** `.env` template printed, API key setup guide printed

## Agenda
| Time | Activity |
|------|----------|
| 0:00–0:10 | Warm-up: demo the Du Bois archive together |
| 0:10–0:25 | Architecture overview: what we're building |
| 0:25–1:00 | Setup workshop: accounts + environment |
| 1:00–1:15 | Check: everyone has keys + `.env` ready |

## Warm-Up (10 min)
Open the Du Bois archive together on the projector. Each person asks one question. Point out: citations, synthesis, specificity. "We will build this for our figures."

## Architecture Overview (15 min)
Draw the pipeline on the whiteboard. Each step becomes a session:
- Today: accounts + environment
- Next: corpus download
- Then: ingestion
- Then: queries

"You don't need to understand every technical detail. You need to know what goes in and what comes out at each step."

## Setup Workshop (35 min)
Step-by-step guided setup. Facilitator walks through while participants follow:

1. **Supabase** (10 min): Create project, copy project URL and anon key
2. **Google AI Studio** (5 min): Generate API key
3. **Anthropic Console** (5 min): Generate API key, add $5 credit
4. **Clone the repo** (5 min): `git clone https://github.com/ShdwSpde/dubois-living-archive`
5. **Create `.env`** (10 min): Copy `.env.example` to `.env`, paste keys

Pairs help each other. Facilitator circulates.

## Check (15 min)
Each person confirms: all 4 keys in `.env`. Run: `cat .env` (no secrets displayed — just confirm the file exists and has content). Troubleshoot any issues as a group.

Anyone blocked: pair with a neighbor or flag for async support before the next session.

## Facilitator Notes
- Prepare a printed "API Key Setup Guide" with screenshots for each service
- The Supabase "anon key" vs "service role key" distinction trips people up — clarify: use service role key for scripts, anon key for the frontend
- Budget extra time if the room has slow internet — downloads and signups can stall
