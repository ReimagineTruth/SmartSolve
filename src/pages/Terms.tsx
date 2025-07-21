import React from 'react'
import { Link } from 'react-router-dom'
import { Star, FileText, Shield, AlertTriangle, CheckCircle, ArrowLeft } from 'lucide-react'
import Footer from '../components/Footer'

const Terms: React.FC = () => {
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
            <FileText className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-text mb-4">Terms of Service</h1>
          <p className="text-xl text-gray-600">Last updated: January 15, 2025</p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-text mb-6">Agreement to Terms</h2>
            <p className="text-gray-700 mb-4">
              By accessing and using SmartSolve, you accept and agree to be bound by the terms and provision of this agreement. 
              If you do not agree to abide by the above, please do not use this service.
            </p>
            <p className="text-gray-700">
              These Terms of Service govern your use of the SmartSolve platform and any related services provided by Mrwain Organization.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-text mb-6">Description of Service</h2>
            <p className="text-gray-700 mb-4">
              SmartSolve is a Pi-powered productivity platform that provides:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Task and project management tools</li>
              <li>Budget and financial tracking features</li>
              <li>Meal planning and recipe management</li>
              <li>Wellness and mood tracking capabilities</li>
              <li>Family and team collaboration features</li>
              <li>Integration with Pi Network for payments</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-text mb-6">User Accounts</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold text-text mb-2">Account Creation</h4>
                  <p className="text-gray-700 text-sm">You must provide accurate and complete information when creating your account</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold text-text mb-2">Account Security</h4>
                  <p className="text-gray-700 text-sm">You are responsible for maintaining the security of your account credentials</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold text-text mb-2">Account Usage</h4>
                  <p className="text-gray-700 text-sm">You may not share your account with others or use it for commercial purposes without permission</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-text mb-6">Acceptable Use</h2>
            <p className="text-gray-700 mb-4">You agree not to use the service to:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe upon the rights of others</li>
              <li>Upload or transmit malicious code or harmful content</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Use the service for spam or unsolicited communications</li>
              <li>Interfere with the proper functioning of the platform</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-text mb-6">Payment Terms</h2>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Pi Network Payments</h4>
                <p className="text-blue-700 text-sm">
                  All payments are processed securely through the Pi Network. By making a payment, you agree to Pi Network's terms and conditions.
                </p>
              </div>
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Subscription Plans</h4>
                <p className="text-green-700 text-sm">
                  Subscription fees are charged monthly or annually based on your selected plan. Prices are subject to change with notice.
                </p>
              </div>
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-2">Refunds</h4>
                <p className="text-yellow-700 text-sm">
                  Refunds are provided within 30 days of purchase if you are not satisfied with our service.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-text mb-6">Intellectual Property</h2>
            <p className="text-gray-700 mb-4">
              The SmartSolve platform, including its content, features, and functionality, is owned by Mrwain Organization and is protected by copyright, 
              trademark, and other intellectual property laws.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-text mb-2">Your Content</h4>
                <p className="text-gray-700 text-sm">You retain ownership of content you upload to our platform</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-text mb-2">License Grant</h4>
                <p className="text-gray-700 text-sm">You grant us a license to use your content to provide our services</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-text mb-6">Privacy and Data Protection</h2>
            <p className="text-gray-700 mb-4">
              Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy, 
              which is incorporated into these Terms of Service by reference.
            </p>
            <div className="flex items-center p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <Shield className="h-5 w-5 text-blue-600 mr-3" />
              <div>
                <h4 className="font-semibold text-blue-800">Data Security</h4>
                <p className="text-blue-700 text-sm">We implement industry-standard security measures to protect your data</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-text mb-6">Service Availability</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-4 mt-1">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-text mb-2">Uptime Commitment</h4>
                  <p className="text-gray-700 text-sm">We strive to maintain 99.9% uptime for our platform</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center mr-4 mt-1">
                  <AlertTriangle className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-text mb-2">Maintenance</h4>
                  <p className="text-gray-700 text-sm">Scheduled maintenance may temporarily affect service availability</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-text mb-6">Limitation of Liability</h2>
            <p className="text-gray-700 mb-4">
              To the maximum extent permitted by law, Mrwain Organization shall not be liable for any indirect, incidental, 
              special, consequential, or punitive damages, including but not limited to loss of profits, data, or use.
            </p>
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <h4 className="font-semibold text-red-800 mb-2">Important Notice</h4>
              <p className="text-red-700 text-sm">
                Our total liability to you for any claims arising from the use of our service shall not exceed the amount 
                you paid for the service in the 12 months preceding the claim.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-text mb-6">Termination</h2>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-text mb-2">By You</h4>
                <p className="text-gray-700 text-sm">You may cancel your account at any time through your account settings</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-text mb-2">By Us</h4>
                <p className="text-gray-700 text-sm">We may terminate your account for violations of these terms or for any other reason with notice</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-text mb-2">Effect of Termination</h4>
                <p className="text-gray-700 text-sm">Upon termination, your access to the service will cease and your data may be deleted</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-text mb-6">Governing Law</h2>
            <p className="text-gray-700">
              These Terms of Service shall be governed by and construed in accordance with the laws of the jurisdiction 
              where Mrwain Organization is established. Any disputes arising from these terms shall be resolved through 
              binding arbitration in accordance with the rules of the Pi Network community.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-text mb-6">Changes to Terms</h2>
            <p className="text-gray-700 mb-4">
              We reserve the right to modify these Terms of Service at any time. We will notify users of any material changes 
              by posting the updated terms on our platform and updating the "Last updated" date.
            </p>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Continued Use</h4>
              <p className="text-blue-700 text-sm">
                Your continued use of the service after changes become effective constitutes acceptance of the new terms.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            {/* Contact section removed as requested */}
            <p className="text-gray-700 mt-4 text-center">For legal inquiries, email <a href="mailto:legal@smartsolve.com" className="text-primary underline">legal@smartsolve.com</a> (Mrwain Organization).</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Terms 