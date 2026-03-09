# Unit 12: Scaling to Community — In-Person Lesson
**Pathway:** Archive Developer
**Duration:** 75 min
**Format:** Computer lab (1 machine per participant)

## Room Setup
- One computer per participant with the Du Bois archive repo cloned and open
- TypeScript environment set up (`npm install` complete)
- Projector showing the converged `config.ts` spec from the virtual session
- Whiteboard for live architecture sketching

## Session Goals
- Implement `config.ts` and a `bootstrap.ts` script from the converged design spec
- Test the bootstrap by configuring a second figure (real or hypothetical)
- Each person publishes (or plans) their template repo to GitHub with a README intro

## Facilitator Agenda

### Warm-Up (5 min)
Prompt: "What's the most elegant configuration system you've used? What made it good?"

Take 3–4 answers. Extract the principles: good config systems are explicit (you can read them without knowing the codebase), complete (nothing is hidden in environment variables or buried in code), and validated (bad config fails early with a clear error message, not silently at runtime).

These are your design goals for today.

### Presentation: Template Architecture (10 min)
Whiteboard sketch of the separation of config from logic.

Three layers:
1. **`config.ts`** — all per-figure values, explicit TypeScript types
2. **`bootstrap.ts`** — reads config, validates it, generates derived artifacts (.env template, migration check)
3. **Shared infrastructure** — everything else, unchanged across figures

Key architectural principle: nothing in the shared infrastructure should have a figure-specific value hardcoded. If you find yourself writing `"Du Bois"` anywhere in `api/chat.ts`, that's a config leak — move it to `config.ts` and import it.

Show the TypeScript interface for `ArchiveConfig` from the converged spec. Walk through each field and why it belongs at that level of nesting.

### Workshop: Implement config.ts and bootstrap.ts (45 min)
Participants work on two files simultaneously:

**`config.ts` implementation (20 min)**
- Implement the `ArchiveConfig` interface
- Fill in the Du Bois values — this validates that your schema captures everything needed
- Move values from `theme.ts`, `worksMetadata.ts`, and any hardcoded strings in the frontend into config
- The test: can you delete the original files and have the app reconstruct them from `config.ts`?

**`bootstrap.ts` implementation (25 min)**
- Read `archiveConfig` from `config.ts`
- Validate required fields (throw with a clear error message if missing)
- Generate `.env.template` — output the required variable names without values
- Print the migration check: connect to Supabase and verify the `document_chunks` table exists
- Print the recommended ingestion command with the config-derived parameters

Facilitator circulates. Common issues to watch for:
- Type errors from incomplete interface definitions → remind them to check optional fields
- Bootstrap trying to use runtime env vars that aren't set → remind them bootstrap should guide the user to set them, not require them
- Forgetting to handle the `worksMetadata` array type correctly

**Test by configuring a second figure (bonus)**
If time allows: clear the `config.ts` values and fill in a different figure (Ida B. Wells, Frederick Douglass, or any figure they're familiar with). Does the bootstrap still run? Does the TypeScript compiler catch any missing required fields?

### Synthesis (15 min)
Each person publishes their template repo to GitHub (or, if not yet ready, creates a new repo and pushes what they have). Requirements:
- Repo is marked as a template repository in GitHub Settings
- README includes a 3-sentence introduction: what this is, who it's for, how to start
- `config.ts` is committed with the Du Bois values as a working example

Final sharing: each person reads their 3-sentence README intro aloud. Group feedback: is it clear to a non-technical librarian?

Closing: You've built not just an archive, but the machine that builds archives. That's the difference between a project and a practice.

## Materials
- Converged `config.ts` spec from virtual session (projected)
- TypeScript interface starter file (optional scaffold)
- GitHub template repository checklist (printed)

## After This Session
Write `CONFIGURATION.md` for your template repo — document every field in `config.ts` with an example. Share the repo link on the cohort channel.
