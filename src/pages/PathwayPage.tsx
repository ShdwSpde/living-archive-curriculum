import { useParams, useNavigate, Link } from 'react-router-dom'
import { theme, fonts } from '../styles/theme'
import { pathways, units, durations, unitsByPathwayDuration } from '../data/curriculum'

export function PathwayPage() {
  const { pathwayId, duration = '4-week' } = useParams()
  const navigate = useNavigate()

  const pathway = pathways.find(p => p.id === pathwayId)
  if (!pathway) return <div style={{ color: theme.textPrimary, padding: 40 }}>Pathway not found.</div>

  const includedUnitIds = unitsByPathwayDuration[pathway.id]?.[duration] ?? []
  const includedUnits = units.filter(u => includedUnitIds.includes(u.id))
  const sessions = duration === '2-week' ? 6 : duration === '4-week' ? 12 : 18

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px' }}>
      {/* Back */}
      <Link to="/" style={{ color: theme.textMuted, fontSize: 14, display: 'inline-block', marginBottom: 32 }}>
        ← All pathways
      </Link>

      {/* Header */}
      <div style={{ marginBottom: 48 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <div style={{ width: 14, height: 14, borderRadius: '50%', background: pathway.color }} />
          <span style={{ color: theme.textMuted, fontSize: 14, textTransform: 'uppercase', letterSpacing: 2 }}>
            {pathway.codeLevel}
          </span>
        </div>
        <h1 style={{ fontFamily: fonts.heading, fontSize: 42, fontWeight: 400, color: theme.textPrimary, marginBottom: 12 }}>
          {pathway.name}
        </h1>
        <p style={{ color: theme.textSecondary, fontSize: 18, lineHeight: 1.6, maxWidth: 600, marginBottom: 24 }}>
          {pathway.description}
        </p>

        {/* Duration selector */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          {durations.map(dur => (
            <button
              key={dur}
              onClick={() => navigate(`/pathway/${pathway.id}/${dur}`)}
              style={{
                background: dur === duration ? theme.accent : 'transparent',
                border: `1px solid ${dur === duration ? theme.accent : theme.border}`,
                borderRadius: 4,
                color: dur === duration ? theme.bg : theme.textSecondary,
                padding: '8px 20px',
                fontSize: 14,
                cursor: 'pointer',
                fontFamily: fonts.body,
              }}
            >
              {dur}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 32, color: theme.textMuted, fontSize: 14 }}>
          <span>{sessions} sessions</span>
          <span>3 sessions/week</span>
          <span>75 min each</span>
          <span style={{ color: theme.accent }}>Deliverable: {pathway.deliverables[duration]}</span>
        </div>
      </div>

      {/* Unit list */}
      <h2 style={{ fontFamily: fonts.heading, fontSize: 24, fontWeight: 400, color: theme.textPrimary, marginBottom: 24 }}>
        Units in this track
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {includedUnits.map((unit, i) => (
          <div
            key={unit.id}
            style={{
              background: theme.bgCard,
              border: `1px solid ${theme.border}`,
              borderRadius: 6,
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <span style={{ color: theme.accent, fontFamily: fonts.mono, fontSize: 13, width: 28, flexShrink: 0 }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <div>
              <div style={{ color: theme.textPrimary, fontSize: 16, marginBottom: 2 }}>{unit.title}</div>
              <div style={{ color: theme.textMuted, fontSize: 13 }}>{unit.subtitle}</div>
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
              {(['async', 'virtual', 'inperson'] as const).map(fmt => (
                <Link
                  key={fmt}
                  to={`/pathway/${pathway.id}/${duration}/unit/${unit.id}/${fmt}`}
                  style={{ fontSize: 12, color: theme.textMuted, background: theme.bgHover, padding: '4px 8px', borderRadius: 3, textDecoration: 'none' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = theme.accent }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = theme.textMuted }}
                >
                  {fmt === 'async' ? 'Async' : fmt === 'virtual' ? 'Virtual' : 'In-Person'}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Audience */}
      <div style={{ marginTop: 48, padding: 24, background: theme.bgCard, border: `1px solid ${theme.border}`, borderRadius: 8 }}>
        <h3 style={{ fontFamily: fonts.heading, fontSize: 18, color: theme.textPrimary, marginBottom: 8 }}>Audience</h3>
        <p style={{ color: theme.textSecondary, fontSize: 15 }}>{pathway.audience}</p>
      </div>
    </div>
  )
}
