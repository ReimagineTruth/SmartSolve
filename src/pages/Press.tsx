import React from 'react'
import Footer from '../components/Footer'

const Press: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8 flex-1">
        <h1 className="text-4xl font-bold text-text mb-6">Press & Media</h1>
        <p className="text-lg text-gray-600 mb-8">Read the latest news, press releases, and media coverage about SmartSolve.</p>
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-text mb-4">Press Releases</h2>
          <ul className="space-y-4">
            <li className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-primary mb-1">SmartSolve Launches Pi-Powered Productivity Platform</h3>
              <p className="text-gray-600">January 2025</p>
            </li>
            <li className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-primary mb-1">SmartSolve Partners with Pi Network for Secure Payments</h3>
              <p className="text-gray-600">December 2024</p>
            </li>
          </ul>
        </div>
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-text mb-4">Media Mentions</h2>
          <ul className="space-y-4">
            <li className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-primary mb-1">"SmartSolve is changing the way families organize their lives."</h3>
              <p className="text-gray-600">Tech Today Magazine</p>
            </li>
            <li className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-primary mb-1">"A seamless blend of productivity and blockchain."</h3>
              <p className="text-gray-600">Blockchain Weekly</p>
            </li>
          </ul>
        </div>
        <div className="bg-primary/10 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-primary mb-2">Press Contact</h2>
          <p className="text-gray-700 mb-4">For interviews, quotes, or more information, contact our media team.</p>
          <a href="mailto:press@smartsolve.com" className="btn btn-secondary">press@smartsolve.com</a>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Press 