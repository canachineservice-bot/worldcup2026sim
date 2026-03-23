import { Link } from 'react-router-dom'
import Layout from './Layout'
import { useTheme } from '../ThemeContext.jsx'

const STATS = [
  ['FIFA Ranking', '14th'],
  ['ELO Rating', '1880'],
  ['Group', 'C (Brazil, Scotland, Haiti)'],
  ['WC Appearances', '7th'],
  ['Best Result', 'Semi-Final (2022)'],
  ['Qualification', 'Qualified as host nation (co-host)'],
  ['Key Player', 'Achraf Hakimi'],
  ['Coach', 'Walid Regragui'],
  ['Squad Value', '~520M EUR'],
  ['Win Probability', '1.2%'],
  ['Odds', '+6000'],
]

const PLAYERS = [
  { name: 'Achraf Hakimi', pos: 'RB', club: 'PSG', note: '3 goals, 7 assists in qualifiers' },
  { name: 'Youssef En-Nesyri', pos: 'ST', club: 'Fenerbahce', note: 'Top scorer, aerial threat' },
  { name: 'Hakim Ziyech', pos: 'AM', club: 'Galatasaray', note: 'Creative playmaker, set-piece specialist' },
  { name: 'Yassine Bounou', pos: 'GK', club: 'Al-Hilal', note: '2022 WC hero, penalty specialist' },
  { name: 'Nayef Aguerd', pos: 'CB', club: 'Real Sociedad', note: 'Defensive rock, ball-playing CB' },
  { name: 'Sofyan Amrabat', pos: 'CM', club: 'Fenerbahce', note: 'Engine of the midfield, tireless runner' },
]

export default function Morocco() {
  const { C } = useTheme();

  return (
    <Layout title="Morocco at World Cup 2026 — Le Maroc a la CDM 2026">
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div style={{ fontSize: 60 }}>🇲🇦</div>
        <p style={{ color: C.t2, fontSize: 15, lineHeight: 1.7, marginTop: 12 }}>
          Morocco made history at the 2022 World Cup as the first African and Arab nation to reach the semi-finals.
          As co-hosts of the 2026 tournament, the Atlas Lions aim to go even further on home soil in North America.
        </p>
        <p dir="rtl" style={{ color: C.t2, fontSize: 15, lineHeight: 1.7, marginTop: 12, fontFamily: 'sans-serif' }}>
          المغرب سجل التاريخ في كأس العالم 2022 كأول دولة أفريقية وعربية تصل إلى نصف النهائي.
          أسود الأطلس يطمحون للذهاب أبعد في كأس العالم 2026.
        </p>
      </div>

      <h2 style={{ fontFamily: "'Oswald',sans-serif", fontSize: 22, letterSpacing: 2, color: C.tx, marginBottom: 16 }}>Team Profile</h2>
      <div style={{ background: C.cd, borderRadius: 14, border: `1px solid ${C.bd}`, overflow: 'hidden', marginBottom: 36 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <tbody>
            {STATS.map(([label, value]) => (
              <tr key={label}>
                <td style={{ padding: '10px 16px', fontWeight: 700, color: C.tx, borderBottom: `1px solid ${C.bd}`, width: '40%' }}>{label}</td>
                <td style={{ padding: '10px 16px', color: C.t2, borderBottom: `1px solid ${C.bd}` }}>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={{ fontFamily: "'Oswald',sans-serif", fontSize: 22, letterSpacing: 2, color: C.tx, marginBottom: 16 }}>Key Players</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(250px,1fr))', gap: 10, marginBottom: 36 }}>
        {PLAYERS.map(p => (
          <div key={p.name} style={{ background: C.cd, borderRadius: 12, padding: '14px 18px', border: `1px solid ${C.bd}` }}>
            <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 17, fontWeight: 700, color: C.ac }}>{p.name}</div>
            <div style={{ fontSize: 12, color: C.t3, marginTop: 2 }}>{p.pos} — {p.club}</div>
            <div style={{ fontSize: 13, color: C.t2, marginTop: 6 }}>{p.note}</div>
          </div>
        ))}
      </div>

      <h2 style={{ fontFamily: "'Oswald',sans-serif", fontSize: 22, letterSpacing: 2, color: C.tx, marginBottom: 16 }}>Group C Matches</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 36 }}>
        {[
          { vs: '🇧🇷 Brazil', date: 'June 2026', venue: 'TBD' },
          { vs: '🏴󠁧󠁢󠁳󠁣󠁴󠁿 Scotland', date: 'June 2026', venue: 'TBD' },
          { vs: '🇭🇹 Haiti', date: 'June 2026', venue: 'TBD' },
        ].map(m => (
          <div key={m.vs} style={{ background: C.cd, borderRadius: 12, padding: '14px 20px', border: `1px solid ${C.bd}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: 20, marginRight: 10 }}>🇲🇦</span>
              <span style={{ fontWeight: 700 }}>Morocco vs {m.vs}</span>
            </div>
            <div style={{ fontSize: 12, color: C.t3 }}>{m.date}</div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', padding: '24px', background: `${C.ac}08`, borderRadius: 16, border: `2px solid ${C.ac}22` }}>
        <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Can Morocco Win the World Cup?</div>
        <p style={{ fontSize: 14, color: C.t2, marginBottom: 16 }}>Simulate the entire tournament and see if the Atlas Lions can lift the trophy!</p>
        <Link to="/" style={{ display: 'inline-block', padding: '14px 36px', fontSize: 16, fontWeight: 800, fontFamily: "'Oswald',sans-serif", letterSpacing: 3, border: 'none', borderRadius: 50, color: C.cd, background: `linear-gradient(135deg,${C.ac},${C.ac}cc)`, textDecoration: 'none' }}>
          SIMULATE NOW
        </Link>
      </div>
    </Layout>
  )
}
