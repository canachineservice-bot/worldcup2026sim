import Layout from './Layout'

const GROUPS = {
  A: [['MEX','Mexico','🇲🇽'],['KOR','South Korea','🇰🇷'],['RSA','South Africa','🇿🇦'],['DEN','Denmark','🇩🇰']],
  B: [['CAN','Canada','🇨🇦'],['SUI','Switzerland','🇨🇭'],['QAT','Qatar','🇶🇦'],['ITA','Italy','🇮🇹']],
  C: [['BRA','Brazil','🇧🇷'],['MAR','Morocco','🇲🇦'],['SCO','Scotland','🏴󠁧󠁢󠁳󠁣󠁴󠁿'],['HAI','Haiti','🇭🇹']],
  D: [['USA','USA','🇺🇸'],['AUS','Australia','🇦🇺'],['PAR','Paraguay','🇵🇾'],['TUR','Turkiye','🇹🇷']],
  E: [['GER','Germany','🇩🇪'],['CIV','Ivory Coast','🇨🇮'],['ECU','Ecuador','🇪🇨'],['CUR','Curacao','🇨🇼']],
  F: [['NED','Netherlands','🇳🇱'],['TUN','Tunisia','🇹🇳'],['JPN','Japan','🇯🇵'],['UKR','Ukraine','🇺🇦']],
  G: [['BEL','Belgium','🇧🇪'],['IRN','Iran','🇮🇷'],['EGY','Egypt','🇪🇬'],['NZL','New Zealand','🇳🇿']],
  H: [['ESP','Spain','🇪🇸'],['URU','Uruguay','🇺🇾'],['KSA','Saudi Arabia','🇸🇦'],['CPV','Cape Verde','🇨🇻']],
  I: [['FRA','France','🇫🇷'],['SEN','Senegal','🇸🇳'],['NOR','Norway','🇳🇴'],['IRQ','Iraq','🇮🇶']],
  J: [['ARG','Argentina','🇦🇷'],['AUT','Austria','🇦🇹'],['JOR','Jordan','🇯🇴'],['ALG','Algeria','🇩🇿']],
  K: [['POR','Portugal','🇵🇹'],['COL','Colombia','🇨🇴'],['UZB','Uzbekistan','🇺🇿'],['COD','DR Congo','🇨🇩']],
  L: [['ENG','England','🏴󠁧󠁢󠁥󠁮󠁧󠁿'],['CRO','Croatia','🇭🇷'],['GHA','Ghana','🇬🇭'],['PAN','Panama','🇵🇦']],
}

const cell = { padding: '10px 14px', borderBottom: '1px solid #E2E5EB' }

export default function Groups() {
  return (
    <Layout title="World Cup 2026 Groups — Groupes Coupe du Monde 2026">
      <p style={{ textAlign: 'center', color: '#555577', marginBottom: 28, fontSize: 15, lineHeight: 1.7 }}>
        The 2026 FIFA World Cup features 48 teams divided into 12 groups of 4.
        The top 2 from each group plus 8 best third-placed teams advance to the Round of 32.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 14 }}>
        {Object.entries(GROUPS).map(([letter, teams]) => (
          <div key={letter} style={{ background: '#fff', borderRadius: 14, border: '1px solid #E2E5EB', overflow: 'hidden' }}>
            <div style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 800, fontSize: 18, color: '#d4145a', letterSpacing: 2, padding: '14px 16px', background: '#fafbfd' }}>
              GROUP {letter}
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <tbody>
                {teams.map(([code, name, flag]) => (
                  <tr key={code}>
                    <td style={cell}>
                      <span style={{ fontSize: 20, marginRight: 8 }}>{flag}</span>
                      <span style={{ fontWeight: 600 }}>{name}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      <div style={{ maxWidth: 800, margin: '32px auto 0', color: '#555577', fontSize: 14, lineHeight: 1.8 }}>
        <h2 style={{ fontFamily: "'Oswald',sans-serif", fontSize: 20, fontWeight: 700, color: '#1a1a2e', letterSpacing: 2, marginBottom: 10 }}>WORLD CUP 2026 GROUP STAGE EXPLAINED</h2>
        <p>The 2026 FIFA World Cup features the first-ever 48-team format, with teams divided into 12 groups of 4. Each team plays 3 group stage matches. The top 2 teams from each group (24 teams) advance automatically to the Round of 32, joined by the 8 best third-placed teams from across all groups.</p>
        <p>Group winners and runners-up are determined by: total points (3 for a win, 1 for a draw, 0 for a loss), then goal difference, then goals scored. If teams are still tied, head-to-head results, fair play points, and finally a drawing of lots determine the ranking.</p>

        <h3 style={{ fontFamily: "'Oswald',sans-serif", fontSize: 17, fontWeight: 700, color: '#1a1a2e', marginTop: 20, marginBottom: 8 }}>Groups of Death to Watch</h3>
        <p>Several groups feature incredibly competitive matchups. Group C with Brazil and Morocco promises fireworks, while Group L featuring England and Croatia is a rematch of the 2018 Semi-Final. Group F with Netherlands, Japan, and Ukraine could produce dramatic results, and Group H with Spain and Uruguay brings together two former World Cup champions.</p>

        <h3 style={{ fontFamily: "'Oswald',sans-serif", fontSize: 17, fontWeight: 700, color: '#1a1a2e', marginTop: 20, marginBottom: 8 }}>Host Nation Groups</h3>
        <p>The three host nations are spread across different groups: Mexico in Group A, Canada in Group B, and USA in Group D. Each host nation benefits from home crowd support and familiar playing conditions, historically providing a significant advantage in World Cup group stages.</p>

        <h3 style={{ fontFamily: "'Oswald',sans-serif", fontSize: 17, fontWeight: 700, color: '#1a1a2e', marginTop: 20, marginBottom: 8 }}>Debutants and Dark Horses</h3>
        <p>The expanded 48-team format welcomes several first-time World Cup participants, including Curacao, Cape Verde, and potentially other emerging football nations. Meanwhile, traditional dark horses like Morocco (2022 Semi-Finalists), Japan (2022 group stage giant-killers), and Senegal (2002 Quarter-Finalists) will look to cause upsets once again.</p>
      </div>
    </Layout>
  )
}
