import React from 'react'
import { Settings, Shield, CreditCard } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

const Profile: React.FC = () => {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Profile</h1>
        <p className="text-gray-600 dark:text-gray-300">Manage your account and preferences</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Info */}
        <div className="lg:col-span-2">
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Account Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={user?.name || ''}
                  className="input-field"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={user?.email || ''}
                  className="input-field"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Pi Network Address
                </label>
                <input
                  type="text"
                  value={user?.piAddress || 'Not connected'}
                  className="input-field"
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>

        {/* Subscription */}
        <div>
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Subscription</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Current Plan</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                  {user?.subscription || 'free'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Status</span>
                <span className="text-sm font-medium text-green-600">Active</span>
              </div>
              <button className="w-full btn-primary">
                Upgrade Plan
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Settings className="h-5 w-5 text-gray-400 mr-3" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">Settings</span>
          </button>
          <button className="flex items-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Shield className="h-5 w-5 text-gray-400 mr-3" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">Privacy</span>
          </button>
          <button className="flex items-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <CreditCard className="h-5 w-5 text-gray-400 mr-3" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">Billing</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile 