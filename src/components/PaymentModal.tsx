import React, { useState, useEffect } from 'react'
import localStorageService from '../lib/localStorage'

interface Plan {
  name: string
  badge: string
  description: string
  monthly: {
    price: number
    period: string
    savings: string | null
  }
  yearly: {
    price: number
    period: string
    savings: string | null
  }
  features: string[]
}

interface PaymentDetails {
  plan: string
  billing: string
  paymentMethod: string
  amount: string
}

interface PaymentModalProps {
  isOpen?: boolean
  plan?: string
  onClose?: () => void
  onSuccess?: (details: PaymentDetails) => void
  onCancel?: () => void
}

const plans: Record<string, Plan> = {
  standard: {
    name: 'Standard Plan',
    badge: 'Standard Plan',
    description: 'Core tools for personal organization',
    monthly: { price: 5, period: '/month', savings: null },
    yearly: { price: 50, period: '/year', savings: 'Save 10 Pi/year' },
    features: [
      'Unlimited tasks & planning',
      'Advanced budget tools',
      'Full meal planner',
      'AI mood assistant',
      'Local services'
    ]
  },
  premium: {
    name: 'Premium Plan',
    badge: 'Premium Plan',
    description: 'Perfect for families and small groups',
    monthly: { price: 10, period: '/month', savings: null },
    yearly: { price: 100, period: '/year', savings: 'Save 20 Pi/year' },
    features: [
      'All Standard features',
      'Family calendar & sharing',
      'Kids mode with rewards',
      'Group chat & file sharing',
      'Full grocery planner',
      'Privacy controls'
    ]
  },
  pro: {
    name: 'Pro Plan',
    badge: 'Pro Plan',
    description: 'Advanced features for businesses',
    monthly: { price: 15, period: '/month', savings: null },
    yearly: { price: 150, period: '/year', savings: 'Save 30 Pi/year' },
    features: [
      'All Premium features',
      'Team collaboration tools',
      'Business tools (Marketing + Income)',
      'TruthWeb & Cloudy integrations',
      'Virtual assistant booking',
      'Advanced analytics'
    ]
  },
  lifetime: {
    name: 'Lifetime Plan',
    badge: '🔓 Lifetime Plan',
    description: 'Pay once, unlock everything forever!',
    monthly: { price: 99, period: ' one-time', savings: null },
    yearly: { price: 99, period: ' one-time', savings: null },
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
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen = false,
  plan = 'standard',
  onClose,
  onSuccess,
  onCancel
}) => {
  const [currentPlan, setCurrentPlan] = useState(plan)
  const [currentBilling, setCurrentBilling] = useState<'monthly' | 'yearly'>('monthly')
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('pi-wallet')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    setCurrentPlan(plan)
  }, [plan])

  const handleClose = () => {
    setIsLoading(false)
    setIsSuccess(false)
    onClose?.()
    onCancel?.()
  }

  const handleBillingChange = (billing: 'monthly' | 'yearly') => {
    setCurrentBilling(billing)
  }

  const handlePaymentMethodChange = (method: string) => {
    setSelectedPaymentMethod(method)
  }

  const handlePayment = async () => {
    setIsLoading(true)
    
    // Simulate payment processing
    setTimeout(() => {
      setIsLoading(false)
      setIsSuccess(true)
      
      const paymentDetails: PaymentDetails = {
        plan: currentPlan,
        billing: currentBilling,
        paymentMethod: selectedPaymentMethod,
        amount: `${plans[currentPlan][currentBilling].price} Pi`
      }
      // Save subscription to localStorage
      let expiration: string | null = null;
      if (currentPlan === 'lifetime') {
        expiration = null;
      } else {
        const now = new Date();
        if (currentBilling === 'monthly') {
          now.setMonth(now.getMonth() + 1);
        } else if (currentBilling === 'yearly') {
          now.setFullYear(now.getFullYear() + 1);
        }
        expiration = now.toISOString();
      }
      localStorageService.saveSubscription({
        plan: currentPlan,
        billing: currentPlan === 'lifetime' ? 'lifetime' : currentBilling,
        status: 'active',
        expiration,
      });
      onSuccess?.(paymentDetails)
    }, 2000)
  }

  const currentPlanData = plans[currentPlan]
  const currentBillingData = currentPlanData[currentBilling]

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="payment-modal" onClick={(e) => e.stopPropagation()}>
        <button className="absolute top-4 right-4 text-2xl cursor-pointer opacity-70 hover:opacity-100" onClick={handleClose}>
          &times;
        </button>
        
        {!isLoading && !isSuccess && (
          <div>
            <div className="text-center mb-8">
              <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4 ${
                currentPlan === 'lifetime' ? 'bg-lifetime-bg text-lifetime-text' : 'bg-gradient-to-r from-primary to-secondary text-white'
              }`}>
                {currentPlanData.badge}
              </div>
              <h2 className="text-2xl font-bold text-text mb-2">{currentPlanData.name}</h2>
              <p className="text-text opacity-80">{currentPlanData.description}</p>
            </div>

            {/* Billing Toggle */}
            <div className="flex bg-hover-bg rounded-lg p-1 mb-4">
              <button
                className={`flex-1 py-3 text-center rounded-md transition-all font-medium ${
                  currentBilling === 'monthly' ? 'bg-primary text-white' : 'hover:bg-primary/30'
                }`}
                onClick={() => handleBillingChange('monthly')}
              >
                Monthly
              </button>
              <button
                className={`flex-1 py-3 text-center rounded-md transition-all font-medium relative ${
                  currentBilling === 'yearly' ? 'bg-primary text-white' : 'hover:bg-primary/30'
                }`}
                onClick={() => handleBillingChange('yearly')}
              >
                Yearly
                {currentBillingData.savings && (
                  <div className="absolute -top-1 -right-1 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    Save
                  </div>
                )}
              </button>
            </div>

            {/* Price Display */}
            <div className="text-center mb-6">
              <div className="text-5xl font-bold text-primary mb-2">{currentBillingData.price}</div>
              <div className="text-2xl text-pi-text font-semibold">Pi</div>
              <div className="text-lg text-text opacity-80">{currentBillingData.period}</div>
              {currentBillingData.savings && (
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mt-2 inline-block">
                  {currentBillingData.savings}
                </div>
              )}
            </div>

            {/* Features List */}
            <ul className="mb-6">
              {currentPlanData.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3 mb-3">
                  <i className="fas fa-check text-primary w-5"></i>
                  <span className="text-text">{feature}</span>
                </li>
              ))}
            </ul>

            {/* Payment Methods */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
              <div className="space-y-3">
                <div
                  className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedPaymentMethod === 'pi-wallet' ? 'border-primary bg-hover-bg' : 'border-gray-200 hover:border-primary'
                  }`}
                  onClick={() => handlePaymentMethodChange('pi-wallet')}
                >
                  <i className="fas fa-wallet text-2xl text-pi-text"></i>
                  <div>
                    <h4 className="font-semibold">Pi Wallet</h4>
                    <p className="text-sm opacity-80">Pay securely with your Pi balance</p>
                  </div>
                </div>
                <div
                  className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedPaymentMethod === 'pi-app' ? 'border-primary bg-hover-bg' : 'border-gray-200 hover:border-primary'
                  }`}
                  onClick={() => handlePaymentMethodChange('pi-app')}
                >
                  <i className="fas fa-mobile-alt text-2xl text-pi-text"></i>
                  <div>
                    <h4 className="font-semibold">Pi App</h4>
                    <p className="text-sm opacity-80">Use Pi Network mobile app</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Notice */}
            <div className="bg-yellow-50 text-yellow-800 p-4 rounded-lg mb-6 flex items-center">
              <i className="fas fa-shield-alt mr-2"></i>
              <span className="text-sm">Your payment is secured with Pi Network's blockchain technology</span>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button className="btn btn-secondary flex-1" onClick={handleClose}>
                Cancel
              </button>
              <button 
                className={`btn flex-1 ${currentPlan === 'lifetime' ? 'btn-lifetime' : 'btn-primary'}`}
                onClick={handlePayment}
              >
                {currentPlan === 'lifetime' ? (
                  <>
                    <i className="fas fa-crown"></i>
                    Get Lifetime Access
                  </>
                ) : (
                  <>
                    <i className="fas fa-lock"></i>
                    Pay Securely
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-8">
            <i className="fas fa-spinner text-3xl text-primary mb-4 animate-spin-slow"></i>
            <p className="text-text font-medium">Processing payment...</p>
          </div>
        )}

        {/* Success State */}
        {isSuccess && (
          <div className="text-center py-8">
            <i className="fas fa-check-circle text-5xl text-green-600 mb-4"></i>
            <h3 className="text-2xl font-bold text-green-600 mb-4">Payment Successful!</h3>
            <p className="text-text mb-6">Welcome to SmartSolve! Your subscription is now active.</p>
            <button className="btn btn-primary" onClick={handleClose}>
              Continue to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default PaymentModal 