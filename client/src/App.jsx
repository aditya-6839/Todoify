import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import ProtectedRoute from '@/components/auth/ProtectedRoute'

// Marketing pages
import LandingPage from './pages/marketing/LandingPage'

// Auth pages
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import MarketingNavbar from './components/navbars/MarketingNavbar'

// Routes where the navbar should be hidden
const HIDE_NAVBAR_ROUTES = ['/app/login', '/app/register']

const GuestRoute = ({ children }) => {
  const { user, loading } = useAuth()
  if (loading) return null
  if (user) return <Navigate to="/app/inbox" replace />
  return children
}

const App = () => {
  const { pathname } = useLocation()
  const showNavbar = !HIDE_NAVBAR_ROUTES.includes(pathname)

  return (
    <div>
      {showNavbar && <MarketingNavbar />}
      <Routes>
        {/* Marketing */}
        <Route path="/" element={<LandingPage />} />
        {/* Auth — no navbar, blocked if already signed in */}
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