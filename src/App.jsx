import { Routes, Route } from 'react-router-dom'
import Simulator from './components/Simulator'
import Groups from './pages/Groups'
import Schedule from './pages/Schedule'
import Predictions from './pages/Predictions'
import Morocco from './pages/Morocco'
import Privacy from './pages/Privacy'
import Betting from './pages/Betting'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Simulator />} />
      <Route path="/groups" element={<Groups />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/predictions" element={<Predictions />} />
      <Route path="/betting" element={<Betting />} />
      <Route path="/morocco" element={<Morocco />} />
      <Route path="/privacy" element={<Privacy />} />
    </Routes>
  )
}
