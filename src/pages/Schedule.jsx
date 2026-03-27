import Layout from './Layout'

const SCHEDULE = [
  { phase: 'Group Stage', dates: 'June 11 — June 28, 2026', matches: 96, desc: '48 teams play 3 matches each across 12 groups. 16 venues in USA, Mexico & Canada.' },
  { phase: 'Round of 32', dates: 'June 29 — July 2, 2026', matches: 16, desc: 'Top 2 from each group + 8 best 3rd-place teams. Single elimination begins.' },
  { phase: 'Round of 16', dates: 'July 3 — July 6, 2026', matches: 8, desc: 'Winners of Round of 32 face off. All matches have extra time & penalties if needed.' },
  { phase: 'Quarter-Finals', dates: 'July 8 — July 9, 2026', matches: 4, desc: 'The last 8 teams battle for a semi-final spot.' },
  { phase: 'Semi-Finals', dates: 'July 12 — July 13, 2026', matches: 2, desc: 'Two matches to determine the World Cup finalists.' },
  { phase: '3rd Place Match', dates: 'July 18, 2026', matches: 1, desc: 'Semi-final losers play for the bronze medal at MetLife Stadium.' },
  { phase: 'Final', dates: 'July 19, 2026', matches: 1, desc: 'The FIFA World Cup 2026 Final at MetLife Stadium, New Jersey.' },
]

const VENUES = [
  { city: 'New York/New Jersey', stadium: 'MetLife Stadium', capacity: '82,500', role: 'Final' },
  { city: 'Los Angeles', stadium: 'SoFi Stadium', capacity: '70,240', role: 'Semi-Final' },
  { city: 'Dallas', stadium: 'AT&T Stadium', capacity: '80,000', role: 'Semi-Final' },
  { city: 'Mexico City', stadium: 'Estadio Azteca', capacity: '83,264', role: 'Quarter-Final' },
  { city: 'Toronto', stadium: 'BMO Field', capacity: '45,736', role: 'Group Stage' },
  { city: 'Miami', stadium: 'Hard Rock Stadium', capacity: '64,767', role: 'Quarter-Final' },
  { city: 'Atlanta', stadium: 'Mercedes-Benz Stadium', capacity: '71,000', role: 'Quarter-Final' },
  { city: 'Houston', stadium: 'NRG Stadium', capacity: '72,220', role: 'Group Stage' },
  { city: 'Philadelphia', stadium: 'Lincoln Financial Field', capacity: '69,176', role: 'Group Stage' },
  { city: 'Seattle', stadium: 'Lumen Field', capacity: '69,000', role: 'Group Stage' },
  { city: 'San Francisco', stadium: "Levi's Stadium", capacity: '68,500', role: 'Group Stage' },
  { city: 'Kansas City', stadium: 'Arrowhead Stadium', capacity: '76,416', role: 'Group Stage' },
  { city: 'Boston', stadium: 'Gillette Stadium', capacity: '65,878', role: 'Group Stage' },
  { city: 'Guadalajara', stadium: 'Estadio Akron', capacity: '46,232', role: 'Group Stage' },
  { city: 'Monterrey', stadium: 'Estadio BBVA', capacity: '53,500', role: 'Group Stage' },
  { city: 'Vancouver', stadium: 'BC Place', capacity: '54,500', role: 'Group Stage' },
]

export default function Schedule() {
  return (
    <Layout title="World Cup 2026 Schedule — Calendrier CDM 2026">
      <p style={{ textAlign: 'center', color: '#555577', marginBottom: 32, fontSize: 15, lineHeight: 1.7 }}>
        The 2026 FIFA World Cup runs from June 11 to July 19, 2026.
        104 matches across 16 venues in 3 countries. The biggest World Cup ever.
      </p>

      <h2 style={{ fontFamily: "'Oswald',sans-serif", fontSize: 22, letterSpacing: 2, color: '#1a1a2e', marginBottom: 16 }}>Tournament Phases</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 40 }}>
        {SCHEDULE.map(s => (
          <div key={s.phase} style={{ background: '#fff', borderRadius: 12, padding: '16px 20px', border: '1px solid #E2E5EB' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
              <div>
                <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 18, fontWeight: 700, color: '#d4145a' }}>{s.phase}</div>
                <div style={{ fontSize: 13, color: '#555577', marginTop: 2 }}>{s.desc}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 14, color: '#1a1a2e' }}>{s.dates}</div>
                <div style={{ fontSize: 12, color: '#9999bb' }}>{s.matches} match{s.matches > 1 ? 'es' : ''}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 style={{ fontFamily: "'Oswald',sans-serif", fontSize: 22, letterSpacing: 2, color: '#1a1a2e', marginBottom: 16 }}>Venues</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 10 }}>
        {VENUES.map(v => (
          <div key={v.city} style={{ background: '#fff', borderRadius: 12, padding: '14px 18px', border: '1px solid #E2E5EB' }}>
            <div style={{ fontWeight: 700, fontSize: 15, color: '#1a1a2e' }}>{v.city}</div>
            <div style={{ fontSize: 13, color: '#555577' }}>{v.stadium} — {v.capacity}</div>
            <div style={{ fontSize: 12, color: '#d4145a', fontWeight: 600, marginTop: 4 }}>{v.role}</div>
          </div>
        ))}
      </div>

      <div style={{ maxWidth: 800, margin: '32px auto 0', color: '#555577', fontSize: 14, lineHeight: 1.8 }}>
        <h2 style={{ fontFamily: "'Oswald',sans-serif", fontSize: 20, fontWeight: 700, color: '#1a1a2e', letterSpacing: 2, marginBottom: 10 }}>WORLD CUP 2026 SCHEDULE & VENUES GUIDE</h2>
        <p>The 2026 FIFA World Cup will be held across three countries — the United States, Mexico, and Canada — marking the first tri-nation hosted World Cup in FIFA history. With 16 world-class stadiums, 48 participating nations, and 104 total matches, this tournament promises to be the largest and most spectacular football event ever organized.</p>

        <h3 style={{ fontFamily: "'Oswald',sans-serif", fontSize: 17, fontWeight: 700, color: '#1a1a2e', marginTop: 20, marginBottom: 8 }}>Key Dates</h3>
        <p>The tournament kicks off on June 11, 2026 with the opening match, and concludes with the Final on July 19, 2026 at MetLife Stadium in East Rutherford, New Jersey. The group stage runs for 18 days, followed by the knockout rounds spanning three weeks of intense elimination football.</p>

        <h3 style={{ fontFamily: "'Oswald',sans-serif", fontSize: 17, fontWeight: 700, color: '#1a1a2e', marginTop: 20, marginBottom: 8 }}>Historic Venues</h3>
        <p>The 2026 World Cup features iconic stadiums including the legendary Estadio Azteca in Mexico City (the only stadium to host two World Cup Finals — 1970 and 1986), the state-of-the-art SoFi Stadium in Los Angeles, and MetLife Stadium, the largest NFL stadium in the United States. Canadian venues include BC Place in Vancouver and BMO Field in Toronto.</p>

        <h3 style={{ fontFamily: "'Oswald',sans-serif", fontSize: 17, fontWeight: 700, color: '#1a1a2e', marginTop: 20, marginBottom: 8 }}>Time Zones and Kick-Off Times</h3>
        <p>Matches will be played across multiple North American time zones, from Pacific Time (Vancouver, Los Angeles, San Francisco) to Eastern Time (New York, Miami, Toronto) and Central Time (Mexico City, Dallas, Houston). FIFA will schedule matches to maximize global viewership across Europe, Africa, Asia, and South America.</p>
      </div>
    </Layout>
  )
}
