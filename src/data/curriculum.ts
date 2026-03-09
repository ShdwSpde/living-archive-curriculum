export interface Pathway {
  id: 'advocate' | 'builder' | 'developer'
  name: string
  tagline: string
  description: string
  audience: string
  codeLevel: string
  color: string
  deliverables: Record<string, string>
}

export interface Unit {
  id: number
  title: string
  subtitle: string
}

export const pathways: Pathway[] = [
  {
    id: 'advocate',
    name: 'Archive Advocate',
    tagline: 'For curators, administrators, and grant writers',
    description: 'Understand, evaluate, commission, and steward living archive projects — without writing any code.',
    audience: 'Curators, administrators, grant writers, humanities faculty',
    codeLevel: 'No code',
    color: '#8B6914',
    deliverables: {
      '2-week': 'Annotated corpus proposal',
      '4-week': 'Full archive proposal + funder pitch deck',
      '6-week': 'Grant-ready archive brief with 5-year budget',
    },
  },
  {
    id: 'builder',
    name: 'Archive Builder',
    tagline: 'For librarians, archivists, and digital humanists',
    description: 'Deploy a working living archive using guided tools and pre-built scripts — no coding from scratch.',
    audience: 'Librarians, archivists, digital humanists',
    codeLevel: 'Low-code (guided scripts)',
    color: '#2D6A4F',
    deliverables: {
      '2-week': 'Cleaned corpus + configured Supabase account',
      '4-week': 'Working archive with functional RAG queries',
      '6-week': 'Two deployed archives + replication guide',
    },
  },
  {
    id: 'developer',
    name: 'Archive Developer',
    tagline: 'For researchers and developers',
    description: 'Build and customize a production-ready living archive from scratch — full technical implementation.',
    audience: 'Researchers with coding background, embedded developers',
    codeLevel: 'Full implementation',
    color: '#1B4F72',
    deliverables: {
      '2-week': 'Ingested corpus in Supabase with HNSW index',
      '4-week': 'Full RAG backend with tested query pipeline',
      '6-week': 'Production archive with custom UI + template repo',
    },
  },
]

export const units: Unit[] = [
  { id: 1, title: 'Why Living Archives', subtitle: 'RAG vs. Fine-tuning' },
  { id: 2, title: 'Choosing a Historical Figure', subtitle: 'Corpus research and selection' },
  { id: 3, title: 'Sourcing the Corpus', subtitle: 'Public domain and digitization' },
  { id: 4, title: 'Text Quality & Preparation', subtitle: 'OCR, chunking, chapter detection' },
  { id: 5, title: 'Embedding & AI', subtitle: 'Semantic vectors and ingestion' },
  { id: 6, title: 'Database Design', subtitle: 'pgvector and HNSW indexing' },
  { id: 7, title: 'Metadata & Organization', subtitle: 'Title mapping and works metadata' },
  { id: 8, title: 'RAG Query Pipeline', subtitle: 'Retrieval, prompting, attribution' },
  { id: 9, title: 'Pitfalls & Quality Control', subtitle: 'Common failures and fixes' },
  { id: 10, title: 'Cost Modeling & Sustainability', subtitle: 'Budgeting and cost reduction' },
  { id: 11, title: 'Deployment & Going Live', subtitle: 'Vercel and institutional launch' },
  { id: 12, title: 'Scaling to Community', subtitle: 'Replication and partnership' },
]

export const durations = ['2-week', '4-week', '6-week'] as const
export type Duration = typeof durations[number]

export const unitsByPathwayDuration: Record<string, Record<string, number[]>> = {
  advocate: {
    '2-week': [1, 2, 3, 4, 5, 6],
    '4-week': [1, 2, 3, 4, 5, 6, 7, 8, 9],
    '6-week': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },
  builder: {
    '2-week': [1, 2, 3, 4],
    '4-week': [1, 2, 3, 4, 5, 6, 7, 8, 9],
    '6-week': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },
  developer: {
    '2-week': [1, 2, 3, 4, 5],
    '4-week': [1, 2, 3, 4, 5, 6, 7, 8, 9],
    '6-week': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },
}
