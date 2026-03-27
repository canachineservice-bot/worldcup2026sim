import { Link } from 'react-router-dom'
import Layout from './Layout'

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
  return (
    <Layout title="World Cup 2026 Predictions — Pronostics CDM 2026">
      <p style={{ textAlign: 'center', color: '#555577', marginBottom: 32, fontSize: 15, lineHeight: 1.7 }}>
        Who will win the 2026 FIFA World Cup? Here are the top favorites, dark horses,
        and odds for the biggest tournament in football history.
      </p>

      <h2 style={{ fontFamily: "'Oswald',sans-serif", fontSize: 22, letterSpacing: 2, color: '#1a1a2e', marginBottom: 16 }}>Top Favorites</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 40 }}>
        {FAVORITES.map(t => (
          <div key={t.name} style={{ background: '#fff', borderRadius: 14, padding: '16px 20px', border: '1px solid #E2E5EB', display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 36 }}>{t.flag}</span>
            <div style={{ flex: 1, minWidth: 180 }}>
              <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 20, fontWeight: 700 }}>{t.name}</div>
              <div style={{ fontSize: 13, color: '#555577', marginTop: 2 }}>{t.why}</div>
            </div>
            <div style={{ textAlign: 'center', minWidth: 80 }}>
              <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 22, fontWeight: 800, color: '#d4145a' }}>{t.prob}</div>
              <div style={{ fontSize: 11, color: '#9999bb' }}>Odds: {t.odds}</div>
              <div style={{ fontSize: 11, color: '#9999bb' }}>FIFA #{t.rank}</div>
            </div>
          </div>
        ))}
      </div>

      <h2 style={{ fontFamily: "'Oswald',sans-serif", fontSize: 22, letterSpacing: 2, color: '#1a1a2e', marginBottom: 16 }}>Dark Horses</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(250px,1fr))', gap: 10, marginBottom: 40 }}>
        {DARKHORSES.map(t => (
          <div key={t.name} style={{ background: '#fff', borderRadius: 14, padding: '16px 18px', border: '1px solid #E2E5EB' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: 30 }}>{t.flag}</span>
              <div>
                <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 18, fontWeight: 700 }}>{t.name}</div>
                <div style={{ fontSize: 11, color: '#9999bb' }}>FIFA #{t.rank} • Odds: {t.odds}</div>
              </div>
            </div>
            <div style={{ fontSize: 13, color: '#555577' }}>{t.why}</div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', padding: '24px', background: '#fff', borderRadius: 16, border: '2px solid #d4145a22' }}>
        <div style={{ fontSize: 28, marginBottom: 8 }}>⚽</div>
        <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Make Your Own Prediction!</div>
        <p style={{ fontSize: 14, color: '#555577', marginBottom: 16 }}>Run the simulator and see who wins your World Cup 2026.</p>
        <Link to="/" style={{ display: 'inline-block', padding: '14px 36px', fontSize: 16, fontWeight: 800, fontFamily: "'Oswald',sans-serif", letterSpacing: 3, border: 'none', borderRadius: 50, color: '#fff', background: 'linear-gradient(135deg,#d4145a,#d4145acc)', textDecoration: 'none' }}>
          SIMULATE NOW
        </Link>
      </div>

      <div style={{ maxWidth: 800, margin: '32px auto 0', color: '#555577', fontSize: 14, lineHeight: 1.8 }}>
        <h2 style={{ fontFamily: "'Oswald',sans-serif", fontSize: 20, fontWeight: 700, color: '#1a1a2e', letterSpacing: 2, marginBottom: 10 }}>WORLD CUP 2026 PREDICTIONS & ANALYSIS</h2>
        <p>Predicting the winner of the 2026 FIFA World Cup requires analyzing multiple factors: current FIFA rankings, squad depth, tactical systems, recent tournament performance, qualifying form, and the crucial home advantage for host nations USA, Mexico, and Canada.</p>

        <h3 style={{ fontFamily: "'Oswald',sans-serif", fontSize: 17, fontWeight: 700, color: '#1a1a2e', marginTop: 20, marginBottom: 8 }}>Why Spain and France Lead the Odds</h3>
        <p>Spain enters as reigning World Cup and European champions with the youngest title-winning squad in modern history. Their possession-based style and depth across every position makes them the bookmakers' favorite. France, despite recent setbacks, possesses arguably the most talented roster in world football and has reached two consecutive World Cup Finals (2018 winner, 2022 runner-up).</p>

        <h3 style={{ fontFamily: "'Oswald',sans-serif", fontSize: 17, fontWeight: 700, color: '#1a1a2e', marginTop: 20, marginBottom: 8 }}>South American Contenders</h3>
        <p>Argentina, the defending champions, and Brazil, the most successful World Cup nation with 5 titles, represent South America's strongest hopes. Argentina's 2022 triumph in Qatar demonstrated their ability to peak at tournaments, while Brazil's new generation is eager to end a title drought stretching back to 2002.</p>

        <h3 style={{ fontFamily: "'Oswald',sans-serif", fontSize: 17, fontWeight: 700, color: '#1a1a2e', marginTop: 20, marginBottom: 8 }}>The Host Nation Factor</h3>
        <p>History shows that host nations consistently outperform expectations at the World Cup. The USA will benefit from massive home crowd support across multiple venues, familiarity with playing conditions, and zero travel fatigue. South Korea (2002, 4th place), Russia (2018, Quarter-Finals), and Qatar (2022, group stage despite low ranking) all exceeded expectations as hosts.</p>

        <h3 style={{ fontFamily: "'Oswald',sans-serif", fontSize: 17, fontWeight: 700, color: '#1a1a2e', marginTop: 20, marginBottom: 8 }}>African and Asian Dark Horses</h3>
        <p>Morocco's historic Semi-Final run in 2022 proved that African nations can compete at the highest level. Japan's victories over Germany and Spain in the 2022 group stage showed Asian football's rapid development. Senegal, led by a talented generation, and South Korea, with their passionate support, could also spring surprises in 2026.</p>
      </div>
    </Layout>
  )
}
