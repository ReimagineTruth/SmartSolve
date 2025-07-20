import React from 'react'
import { X, Shield, HelpCircle, Cookie, FileText } from 'lucide-react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  )
}

export const TermsModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Terms of Service">
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <FileText className="h-8 w-8 text-blue-500" />
        <h3 className="text-lg font-semibold text-gray-900">SmartSolve Terms of Service</h3>
      </div>
      
      <div className="space-y-4 text-gray-600">
        <section>
          <h4 className="font-semibold text-gray-900 mb-2">1. Acceptance of Terms</h4>
          <p>By accessing and using SmartSolve, you accept and agree to be bound by the terms and provision of this agreement.</p>
        </section>

        <section>
          <h4 className="font-semibold text-gray-900 mb-2">2. Use License</h4>
          <p>Permission is granted to temporarily download one copy of SmartSolve for personal, non-commercial transitory viewing only.</p>
        </section>

        <section>
          <h4 className="font-semibold text-gray-900 mb-2">3. Service Description</h4>
          <p>SmartSolve provides productivity tools including task management, budgeting, meal planning, and wellness tracking.</p>
        </section>

        <section>
          <h4 className="font-semibold text-gray-900 mb-2">4. User Responsibilities</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Maintain the security of your account</li>
            <li>Provide accurate information</li>
            <li>Use the service responsibly</li>
            <li>Comply with all applicable laws</li>
          </ul>
        </section>

        <section>
          <h4 className="font-semibold text-gray-900 mb-2">5. Subscription Terms</h4>
          <p>Premium features require a paid subscription. Subscriptions are billed monthly or annually and auto-renew unless cancelled.</p>
        </section>

        <section>
          <h4 className="font-semibold text-gray-900 mb-2">6. Termination</h4>
          <p>We may terminate or suspend your account immediately, without prior notice, for any reason whatsoever.</p>
        </section>

        <section>
          <h4 className="font-semibold text-gray-900 mb-2">7. Changes to Terms</h4>
          <p>We reserve the right to modify these terms at any time. Continued use of the service constitutes acceptance of new terms.</p>
        </section>

        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Last updated:</strong> January 2024
          </p>
        </div>
      </div>
    </div>
  </Modal>
)

export const PrivacyModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Privacy Policy">
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Shield className="h-8 w-8 text-green-500" />
        <h3 className="text-lg font-semibold text-gray-900">SmartSolve Privacy Policy</h3>
      </div>
      
      <div className="space-y-4 text-gray-600">
        <section>
          <h4 className="font-semibold text-gray-900 mb-2">Information We Collect</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Account information (name, email, subscription details)</li>
            <li>Usage data (tasks, expenses, meals, wellness entries)</li>
            <li>Device information and analytics</li>
            <li>Payment information (processed securely)</li>
          </ul>
        </section>

        <section>
          <h4 className="font-semibold text-gray-900 mb-2">How We Use Your Information</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Provide and improve our services</li>
            <li>Process payments and subscriptions</li>
            <li>Send important updates and notifications</li>
            <li>Analyze usage patterns to enhance features</li>
          </ul>
        </section>

        <section>
          <h4 className="font-semibold text-gray-900 mb-2">Data Security</h4>
          <p>We implement industry-standard security measures to protect your personal information, including encryption and secure data storage.</p>
        </section>

        <section>
          <h4 className="font-semibold text-gray-900 mb-2">Data Sharing</h4>
          <p>We do not sell your personal information. We may share data with trusted service providers who assist in operating our platform.</p>
        </section>

        <section>
          <h4 className="font-semibold text-gray-900 mb-2">Your Rights</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Access your personal data</li>
            <li>Request data correction or deletion</li>
            <li>Opt-out of marketing communications</li>
            <li>Export your data</li>
          </ul>
        </section>

        <section>
          <h4 className="font-semibold text-gray-900 mb-2">Cookies and Tracking</h4>
          <p>We use cookies and similar technologies to enhance your experience and analyze usage patterns.</p>
        </section>

        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-green-800">
            <strong>Last updated:</strong> January 2024
          </p>
        </div>
      </div>
    </div>
  </Modal>
)

export const HelpModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Help & Support">
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <HelpCircle className="h-8 w-8 text-orange-500" />
        <h3 className="text-lg font-semibold text-gray-900">SmartSolve Help Center</h3>
      </div>
      
      <div className="space-y-6">
        <section>
          <h4 className="font-semibold text-gray-900 mb-3">Getting Started</h4>
          <div className="space-y-3">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h5 className="font-medium text-gray-900 mb-2">1. Create Your Account</h5>
              <p className="text-sm text-gray-600">Sign up with your email or Pi Network wallet to get started.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h5 className="font-medium text-gray-900 mb-2">2. Choose Your Plan</h5>
              <p className="text-sm text-gray-600">Start with our free plan or upgrade to unlock advanced features.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h5 className="font-medium text-gray-900 mb-2">3. Explore Features</h5>
              <p className="text-sm text-gray-600">Use the dashboard to manage tasks, budget, meals, and wellness.</p>
            </div>
          </div>
        </section>

        <section>
          <h4 className="font-semibold text-gray-900 mb-3">Frequently Asked Questions</h4>
          <div className="space-y-3">
            <div className="border border-gray-200 rounded-lg p-4">
              <h5 className="font-medium text-gray-900 mb-2">How do I add a task?</h5>
              <p className="text-sm text-gray-600">Click "Add Task" on the dashboard or go to the Tasks page to create new tasks with priorities and due dates.</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h5 className="font-medium text-gray-900 mb-2">Can I sync with other apps?</h5>
              <p className="text-sm text-gray-600">Premium and Pro plans include integration with popular productivity tools and calendar apps.</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h5 className="font-medium text-gray-900 mb-2">How do I cancel my subscription?</h5>
              <p className="text-sm text-gray-600">Go to Settings &gt; Subscription to manage your billing and cancel anytime.</p>
            </div>
          </div>
        </section>

        <section>
          <h4 className="font-semibold text-gray-900 mb-3">Contact Support</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h5 className="font-medium text-blue-900 mb-2">Email Support</h5>
              <p className="text-sm text-blue-800">support@smartsolve.com</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h5 className="font-medium text-green-900 mb-2">Live Chat</h5>
              <p className="text-sm text-green-800">Available 24/7 for Pro users</p>
            </div>
          </div>
        </section>

        <div className="bg-orange-50 p-4 rounded-lg">
          <p className="text-sm text-orange-800">
            <strong>Need immediate help?</strong> Check our detailed documentation or contact our support team.
          </p>
        </div>
      </div>
    </div>
  </Modal>
)

export const CookiesModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Cookie Policy">
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Cookie className="h-8 w-8 text-purple-500" />
        <h3 className="text-lg font-semibold text-gray-900">SmartSolve Cookie Policy</h3>
      </div>
      
      <div className="space-y-4 text-gray-600">
        <section>
          <h4 className="font-semibold text-gray-900 mb-2">What Are Cookies?</h4>
          <p>Cookies are small text files stored on your device that help us provide a better user experience and analyze how our service is used.</p>
        </section>

        <section>
          <h4 className="font-semibold text-gray-900 mb-2">Types of Cookies We Use</h4>
          <div className="space-y-3">
            <div className="border border-gray-200 rounded-lg p-4">
              <h5 className="font-medium text-gray-900 mb-2">Essential Cookies</h5>
              <p className="text-sm text-gray-600">Required for basic functionality like authentication and security.</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h5 className="font-medium text-gray-900 mb-2">Performance Cookies</h5>
              <p className="text-sm text-gray-600">Help us understand how visitors interact with our website.</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h5 className="font-medium text-gray-900 mb-2">Functional Cookies</h5>
              <p className="text-sm text-gray-600">Remember your preferences and settings for a personalized experience.</p>
            </div>
          </div>
        </section>

        <section>
          <h4 className="font-semibold text-gray-900 mb-2">Managing Cookies</h4>
          <p>You can control and manage cookies through your browser settings. However, disabling certain cookies may affect the functionality of our service.</p>
        </section>

        <section>
          <h4 className="font-semibold text-gray-900 mb-2">Third-Party Cookies</h4>
          <p>We may use third-party services that also use cookies. These services help us provide analytics, payment processing, and other essential functions.</p>
        </section>

        <div className="bg-purple-50 p-4 rounded-lg">
          <p className="text-sm text-purple-800">
            <strong>Last updated:</strong> January 2024
          </p>
        </div>
      </div>
    </div>
  </Modal>
)

export default Modal 