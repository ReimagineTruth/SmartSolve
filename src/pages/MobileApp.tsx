import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Smartphone,
  Download,
  QrCode,
  Star,
  Users,
  Zap,
  Crown,
  Check,
  ArrowRight,
  Play,
  Shield,
  RefreshCw,
  Bell,
  Settings,
  User,
  Home,
  Target,
  DollarSign,
  Utensils,
  Heart,
  Calendar,
  MessageCircle,
  BarChart3,
  Brain,
  ShoppingCart,
  Building,
  GraduationCap,
  Baby,
  Palette,
  Music,
  Gamepad2,
  Wifi,
  Cloud,
  Lock,
  Unlock,
  Gift,
  TrendingUp,
  Award,
  Clock,
  MapPin,
  Phone,
  Mail,
  Globe,
  Share2,
  BookOpen,
  Lightbulb,
  Sparkles,
  Rocket,
  ThumbsUp,
  Eye,
  EyeOff,
  MoreHorizontal,
  Filter,
  Search,
  Plus,
  Edit,
  Trash2,
  Camera,
  Mic,
  Video,
  FileText,
  Image,
  Send,
  Smile,
  Paperclip,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Move,
  Crop,
  Type,
  Bold,
  Italic,
  Underline,
  List,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Indent,
  Outdent,
  Quote,
  Code,
  Link2,
  Unlink,
  Table,
  Columns,
  Rows,
  Merge,
  Split,
  SortAsc,
  SortDesc
} from 'lucide-react'
import Footer from '../components/Footer'

const MobileApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedPlan, setSelectedPlan] = useState('premium')

  const appFeatures = [
    {
      category: 'Core Features',
      features: [
        { name: 'Task Management', icon: Target, description: 'Create, organize, and track tasks with priority levels' },
        { name: 'Budget Tracking', icon: DollarSign, description: 'Track income, expenses, and financial goals' },
        { name: 'Meal Planning', icon: Utensils, description: 'Plan meals, track nutrition, and manage groceries' },
        { name: 'Mood Tracking', icon: Heart, description: 'Monitor mental wellness with AI-powered insights' }
      ]
    },
    {
      category: 'Advanced Features',
      features: [
        { name: 'AI Assistant', icon: Brain, description: 'Smart recommendations and automated insights' },
        { name: 'Family Sharing', icon: Users, description: 'Share tasks and plans with family members' },
        { name: 'Business Tools', icon: Building, description: 'Team collaboration and business analytics' },
        { name: 'Integrations', icon: RefreshCw, description: 'Connect with other apps and services' }
      ]
    },
    {
      category: 'Mobile-Specific',
      features: [
        { name: 'Offline Mode', icon: Wifi, description: 'Work without internet connection' },
        { name: 'Push Notifications', icon: Bell, description: 'Smart reminders and alerts' },
        { name: 'Voice Commands', icon: Mic, description: 'Control app with voice commands' },
        { name: 'Biometric Security', icon: Shield, description: 'Fingerprint and face recognition' }
      ]
    }
  ]

  const appScreens = [
    {
      name: 'Dashboard',
      description: 'Overview of all your productivity metrics',
      features: ['Quick stats', 'Recent activities', 'Plan status', 'Quick actions']
    },
    {
      name: 'Tasks',
      description: 'Manage your daily tasks and projects',
      features: ['Task creation', 'Priority levels', 'Due dates', 'Categories']
    },
    {
      name: 'Budget',
      description: 'Track your finances and expenses',
      features: ['Income tracking', 'Expense logging', 'Budget limits', 'Analytics']
    },
    {
      name: 'Meals',
      description: 'Plan your meals and nutrition',
      features: ['Meal planning', 'Recipe suggestions', 'Grocery lists', 'Nutrition tracking']
    },
    {
      name: 'Wellness',
      description: 'Monitor your mental and physical health',
      features: ['Mood tracking', 'Sleep logging', 'Exercise tracking', 'AI insights']
    },
    {
      name: 'Family',
      description: 'Share and collaborate with family',
      features: ['Family calendar', 'Shared tasks', 'Kids mode', 'Group chat']
    }
  ]

  const mobileWorkflow = [
    {
      step: 1,
      title: 'Download & Install',
      description: 'Get the app from App Store or Google Play',
      icon: Download,
      color: 'blue'
    },
    {
      step: 2,
      title: 'Sign Up & Choose Plan',
      description: 'Create account and select your plan',
      icon: User,
      color: 'green'
    },
    {
      step: 3,
      title: 'Sync Data',
      description: 'Import existing data or start fresh',
      icon: RefreshCw,
      color: 'purple'
    },
    {
      step: 4,
      title: 'Customize & Setup',
      description: 'Configure preferences and notifications',
      icon: Settings,
      color: 'orange'
    },
    {
      step: 5,
      title: 'Start Using',
      description: 'Begin your productivity journey',
      icon: Play,
      color: 'red'
    }
  ]

  const plans = [
    {
      name: 'Free',
      price: '0',
      period: '/month',
      features: [
        'Basic task management',
        'Simple budget tracking',
        '2 meal suggestions/day',
        'Daily quotes',
        'Ads included'
      ],
      limitations: [
        'Limited to 5 tasks',
        'Basic features only',
        'No AI assistance',
        'No family sharing'
      ]
    },
    {
      name: 'Premium',
      price: '9.99',
      period: '/month',
      features: [
        'Unlimited tasks',
        'Advanced budget tools',
        'Full meal planner',
        'AI mood assistant',
        'Family sharing',
        'Ad-free experience'
      ],
      limitations: [
        'No business tools',
        'No team collaboration'
      ]
    },
    {
      name: 'Pro',
      price: '19.99',
      period: '/month',
      features: [
        'Everything in Premium',
        'Business tools',
        'Team collaboration',
        'Advanced analytics',
        'Virtual assistant',
        'Priority support'
      ],
      limitations: [
        'No lifetime benefits'
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
                <Smartphone className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">SmartSolve Mobile</h1>
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
            SmartSolve Mobile App
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Your complete productivity and wellness companion. Available on iOS and Android with seamless sync across all devices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="flex items-center justify-center px-8 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors">
              <Download className="h-5 w-5 mr-2" />
              Download for iOS
            </button>
            <button className="flex items-center justify-center px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors">
              <Download className="h-5 w-5 mr-2" />
              Download for Android
            </button>
          </div>
        </div>

        {/* App Screenshots */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">App Screenshots</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {appScreens.map((screen, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl mb-4 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <screen.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{screen.name}</h3>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{screen.name}</h3>
                <p className="text-gray-600 mb-4">{screen.description}</p>
                <ul className="space-y-2">
                  {screen.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                      <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">App Features</h2>
          <div className="space-y-8">
            {appFeatures.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">{category.category}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {category.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <feature.icon className="h-6 w-6 text-white" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">{feature.name}</h4>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Mobile Workflow */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Getting Started</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {mobileWorkflow.map((step) => (
              <div key={step.step} className="text-center">
                <div className={`w-16 h-16 bg-gradient-to-r from-${step.color}-500 to-${step.color}-600 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <span className="text-2xl font-bold text-white">{step.step}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Mobile Plans */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Mobile App Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div key={index} className={`bg-white rounded-2xl p-6 shadow-lg border-2 ${
                selectedPlan === plan.name.toLowerCase() ? 'border-blue-500' : 'border-gray-200'
              }`}>
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-blue-600">${plan.price}</span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Features:</h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {plan.limitations.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Limitations:</h4>
                    <ul className="space-y-2">
                      {plan.limitations.map((limitation, limitationIndex) => (
                        <li key={limitationIndex} className="flex items-start">
                          <Lock className="h-4 w-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-500">{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300">
                  Choose {plan.name}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Mobile-Specific Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Mobile-Specific Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Wifi className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Offline Mode</h3>
              <p className="text-sm text-gray-600">Work without internet connection</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Bell className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Push Notifications</h3>
              <p className="text-sm text-gray-600">Smart reminders and alerts</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Mic className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Voice Commands</h3>
              <p className="text-sm text-gray-600">Control app with voice commands</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Biometric Security</h3>
              <p className="text-sm text-gray-600">Fingerprint and face recognition</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Download?</h2>
            <p className="text-xl mb-6 text-blue-100">
              Get the SmartSolve mobile app and take your productivity with you everywhere.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="flex items-center justify-center px-8 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                <Download className="h-5 w-5 mr-2" />
                Download for iOS
              </button>
              <button className="flex items-center justify-center px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors">
                <Download className="h-5 w-5 mr-2" />
                Download for Android
              </button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  )
}

export default MobileApp 