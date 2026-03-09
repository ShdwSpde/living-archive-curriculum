# Unit 7: Metadata & Organization — Async Materials
**Pathway:** Archive Developer
**Duration:** 30–45 min

## Learning Objectives
- Extend the WorkMeta interface to support additional metadata fields without breaking existing consumers
- Write SQL migrations to add new metadata columns and backfill them from existing data
- Handle multi-volume works and anonymous texts as special cases in the metadata pipeline

## Reading

### Extending the WorkMeta Interface

The `WorkMeta` interface in `web/src/data/worksMetadata.ts` defines the shape of each work's metadata. Extending it for new fields requires updating both the interface definition and all the places in the codebase that create or consume `WorkMeta` objects.

**Current interface:**
```typescript
export interface WorkMeta {
  id: string;
  title: string;
  year: number;
  description: string;
  sourceUrl: string;
  category: 'books' | 'essays' | 'speeches' | 'periodicals';
}
```

**Adding an optional field (non-breaking):**
```typescript
export interface WorkMeta {
  id: string;
  title: string;
  year: number;
  description: string;
  sourceUrl: string;
  category: 'books' | 'essays' | 'speeches' | 'periodicals';
  volumeCount?: number;          // for multi-volume works
  alternateTitle?: string;       // for works published under pseudonyms
  contentWarning?: string;       // for works with graphic historical content
}
```

Optional fields (marked with `?`) are non-breaking — existing data objects that don't include the field will still typecheck. Required fields would break all existing entries.

**Where consumers need updating:**
- The sidebar component: if you want to display the new field, add the render logic
- The About page: if the About page grid uses `WorkMeta` fields, update the card component
- Any scripts that create `WorkMeta` objects programmatically (e.g., a metadata import script)

Run `npx tsc --noEmit` after adding a new field to catch any consumers that don't handle it correctly.

### Writing a Migration to Add New Columns

Adding a column to `document_chunks` after initial ingestion requires a migration and optionally a backfill.

**Add column (non-breaking):**
```sql
ALTER TABLE document_chunks
ADD COLUMN source_year INT;
```

All existing rows get `NULL` for the new column. The ingestion script will need to populate this field on new inserts; existing rows require a backfill.

**Backfill from JSONB metadata:**
```sql
UPDATE document_chunks
SET source_year = (metadata->>'year')::INT
WHERE metadata->>'year' IS NOT NULL
  AND source_year IS NULL;
```

**Backfill from TITLE_MAP equivalent (via source_title):**
If source_year isn't in the metadata field but you know the year for each work from external data:
```sql
UPDATE document_chunks SET source_year = 1903 WHERE source_title = 'The Souls of Black Folk';
UPDATE document_chunks SET source_year = 1920 WHERE source_title = 'Darkwater: Voices from Within the Veil';
-- etc.
```

This is tedious for large corpora but appropriate when the year is not in the source data.

**Migration naming convention:**
```
supabase/migrations/20240901_add_source_year.sql
```
Use ISO date + descriptive name. Run migrations in order; don't rename or modify migrations after they've been run in production.

### Writing a Metadata Validation Script

A validation script checks that all database `source_title` values have matching entries in `worksMetadata.ts`, and vice versa. Run this as part of your CI process or before deployment.

```typescript
import { worksMetadata } from '../web/src/data/worksMetadata';
import { supabase } from './supabase-client';

async function validateMetadataSync() {
  // Get all unique source_titles from the database
  const { data: dbTitles } = await supabase
    .from('document_chunks')
    .select('source_title')
    .order('source_title');

  const uniqueDbTitles = [...new Set(dbTitles?.map(r => r.source_title))];
  const metadataTitles = new Set(worksMetadata.map(w => w.title));

  const inDbNotMeta = uniqueDbTitles.filter(t => !metadataTitles.has(t));
  const inMetaNotDb = worksMetadata.filter(w => !uniqueDbTitles.includes(w.title));

  if (inDbNotMeta.length) {
    console.warn('[WARN] In database but not in worksMetadata:');
    inDbNotMeta.forEach(t => console.warn(`  - ${t}`));
  }

  if (inMetaNotDb.length) {
    console.warn('[WARN] In worksMetadata but not in database:');
    inMetaNotDb.forEach(w => console.warn(`  - ${w.title}`));
  }

  if (!inDbNotMeta.length && !inMetaNotDb.length) {
    console.log('[OK] Database and worksMetadata are synchronized.');
  }
}
```

### Handling Multi-Volume Works and Anonymous Texts

**Multi-volume works:**
A figure may have published a work in multiple volumes (e.g., *The Suppression of the African Slave-Trade* Part I and Part II). Options:
1. One `worksMetadata.ts` entry with `volumeCount: 2` — cite both volumes under one title
2. Separate entries: `the-suppression-part-1` and `the-suppression-part-2` — allows separate chapter navigation

Choose option 1 if the volumes are typically cited together; option 2 if they're cited independently in the scholarship.

For the TITLE_MAP, map both volume filenames to the same display title if using option 1:
```typescript
'figure-work-vol-1-1896': 'The Suppression of the African Slave-Trade',
'figure-work-vol-2-1896': 'The Suppression of the African Slave-Trade',
```

**Anonymous texts:**
Some figures published texts without attribution (political pamphlets, unsigned newspaper editorials). Two approaches:
1. Attribute to the figure: `source_title = "Attributed to [Figure Name]: [Title]"` — makes the attribution explicit but uncertain
2. Describe the source: `source_title = "Unsigned Editorial, [Newspaper], [Date]"` — accurate but doesn't reinforce the attribution

For archives with scholarly advisory boards, consult them on how to handle attribution of uncertain texts. Whatever approach you choose, document it in the archive's methodology statement.

## Reflection Questions
1. You add a required field `volume?: number` to WorkMeta (marked as optional with `?`). The TypeScript compiler doesn't complain. But you want to ensure every multi-volume work has this field populated. How would you add that validation?
2. Your figure published 30 pamphlets anonymously, but scholars have attributed most of them to the figure. You're including 20 of them. What `source_title` convention would you use, and how would you handle the 5 where attribution is genuinely uncertain?
3. Write the SQL to backfill `source_year` for all 30 works in the Du Bois corpus from a known year-per-title mapping. What makes this approach fragile, and how would you make it more robust?

## Prep Task
Before your next session: Run the metadata validation script against your corpus. Document every mismatch (in-database-not-in-metadata AND in-metadata-not-in-database). Fix all mismatches. Run the script again and confirm it reports "synchronized." Bring the first output (with mismatches) and the final output (synchronized) to the next session.
