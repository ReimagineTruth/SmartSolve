import React, { useState } from 'react'
import { 
  X, 
  Crown, 
  Star, 
  Check, 
  Zap, 
  Shield, 
  Users, 
  Brain, 
  Target, 
  Heart, 
  DollarSign, 
  Calendar,
  CreditCard,
  Lock,
  ArrowRight,
  Sparkles,
  Award,
  Gift,
  Globe,
  Building,
  GraduationCap,
  Baby,
  Palette,
  Music,
  Gamepad2,
  Wifi,
  Cloud,
  Lock as LockIcon,
  Unlock,
  Eye,
  EyeOff,
  Download,
  Upload,
  Sync,
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

interface UpgradeModalProps {
  isOpen: boolean
  onClose: () => void
  onUpgrade: (plan: string, billing: string) => void
  currentPlan: string
}

const UpgradeModal: React.FC<UpgradeModalProps> = ({ 
  isOpen, 
  onClose, 
  onUpgrade, 
  currentPlan 
}) => {
  const [selectedPlan, setSelectedPlan] = useState('premium')
  const [selectedBilling, setSelectedBilling] = useState('monthly')
  const [isProcessing, setIsProcessing] = useState(false)

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      period: 'forever',
      description: 'Perfect for getting started',
      features: [
        'Basic task management',
        'Simple budget tracking',
        '2 meal suggestions/day',
        'Daily quotes',
        'Basic analytics'
      ],
      limitations: [
        'Limited to 5 tasks',
        'Basic features only',
        'No AI assistance',
        'No family sharing',
        'Ads included'
      ],
      popular: false,
      icon: Star,
      color: 'gray'
    },
    {
      id: 'standard',
      name: 'Standard',
      price: 4.99,
      period: 'month',
      description: 'Great for individuals',
      features: [
        'Unlimited tasks',
        'Advanced budget tools',
        'Full meal planner',
        'Basic AI assistant',
        'Ad-free experience',
        'Export data'
      ],
      limitations: [
        'No family sharing',
        'Limited AI features',
        'No business tools'
      ],
      popular: false,
      icon: Target,
      color: 'blue'
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 9.99,
      period: 'month',
      description: 'Most popular choice',
      features: [
        'Everything in Standard',
        'AI mood assistant',
        'Family sharing',
        'Advanced analytics',
        'Priority support',
        'Custom themes',
        'Voice commands'
      ],
      limitations: [
        'No business tools',
        'No team collaboration'
      ],
      popular: true,
      icon: Crown,
      color: 'purple'
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 19.99,
      period: 'month',
      description: 'For power users & teams',
      features: [
        'Everything in Premium',
        'Business tools',
        'Team collaboration',
        'Advanced AI assistant',
        'Virtual assistant',
        'Priority support',
        'Custom integrations',
        'White-label options'
      ],
      limitations: [
        'No lifetime benefits'
      ],
      popular: false,
      icon: Zap,
      color: 'orange'
    }
  ]

  const billingOptions = [
    { id: 'monthly', name: 'Monthly', discount: 0 },
    { id: 'yearly', name: 'Yearly', discount: 20 },
    { id: 'lifetime', name: 'Lifetime', discount: 50 }
  ]

  const getPlanByCurrent = () => {
    return plans.find(plan => plan.id === currentPlan) || plans[0]
  }

  const getSelectedPlan = () => {
    return plans.find(plan => plan.id === selectedPlan) || plans[2]
  }

  const calculatePrice = (plan: any, billing: string) => {
    const basePrice = plan.price
    const billingOption = billingOptions.find(option => option.id === billing)
    const discount = billingOption?.discount || 0
    
    if (billing === 'lifetime') {
      return basePrice * 12 * 2 // 2 years worth
    }
    
    const discountedPrice = basePrice * (1 - discount / 100)
    return billing === 'yearly' ? discountedPrice * 12 : discountedPrice
  }

  const handleUpgrade = async () => {
    setIsProcessing(true)
    try {
      await onUpgrade(selectedPlan, selectedBilling)
      onClose()
    } catch (error) {
      console.error('Upgrade failed:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  const currentPlanData = getPlanByCurrent()
  const selectedPlanData = getSelectedPlan()

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center ${isOpen ? 'block' : 'hidden'}`}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Crown className="h-6 w-6" />
              <h2 className="text-xl font-semibold">Upgrade Your Plan</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Plan Selection */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Your Plan</h3>
              
              {/* Current Plan */}
              <div className="mb-6">
                <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">Current Plan</span>
                    <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                      Active
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 ${getPlanColor(currentPlanData.color)} rounded-lg flex items-center justify-center`}>
                      <currentPlanData.icon className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{currentPlanData.name}</h4>
                      <p className="text-sm text-gray-600">{currentPlanData.description}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Plan Options */}
              <div className="space-y-4">
                {plans.filter(plan => plan.id !== 'free').map((plan) => (
                  <div
                    key={plan.id}
                    className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 ${
                      selectedPlan === plan.id
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedPlan(plan.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className={`w-10 h-10 ${getPlanColor(plan.color)} rounded-xl flex items-center justify-center flex-shrink-0`}>
                          <plan.icon className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-semibold text-gray-900">{plan.name}</h4>
                            {plan.popular && (
                              <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full">
                                Popular
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{plan.description}</p>
                          <div className="space-y-1">
                            {plan.features.slice(0, 3).map((feature, index) => (
                              <div key={index} className="flex items-center space-x-2">
                                <Check className="h-3 w-3 text-green-500" />
                                <span className="text-xs text-gray-600">{feature}</span>
                              </div>
                            ))}
                            {plan.features.length > 3 && (
                              <span className="text-xs text-gray-500">
                                +{plan.features.length - 3} more features
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">
                          ${plan.price}
                        </div>
                        <div className="text-sm text-gray-500">per {plan.period}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Details</h3>
              
              {/* Billing Options */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Billing Cycle</h4>
                <div className="grid grid-cols-3 gap-3">
                  {billingOptions.map((option) => (
                    <div
                      key={option.id}
                      className={`border-2 rounded-lg p-3 cursor-pointer transition-all duration-200 ${
                        selectedBilling === option.id
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedBilling(option.id)}
                    >
                      <div className="text-center">
                        <div className="font-semibold text-gray-900">{option.name}</div>
                        {option.discount > 0 && (
                          <div className="text-xs text-green-600 font-medium">
                            Save {option.discount}%
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Selected Plan Details */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Plan Summary</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Plan:</span>
                    <span className="font-medium">{selectedPlanData.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Billing:</span>
                    <span className="font-medium">
                      {billingOptions.find(opt => opt.id === selectedBilling)?.name}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Price:</span>
                    <span className="font-bold text-lg text-purple-600">
                      ${calculatePrice(selectedPlanData, selectedBilling).toFixed(2)}
                    </span>
                  </div>
                  {selectedBilling === 'yearly' && (
                    <div className="text-sm text-green-600 font-medium">
                      You save ${(selectedPlanData.price * 12 * 0.2).toFixed(2)} per year
                    </div>
                  )}
                  {selectedBilling === 'lifetime' && (
                    <div className="text-sm text-green-600 font-medium">
                      One-time payment, lifetime access
                    </div>
                  )}
                </div>
              </div>

              {/* Payment Method */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Payment Method</h4>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                      <CreditCard className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">Pi Network Wallet</div>
                      <div className="text-sm text-gray-600">Secure payment through Pi Network</div>
                    </div>
                    <Lock className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Upgrade Button */}
              <button
                onClick={handleUpgrade}
                disabled={isProcessing || selectedPlan === currentPlan}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Upgrade to {selectedPlanData.name}</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>

              {/* Security Notice */}
              <div className="mt-4 text-center">
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                  <Lock className="h-4 w-4" />
                  <span>Your payment is secure and encrypted</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const getPlanColor = (color: string) => {
  switch (color) {
    case 'gray': return 'bg-gray-500'
    case 'blue': return 'bg-blue-500'
    case 'purple': return 'bg-purple-500'
    case 'orange': return 'bg-orange-500'
    default: return 'bg-gray-500'
  }
}

export default UpgradeModal 