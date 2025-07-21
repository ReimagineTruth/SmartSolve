import React from 'react'
import { Users, Plus } from 'lucide-react'
import Footer from '../components/Footer'

const Services: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Local Services</h1>
          <p className="text-gray-600 dark:text-gray-300">Find and book local service providers</p>
        </div>
        <button className="btn-primary mt-4 sm:mt-0 flex items-center">
          <Plus className="h-5 w-5 mr-2" />
          Add Service
        </button>
      </div>
      
      <div className="card">
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Local Services Coming Soon
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Connect with trusted local service providers in your area.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Services 