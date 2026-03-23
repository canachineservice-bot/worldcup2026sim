import Layout from './Layout'
import { useTheme } from '../ThemeContext.jsx'

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

export default function Groups() {
  const { C } = useTheme();
  return (
    <Layout title="World Cup 2026 Groups — Groupes Coupe du Monde 2026">
      <p style={{ textAlign: 'center', color: C.t2, marginBottom: 28, fontSize: 15, lineHeight: 1.7 }}>
        The 2026 FIFA World Cup features 48 teams divided into 12 groups of 4.
        The top 2 from each group plus 8 best third-placed teams advance to the Round of 32.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 14 }}>
        {Object.entries(GROUPS).map(([letter, teams]) => (
          <div key={letter} style={{ background: C.cd, borderRadius: 14, border: `1px solid ${C.bd}`, overflow: 'hidden' }}>
            <div style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 800, fontSize: 18, color: C.ac, letterSpacing: 2, padding: '14px 16px', background: C.b2 }}>
              GROUP {letter}
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <tbody>
                {teams.map(([code, name, flag]) => (
                  <tr key={code}>
                    <td style={{ padding: '10px 14px', borderBottom: `1px solid ${C.bd}`, color: C.tx }}>
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
    </Layout>
  )
}
