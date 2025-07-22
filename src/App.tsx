import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Home from './pages/Home'
import Pricing from './pages/Pricing'
import PaymentModal from './components/PaymentModal'
import SplashScreen from './components/SplashScreen'
import DemoFreePlan from './pages/DemoFreePlan'
import DemoStandardPlan from './pages/DemoStandardPlan'
import DemoPremiumPlan from './pages/DemoPremiumPlan'
import DemoProPlan from './pages/DemoProPlan'
import PaymentModalDemo from './pages/PaymentModalDemo'
import Footer from './components/Footer'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Contact from './pages/Contact'
import About from './pages/About'
import Team from './pages/Team'
import Blog from './pages/Blog'
import Careers from './pages/Careers'
import Press from './pages/Press'
import Partners from './pages/Partners'
import Help from './pages/Help'
import CookiePolicy from './pages/CookiePolicy'
import Security from './pages/Security'
import Dashboard from './pages/Dashboard'
import HowItWorks from './pages/HowItWorks'
import MobileApp from './pages/MobileApp'
import SaaSWorkflow from './pages/SaaSWorkflow'
import PageTransition from './components/PageTransition'
import { AuthProvider } from './contexts/AuthContext'
import { DashboardProvider } from './controllers/DashboardController'

function App() {
  const [showSplash, setShowSplash] = useState(true)

  const handleSplashComplete = () => {
    setShowSplash(false)
  }

  return (
    <Router>
      <AuthProvider>
        <DashboardProvider>
          <div className="App">
            {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
            <PageTransition>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/demo/free" element={<DemoFreePlan />} />
                <Route path="/demo/standard" element={<DemoStandardPlan />} />
                <Route path="/demo/premium" element={<DemoPremiumPlan />} />
                <Route path="/demo/pro" element={<DemoProPlan />} />
                <Route path="/payment-demo" element={<PaymentModalDemo />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                <Route path="/team" element={<Team />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/press" element={<Press />} />
                <Route path="/partners" element={<Partners />} />
                <Route path="/help" element={<Help />} />
                <Route path="/cookiepolicy" element={<CookiePolicy />} />
                <Route path="/cookies" element={<CookiePolicy />} />
                <Route path="/security" element={<Security />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="/mobile-app" element={<MobileApp />} />
                <Route path="/saas-workflow" element={<SaaSWorkflow />} />
              </Routes>
            </PageTransition>
            <PaymentModal />
          </div>
        </DashboardProvider>
      </AuthProvider>
    </Router>
  )
}

export default App 