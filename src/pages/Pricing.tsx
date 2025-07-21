import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, Star, Crown, Zap, Users, Building } from 'lucide-react'

const Pricing: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')

  const plans = [
    {
      name: 'Free',
      price: '0',
      currency: 'Pi',
      period: '/month',
      description: 'Start with essential tools',
      features: [
        'Limited To-Do & Planning',
        'Basic Budget Tracker',
        '2 Meal Suggestions/day',
        'Daily Quotes only',
        'View-only Local Services',
        'Ads enabled'
      ],
      popular: false,
      icon: Star,
      color: 'text-gray-600'
    },
    {
      name: 'Standard',
      price: billingCycle === 'monthly' ? '3' : '30',
      currency: 'Pi',
      period: billingCycle === 'monthly' ? '/month' : '/year',
      description: 'Core tools for personal organization',
      features: [
        'Unlimited Planning',
        'Advanced Budget Tools',
        'Full Meal Planner',
        'AI Mood Assistant',
        'Post Local Service Requests',
        'Ad-Free'
      ],
      popular: true,
      icon: Zap,
      color: 'text-primary',
      savings: billingCycle === 'yearly' ? 'Save 10 Pi/year' : null
    },
    {
      name: 'Premium',
      price: billingCycle === 'monthly' ? '6' : '60',
      currency: 'Pi',
      period: billingCycle === 'monthly' ? '/month' : '/year',
      description: 'Perfect for families and small groups',
      features: [
        'Everything in Standard',
        'Family Calendar & Task Sharing',
        'Full Grocery Planner',
        'Kids Mode',
        'Group Chat for Families'
      ],
      popular: false,
      icon: Users,
      color: 'text-secondary',
      savings: billingCycle === 'yearly' ? 'Save 20 Pi/year' : null
    },
    {
      name: 'Pro',
      price: billingCycle === 'monthly' ? '9' : '90',
      currency: 'Pi',
      period: billingCycle === 'monthly' ? '/month' : '/year',
      description: 'Advanced features for businesses',
      features: [
        'All Premium Features',
        'Team Collaboration Tools',
        'Business Tools (Marketing + Income Tracker)',
        'Sync with TruthWeb & Cloudy',
        'Virtual Assistant Booking'
      ],
      popular: false,
      icon: Building,
      color: 'text-lifetime-text',
      savings: billingCycle === 'yearly' ? 'Save 30 Pi/year' : null
    }
  ]

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
            <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors">
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-text mb-6">
            Choose Your SmartSolve Plan
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Start free or upgrade to unlock powerful features. All plans are powered by Pi Network.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-lg p-1 shadow-sm">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 rounded-md font-medium transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-2 rounded-md font-medium transition-all relative ${
                  billingCycle === 'yearly'
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Yearly
                <span className="absolute -top-1 -right-1 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  Save
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {plans.map((plan, index) => (
              <div
                key={plan.name}
                className={`card relative ${
                  plan.popular ? 'ring-2 ring-primary' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <div className={`w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center mb-4 mx-auto`}>
                    <plan.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-text mb-2">{plan.name}</h3>
                  <div className="mb-2">
                    <span className="text-3xl font-bold text-primary">{plan.price}</span>
                    <span className="text-lg text-gray-600"> {plan.currency}</span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
                  {plan.savings && (
                    <div className="text-sm text-green-600 font-medium">{plan.savings}</div>
                  )}
                  <p className="text-gray-600 text-sm">{plan.description}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto">
                  {plan.name === 'Free' ? (
                    <Link to="/demo/free" className="btn btn-primary w-full">
                      Get Started Free
                    </Link>
                  ) : (
                    <Link 
                      to={`/demo/${plan.name.toLowerCase()}`} 
                      className="btn btn-primary w-full"
                    >
                      Choose {plan.name}
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text mb-4">
              Feature Comparison
            </h2>
            <p className="text-xl text-gray-600">
              See what's included in each plan
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-6 font-semibold text-text">Feature</th>
                  <th className="text-center p-6 font-semibold text-text">Free</th>
                  <th className="text-center p-6 font-semibold text-primary">Standard</th>
                  <th className="text-center p-6 font-semibold text-secondary">Premium</th>
                  <th className="text-center p-6 font-semibold text-lifetime-text">Pro</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="p-6 font-medium">To-Do Lists</td>
                  <td className="text-center p-6">5 items</td>
                  <td className="text-center p-6 text-primary">Unlimited</td>
                  <td className="text-center p-6 text-secondary">Unlimited</td>
                  <td className="text-center p-6 text-lifetime-text">Unlimited</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-6 font-medium">Budget Tracking</td>
                  <td className="text-center p-6">Basic</td>
                  <td className="text-center p-6 text-primary">Advanced</td>
                  <td className="text-center p-6 text-secondary">Advanced</td>
                  <td className="text-center p-6 text-lifetime-text">Advanced</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-6 font-medium">Meal Planning</td>
                  <td className="text-center p-6">2/day</td>
                  <td className="text-center p-6 text-primary">Unlimited</td>
                  <td className="text-center p-6 text-secondary">Unlimited</td>
                  <td className="text-center p-6 text-lifetime-text">Unlimited</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-6 font-medium">AI Mood Assistant</td>
                  <td className="text-center p-6">-</td>
                  <td className="text-center p-6 text-primary">✓</td>
                  <td className="text-center p-6 text-secondary">✓</td>
                  <td className="text-center p-6 text-lifetime-text">✓</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-6 font-medium">Local Services</td>
                  <td className="text-center p-6">View only</td>
                  <td className="text-center p-6 text-primary">Post & Browse</td>
                  <td className="text-center p-6 text-secondary">Post & Browse</td>
                  <td className="text-center p-6 text-lifetime-text">Post & Browse</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-6 font-medium">Family Sharing</td>
                  <td className="text-center p-6">-</td>
                  <td className="text-center p-6">-</td>
                  <td className="text-center p-6 text-secondary">✓</td>
                  <td className="text-center p-6 text-lifetime-text">✓</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-6 font-medium">Team Collaboration</td>
                  <td className="text-center p-6">-</td>
                  <td className="text-center p-6">-</td>
                  <td className="text-center p-6">-</td>
                  <td className="text-center p-6 text-lifetime-text">✓</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-6 font-medium">Business Tools</td>
                  <td className="text-center p-6">-</td>
                  <td className="text-center p-6">-</td>
                  <td className="text-center p-6">-</td>
                  <td className="text-center p-6 text-lifetime-text">✓</td>
                </tr>
                <tr>
                  <td className="p-6 font-medium">Ads</td>
                  <td className="text-center p-6">✓</td>
                  <td className="text-center p-6 text-primary">-</td>
                  <td className="text-center p-6 text-secondary">-</td>
                  <td className="text-center p-6 text-lifetime-text">-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about SmartSolve pricing
            </p>
          </div>

          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-text mb-3">
                Can I change my plan anytime?
              </h3>
              <p className="text-gray-600">
                Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing adjustments.
              </p>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-text mb-3">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600">
                SmartSolve accepts Pi payments through Pi Wallet and the Pi Network mobile app. All transactions are secured with blockchain technology.
              </p>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-text mb-3">
                Is there a free trial?
              </h3>
              <p className="text-gray-600">
                Yes! Start with our free plan to explore SmartSolve's features. You can upgrade to any paid plan whenever you're ready.
              </p>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-text mb-3">
                Can I cancel my subscription?
              </h3>
              <p className="text-gray-600">
                Absolutely. You can cancel your subscription at any time. You'll continue to have access until the end of your current billing period.
              </p>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-text mb-3">
                Do you offer refunds?
              </h3>
              <p className="text-gray-600">
                We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, contact our support team for a full refund.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of users who are already organizing their lives with SmartSolve.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/demo/free" className="btn bg-white text-primary hover:bg-gray-100 text-lg px-8 py-4">
              Try Free Plan
            </Link>
            <Link to="/payment-demo" className="btn bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-4">
              View Payment Demo
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Pricing 