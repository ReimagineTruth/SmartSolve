import React from 'react'
import Footer from '../components/Footer'

const Security: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8 flex-1">
        <h1 className="text-4xl font-bold text-text mb-6">Security</h1>
        <p className="text-lg text-gray-600 mb-8">Your security is our top priority. Learn how we protect your data and keep your account safe.</p>
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-text mb-4">Data Protection</h2>
          <p className="text-gray-700 mb-4">We use industry-standard encryption and security protocols to protect your personal information and transactions.</p>
        </div>
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-text mb-4">User Safety</h2>
          <p className="text-gray-700 mb-4">We never share your data without your consent. Our team monitors for suspicious activity and responds quickly to any threats.</p>
        </div>
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-text mb-4">Encryption</h2>
          <p className="text-gray-700 mb-4">All sensitive data is encrypted both in transit and at rest. We regularly audit our systems for vulnerabilities.</p>
        </div>
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-text mb-4">Cookies Policy</h2>
          <p className="text-gray-700 mb-4">We use cookies to enhance your experience, analyze usage, and personalize content. For more details, see our <a href="/cookiepolicy" className="text-primary underline">Cookie Policy</a>.</p>
        </div>
        <div className="bg-primary/10 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-primary mb-2">Report a Security Issue</h2>
          <p className="text-gray-700 mb-4">If you believe your account has been compromised or you notice suspicious activity, contact us immediately at <a href='mailto:security@smartsolve.com' className='text-primary underline'>security@smartsolve.com</a>.</p>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Security 