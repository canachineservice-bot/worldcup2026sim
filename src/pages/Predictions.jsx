import { Link } from 'react-router-dom'
import Layout from './Layout'
import { useTheme } from '../ThemeContext.jsx'

const FAVORITES = [
  { flag: '🇪🇸', name: 'Spain', rank: 1, odds: '+450', prob: '15.4%', why: 'Reigning champions, dominant possession, youngest squad among favorites.' },
  { flag: '🇬🇧', name: 'England', rank: 4, odds: '+550', prob: '13.1%', why: 'Deepest squad in the tournament, strong Premier League core.' },
  { flag: '🇦🇷', name: 'Argentina', rank: 2, odds: '+800', prob: '10.9%', why: '2022 champions with Messi legacy, exceptional midfield depth.' },
  { flag: '🇫🇷', name: 'France', rank: 3, odds: '+750', prob: '10.5%', why: 'Back-to-back finalist pedigree, world-class attack.' },
  { flag: '🇧🇷', name: 'Brazil', rank: 5, odds: '+800', prob: '8.7%', why: 'New generation hungry to end the trophy drought.' },
  { flag: '🇵🇹', name: 'Portugal', rank: 4, odds: '+1100', prob: '6.5%', why: 'Golden generation with tactical flexibility.' },
  { flag: '🇩🇪', name: 'Germany', rank: 8, odds: '+1200', prob: '5.0%', why: 'Tournament pedigree, home-continent advantage in North America.' },
  { flag: '🇳🇱', name: 'Netherlands', rank: 7, odds: '+2000', prob: '4.2%', why: 'Total football philosophy, consistent performer.' },
]

const DARKHORSES = [
  { flag: '🇲🇦', name: 'Morocco', rank: 14, odds: '+6000', why: 'Semi-finalists in 2022, strong defense, passionate fanbase.' },
  { flag: '🇺🇸', name: 'USA', rank: 11, odds: '+4000', why: 'Host nation advantage, young talented squad.' },
  { flag: '🇯🇵', name: 'Japan', rank: 13, odds: '+8000', why: 'Giant-killers, beat Germany & Spain in 2022.' },
  { flag: '🇭🇷', name: 'Croatia', rank: 18, odds: '+5000', why: '2018 finalists, 2022 semi-finalists, elite midfield.' },
]

export default function Predictions() {
  const { C } = useTheme();
  return (
    <Layout title="World Cup 2026 Predictions — Pronostics CDM 2026">
      <p style={{ textAlign: 'center', color: C.t2, marginBottom: 32, fontSize: 15, lineHeight: 1.7 }}>
        Who will win the 2026 FIFA World Cup? Here are the top favorites, dark horses,
        and odds for the biggest tournament in football history.
      </p>

      <h2 style={{ fontFamily: "'Oswald',sans-serif", fontSize: 22, letterSpacing: 2, color: C.tx, marginBottom: 16 }}>Top Favorites</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 40 }}>
        {FAVORITES.map(t => (
          <div key={t.name} style={{ background: C.cd, borderRadius: 14, padding: '16px 20px', border: `1px solid ${C.bd}`, display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 36 }}>{t.flag}</span>
            <div style={{ flex: 1, minWidth: 180 }}>
              <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 20, fontWeight: 700 }}>{t.name}</div>
              <div style={{ fontSize: 13, color: C.t2, marginTop: 2 }}>{t.why}</div>
            </div>
            <div style={{ textAlign: 'center', minWidth: 80 }}>
              <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 22, fontWeight: 800, color: C.ac }}>{t.prob}</div>
              <div style={{ fontSize: 11, color: C.t3 }}>Odds: {t.odds}</div>
              <div style={{ fontSize: 11, color: C.t3 }}>FIFA #{t.rank}</div>
            </div>
          </div>
        ))}
      </div>

      <h2 style={{ fontFamily: "'Oswald',sans-serif", fontSize: 22, letterSpacing: 2, color: C.tx, marginBottom: 16 }}>Dark Horses</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(250px,1fr))', gap: 10, marginBottom: 40 }}>
        {DARKHORSES.map(t => (
          <div key={t.name} style={{ background: C.cd, borderRadius: 14, padding: '16px 18px', border: `1px solid ${C.bd}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: 30 }}>{t.flag}</span>
              <div>
                <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 18, fontWeight: 700 }}>{t.name}</div>
                <div style={{ fontSize: 11, color: C.t3 }}>FIFA #{t.rank} • Odds: {t.odds}</div>
              </div>
            </div>
            <div style={{ fontSize: 13, color: C.t2 }}>{t.why}</div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', padding: '24px', background: C.cd, borderRadius: 16, border: `2px solid ${C.ac}22` }}>
        <div style={{ fontSize: 28, marginBottom: 8 }}>⚽</div>
        <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Make Your Own Prediction!</div>
        <p style={{ fontSize: 14, color: C.t2, marginBottom: 16 }}>Run the simulator and see who wins your World Cup 2026.</p>
        <Link to="/" style={{ display: 'inline-block', padding: '14px 36px', fontSize: 16, fontWeight: 800, fontFamily: "'Oswald',sans-serif", letterSpacing: 3, border: 'none', borderRadius: 50, color: C.cd, background: `linear-gradient(135deg,${C.ac},${C.ac}cc)`, textDecoration: 'none' }}>
          SIMULATE NOW
        </Link>
      </div>
    </Layout>
  )
}
