import React from 'react'
import Footer from '../components/Footer'

const Partners: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8 flex-1">
        <h1 className="text-4xl font-bold text-text mb-6">Partners</h1>
        <p className="text-lg text-gray-600 mb-8">Partner with SmartSolve to bring productivity and Pi-powered solutions to more people.</p>
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-text mb-4">Current Partners</h2>
          <ul className="space-y-4">
            <li className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-primary mb-1">Pi Network</h3>
              <p className="text-gray-600">Blockchain payments and authentication</p>
            </li>
            <li className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-primary mb-1">TruthWeb</h3>
              <p className="text-gray-600">Cloud integrations</p>
            </li>
          </ul>
        </div>
        <div className="bg-primary/10 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-primary mb-2">Become a Partner</h2>
          <p className="text-gray-700 mb-4">Interested in partnering with us? Fill out the form below or email <a href='mailto:partners@smartsolve.com' className='text-primary underline'>partners@smartsolve.com</a>.</p>
          <form className="max-w-md mx-auto mt-6">
            <input type="text" placeholder="Your Name" className="w-full mb-3 px-4 py-2 rounded border border-gray-300" />
            <input type="email" placeholder="Your Email" className="w-full mb-3 px-4 py-2 rounded border border-gray-300" />
            <textarea placeholder="Tell us about your company or idea" className="w-full mb-3 px-4 py-2 rounded border border-gray-300" rows={4}></textarea>
            <button type="submit" className="btn btn-primary w-full">Submit</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Partners 