import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import ProtectedRoute from '@/components/auth/ProtectedRoute'

// Marketing
import LandingPage from './Pages/marketing/LandingPage'

// Auth
import LoginPage from './Pages/auth/LoginPage'
import RegisterPage from './Pages/auth/RegisterPage'
import MarketingNavbar from './components/navbars/MarketingNavbar'

import LoadingScreen from './components/ui/LoadingScreen'

/* Guest-only route — redirects to inbox if already signed in */
const GuestRoute = ({ children }) => {
  const { user, loading } = useAuth()
  if (loading) return <LoadingScreen />
  if (user) return <Navigate to="/app/inbox" replace />
  return children
}

const App = () => {
  const { pathname } = useLocation()

  // Hide the marketing navbar for ALL app routes (auth + protected)
  const showMarketingNavbar = !pathname.startsWith('/app')

  return (
    <div>
      {showMarketingNavbar && <MarketingNavbar />}

      <Routes>
        {/* ── Marketing ── */}
        <Route path="/" element={<LandingPage />} />

        {/* ── Auth (no navbar, guest only) ── */}
        <Route path="/app/login" element={<GuestRoute><LoginPage /></GuestRoute>} />
        <Route path="/app/register" element={<GuestRoute><RegisterPage /></GuestRoute>} />

        {/* ── Protected app (AppLayout handles sidebar + navbar) ── */}
        <Route path="/app/*" element={<ProtectedRoute />} />

        {/* ── Fallback ── */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App
