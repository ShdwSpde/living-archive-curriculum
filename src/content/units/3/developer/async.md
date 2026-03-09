# Unit 3: Sourcing the Corpus — Async Materials
**Pathway:** Archive Developer
**Duration:** 30–45 min

## Learning Objectives
- Write a download automation script using Internet Archive's search API with correct pagination handling
- Implement file integrity verification (size checks, non-empty content validation) after download
- Add rate limiting and progress logging to support resume on interrupted runs

## Reading

### Internet Archive's Search API

Internet Archive exposes a search API at `https://archive.org/advancedsearch.php`. For corpus automation, you'll query by collection name or subject and page through results to get all item identifiers.

**Basic search request:**

```
GET https://archive.org/advancedsearch.php?q=collection:(dubois)&fl[]=identifier&output=json&rows=50&page=1
```

Parameters:
- `q`: search query (collection name, subject, or full-text search)
- `fl[]`: fields to return (always include `identifier` for downloads)
- `output`: `json` (always use this for automation)
- `rows`: results per page (max 10,000 but 50–100 is safer)
- `page`: 1-indexed page number

**Response structure:**

```json
{
  "response": {
    "numFound": 247,
    "docs": [
      { "identifier": "dubois-souls-of-black-folk" },
      { "identifier": "dubois-darkwater" },
      ...
    ]
  }
}
```

### Handling Pagination

The API returns `numFound` in the response. Use this to calculate total pages:

```typescript
const totalPages = Math.ceil(response.numFound / PAGE_SIZE);
```

Loop over pages 1 through `totalPages`, collecting all identifiers before starting downloads. Don't start downloading while paginating — collect the full list first, then download. This separates the concern of "what to download" from "download it" and makes resume logic cleaner.

**Pagination template:**

```typescript
async function getAllItemIds(query: string): Promise<string[]> {
  const PAGE_SIZE = 50;
  const ids: string[] = [];
  let page = 1;
  let total = Infinity;

  while (ids.length < total) {
    const url = `https://archive.org/advancedsearch.php?q=${encodeURIComponent(query)}&fl[]=identifier&output=json&rows=${PAGE_SIZE}&page=${page}`;
    const res = await fetch(url);
    const data = await res.json();
    total = data.response.numFound;
    ids.push(...data.response.docs.map((d: any) => d.identifier));
    page++;
    await sleep(500); // be polite to the API
  }

  return ids;
}
```

### Downloading Text Files for an Item

Once you have a list of item identifiers, download the text files for each item. Internet Archive's item metadata endpoint tells you which files are available:

```
GET https://archive.org/metadata/{identifier}/files
```

This returns a list of all files in the item with their format and filename. Filter for DjVuTXT or Text formats:

```typescript
const files = metadata.files.filter(
  (f: any) => f.format === 'DjVuTXT' || f.format === 'Text'
);
```

Then download each file:

```
GET https://archive.org/download/{identifier}/{filename}
```

### File Integrity Verification

After downloading, verify that the file is non-empty and contains readable text (not binary data or an error page).

**Size check:**

```typescript
const stats = fs.statSync(localPath);
if (stats.size < 1000) {
  console.warn(`[WARN] ${localPath} is suspiciously small (${stats.size} bytes)`);
}
```

**Content check:**

```typescript
const content = fs.readFileSync(localPath, 'utf8');
const wordCount = content.split(/\s+/).length;
if (wordCount < 100) {
  console.warn(`[WARN] ${localPath} has only ${wordCount} words — may be corrupt`);
}
// Check for binary data (high concentration of non-ASCII characters)
const nonAsciiRatio = (content.match(/[^\x00-\x7F]/g) || []).length / content.length;
if (nonAsciiRatio > 0.1) {
  console.warn(`[WARN] ${localPath} has high non-ASCII ratio — may be corrupt`);
}
```

Flag suspicious files to a separate log rather than failing the entire download — you want to continue with other files and review problems afterward.

### Logging and Resume Support

A corpus download script that can't resume from an interrupted run is frustrating in practice. The simplest resume pattern: check if the local file already exists before downloading.

```typescript
async function downloadItem(id: string, outDir: string) {
  const localPath = path.join(outDir, `${id}.txt`);
  if (fs.existsSync(localPath)) {
    console.log(`[SKIP] ${id} — already downloaded`);
    return;
  }
  // ... download logic
}
```

Log every action to a file (not just stdout) so you can review what happened after a long run:

```typescript
function log(level: 'INFO' | 'WARN' | 'ERROR', message: string) {
  const line = `[${new Date().toISOString()}] [${level}] ${message}`;
  console.log(line);
  fs.appendFileSync('download.log', line + '\n');
}
```

### Rate Limiting

Internet Archive's API doesn't have a published rate limit but will soft-block automated requests that hit it too aggressively. Add a delay between item downloads:

```typescript
const DELAY_BETWEEN_ITEMS_MS = 1000; // 1 second
await sleep(DELAY_BETWEEN_ITEMS_MS);
```

If you get HTTP 503 responses, increase the delay. A simple exponential backoff:

```typescript
async function downloadWithBackoff(url: string, attempt = 1): Promise<Buffer> {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return Buffer.from(await res.arrayBuffer());
  } catch (e) {
    if (attempt > 5) throw e;
    const delay = 1000 * Math.pow(2, attempt);
    console.warn(`[RETRY] attempt ${attempt}, waiting ${delay}ms`);
    await sleep(delay);
    return downloadWithBackoff(url, attempt + 1);
  }
}
```

## Reflection Questions
1. Your search returns 247 items with PAGE_SIZE=50. How many API calls do you need to collect all identifiers? Write the calculation.
2. A downloaded file is 800 bytes and passes the word-count check (it has 120 words). Is it safe to ingest? What else would you check?
3. Your download script runs for 2 hours and then crashes. When you restart it, what happens? Write the logic that prevents re-downloading already-downloaded files.

## Prep Task
Before your next session: Write the `getAllItemIds` function for your figure's collection. Run it and print the total item count and first 10 identifiers to the console. Don't start downloading yet — just verify that the search API is returning the items you expect.
