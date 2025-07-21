import React from 'react'
import { Link } from 'react-router-dom'
import { Star, Shield, Eye, Lock, Users, Globe, FileText, ArrowLeft } from 'lucide-react'
import Footer from '../components/Footer'

const Privacy: React.FC = () => {
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
            <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mb-6 flex items-center justify-center">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-text mb-4">Privacy Policy</h1>
          <p className="text-xl text-gray-600">Last updated: January 15, 2025</p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-text mb-6">Introduction</h2>
            <p className="text-gray-700 mb-4">
              At SmartSolve, we are committed to protecting your privacy and ensuring the security of your personal information. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our 
              Pi-powered productivity platform.
            </p>
            <p className="text-gray-700">
              By using SmartSolve, you agree to the collection and use of information in accordance with this policy.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-text mb-6">Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-text mb-4">Personal Information</h3>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Name and contact information (email address, phone number)</li>
              <li>Account credentials and profile information</li>
              <li>Payment information (processed securely through Pi Network)</li>
              <li>Usage data and preferences</li>
              <li>Communication history with our support team</li>
            </ul>

            <h3 className="text-xl font-semibold text-text mb-4">Usage Data</h3>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Task and project management data</li>
              <li>Budget and financial tracking information</li>
              <li>Meal planning and recipe data</li>
              <li>Wellness and mood tracking data</li>
              <li>App usage patterns and feature interactions</li>
            </ul>

            <h3 className="text-xl font-semibold text-text mb-4">Technical Information</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Device information and browser type</li>
              <li>IP address and location data</li>
              <li>Cookies and similar tracking technologies</li>
              <li>Error logs and performance data</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-text mb-6">How We Use Your Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-4 mt-1">
                  <Eye className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-text mb-2">Service Provision</h4>
                  <p className="text-gray-700 text-sm">To provide and maintain our productivity platform services</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center mr-4 mt-1">
                  <Users className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-text mb-2">User Experience</h4>
                  <p className="text-gray-700 text-sm">To personalize your experience and improve our services</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-4 mt-1">
                  <Globe className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-text mb-2">Communication</h4>
                  <p className="text-gray-700 text-sm">To send important updates and respond to your inquiries</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center mr-4 mt-1">
                  <FileText className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-text mb-2">Analytics</h4>
                  <p className="text-gray-700 text-sm">To analyze usage patterns and improve our platform</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-text mb-6">Data Security</h2>
            <p className="text-gray-700 mb-4">
              We implement industry-standard security measures to protect your personal information:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>End-to-end encryption for sensitive data</li>
              <li>Secure data centers with 24/7 monitoring</li>
              <li>Regular security audits and penetration testing</li>
              <li>Access controls and authentication protocols</li>
              <li>Data backup and disaster recovery procedures</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-text mb-6">Data Sharing and Disclosure</h2>
            <p className="text-gray-700 mb-4">
              We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>With your explicit consent</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights and safety</li>
              <li>With trusted service providers who assist in operating our platform</li>
              <li>In connection with a business transfer or merger</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-text mb-6">Your Rights</h2>
            <p className="text-gray-700 mb-4">
              You have the following rights regarding your personal information:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-text mb-2">Access</h4>
                <p className="text-gray-700 text-sm">Request access to your personal data</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-text mb-2">Correction</h4>
                <p className="text-gray-700 text-sm">Request correction of inaccurate data</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-text mb-2">Deletion</h4>
                <p className="text-gray-700 text-sm">Request deletion of your personal data</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-text mb-2">Portability</h4>
                <p className="text-gray-700 text-sm">Request data portability</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-text mb-6">Cookies and Tracking</h2>
            <p className="text-gray-700 mb-4">
              We use cookies and similar tracking technologies to enhance your experience:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Essential cookies for platform functionality</li>
              <li>Analytics cookies to understand usage patterns</li>
              <li>Preference cookies to remember your settings</li>
              <li>Marketing cookies (with your consent)</li>
            </ul>
            <p className="text-gray-700 mt-4">
              You can control cookie settings through your browser preferences.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-text mb-6">Pi Network Integration</h2>
            <p className="text-gray-700 mb-4">
              SmartSolve integrates with the Pi Network for secure payments and transactions:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Payment processing through Pi Network's secure infrastructure</li>
              <li>Transaction data is encrypted and securely transmitted</li>
              <li>We do not store your Pi wallet credentials</li>
              <li>Payment information is handled according to Pi Network's privacy standards</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-text mb-6">Children's Privacy</h2>
            <p className="text-gray-700">
              SmartSolve is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. 
              If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-text mb-6">Changes to This Policy</h2>
            <p className="text-gray-700">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page 
              and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically for any changes.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            {/* Contact section removed as requested */}
            <p className="text-gray-700 mt-4 text-center">For privacy inquiries, email <a href="mailto:privacy@smartsolve.com" className="text-primary underline">privacy@smartsolve.com</a> (Mrwain Organization).</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Privacy 