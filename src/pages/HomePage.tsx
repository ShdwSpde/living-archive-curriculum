import { useNavigate } from 'react-router-dom'
import { theme, fonts } from '../styles/theme'
import { pathways, durations } from '../data/curriculum'

export function HomePage() {
  const navigate = useNavigate()

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '60px 24px' }}>
      {/* Hero */}
      <div style={{ textAlign: 'center', marginBottom: 72 }}>
        <p style={{ color: theme.accent, fontFamily: fonts.body, fontSize: 14, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 16 }}>
          Living Archive Project
        </p>
        <h1 style={{ fontFamily: fonts.heading, fontSize: 56, fontWeight: 400, color: theme.textPrimary, lineHeight: 1.1, marginBottom: 24 }}>
          Curriculum
        </h1>
        <p style={{ fontFamily: fonts.body, fontSize: 20, color: theme.textSecondary, maxWidth: 640, margin: '0 auto', lineHeight: 1.7 }}>
          A hybrid curriculum for building and deploying living archive systems —
          AI-powered research tools grounded in historical primary sources.
        </p>
      </div>

      {/* Pathway Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
        {pathways.map(pathway => (
          <div
            key={pathway.id}
            style={{
              background: theme.bgCard,
              border: `1px solid ${theme.border}`,
              borderRadius: 8,
              padding: 32,
              cursor: 'pointer',
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = theme.borderHover)}
            onMouseLeave={e => (e.currentTarget.style.borderColor = theme.border)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: pathway.color, flexShrink: 0 }} />
              <h2 style={{ fontFamily: fonts.heading, fontSize: 22, fontWeight: 400, color: theme.textPrimary }}>
                {pathway.name}
              </h2>
            </div>
            <p style={{ color: theme.textSecondary, fontSize: 14, marginBottom: 8 }}>{pathway.tagline}</p>
            <p style={{ color: theme.textMuted, fontSize: 13, lineHeight: 1.6, marginBottom: 24 }}>{pathway.description}</p>
            <div style={{ marginBottom: 8 }}>
              <span style={{ fontSize: 12, color: theme.textMuted, textTransform: 'uppercase', letterSpacing: 1 }}>Technical level: </span>
              <span style={{ fontSize: 12, color: theme.accent }}>{pathway.codeLevel}</span>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
              {durations.map(dur => (
                <button
                  key={dur}
                  onClick={() => navigate(`/pathway/${pathway.id}/${dur}`)}
                  style={{
                    background: 'transparent',
                    border: `1px solid ${theme.border}`,
                    borderRadius: 4,
                    color: theme.textSecondary,
                    padding: '6px 14px',
                    fontSize: 13,
                    cursor: 'pointer',
                    fontFamily: fonts.body,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = theme.accent; e.currentTarget.style.color = theme.accent }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = theme.border; e.currentTarget.style.color = theme.textSecondary }}
                >
                  {dur}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', marginTop: 80, paddingTop: 40, borderTop: `1px solid ${theme.border}` }}>
        <p style={{ color: theme.textMuted, fontSize: 14 }}>
          Based on the{' '}
          <a href="https://dubois-living-archive.vercel.app" target="_blank" rel="noopener noreferrer">
            W.E.B. Du Bois Living Archive
          </a>
          {' '}— a model RAG-based cultural heritage archive
        </p>
      </div>
    </div>
  )
}
