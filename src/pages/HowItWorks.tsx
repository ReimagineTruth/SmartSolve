import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Check, 
  Star, 
  Crown, 
  Zap, 
  Users, 
  Building,
  Target,
  Heart,
  Brain,
  ShoppingCart,
  MessageCircle,
  BarChart3,
  DollarSign,
  Utensils,
  Calendar,
  Lock,
  Unlock,
  ArrowRight,
  Play,
  BookOpen,
  Lightbulb,
  Shield,
  Gift,
  TrendingUp,
  Users2,
  Home,
  Briefcase,
  GraduationCap,
  Baby,
  Palette,
  Music,
  Gamepad2
} from 'lucide-react'
import Footer from '../components/Footer'

const HowItWorks: React.FC = () => {
  const plans = [
    {
      name: 'Free',
      icon: Star,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      features: [
        'Limited To-Do & Planning (5 tasks)',
        'Basic Budget Tracker',
        '2 Meal Suggestions/day',
        'Daily Quotes',
        'View-only Local Services',
        'Ads enabled'
      ],
      limitations: [
        'No AI features',
        'No family sharing',
        'No business tools',
        'Limited meal planning'
      ]
    },
    {
      name: 'Standard',
      icon: Zap,
      color: 'text-primary',
      bgColor: 'bg-blue-50',
      features: [
        'Unlimited Planning',
        'Advanced Budget Tools',
        'Full Meal Planner',
        'AI Mood Assistant',
        'Post Local Service Requests',
        'Ad-Free',
        'Advanced Analytics'
      ],
      limitations: [
        'No family features',
        'No business tools',
        'No integrations'
      ]
    },
    {
      name: 'Premium',
      icon: Users,
      color: 'text-secondary',
      bgColor: 'bg-purple-50',
      features: [
        'Everything in Standard',
        'Family Calendar & Task Sharing',
        'Full Grocery Planner',
        'Kids Mode',
        'Group Chat for Families',
        'Integrations'
      ],
      limitations: [
        'No business tools',
        'No virtual assistant'
      ]
    },
    {
      name: 'Pro',
      icon: Building,
      color: 'text-lifetime-text',
      bgColor: 'bg-yellow-50',
      features: [
        'All Premium Features',
        'Team Collaboration Tools',
        'Business Tools (Marketing + Income Tracker)',
        'Sync with TruthWeb & Cloudy',
        'Virtual Assistant Booking',
        'Advanced Business Analytics'
      ],
      limitations: [
        'No lifetime benefits'
      ]
    }
  ]

  const featureCategories = [
    {
      title: 'Task Management',
      icon: Target,
      description: 'Plan and organize your daily tasks',
      features: [
        { name: 'Basic Planning', free: true, standard: true, premium: true, pro: true },
        { name: 'Unlimited Tasks', free: false, standard: true, premium: true, pro: true },
        { name: 'Family Sharing', free: false, standard: false, premium: true, pro: true },
        { name: 'Team Collaboration', free: false, standard: false, premium: false, pro: true }
      ]
    },
    {
      title: 'Budget & Finance',
      icon: DollarSign,
      description: 'Track income, expenses, and financial goals',
      features: [
        { name: 'Basic Budget Tracker', free: true, standard: true, premium: true, pro: true },
        { name: 'Advanced Budget Tools', free: false, standard: true, premium: true, pro: true },
        { name: 'Income Tracker', free: false, standard: false, premium: false, pro: true },
        { name: 'Business Analytics', free: false, standard: false, premium: false, pro: true }
      ]
    },
    {
      title: 'Meal Planning',
      icon: Utensils,
      description: 'Plan meals, track nutrition, and manage groceries',
      features: [
        { name: '2 Meal Suggestions/day', free: true, standard: true, premium: true, pro: true },
        { name: 'Full Meal Planner', free: false, standard: true, premium: true, pro: true },
        { name: 'Grocery Planner', free: false, standard: false, premium: true, pro: true },
        { name: 'Nutrition Tracking', free: false, standard: true, premium: true, pro: true }
      ]
    },
    {
      title: 'Wellness & Mood',
      icon: Heart,
      description: 'Track your mental and physical wellness',
      features: [
        { name: 'Daily Quotes', free: true, standard: true, premium: true, pro: true },
        { name: 'AI Mood Assistant', free: false, standard: true, premium: true, pro: true },
        { name: 'Mood Tracking', free: false, standard: true, premium: true, pro: true },
        { name: 'Wellness Analytics', free: false, standard: true, premium: true, pro: true }
      ]
    },
    {
      title: 'Family Features',
      icon: Users2,
      description: 'Share and collaborate with family members',
      features: [
        { name: 'Family Calendar', free: false, standard: false, premium: true, pro: true },
        { name: 'Task Sharing', free: false, standard: false, premium: true, pro: true },
        { name: 'Kids Mode', free: false, standard: false, premium: true, pro: true },
        { name: 'Group Chat', free: false, standard: false, premium: true, pro: true }
      ]
    },
    {
      title: 'Business Tools',
      icon: Briefcase,
      description: 'Professional tools for business and teams',
      features: [
        { name: 'Marketing Tools', free: false, standard: false, premium: false, pro: true },
        { name: 'Team Collaboration', free: false, standard: false, premium: false, pro: true },
        { name: 'Virtual Assistant', free: false, standard: false, premium: false, pro: true },
        { name: 'Business Analytics', free: false, standard: false, premium: false, pro: true }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">SmartSolve</h1>
            </Link>
            <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors">
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            How SmartSolve Works
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            SmartSolve adapts to your needs with different plan levels. Each plan unlocks more powerful features to help you achieve your productivity and wellness goals.
          </p>
        </div>

        {/* Plan Overview */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Plan Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan) => (
              <div key={plan.name} className={`rounded-2xl p-6 border-2 ${plan.bgColor} border-gray-200`}>
                <div className="text-center mb-6">
                  <div className={`w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 mx-auto`}>
                    <plan.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">What's Included:</h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {plan.limitations.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Limitations:</h4>
                    <ul className="space-y-2">
                      {plan.limitations.map((limitation, index) => (
                        <li key={index} className="flex items-start">
                          <Lock className="h-4 w-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-500">{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Feature Comparison */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Feature Comparison</h2>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Feature</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Free</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Standard</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Premium</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Pro</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {featureCategories.map((category) => (
                    <React.Fragment key={category.title}>
                      <tr className="bg-gray-50">
                        <td colSpan={5} className="px-6 py-3">
                          <div className="flex items-center">
                            <category.icon className="h-5 w-5 text-gray-600 mr-2" />
                            <span className="font-semibold text-gray-900">{category.title}</span>
                          </div>
                        </td>
                      </tr>
                      {category.features.map((feature) => (
                        <tr key={feature.name} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm text-gray-600">{feature.name}</td>
                          <td className="px-6 py-4 text-center">
                            {feature.free ? (
                              <Check className="h-5 w-5 text-green-500 mx-auto" />
                            ) : (
                              <Lock className="h-5 w-5 text-gray-400 mx-auto" />
                            )}
                          </td>
                          <td className="px-6 py-4 text-center">
                            {feature.standard ? (
                              <Check className="h-5 w-5 text-green-500 mx-auto" />
                            ) : (
                              <Lock className="h-5 w-5 text-gray-400 mx-auto" />
                            )}
                          </td>
                          <td className="px-6 py-4 text-center">
                            {feature.premium ? (
                              <Check className="h-5 w-5 text-green-500 mx-auto" />
                            ) : (
                              <Lock className="h-5 w-5 text-gray-400 mx-auto" />
                            )}
                          </td>
                          <td className="px-6 py-4 text-center">
                            {feature.pro ? (
                              <Check className="h-5 w-5 text-green-500 mx-auto" />
                            ) : (
                              <Lock className="h-5 w-5 text-gray-400 mx-auto" />
                            )}
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* How It Works Steps */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Choose Your Plan</h3>
              <p className="text-gray-600">
                Start with our free plan to explore basic features, then upgrade as your needs grow.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Features Unlock</h3>
              <p className="text-gray-600">
                Your dashboard automatically adapts to show only the features available in your plan.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Upgrade Anytime</h3>
              <p className="text-gray-600">
                Upgrade your plan anytime to unlock more features and enhance your productivity.
              </p>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Perfect For</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Home className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Individuals</h3>
              <p className="text-sm text-gray-600">Free & Standard plans for personal productivity</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users2 className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Families</h3>
              <p className="text-sm text-gray-600">Premium plan for family sharing and collaboration</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Businesses</h3>
              <p className="text-sm text-gray-600">Pro plan for teams and business tools</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Students</h3>
              <p className="text-sm text-gray-600">Free plan to get started with productivity</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-6 text-blue-100">
              Choose the plan that fits your needs and start your productivity journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/pricing"
                className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                View All Plans
              </Link>
              <Link
                to="/dashboard"
                className="px-8 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Try Dashboard
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  )
}

export default HowItWorks 