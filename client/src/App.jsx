import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import ProtectedRoute from '@/components/auth/ProtectedRoute'

// Marketing pages
import LandingPage from './Pages/Marketing Pages/LandingPage'

// Auth pages
import LoginPage from './Pages/App Pages/LoginPage'
import RegisterPage from './Pages/App Pages/RegisterPage'
import MarketingNavbar from './components/MarketingNavbar'

// ── Guest route: redirect to app if already logged in ──────────────────────
const GuestRoute = ({ children }) => {
  const { user, loading } = useAuth()
  if (loading) return null
  if (user) return <Navigate to="/app/inbox" replace />
  return children
}

// ── App ────────────────────────────────────────────────────────────────────
const App = () => {
  return (
    <div>
      <MarketingNavbar />
      <Routes>
        {/* Marketing */}
        <Route path="/" element={<LandingPage />} />
        {/* Auth — blocked if already signed in */}
        <Route path="/app/login" element={<GuestRoute><LoginPage /></GuestRoute>} />
        <Route path="/app/register" element={<GuestRoute><RegisterPage /></GuestRoute>} />

        {/* Protected app routes */}
        <Route path="/app/*" element={<ProtectedRoute />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App