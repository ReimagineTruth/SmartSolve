import React from 'react'
import Footer from '../components/Footer'

const CookiePolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8 flex-1">
        <h1 className="text-4xl font-bold text-text mb-6">Cookie Policy</h1>
        <p className="text-lg text-gray-600 mb-8">This Cookie Policy explains how SmartSolve uses cookies and similar technologies to recognize you when you visit our website or use our app.</p>
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-text mb-4">What Are Cookies?</h2>
          <p className="text-gray-700 mb-4">Cookies are small data files placed on your device when you visit a website. They are widely used to make websites work, or work more efficiently, as well as to provide reporting information.</p>
        </div>
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-text mb-4">How We Use Cookies</h2>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li>To remember your preferences and settings</li>
            <li>To keep you signed in</li>
            <li>To analyze site traffic and usage</li>
            <li>To personalize your experience</li>
          </ul>
        </div>
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-text mb-4">Your Choices</h2>
          <p className="text-gray-700 mb-4">You can control and manage cookies in your browser settings. You can choose to block or delete cookies, but some features of our site may not function properly if you do.</p>
        </div>
        <div className="bg-primary/10 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-primary mb-2">Contact Us</h2>
          <p className="text-gray-700 mb-4">If you have questions about our Cookie Policy, email <a href='mailto:privacy@smartsolve.com' className='text-primary underline'>privacy@smartsolve.com</a>.</p>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default CookiePolicy 