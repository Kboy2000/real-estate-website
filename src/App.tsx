import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navigation from './components/Navigation'
import ProtectedRoute from './components/ProtectedRoute'
import HeroSection from './components/HeroSection'
import AmenitiesMap from './components/AmenitiesMap'
import PropertyCarousel from './components/PropertyCarousel'
import SmartHomeDashboard from './components/SmartHomeDashboard'
import AIPropertyMatch from './components/AIPropertyMatch'
import PropertyDetails from './components/PropertyDetails'
import Footer from './components/Footer'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import PropertiesListing from './pages/PropertiesListing'
import Favorites from './pages/Favorites'
import AgentLogin from './pages/AgentLogin'
import AgentSignup from './pages/AgentSignup'
import AgentDashboard from './pages/AgentDashboard'

function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <AmenitiesMap />
      <PropertyCarousel />
      <SmartHomeDashboard />
      <AIPropertyMatch />
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-luxury-white">
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/properties" element={<PropertiesListing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/favorites"
              element={
                <ProtectedRoute>
                  <Favorites />
                </ProtectedRoute>
              }
            />
            <Route path="/property/:id" element={<PropertyDetails />} />
            <Route path="/agent/login" element={<AgentLogin />} />
            <Route path="/agent/signup" element={<AgentSignup />} />
            <Route
              path="/agent/dashboard"
              element={
                <ProtectedRoute>
                  <AgentDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
