import { Routes, Route, Navigate, useParams } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import LandingPage from './pages/landing/LandingPage'
import MarketingNavbar from './components/layout/MarketingNavbar'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'

// ─── Marketing layout wrapper ──────────────────────────────────────────────
const MarketingLayout = ({ children }) => (
  <div className="min-h-screen bg-white">
    <MarketingNavbar />
    {children}
  </div>
)

// ─── Marketing placeholder pages ──────────────────────────────────────────
const FeaturePage = () => {
  const { slug } = useParams()
  return (
    <MarketingLayout>
      <div className="pt-40 pb-20 px-4 max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-black text-gray-900 mb-4 capitalize">
          {slug ? slug.replace(/-/g, ' ') : 'Features'}
        </h1>
        <p className="text-xl text-gray-500">Discover how Todoify helps you stay organised.</p>
      </div>
    </MarketingLayout>
  )
}

const PricingPage = () => (
  <MarketingLayout>
    <div className="pt-40 pb-20 px-4 text-center">
      <h1 className="text-4xl font-black text-gray-900 mb-4">Pricing</h1>
      <p className="text-xl text-gray-500">Choose the plan that's right for you.</p>
    </div>
  </MarketingLayout>
)

// ─── App dashboard placeholder ──────────────────────────────────────────────
const AppDashboard = () => {
  const { user, logout } = useAuth()
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-background">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-black text-foreground">
          Welcome, {user?.name}! 👋
        </h1>
        <p className="text-muted-foreground font-medium">{user?.email}</p>
      </div>
      <button
        onClick={logout}
        className="px-6 py-3 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 transition-colors"
      >
        Log out
      </button>
    </div>
  )
}

// ─── Auth guard for login/register — redirect if already logged in ──────────
const GuestRoute = ({ children }) => {
  const { user, loading } = useAuth()
  if (loading) return null
  if (user) return <Navigate to="/app/dashboard" replace />
  return children
}

// ─── App ──────────────────────────────────────────────────────────────────
const App = () => {
  return (
    <Routes>
      {/* Marketing */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/features/:slug" element={<FeaturePage />} />
      <Route path="/resources/:slug" element={<FeaturePage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/about" element={<FeaturePage />} />

      {/* Auth — only accessible when NOT logged in */}
      <Route path="/app/login" element={<GuestRoute><LoginPage /></GuestRoute>} />
      <Route path="/app/register" element={<GuestRoute><RegisterPage /></GuestRoute>} />

      {/* Protected App Routes */}
      <Route path="/app/dashboard" element={<ProtectedRoute><AppDashboard /></ProtectedRoute>} />
      <Route path="/app/*" element={<ProtectedRoute><AppDashboard /></ProtectedRoute>} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App