import Layout from './Layout'
import { useTheme } from '../ThemeContext.jsx'

export default function Privacy() {
  const { C } = useTheme();

  const s = { marginBottom: 20, fontSize: 14, lineHeight: 1.8, color: C.t2 }
  const h = { fontFamily: "'Oswald',sans-serif", fontSize: 18, fontWeight: 700, color: C.tx, marginBottom: 8, marginTop: 28 }

  return (
    <Layout title="Privacy Policy">
      <div style={{ background: C.cd, borderRadius: 16, padding: '32px 28px', border: `1px solid ${C.bd}` }}>
        <p style={s}>Last updated: March 2026</p>

        <h2 style={h}>1. Information We Collect</h2>
        <p style={s}>
          We collect anonymous usage data through Google Analytics, including pages visited, time spent,
          device type, and approximate geographic location. We do not collect personal information
          such as names, email addresses, or phone numbers unless you voluntarily provide them.
        </p>

        <h2 style={h}>2. Cookies</h2>
        <p style={s}>
          We use cookies for analytics (Google Analytics) and advertising (Google AdSense).
          Third-party advertising partners may use cookies to serve personalized ads.
          You can manage cookie preferences in your browser settings.
        </p>

        <h2 style={h}>3. Advertising</h2>
        <p style={s}>
          We use Google AdSense to display advertisements. Google may use cookies to serve ads
          based on your prior visits to this website or other websites. You can opt out of
          personalized advertising by visiting Google Ads Settings.
        </p>

        <h2 style={h}>4. Third-Party Links</h2>
        <p style={s}>
          Our website may contain links to third-party websites, including sports betting platforms.
          We are not responsible for the privacy practices of these websites. We encourage you to
          read their privacy policies. You must be of legal age in your jurisdiction to use
          betting services.
        </p>

        <h2 style={h}>5. Data Retention</h2>
        <p style={s}>
          Analytics data is retained according to Google Analytics default retention policies.
          We do not store personal data on our servers. Simulation results are processed
          entirely in your browser and are not transmitted to any server.
        </p>

        <h2 style={h}>6. Children's Privacy</h2>
        <p style={s}>
          This website is not directed at children under the age of 13. We do not knowingly
          collect personal information from children.
        </p>

        <h2 style={h}>7. Contact</h2>
        <p style={s}>
          If you have questions about this privacy policy, please contact us at:
          contact@worldcup2026sim.com
        </p>
      </div>
    </Layout>
  )
}
