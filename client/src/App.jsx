import React from 'react'
import { Routes, Route, Navigate, useParams } from 'react-router-dom'
import LandingPage from './pages/landing/LandingPage'
import MarketingNavbar from './components/layout/MarketingNavbar'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'

// Layout Wrapper for Marketing Pages
const MarketingLayout = ({ children }) => (
  <div className="min-h-screen bg-white">
    <MarketingNavbar />
    {children}
  </div>
)

// Dynamic Page Placeholders
const FeaturePage = () => {
  const { slug } = useParams();
  return (
    <MarketingLayout>
      <div className="pt-40 pb-20 px-4 max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-black text-gray-900 mb-4 capitalize">
          {slug ? slug.replace(/-/g, ' ') : 'Features'}
        </h1>
        <p className="text-xl text-gray-500">Discover how Todoify helps you stay organized.</p>
      </div>
    </MarketingLayout>
  );
}

const ResourcePage = () => {
  const { slug } = useParams();
  return (
    <MarketingLayout>
      <div className="pt-40 pb-20 px-4 max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-black text-gray-900 mb-4 capitalize">
          {slug ? slug.replace(/-/g, ' ') : 'Resources'}
        </h1>
        <p className="text-xl text-gray-500">Guides and tips to boost your productivity.</p>
      </div>
    </MarketingLayout>
  );
}

const PricingPage = () => (
  <MarketingLayout>
    <div className="pt-40 pb-20 px-4 text-center">
      <h1 className="text-4xl font-black text-gray-900 mb-4">Pricing</h1>
      <p className="text-xl text-gray-500">Choose the plan that's right for you.</p>
    </div>
  </MarketingLayout>
)

const AppDashboard = () => <div className="min-h-screen flex items-center justify-center text-2xl font-bold">App Dashboard Placeholder</div>

const App = () => {
  return (
    <Routes>
      {/* Home Route (LandingPage already includes Navbar) */}
      <Route path="/" element={<LandingPage />} />

      {/* Nested Marketing Routes */}
      <Route path="/features/:slug" element={<FeaturePage />} />
      <Route path="/resources/:slug" element={<ResourcePage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/about" element={<FeaturePage />} />

      {/* Auth Routes */}
      <Route path="/app/login" element={<LoginPage />} />
      <Route path="/app/register" element={<RegisterPage />} />

      {/* Main App Routes */}
      <Route path="/app/*" element={<AppDashboard />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App