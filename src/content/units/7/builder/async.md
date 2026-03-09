# Unit 7: Metadata & Organization — Async Materials
**Pathway:** Archive Builder
**Duration:** 30–45 min

## Learning Objectives
- Edit the TITLE_MAP to correctly map source filenames to display titles for your figure's works
- Update `worksMetadata.ts` with complete entries and verify changes appear in the corpus sidebar
- Find and fix a duplicate entry in `worksMetadata.ts`

## Reading

### Editing the TITLE_MAP

The TITLE_MAP is a dictionary in the ingestion script (`scripts/ingest-corpus.ts`) that maps source filenames to display titles. When the script processes a chunk file, it looks up the filename in the TITLE_MAP to determine what `source_title` to store in the database.

```typescript
const TITLE_MAP: Record<string, string> = {
  'dubois-souls-of-black-folk-1903': 'The Souls of Black Folk',
  'dubois-darkwater-1920': 'Darkwater: Voices from Within the Veil',
  'dubois-gift-of-black-folk-1924': 'The Gift of Black Folk',
  // ... more entries
};
```

**How to add a new work:**
1. Note the filename of the chunk file (without the `.json` extension): e.g., `wells-southern-horrors-1892`
2. Add an entry to TITLE_MAP: `'wells-southern-horrors-1892': 'Southern Horrors: Lynch Law in All Its Phases'`
3. Re-run the ingestion script — it will re-process only files not already fully ingested

**What happens if a file isn't in the TITLE_MAP:**
The script falls back to the filename itself as the `source_title`. This means the database will contain rows where `source_title` is `wells-southern-horrors-1892` (the filename) rather than `Southern Horrors: Lynch Law in All Its Phases` (the display title). The sidebar will show the raw filename, and citations will look unprofessional.

**Special pattern: series files**
If your figure published a periodical with numbered issues (like the Crisis), the TITLE_MAP would need an entry for every issue file — potentially hundreds. Instead, the ingestion script supports a pattern match: any filename starting with `sim_crisis` maps to the same title. This is implemented with a special prefix check in the script:

```typescript
function getTitleFromFilename(filename: string): string {
  if (filename.startsWith('sim_crisis')) {
    return 'The Crisis: Editorials by W.E.B. Du Bois';
  }
  return TITLE_MAP[filename] ?? filename;
}
```

Adapt this pattern for your figure's periodical series.

### Updating worksMetadata.ts

The `worksMetadata.ts` file lives at `web/src/data/worksMetadata.ts`. It is a TypeScript array of objects, one per work, that drives the About page and the corpus sidebar. Each object has:

```typescript
{
  id: 'souls-of-black-folk',           // URL-safe slug (lowercase, hyphens)
  title: 'The Souls of Black Folk',    // Display title — must match source_title in DB
  year: 1903,                          // Publication year as number
  description: 'Du Bois\'s foundational collection of essays...', // 2–3 sentences
  sourceUrl: 'https://archive.org/details/soulsofblackfolk00dubo', // source URL
  category: 'books',                   // books / essays / speeches / periodicals
}
```

**Critical constraint:** The `title` field must exactly match the `source_title` values in the database. If they differ, the sidebar will show the work but the citations won't link back to it correctly, and the corpus sidebar may fail to show chapter listings.

**To verify changes appear in the sidebar:**
1. Save changes to `worksMetadata.ts`
2. Run `npm run dev` in the `web/` directory
3. Open the archive in a browser at localhost:5173
4. Click the "Corpus" tab
5. Your updated work should appear in the sidebar with the description you wrote

### Slug Rules

The `id` field in `worksMetadata.ts` is a URL-safe slug used to link pages and anchor elements. Rules:
- Lowercase letters and hyphens only
- No spaces, underscores, apostrophes, or special characters
- Should be recognizable and stable — don't change slugs after launch (they may be in bookmarks or links)
- Should not duplicate another work's slug

Good: `souls-of-black-folk`, `darkwater-1920`, `crisis-magazine`
Bad: `The Souls of Black Folk`, `darkwater(1920)`, `crisis_magazine`

### Finding and Fixing Duplicate Entries

Duplicate entries in `worksMetadata.ts` can cause subtle bugs: the sidebar may show a work twice, or the count of works in the About page badge may be inflated.

**How to check for duplicates:**

In the terminal at the project root:
```bash
grep -n 'title:' web/src/data/worksMetadata.ts | sort | uniq -d
```

This finds any title value that appears more than once. If the command returns output, you have duplicate titles. Also check for duplicate `id` slugs:
```bash
grep -n "id: '" web/src/data/worksMetadata.ts | sort | uniq -d
```

**How to fix:**
1. Find both occurrences in the file
2. Compare: are they identical entries (copy-paste error) or two different editions of the same work?
3. If identical: delete one
4. If different editions: keep both but give them distinct slugs and slightly different titles (e.g., "The Souls of Black Folk (1903 first edition)" vs. "The Souls of Black Folk (revised 1953)")

After fixing, run the dev server and verify the sidebar shows the correct count.

## Reflection Questions
1. You add 5 new works to TITLE_MAP but forget to add them to `worksMetadata.ts`. What happens in the archive? What would a user see?
2. Your figure published a magazine with 150 issues. You don't want to write 150 TITLE_MAP entries. What approach would you use instead?
3. You run the duplicate check and find that "Darkwater" appears twice — once with id `darkwater` and once with id `darkwater-1920`. Both have slightly different descriptions. What do you do?

## Prep Task
Before your next session: Add at least 5 works from your figure's corpus to both the TITLE_MAP (in the ingestion script) and `worksMetadata.ts`. Run the dev server and verify all 5 appear in the corpus sidebar with the correct title and description. Run the duplicate check command and fix any duplicates you find. Screenshot the updated sidebar and bring it to the next session.
