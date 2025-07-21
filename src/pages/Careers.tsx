import React from 'react'
import Footer from '../components/Footer'

const Careers: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8 flex-1">
        <h1 className="text-4xl font-bold text-text mb-6">Careers at SmartSolve</h1>
        <p className="text-lg text-gray-600 mb-8">Join our Pi-powered team and help shape the future of productivity for families and businesses worldwide.</p>
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-text mb-4">Open Positions</h2>
          <ul className="space-y-4">
            <li className="bg-white rounded-lg shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-lg font-bold text-primary mb-1">Frontend Developer</h3>
                <p className="text-gray-600">React, TypeScript, Tailwind CSS</p>
              </div>
              <a href="mailto:careers@smartsolve.com" className="btn btn-primary mt-4 md:mt-0">Apply Now</a>
            </li>
            <li className="bg-white rounded-lg shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-lg font-bold text-primary mb-1">Backend Developer</h3>
                <p className="text-gray-600">Node.js, Supabase, API Design</p>
              </div>
              <a href="mailto:careers@smartsolve.com" className="btn btn-primary mt-4 md:mt-0">Apply Now</a>
            </li>
            <li className="bg-white rounded-lg shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-lg font-bold text-primary mb-1">UI/UX Designer</h3>
                <p className="text-gray-600">Figma, Mobile & Web Design</p>
              </div>
              <a href="mailto:careers@smartsolve.com" className="btn btn-primary mt-4 md:mt-0">Apply Now</a>
            </li>
          </ul>
        </div>
        <div className="bg-primary/10 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-primary mb-2">Our Culture</h2>
          <p className="text-gray-700 mb-4">We value innovation, collaboration, and a passion for making life easier. Work remotely, enjoy flexible hours, and grow with a team that cares.</p>
          <a href="mailto:careers@smartsolve.com" className="btn btn-secondary">Send Your CV</a>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Careers 