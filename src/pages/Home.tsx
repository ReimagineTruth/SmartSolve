import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Brain, Calendar, Wallet, Utensils, Heart, MapPin, BarChart3, ChevronDown, Menu, X } from 'lucide-react'

const Home: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const features = [
    {
      icon: Calendar,
      title: 'Smart To-Do & Reminders',
      description: 'Plan your day with reminders, priorities, and checklists.'
    },
    {
      icon: Wallet,
      title: 'Budget & Finance Management',
      description: 'Set monthly goals, track expenses, and build smart habits.'
    },
    {
      icon: Utensils,
      title: 'Meal Planning & Recipes',
      description: 'Get daily meal ideas with budget-friendly grocery lists.'
    },
    {
      icon: Heart,
      title: 'Mental Wellness Support',
      description: 'Stay positive with daily affirmations, mood tracking, and wellness tips.'
    },
    {
      icon: MapPin,
      title: 'Local Services in Pi',
      description: 'Browse, post, or offer services in your area, all within the Pi ecosystem.'
    },
    {
      icon: BarChart3,
      title: 'Smart Analytics Dashboard',
      description: 'Visualize your productivity, spending, and wellness trends with real-time insights.'
    }
  ]

  const faqs = [
    {
      question: 'What is SmartSolve?',
      answer: 'SmartSolve is an all-in-one app powered by the Pi Network, designed to simplify daily life. It helps with task planning, budgeting, meal planning, mental wellness, and accessing local services using Pi as currency.'
    },
    {
      question: 'How do I sign in with Pi?',
      answer: 'Sign in using your Pi Wallet through the Pi SDK integration. Click "Sign in with Pi" on the signin page, authenticate with your Pi credentials, and you\'re ready to go!'
    },
    {
      question: 'Is the free plan really free?',
      answer: 'Yes! The free plan offers basic features like limited to-do lists, budget tracking, and meal suggestions at no cost. Upgrade to Standard, Premium, or Pro plans for advanced features starting at 3 Pi/month.'
    },
    {
      question: 'Can I use SmartSolve without Pi?',
      answer: 'SmartSolve is deeply integrated with the Pi Network, so a Pi Wallet is required to sign in and access features. The free plan is accessible without additional Pi payments.'
    },
    {
      question: 'What makes the Premium plan different?',
      answer: 'The Premium plan includes everything in Standard, plus family sharing, full grocery planning, kids mode, and group chat features, ideal for households managing multiple schedules.'
    },
    {
      question: 'How secure is my data?',
      answer: 'We prioritize your privacy and security. All data is encrypted, and we comply with industry-standard security protocols. Read our Privacy Policy for details.'
    }
  ]

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg mr-3 flex items-center justify-center">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-text">SmartSolve</h1>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">Plans</a>
              <Link to="/pricing" className="btn btn-primary">
                Sign in with Pi
              </Link>
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-100">
              <div className="flex flex-col space-y-4">
                <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">Features</a>
                <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">Plans</a>
                <Link to="/pricing" className="btn btn-primary text-center">
                  Sign in with Pi
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-text mb-6">
            Your Life,{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Simplified
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            The all-in-one productivity app powered by Pi Network. Manage tasks, budget, meals, wellness, and local services in one beautiful interface.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/pricing" className="btn btn-primary text-lg px-8 py-4">
              Get Started Free
            </Link>
            <Link to="/demo/standard" className="btn btn-secondary text-lg px-8 py-4">
              See Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-text mb-4">
              Everything You Need, All in One Place
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              SmartSolve combines all your daily productivity needs into one seamless experience, powered by Pi Network.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card hover:transform hover:-translate-y-2 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-text mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section id="pricing" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-text mb-4">
              Choose Your Plan
            </h2>
            <p className="text-xl text-gray-600">
              Start free or upgrade to unlock powerful features starting at 5 Pi/month.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Free Plan */}
            <div className="card text-center">
              <h3 className="text-xl font-semibold text-text mb-2">Free Plan</h3>
              <div className="text-3xl font-bold text-primary mb-2">0 Pi</div>
              <p className="text-gray-600 mb-6">Start with essential tools</p>
              <ul className="text-left mb-6 space-y-2">
                <li className="flex items-center">
                  <i className="fas fa-check text-primary mr-2"></i>
                  Limited To-Do & Planning
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-primary mr-2"></i>
                  Basic Budget Tracker
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-primary mr-2"></i>
                  2 Meal Suggestions/day
                </li>
              </ul>
              <Link to="/demo/free" className="btn btn-primary w-full">
                Get Started
              </Link>
            </div>

            {/* Standard Plan */}
            <div className="card text-center relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
              <h3 className="text-xl font-semibold text-text mb-2">Standard Plan</h3>
              <div className="text-3xl font-bold text-primary mb-2">5 Pi/month</div>
              <p className="text-gray-600 mb-6">Core tools for personal organization</p>
              <ul className="text-left mb-6 space-y-2">
                <li className="flex items-center">
                  <i className="fas fa-check text-primary mr-2"></i>
                  Unlimited Planning
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-primary mr-2"></i>
                  Advanced Budget Tools
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-primary mr-2"></i>
                  Full Meal Planner
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-primary mr-2"></i>
                  AI Mood Assistant
                </li>
              </ul>
              <Link to="/demo/standard" className="btn btn-primary w-full">
                Choose Standard
              </Link>
            </div>

            {/* Premium Plan */}
            <div className="card text-center">
              <h3 className="text-xl font-semibold text-text mb-2">Premium Plan</h3>
              <div className="text-3xl font-bold text-primary mb-2">10 Pi/month</div>
              <p className="text-gray-600 mb-6">Perfect for families</p>
              <ul className="text-left mb-6 space-y-2">
                <li className="flex items-center">
                  <i className="fas fa-check text-primary mr-2"></i>
                  Everything in Standard
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-primary mr-2"></i>
                  Family Calendar & Sharing
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-primary mr-2"></i>
                  Kids Mode with Rewards
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-primary mr-2"></i>
                  Group Chat & File Sharing
                </li>
              </ul>
              <Link to="/demo/premium" className="btn btn-primary w-full">
                Choose Premium
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="card text-center">
              <h3 className="text-xl font-semibold text-text mb-2">Pro Plan</h3>
              <div className="text-3xl font-bold text-primary mb-2">15 Pi/month</div>
              <p className="text-gray-600 mb-6">Advanced features for businesses</p>
              <ul className="text-left mb-6 space-y-2">
                <li className="flex items-center">
                  <i className="fas fa-check text-primary mr-2"></i>
                  All Premium Features
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-primary mr-2"></i>
                  Team Collaboration Tools
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-primary mr-2"></i>
                  Business Tools (Marketing + Income)
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-primary mr-2"></i>
                  TruthWeb & Cloudy Integrations
                </li>
              </ul>
              <Link to="/demo/pro" className="btn btn-primary w-full">
                Choose Pro
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-text mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about SmartSolve
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="card">
                <button
                  className="flex items-center justify-between w-full text-left"
                  onClick={() => toggleFaq(index)}
                >
                  <h3 className="text-lg font-semibold text-text">{faq.question}</h3>
                  <ChevronDown 
                    className={`h-5 w-5 text-gray-500 transition-transform ${
                      expandedFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {expandedFaq === index && (
                  <p className="mt-4 text-gray-600">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Simplify Your Life?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of users who are already using SmartSolve to organize their lives with Pi.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/pricing" className="btn bg-white text-primary hover:bg-gray-100 text-lg px-8 py-4">
              Get Started Free
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

export default Home 