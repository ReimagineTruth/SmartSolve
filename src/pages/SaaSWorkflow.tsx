import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Rocket,
  Users,
  DollarSign,
  Target,
  Shield,
  Zap,
  Brain,
  Cloud,
  Smartphone,
  Globe,
  BarChart3,
  Settings,
  Bell,
  User,
  Check,
  ArrowRight,
  Play,
  BookOpen,
  Lightbulb,
  Sparkles,
  Award,
  TrendingUp,
  Lock,
  Unlock,
  Gift,
  Clock,
  MapPin,
  Phone,
  Mail,
  Share2,
  Download,
  Upload,
  Sync,
  RefreshCw,
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
  Link as LinkIcon,
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
  Image as ImageIcon,
  Table,
  Columns,
  Rows,
  Merge,
  Split,
  SortAsc,
  SortDesc,
  Filter as FilterIcon,
  Search as SearchIcon,
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  MapPin as MapPinIcon,
  Phone as PhoneIcon,
  Mail as MailIcon,
  Globe as GlobeIcon,
  Share2 as Share2Icon,
  BookOpen as BookOpenIcon,
  Lightbulb as LightbulbIcon,
  Sparkles as SparklesIcon,
  Rocket as RocketIcon,
  ThumbsUp as ThumbsUpIcon,
  Eye as EyeIcon,
  EyeOff as EyeOffIcon,
  RefreshCw as RefreshCwIcon,
  MoreHorizontal as MoreHorizontalIcon,
  Filter as FilterIcon2,
  Search as SearchIcon2,
  Plus as PlusIcon,
  Edit as EditIcon,
  Trash2 as Trash2Icon,
  Camera as CameraIcon,
  Mic as MicIcon,
  Video as VideoIcon,
  FileText as FileTextIcon,
  Image as ImageIcon2,
  Link as LinkIcon2,
  Send as SendIcon,
  Smile as SmileIcon,
  Paperclip as PaperclipIcon,
  Volume2 as Volume2Icon,
  VolumeX as VolumeXIcon,
  Maximize2 as Maximize2Icon,
  Minimize2 as Minimize2Icon,
  RotateCcw as RotateCcwIcon,
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon,
  Move as MoveIcon,
  Crop as CropIcon,
  Type as TypeIcon,
  Bold as BoldIcon,
  Italic as ItalicIcon,
  Underline as UnderlineIcon,
  List as ListIcon,
  AlignLeft as AlignLeftIcon,
  AlignCenter as AlignCenterIcon,
  AlignRight as AlignRightIcon,
  Indent as IndentIcon,
  Outdent as OutdentIcon,
  Quote as QuoteIcon,
  Code as CodeIcon,
  Link2 as Link2Icon,
  Unlink as UnlinkIcon,
  Image as ImageIcon3,
  Table as TableIcon,
  Columns as ColumnsIcon,
  Rows as RowsIcon,
  Merge as MergeIcon,
  Split as SplitIcon,
  SortAsc as SortAscIcon,
  SortDesc as SortDescIcon
} from 'lucide-react'
import Footer from '../components/Footer'

const SaaSWorkflow: React.FC = () => {
  const [activeSection, setActiveSection] = useState('overview')

  const workflowStages = [
    {
      stage: 'Discovery & Planning',
      icon: Lightbulb,
      color: 'blue',
      steps: [
        'Market research and user interviews',
        'Define MVP features and scope',
        'Create user personas and journey maps',
        'Set up project timeline and milestones'
      ]
    },
    {
      stage: 'Design & Prototyping',
      icon: Palette,
      color: 'purple',
      steps: [
        'Create wireframes and mockups',
        'Design user interface and experience',
        'Build interactive prototypes',
        'Conduct usability testing'
      ]
    },
    {
      stage: 'Development & Testing',
      icon: Code,
      color: 'green',
      steps: [
        'Set up development environment',
        'Build core features and functionality',
        'Implement user authentication',
        'Conduct thorough testing'
      ]
    },
    {
      stage: 'Launch & Marketing',
      icon: Rocket,
      color: 'orange',
      steps: [
        'Deploy to production environment',
        'Launch marketing campaigns',
        'Monitor performance and analytics',
        'Gather user feedback'
      ]
    },
    {
      stage: 'Growth & Optimization',
      icon: TrendingUp,
      color: 'red',
      steps: [
        'Analyze user data and metrics',
        'Implement feature improvements',
        'Scale infrastructure as needed',
        'Expand to new markets'
      ]
    }
  ]

  const mvpFeatures = [
    {
      category: 'Core MVP Features',
      features: [
        { name: 'User Authentication', status: 'completed', priority: 'high' },
        { name: 'Dashboard Overview', status: 'completed', priority: 'high' },
        { name: 'Task Management', status: 'completed', priority: 'high' },
        { name: 'Basic Budget Tracking', status: 'completed', priority: 'high' },
        { name: 'Plan-Based Features', status: 'completed', priority: 'high' },
        { name: 'Mobile Responsive Design', status: 'completed', priority: 'high' }
      ]
    },
    {
      category: 'Advanced Features',
      features: [
        { name: 'AI Mood Assistant', status: 'in-progress', priority: 'medium' },
        { name: 'Family Sharing', status: 'planned', priority: 'medium' },
        { name: 'Business Tools', status: 'planned', priority: 'low' },
        { name: 'Mobile App', status: 'planned', priority: 'medium' },
        { name: 'Integrations', status: 'planned', priority: 'low' },
        { name: 'Advanced Analytics', status: 'planned', priority: 'low' }
      ]
    }
  ]

  const technicalArchitecture = [
    {
      component: 'Frontend',
      technology: 'React + TypeScript',
      description: 'Modern, responsive web application',
      features: ['Component-based architecture', 'Type safety', 'Responsive design', 'State management']
    },
    {
      component: 'Backend',
      technology: 'Node.js + Express',
      description: 'RESTful API with authentication',
      features: ['User authentication', 'Data persistence', 'API endpoints', 'Security middleware']
    },
    {
      component: 'Database',
      technology: 'PostgreSQL',
      description: 'Reliable data storage and management',
      features: ['User data', 'Task management', 'Budget tracking', 'Analytics data']
    },
    {
      component: 'Authentication',
      technology: 'JWT + OAuth',
      description: 'Secure user authentication system',
      features: ['JWT tokens', 'OAuth integration', 'Password hashing', 'Session management']
    },
    {
      component: 'Hosting',
      technology: 'Vercel + Supabase',
      description: 'Scalable cloud infrastructure',
      features: ['Automatic deployments', 'Database hosting', 'CDN', 'SSL certificates']
    }
  ]

  const businessModel = [
    {
      aspect: 'Revenue Streams',
      details: [
        'Freemium model with tiered pricing',
        'Monthly and yearly subscription plans',
        'Enterprise licensing for businesses',
        'Mobile app in-app purchases'
      ]
    },
    {
      aspect: 'Customer Acquisition',
      details: [
        'Content marketing and SEO',
        'Social media advertising',
        'Referral program',
        'Free trial and freemium model'
      ]
    },
    {
      aspect: 'Customer Retention',
      details: [
        'Regular feature updates',
        'Customer support and feedback',
        'User engagement campaigns',
        'Loyalty rewards program'
      ]
    },
    {
      aspect: 'Scaling Strategy',
      details: [
        'Cloud-based infrastructure',
        'Automated deployment pipeline',
        'Performance monitoring',
        'International expansion'
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
                <Rocket className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">SmartSolve SaaS</h1>
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
            Complete SaaS Workflow
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A comprehensive guide to building and launching a successful SaaS MVP with SmartSolve as the example.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-lg p-1 shadow-sm">
            {['overview', 'workflow', 'features', 'architecture', 'business'].map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`px-6 py-2 rounded-md font-medium transition-all ${
                  activeSection === section
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Content Sections */}
        {activeSection === 'overview' && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">SaaS MVP Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Target Users</h3>
                <p className="text-sm text-gray-600">Individuals, families, and businesses seeking productivity and wellness management</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Revenue Model</h3>
                <p className="text-sm text-gray-600">Freemium with tiered subscription plans and mobile app monetization</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">MVP Goal</h3>
                <p className="text-sm text-gray-600">Validate product-market fit and acquire initial users</p>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'workflow' && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Development Workflow</h2>
            <div className="space-y-8">
              {workflowStages.map((stage, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                  <div className="flex items-center mb-6">
                    <div className={`w-12 h-12 bg-gradient-to-r from-${stage.color}-500 to-${stage.color}-600 rounded-xl flex items-center justify-center mr-4`}>
                      <stage.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{stage.stage}</h3>
                      <p className="text-gray-600">Stage {index + 1} of the development process</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {stage.steps.map((step, stepIndex) => (
                      <div key={stepIndex} className="flex items-start">
                        <div className={`w-6 h-6 bg-${stage.color}-100 rounded-full flex items-center justify-center mr-3 mt-0.5`}>
                          <span className={`text-xs font-bold text-${stage.color}-600`}>{stepIndex + 1}</span>
                        </div>
                        <span className="text-sm text-gray-600">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeSection === 'features' && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">MVP Features</h2>
            <div className="space-y-8">
              {mvpFeatures.map((category, categoryIndex) => (
                <div key={categoryIndex} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">{category.category}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {category.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-semibold text-gray-900">{feature.name}</h4>
                          <p className="text-sm text-gray-600">Priority: {feature.priority}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            feature.status === 'completed' ? 'bg-green-100 text-green-800' :
                            feature.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {feature.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeSection === 'architecture' && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Technical Architecture</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {technicalArchitecture.map((component, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                    <Code className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{component.component}</h3>
                  <p className="text-sm font-medium text-blue-600 mb-2">{component.technology}</p>
                  <p className="text-sm text-gray-600 mb-4">{component.description}</p>
                  <ul className="space-y-1">
                    {component.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-xs text-gray-600">
                        <Check className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeSection === 'business' && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Business Model</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {businessModel.map((aspect, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{aspect.aspect}</h3>
                  <ul className="space-y-2">
                    {aspect.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start">
                        <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Build Your SaaS?</h2>
            <p className="text-xl mb-6 text-blue-100">
              Use SmartSolve as a template for your own SaaS MVP development.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/dashboard"
                className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Try SmartSolve
              </Link>
              <Link
                to="/mobile-app"
                className="px-8 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                View Mobile App
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  )
}

export default SaaSWorkflow 