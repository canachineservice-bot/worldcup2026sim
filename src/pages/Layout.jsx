import { Link } from 'react-router-dom'
import { useTheme } from '../ThemeContext.jsx'

export default function Layout({ children, title }) {
  const { dark, toggle, C } = useTheme();

  return (
    <div style={{ minHeight: '100vh', background: C.bg, color: C.tx, fontFamily: "'Manrope',sans-serif", transition: 'background 0.3s, color 0.3s' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;600;700;800&family=Manrope:wght@400;600;700;800&display=swap');`}</style>
      <div style={{ textAlign: 'center', padding: '24px 16px 12px', background: C.cd, borderBottom: `1px solid ${C.bd}`, transition: 'background 0.3s' }}>
        <Link to="/" style={{ fontFamily: "'Oswald',sans-serif", fontSize: 'clamp(22px,5vw,38px)', fontWeight: 800, letterSpacing: 2, color: C.tx, textDecoration: 'none' }}>
          FIFA WORLD CUP 2026
        </Link>
        <div style={{ fontSize: 13, color: C.t2, marginTop: 3 }}>USA • MEXICO • CANADA — 48 TEAMS</div>
        <nav style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap', marginTop: 10, alignItems: 'center' }}>
          <Link to="/" style={{ fontSize: 13, fontWeight: 600, color: C.bl, textDecoration: 'none' }}>Simulator</Link>
          <Link to="/groups" style={{ fontSize: 13, fontWeight: 600, color: C.bl, textDecoration: 'none' }}>Groups</Link>
          <Link to="/schedule" style={{ fontSize: 13, fontWeight: 600, color: C.bl, textDecoration: 'none' }}>Schedule</Link>
          <Link to="/predictions" style={{ fontSize: 13, fontWeight: 600, color: C.bl, textDecoration: 'none' }}>Predictions</Link>
          <Link to="/betting" style={{ fontSize: 13, fontWeight: 800, color: C.ac, textDecoration: 'none' }}>📊 Betting</Link>
          <button onClick={toggle} style={{
            padding: '4px 12px', fontSize: 14, borderRadius: 8,
            border: `1px solid ${C.a2}`, background: `${C.a2}11`, color: C.a2,
            cursor: 'pointer', fontWeight: 700, fontFamily: "'Oswald',sans-serif"
          }}>
            {dark ? '☀️' : '🌙'}
          </button>
        </nav>
      </div>
      {title && (
        <div style={{ textAlign: 'center', padding: '28px 16px 0' }}>
          <h1 style={{ fontFamily: "'Oswald',sans-serif", fontSize: 'clamp(24px,5vw,36px)', fontWeight: 800, letterSpacing: 3, color: C.tx }}>{title}</h1>
        </div>
      )}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 20px' }}>{children}</div>
      <div style={{ textAlign: 'center', padding: '20px 12px 40px', color: C.t3, fontSize: 11 }}>
        <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: 1 }}>
          WORLD CUP 2026 SIMULATOR — ZOUHAIRE EL MATAR{' '}
          <a href="https://wa.me/15142654409" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', fontSize: 12 }}>💬</a>
        </div>
        <div style={{ marginTop: 6 }}>
          <Link to="/privacy" style={{ color: C.t3, fontSize: 11 }}>Privacy Policy</Link>
        </div>
      </div>
    </div>
  )
}
