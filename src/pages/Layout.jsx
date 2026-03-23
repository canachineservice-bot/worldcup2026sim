import { Link } from 'react-router-dom'

const S = {
  page: { minHeight: '100vh', background: '#FAFBFD', color: '#1a1a2e', fontFamily: "'Manrope',sans-serif" },
  header: { textAlign: 'center', padding: '24px 16px 12px', background: '#fff', borderBottom: '1px solid #E2E5EB' },
  title: { fontFamily: "'Oswald',sans-serif", fontSize: 'clamp(22px,5vw,38px)', fontWeight: 800, letterSpacing: 2, color: '#1a1a2e', textDecoration: 'none' },
  sub: { fontSize: 13, color: '#555577', marginTop: 3 },
  nav: { display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap', marginTop: 10 },
  link: { fontSize: 13, fontWeight: 600, color: '#2563eb', textDecoration: 'none' },
  content: { maxWidth: 900, margin: '0 auto', padding: '32px 20px' },
  footer: { textAlign: 'center', padding: '20px 12px 40px', color: '#9999bb', fontSize: 11 },
}

export default function Layout({ children, title }) {
  return (
    <div style={S.page}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;600;700;800&family=Manrope:wght@400;600;700;800&display=swap');`}</style>
      <div style={S.header}>
        <Link to="/" style={S.title}>FIFA WORLD CUP 2026</Link>
        <div style={S.sub}>USA • MEXICO • CANADA — 48 TEAMS</div>
        <nav style={S.nav}>
          <Link to="/" style={S.link}>Simulator</Link>
          <Link to="/groups" style={S.link}>Groups</Link>
          <Link to="/schedule" style={S.link}>Schedule</Link>
          <Link to="/predictions" style={S.link}>Predictions</Link>
          <Link to="/betting" style={{...S.link, color: '#d4145a', fontWeight: 800}}>📊 Betting</Link>
        </nav>
      </div>
      {title && (
        <div style={{ textAlign: 'center', padding: '28px 16px 0' }}>
          <h1 style={{ fontFamily: "'Oswald',sans-serif", fontSize: 'clamp(24px,5vw,36px)', fontWeight: 800, letterSpacing: 3, color: '#1a1a2e' }}>{title}</h1>
        </div>
      )}
      <div style={S.content}>{children}</div>
      <div style={S.footer}>
        <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: 1 }}>
          WORLD CUP 2026 SIMULATOR — ZOUHAIRE EL MATAR{' '}
          <a href="https://wa.me/15142654409" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', fontSize: 12 }}>💬</a>
        </div>
        <div style={{ marginTop: 6 }}>
          <Link to="/privacy" style={{ color: '#9999bb', fontSize: 11 }}>Privacy Policy</Link>
        </div>
      </div>
    </div>
  )
}
