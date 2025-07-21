import React, { useState } from 'react'
import Footer from '../components/Footer'

const faqs = [
  {
    question: 'How do I create an account?',
    answer: 'Click Sign Up on the login page and fill in your details. You can also sign in with Pi Network.'
  },
  {
    question: 'How do I upgrade my plan?',
    answer: 'Go to your Profile or Dashboard and click Upgrade. Follow the payment steps.'
  },
  {
    question: 'How do I reset my password?',
    answer: 'Click Forgot Password on the login page and follow the instructions.'
  },
  {
    question: 'How do I contact support?',
    answer: 'Email support@smartsolve.com or use the contact form on the Contact page.'
  },
  {
    question: 'Is my data secure?',
    answer: 'Yes, we use industry-standard encryption and never share your data without consent.'
  }
]

const Help: React.FC = () => {
  const [search, setSearch] = useState('')
  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(search.toLowerCase()) ||
    faq.answer.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="max-w-3xl mx-auto py-16 px-4 sm:px-6 lg:px-8 flex-1">
        <h1 className="text-4xl font-bold text-text mb-6">Help Center</h1>
        <input
          type="text"
          placeholder="Search help topics..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full mb-8 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <div className="space-y-6">
          {filteredFaqs.length === 0 ? (
            <p className="text-gray-600">No results found.</p>
          ) : (
            filteredFaqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-primary mb-2">{faq.question}</h2>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))
          )}
        </div>
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-primary mb-2">Still need help?</h2>
          <p className="text-gray-700 mb-4">Contact our support team for further assistance.</p>
          <a href="mailto:support@smartsolve.com" className="btn btn-primary">Contact Support</a>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Help 