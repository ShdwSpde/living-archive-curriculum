import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { theme, fonts } from '../styles/theme'
import { pathways, units } from '../data/curriculum'

type Format = 'async' | 'virtual' | 'inperson'

const formatLabels: Record<Format, string> = {
  async: 'Async Materials',
  virtual: 'Virtual Lesson',
  inperson: 'In-Person Lesson',
}

const formatFiles: Record<Format, string> = {
  async: 'async',
  virtual: 'virtual-lesson',
  inperson: 'inperson-lesson',
}

// Dynamically import all markdown files at build time
const allContent = (import.meta as unknown as { glob: (pattern: string, opts: object) => Record<string, () => Promise<string>> }).glob('../content/units/**/*.md', { query: '?raw', import: 'default' })

export function LessonPage() {
  const { pathwayId, duration = '4-week', unitId, format = 'async' } = useParams()
  const [content, setContent] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const pathway = pathways.find(p => p.id === pathwayId)
  const unit = units.find(u => u.id === Number(unitId))
  const fmt = (format as Format)

  useEffect(() => {
    setLoading(true)
    setContent(null)
    const key = `../content/units/${unitId}/${pathwayId}/${formatFiles[fmt]}.md`
    const loader = allContent[key]
    if (loader) {
      loader().then((raw: string) => {
        setContent(raw)
        setLoading(false)
      })
    } else {
      setContent('> Content not yet available for this combination.')
      setLoading(false)
    }
  }, [pathwayId, unitId, fmt])

  if (!pathway || !unit) return <div style={{ color: theme.textPrimary, padding: 40 }}>Not found.</div>

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 32, fontSize: 13, color: theme.textMuted }}>
        <Link to="/">Home</Link>
        <span>›</span>
        <Link to={`/pathway/${pathwayId}/${duration}`}>{pathway.name}</Link>
        <span>›</span>
        <span style={{ color: theme.textSecondary }}>Unit {unitId}: {unit.title}</span>
      </div>

      {/* Format tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
        {(['async', 'virtual', 'inperson'] as Format[]).map(f => (
          <Link
            key={f}
            to={`/pathway/${pathwayId}/${duration}/unit/${unitId}/${f}`}
            style={{
              padding: '8px 18px',
              borderRadius: 4,
              fontSize: 14,
              fontFamily: fonts.body,
              background: f === fmt ? theme.accent : 'transparent',
              color: f === fmt ? theme.bg : theme.textSecondary,
              border: `1px solid ${f === fmt ? theme.accent : theme.border}`,
              textDecoration: 'none',
            }}
          >
            {formatLabels[f]}
          </Link>
        ))}
      </div>

      {/* Content */}
      {loading ? (
        <div style={{ color: theme.textMuted }}>Loading…</div>
      ) : (
        <div style={{ fontFamily: fonts.body, lineHeight: 1.8, color: theme.textSecondary }}>
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <h1 style={{ fontFamily: fonts.heading, fontSize: 36, fontWeight: 400, color: theme.textPrimary, marginBottom: 8 }}>{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 style={{ fontFamily: fonts.heading, fontSize: 26, fontWeight: 400, color: theme.textPrimary, margin: '40px 0 14px' }}>{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 style={{ fontFamily: fonts.heading, fontSize: 20, fontWeight: 400, color: theme.textPrimary, margin: '28px 0 10px' }}>{children}</h3>
              ),
              p: ({ children }) => (
                <p style={{ marginBottom: 16 }}>{children}</p>
              ),
              ul: ({ children }) => (
                <ul style={{ paddingLeft: 24, marginBottom: 16 }}>{children}</ul>
              ),
              ol: ({ children }) => (
                <ol style={{ paddingLeft: 24, marginBottom: 16 }}>{children}</ol>
              ),
              li: ({ children }) => (
                <li style={{ marginBottom: 6 }}>{children}</li>
              ),
              strong: ({ children }) => (
                <strong style={{ color: theme.textPrimary }}>{children}</strong>
              ),
              code: ({ children, className }) => {
                const isBlock = className?.includes('language-')
                return isBlock ? (
                  <pre style={{
                    background: 'rgba(184,134,11,0.06)',
                    border: `1px solid ${theme.border}`,
                    borderRadius: 6,
                    padding: '16px 20px',
                    overflowX: 'auto',
                    marginBottom: 16,
                    fontFamily: fonts.mono,
                    fontSize: 13,
                    color: theme.textSecondary,
                  }}>
                    <code>{children}</code>
                  </pre>
                ) : (
                  <code style={{
                    background: 'rgba(184,134,11,0.1)',
                    padding: '2px 6px',
                    borderRadius: 3,
                    fontFamily: fonts.mono,
                    fontSize: '0.88em',
                    color: theme.accentLight,
                  }}>{children}</code>
                )
              },
              table: ({ children }) => (
                <div style={{ overflowX: 'auto', marginBottom: 20 }}>
                  <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: 14 }}>{children}</table>
                </div>
              ),
              th: ({ children }) => (
                <th style={{ borderBottom: `1px solid ${theme.border}`, padding: '8px 12px', textAlign: 'left', color: theme.textPrimary, fontWeight: 600 }}>{children}</th>
              ),
              td: ({ children }) => (
                <td style={{ borderBottom: `1px solid rgba(184,134,11,0.08)`, padding: '8px 12px' }}>{children}</td>
              ),
              blockquote: ({ children }) => (
                <blockquote style={{
                  borderLeft: `3px solid ${theme.accent}`,
                  paddingLeft: 16,
                  marginBottom: 16,
                  color: theme.textMuted,
                  fontStyle: 'italic',
                }}>{children}</blockquote>
              ),
              hr: () => <hr style={{ border: 'none', borderTop: `1px solid ${theme.border}`, margin: '32px 0' }} />,
            }}
          >
            {content ?? ''}
          </ReactMarkdown>
        </div>
      )}
    </div>
  )
}
