import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  CheckSquare, 
  DollarSign, 
  Utensils, 
  Heart, 
  Users, 
  ArrowRight,
  Play,
  Star,
  Shield,
  Zap,
  Brain,
  Target,
  TrendingUp,
  Calendar,
  Clock,
  Award,
  Check,
  X,
  Brain as BrainIcon,
  Wallet,
  UserCog,
  BarChart3,
  ChevronDown,
  ChevronUp,
  Menu,
  X as CloseIcon
} from 'lucide-react'
import { TermsModal, PrivacyModal, HelpModal, CookiesModal } from '@/components/Modals'

const Home: React.FC = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showTerms, setShowTerms] = useState(false)
  const [showPrivacy, setShowPrivacy] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const [showCookies, setShowCookies] = useState(false)

  const pricingPlans = [
    {
      name: 'Free',
      price: '0',
      currency: '$',
      period: '/month',
      features: [
        { text: 'Limited To-Do & Planning', included: true },
        { text: 'Basic Budget Tracker', included: true },
        { text: '2 Meal Suggestions/day', included: true },
        { text: 'Daily Quotes only', included: true },
        { text: 'View-only Local Services', included: true },
        { text: 'Ads enabled', included: false }
      ],
      popular: false,
      buttonText: 'Get Started',
      yearlyPrice: '0',
      yearlySavings: null
    },
    {
      name: 'Standard',
      price: '5',
      currency: '$',
      period: '/month',
      features: [
        { text: 'Unlimited Planning', included: true },
        { text: 'Advanced Budget Tools', included: true },
        { text: 'Full Meal Planner', included: true },
        { text: 'AI Mood Assistant', included: true },
        { text: 'Post Local Service Requests', included: true },
        { text: 'Ad-Free', included: true }
      ],
      popular: true,
      buttonText: 'Get Started',
      yearlyPrice: '50',
      yearlySavings: 'Save $10/year'
    },
    {
      name: 'Premium',
      price: '10',
      currency: '$',
      period: '/month',
      features: [
        { text: 'Everything in Standard', included: true },
        { text: 'Family Calendar & Task Sharing', included: true },
        { text: 'Full Grocery Planner', included: true },
        { text: 'Kids Mode', included: true },
        { text: 'Group Chat for Families', included: true }
      ],
      popular: false,
      buttonText: 'Get Started',
      yearlyPrice: '100',
      yearlySavings: 'Save $20/year'
    },
    {
      name: 'Pro',
      price: '15',
      currency: '$',
      period: '/month',
      features: [
        { text: 'All Premium Features', included: true },
        { text: 'Team Collaboration Tools', included: true },
        { text: 'Business Tools (Marketing + Income Tracker)', included: true },
        { text: 'Sync with TruthWeb & Cloudy', included: true },
        { text: 'Virtual Assistant Booking', included: true }
      ],
      popular: false,
      buttonText: 'Get Started',
      yearlyPrice: '150',
      yearlySavings: 'Save $30/year'
    }
  ]

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
      icon: UserCog,
      title: 'Local Services in Pi',
      description: 'Browse, post, or offer services in your area, all within the Pi ecosystem.'
    },
    {
      icon: BarChart3,
      title: 'Smart Analytics Dashboard',
      description: 'Visualize your productivity, spending, and wellness trends with real-time insights.'
    }
  ]

  const whySmartSolve = [
    'Plan your tasks and life efficiently',
    'Track your expenses and build smart budgets',
    'Discover healthy, affordable meals daily',
    'Boost your mood with mental wellness support',
    'Use Pi to unlock advanced tools & local services'
  ]

  const communityBenefits = [
    'Start with our free plan',
    'Subscribe anytime with Pi',
    'All-in-one platform for life, family, and business'
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
      answer: 'Yes! The free plan offers basic features like limited to-do lists, budget tracking, and meal suggestions at no cost. Upgrade to Standard, Premium, or Pro plans for advanced features starting at $5/month.'
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

  const testimonials = [
    {
      name: 'Anna K.',
      role: 'Freelancer, Pi Pioneer',
      content: 'SmartSolve\'s budgeting tools helped me save 10 Pi a month! The meal planner is a game-changer for my busy schedule.',
      avatar: 'AK'
    },
    {
      name: 'Marcus T.',
      role: 'Small Business Owner',
      content: 'The Pro plan\'s business tools are fantastic. I track my Pi income and collaborate with my team seamlessly.',
      avatar: 'MT'
    },
    {
      name: 'Sofia R.',
      role: 'Parent & Pi Enthusiast',
      content: 'The family calendar and kids mode make life so much easier. SmartSolve keeps us organized and stress-free.',
      avatar: 'SR'
    }
  ]

  const stats = [
    { number: '10,000+', label: 'Verified Pioneers' },
    { number: '50,000+', label: 'Tasks Planned' },
    { number: '5,000+', label: 'Meals Planned' },
    { number: '1,000+', label: 'Local Services Posted' }
  ]

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg mr-3 flex items-center justify-center">
                <BrainIcon className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">SmartSolve</h1>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">Plans</a>
              <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded-full font-medium hover:bg-blue-600 transition-colors">
                Sign in with Pi
              </Link>
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              {mobileMenuOpen ? <CloseIcon className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-100">
              <div className="flex flex-col space-y-4">
                <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">Features</a>
                <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">Plans</a>
                <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded-full font-medium hover:bg-blue-600 transition-colors text-center">
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
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
          >
            Simplify your life with{' '}
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              SmartSolve
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            From to-do lists to meal plans, budgeting to mental wellness—SmartSolve brings everything together in one powerful Pi-powered app.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/login" className="bg-blue-500 text-white px-8 py-4 rounded-full font-medium hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Get Started for Free
            </Link>
            <button className="bg-white text-gray-700 px-8 py-4 rounded-full font-medium border-2 border-gray-200 hover:border-blue-500 hover:text-blue-500 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Watch Demo
            </button>
          </motion.div>
        </div>
      </section>

      {/* Why SmartSolve Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
            Why SmartSolve?
          </h2>
          <ul className="space-y-4 max-w-2xl mx-auto">
            {whySmartSolve.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-3 text-lg text-gray-700"
              >
                <Check className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* Pricing Plans Section */}
      <section id="pricing" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Plan
            </h2>
            <p className="text-xl text-gray-600">
              Start free or upgrade to unlock powerful features starting at $5/month.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
                  plan.popular ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-gray-900">{plan.currency}{plan.price}</span>
                    <span className="text-gray-500 ml-1">{plan.period}</span>
                  </div>
                  {plan.yearlyPrice && plan.yearlyPrice !== '0' && (
                    <div className="mt-2">
                      <div className="flex items-baseline">
                        <span className="text-lg font-semibold text-gray-700">{plan.currency}{plan.yearlyPrice}</span>
                        <span className="text-gray-500 ml-1">/year</span>
                      </div>
                      <p className="text-sm text-green-600 font-medium">{plan.yearlySavings}</p>
                    </div>
                  )}
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      {feature.included ? (
                        <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      ) : (
                        <X className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                      )}
                      <span className={`text-sm ${feature.included ? 'text-gray-700' : 'text-gray-500'}`}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/login"
                  className="w-full bg-blue-500 text-white py-3 px-4 rounded-full font-medium hover:bg-blue-600 transition-colors text-center block"
                >
                  {plan.buttonText}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              SmartSolve Features
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <feature.icon className="h-12 w-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pi Network Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Powered by the Pi Network
          </h2>
          <p className="text-xl text-gray-600">
            SmartSolve is part of the Pi economy—designed to help Pioneers solve real problems in everyday life using Pi as the only currency.
          </p>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Join the SmartSolve Community
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Thousands of Pioneers are already planning better, living smarter, and solving daily challenges with SmartSolve.
          </p>
          <ul className="space-y-4 max-w-2xl mx-auto">
            {communityBenefits.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-3 text-lg text-gray-700"
              >
                <Check className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Got questions? We've got answers.
            </p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left py-4 px-6 flex items-center justify-between text-lg font-semibold text-gray-900 hover:text-blue-500 transition-colors"
                >
                  {faq.question}
                  {expandedFaq === index ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${
                  expandedFaq === index ? 'max-h-96 pb-4 px-6' : 'max-h-0'
                }`}>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600">
              Hear from Pioneers who are living smarter with SmartSolve.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  {testimonial.avatar}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{testimonial.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{testimonial.role}</p>
                <p className="text-gray-600 italic">"{testimonial.content}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Verified Users Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our Verified Pioneers
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of verified users thriving with SmartSolve.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 text-center"
              >
                <h3 className="text-2xl md:text-3xl font-bold text-blue-500 mb-2">{stat.number}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-500 to-green-500 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8">
            Start Smart. Start Now.
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login" className="bg-white text-blue-500 px-8 py-4 rounded-full font-medium hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Get Started for Free
            </Link>
            <Link to="/pricing" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-medium hover:bg-white hover:text-blue-500 transition-all duration-300 transform hover:scale-105">
              View Plans
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
            <div>
              <h3 className="font-semibold text-blue-500 mb-4 flex items-center">
                <Star className="h-4 w-4 mr-2" />
                Our Plans
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-blue-500 transition-colors">Get Started for Free</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Standard Plan</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Premium Plan</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Pro Plan</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-blue-500 mb-4 flex items-center">
                <Shield className="h-4 w-4 mr-2" />
                Features
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-blue-500 transition-colors">Smart To-Do & Reminders</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Budget & Finance Management</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Meal Planning & Recipes</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Mental Wellness Support</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-blue-500 mb-4 flex items-center">
                <Zap className="h-4 w-4 mr-2" />
                Pi Network
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-blue-500 transition-colors">Pi Wallet</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Learn About Pi</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Pi Ecosystem</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-blue-500 mb-4 flex items-center">
                <Users className="h-4 w-4 mr-2" />
                About Us
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-blue-500 transition-colors">About SmartSolve</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Our Team</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-blue-500 mb-4 flex items-center">
                <Heart className="h-4 w-4 mr-2" />
                Support
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><button onClick={() => setShowHelp(true)} className="hover:text-blue-500 transition-colors text-left">Help Center</button></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Contact Us</a></li>
                <li><button onClick={() => setShowPrivacy(true)} className="hover:text-blue-500 transition-colors text-left">Privacy Policy</button></li>
                <li><button onClick={() => setShowTerms(true)} className="hover:text-blue-500 transition-colors text-left">Terms of Service</button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 text-center">
            <p className="text-gray-600 mb-4">
              © {new Date().getFullYear()} SmartSolve. All rights reserved.
            </p>
            <div className="flex justify-center space-x-4">
              <button onClick={() => setShowCookies(true)} className="text-blue-500 hover:text-blue-600 transition-colors text-sm">
                Cookie Policy
              </button>
              <a href="#" className="text-blue-500 hover:text-blue-600 transition-colors text-sm">
                <span className="sr-only">Instagram</span>
                <Users className="h-5 w-5" />
              </a>
              <a href="#" className="text-blue-500 hover:text-blue-600 transition-colors text-sm">
                <span className="sr-only">Twitter</span>
                <Users className="h-5 w-5" />
              </a>
              <a href="#" className="text-blue-500 hover:text-blue-600 transition-colors text-sm">
                <span className="sr-only">Facebook</span>
                <Users className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <TermsModal isOpen={showTerms} onClose={() => setShowTerms(false)} />
      <PrivacyModal isOpen={showPrivacy} onClose={() => setShowPrivacy(false)} />
      <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} />
      <CookiesModal isOpen={showCookies} onClose={() => setShowCookies(false)} />
    </div>
  )
}

export default Home 