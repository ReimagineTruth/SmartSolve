import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Star, Zap, Users, Building, Crown, ArrowLeft } from 'lucide-react'

const PaymentModalDemo: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  const plans = [
    {
      id: 'standard',
      name: 'Standard Plan',
      icon: Zap,
      price: '3 Pi/month',
      description: 'Core tools for personal organization',
      features: [
        'Unlimited tasks & planning',
        'Advanced budget tools',
        'Full meal planner',
        'AI mood assistant',
        'Local services'
      ]
    },
    {
      id: 'premium',
      name: 'Premium Plan',
      icon: Users,
      price: '6 Pi/month',
      description: 'Perfect for families and small groups',
      features: [
        'All Standard features',
        'Family calendar & sharing',
        'Kids mode with rewards',
        'Group chat & file sharing',
        'Full grocery planner',
        'Privacy controls'
      ]
    },
    {
      id: 'pro',
      name: 'Pro Plan',
      icon: Building,
      price: '9 Pi/month',
      description: 'Advanced features for businesses',
      features: [
        'All Premium features',
        'Team collaboration tools',
        'Business tools (Marketing + Income)',
        'TruthWeb & Cloudy integrations',
        'Virtual assistant booking',
        'Advanced analytics'
      ]
    },
    {
      id: 'lifetime',
      name: 'Lifetime Plan',
      icon: Crown,
      price: '99 Pi one-time',
      description: 'Pay once, unlock everything forever!',
      features: [
        'All Pro Plan features',
        'Lifetime access - No monthly fees',
        'Priority support',
        'Early access to new features',
        'Exclusive lifetime badge',
        'Beta tester for future apps',
        'Free access to future products'
      ]
    }
  ]

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId)
    // Here you would typically open the payment modal
    console.log(`Selected plan: ${planId}`)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg mr-3 flex items-center justify-center">
                <Star className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-text">SmartSolve</h1>
            </Link>
            <Link to="/" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-text mb-6">
            Payment Modal Demo
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Experience SmartSolve's seamless payment flow with Pi Network integration.
          </p>
          <div className="bg-white rounded-lg p-6 shadow-sm max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-text mb-4">How it works:</h3>
            <ol className="text-left space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">1</span>
                Choose your plan below
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">2</span>
                Select monthly or yearly billing
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">3</span>
                Choose payment method (Pi Wallet or Pi App)
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">4</span>
                Complete secure payment with Pi Network
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* Plan Selection */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text mb-4">
              Choose Your Plan
            </h2>
            <p className="text-xl text-gray-600">
              Click on any plan to see the payment modal in action
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`card cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-2 ${
                  selectedPlan === plan.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => handlePlanSelect(plan.id)}
              >
                <div className="text-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <plan.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-text mb-2">{plan.name}</h3>
                  <div className="text-2xl font-bold text-primary mb-2">{plan.price}</div>
                  <p className="text-gray-600 text-sm">{plan.description}</p>
                </div>

                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-sm">
                      <span className="text-primary mr-2">✓</span>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className="btn btn-primary w-full">
                  {plan.id === 'lifetime' ? 'Get Lifetime Access' : 'Choose Plan'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Examples */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text mb-4">
              Integration Examples
            </h2>
            <p className="text-xl text-gray-600">
              See how to integrate the payment modal into your application
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Pricing Page Integration */}
            <div className="card">
              <h3 className="text-xl font-semibold text-text mb-4">
                <Zap className="inline-block w-5 h-5 mr-2" />
                Pricing Page Integration
              </h3>
              <p className="text-gray-600 mb-4">
                Add payment buttons to your pricing page for seamless subscription flow.
              </p>
              <div className="bg-gray-100 rounded-lg p-4 mb-4">
                <code className="text-sm">
                  {`<button onClick="openPaymentModal('standard')" class="btn">
  Choose Standard
</button>`}
                </code>
              </div>
              <button 
                onClick={() => handlePlanSelect('standard')}
                className="btn btn-primary"
              >
                Try Standard Plan
              </button>
            </div>

            {/* Dashboard Integration */}
            <div className="card">
              <h3 className="text-xl font-semibold text-text mb-4">
                <Users className="inline-block w-5 h-5 mr-2" />
                Dashboard Integration
              </h3>
              <p className="text-gray-600 mb-4">
                Show upgrade prompts in user dashboard when they reach limits.
              </p>
              <div className="bg-gray-100 rounded-lg p-4 mb-4">
                <code className="text-sm">
                  {`<div class="upgrade-prompt">
  <p>You've reached your free plan limit</p>
  <button onClick="openPaymentModal('premium')" class="btn">
    Upgrade to Premium
  </button>
</div>`}
                </code>
              </div>
              <button 
                onClick={() => handlePlanSelect('premium')}
                className="btn btn-primary"
              >
                Upgrade to Premium
              </button>
            </div>

            {/* Business Page Integration */}
            <div className="card">
              <h3 className="text-xl font-semibold text-text mb-4">
                <Building className="inline-block w-5 h-5 mr-2" />
                Business Page Integration
              </h3>
              <p className="text-gray-600 mb-4">
                Promote Pro plan features for business users.
              </p>
              <div className="bg-gray-100 rounded-lg p-4 mb-4">
                <code className="text-sm">
                  {`<div class="business-features">
  <h3>Business Tools</h3>
  <p>Team collaboration, analytics, integrations</p>
  <button onClick="openPaymentModal('pro')" class="btn">
    Get Pro Plan
  </button>
</div>`}
                </code>
              </div>
              <button 
                onClick={() => handlePlanSelect('pro')}
                className="btn btn-primary"
              >
                Get Pro Plan
              </button>
            </div>

            {/* Lifetime Promotion */}
            <div className="card">
              <h3 className="text-xl font-semibold text-text mb-4">
                <Crown className="inline-block w-5 h-5 mr-2" />
                Lifetime Promotion
              </h3>
              <p className="text-gray-600 mb-4">
                Special promotion for lifetime access with limited availability.
              </p>
              <div className="bg-gray-100 rounded-lg p-4 mb-4">
                <code className="text-sm">
                  {`<div class="lifetime-promo">
  <h3>🔓 Limited Time Offer</h3>
  <p>Get lifetime access for 99 Pi</p>
  <button onClick="openPaymentModal('lifetime')" class="btn btn-lifetime">
    Get Lifetime Access
  </button>
</div>`}
                </code>
              </div>
              <button 
                onClick={() => handlePlanSelect('lifetime')}
                className="btn btn-lifetime"
              >
                Get Lifetime Access
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Usage */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text mb-4">
              Advanced Usage
            </h2>
            <p className="text-xl text-gray-600">
              Customize the payment modal for your specific needs
            </p>
          </div>

          <div className="space-y-8">
            {/* Custom Payment Handling */}
            <div className="card">
              <h3 className="text-lg font-semibold text-text mb-4">Custom Payment Handling</h3>
              <div className="bg-gray-100 rounded-lg p-4 mb-4">
                <code className="text-sm">
                  {`// Custom success handler
paymentModal.onSuccess((details) => {
  // Send to analytics
  gtag('event', 'purchase', {
    value: details.amount,
    currency: 'Pi',
    plan: details.plan
  });
  
  // Update user status
  updateUserSubscription(details);
  
  // Show success message
  showSuccessMessage('Welcome to SmartSolve!');
});`}
                </code>
              </div>
            </div>

            {/* Dynamic Plan Selection */}
            <div className="card">
              <h3 className="text-lg font-semibold text-text mb-4">Dynamic Plan Selection</h3>
              <div className="bg-gray-100 rounded-lg p-4 mb-4">
                <code className="text-sm">
                  {`// Open modal with specific plan based on user action
function handleUpgradeClick(planType) {
  // Track the upgrade attempt
  analytics.track('upgrade_clicked', { plan: planType });
  
  // Open payment modal
  openPaymentModal(planType);
}

// Usage
<button onClick="handleUpgradeClick('premium')">
  Upgrade to Premium
</button>`}
                </code>
              </div>
            </div>

            {/* Pi SDK Integration */}
            <div className="card">
              <h3 className="text-lg font-semibold text-text mb-4">Pi SDK Integration</h3>
              <div className="bg-gray-100 rounded-lg p-4 mb-4">
                <code className="text-sm">
                  {`// Custom payment processing with Pi SDK
paymentModal.onSuccess((details) => {
  // Initialize Pi payment
  Pi.createPayment({
    amount: details.amount.replace(' Pi', ''),
    memo: \`SmartSolve \${details.plan} Plan\`,
    metadata: {
      plan: details.plan,
      billing: details.billing
    }
  }).then((payment) => {
    // Handle successful payment
    console.log('Pi payment successful:', payment);
    redirectToDashboard();
  }).catch((error) => {
    console.error('Payment failed:', error);
    showErrorMessage('Payment failed. Please try again.');
  });
});`}
                </code>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Implement?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Start integrating SmartSolve's payment modal into your application today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/" className="btn bg-white text-primary hover:bg-gray-100 text-lg px-8 py-4">
              Back to Home
            </Link>
            <a href="#integration" className="btn bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-4">
              View Documentation
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PaymentModalDemo 