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

function App() {
  const [showSplash, setShowSplash] = useState(true)

  const handleSplashComplete = () => {
    setShowSplash(false)
  }

  return (
    <Router>
      <div className="App">
        {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/demo/free" element={<DemoFreePlan />} />
          <Route path="/demo/standard" element={<DemoStandardPlan />} />
          <Route path="/demo/premium" element={<DemoPremiumPlan />} />
          <Route path="/demo/pro" element={<DemoProPlan />} />
          <Route path="/payment-demo" element={<PaymentModalDemo />} />
        </Routes>
        <PaymentModal />
      </div>
    </Router>
  )
}

export default App 