import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Star, Building, ArrowUp, Check, Crown, Users, BarChart3, Zap, Globe, Bot } from 'lucide-react'
import Footer from '../components/Footer'

const DemoProPlan: React.FC = () => {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)

  const teamMembers = [
    { id: 1, name: 'Alex Johnson', role: 'Project Manager', avatar: 'AJ', tasks: 8, status: 'online' },
    { id: 2, name: 'Sarah Chen', role: 'Developer', avatar: 'SC', tasks: 12, status: 'online' },
    { id: 3, name: 'Mike Rodriguez', role: 'Designer', avatar: 'MR', tasks: 6, status: 'away' },
    { id: 4, name: 'Emma Wilson', role: 'Marketing', avatar: 'EW', tasks: 10, status: 'online' }
  ]

  const businessMetrics = {
    income: 12500,
    expenses: 8200,
    profit: 4300,
    growth: '+15%',
    categories: [
      { name: 'Product Sales', amount: 8000, color: 'bg-green-500' },
      { name: 'Services', amount: 3000, color: 'bg-blue-500' },
      { name: 'Consulting', amount: 1500, color: 'bg-purple-500' }
    ]
  }

  const marketingCampaigns = [
    { name: 'Q4 Social Media', budget: 2000, spent: 1800, roi: 320, status: 'active' },
    { name: 'Email Newsletter', budget: 500, spent: 450, roi: 1200, status: 'completed' },
    { name: 'Google Ads', budget: 1500, spent: 1200, roi: 2100, status: 'active' }
  ]

  const integrations = [
    { name: 'TruthWeb', status: 'connected', lastSync: '2 hours ago' },
    { name: 'Cloudy Storage', status: 'connected', lastSync: '1 hour ago' },
    { name: 'Pi Network', status: 'connected', lastSync: '5 minutes ago' }
  ]

  const virtualAssistant = {
    status: 'available',
    recentTasks: [
      'Scheduled team meeting for tomorrow',
      'Updated project timeline',
      'Sent follow-up emails to clients',
      'Created monthly report'
    ]
  }

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
            <div className="flex items-center space-x-4">
              <span className="text-sm text-lifetime-text font-semibold">Pro Plan</span>
              <button 
                onClick={() => setShowUpgradeModal(true)}
                className="btn btn-lifetime text-sm"
              >
                <ArrowUp className="h-4 w-4 mr-2" />
                Get Lifetime Access
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text mb-2">Welcome to SmartSolve Pro!</h1>
          <p className="text-gray-600">Advanced business tools with team collaboration, analytics, and AI-powered features.</p>
        </div>

        {/* Business Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card text-center">
            <div className="text-2xl font-bold text-lifetime-text mb-2">$12,500</div>
            <div className="text-sm text-gray-600">Monthly Revenue</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-lifetime-text mb-2">$4,300</div>
            <div className="text-sm text-gray-600">Net Profit</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-lifetime-text mb-2">4</div>
            <div className="text-sm text-gray-600">Team Members</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-lifetime-text mb-2">+15%</div>
            <div className="text-sm text-gray-600">Growth Rate</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Team Collaboration */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-text">Team Collaboration</h2>
              <Users className="h-5 w-5 text-lifetime-text" />
            </div>
            
            <div className="space-y-4">
              {teamMembers.map((member) => (
                <div key={member.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-r from-lifetime-text to-lifetime-bg rounded-full flex items-center justify-center text-white font-semibold mr-3">
                      {member.avatar}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                      member.status === 'online' ? 'bg-green-500' : 'bg-yellow-500'
                    }`}></div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-text">{member.name}</h3>
                    <p className="text-sm text-gray-600">{member.role}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-lifetime-text">{member.tasks} tasks</div>
                    <div className="text-xs text-gray-500 capitalize">{member.status}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center">
                <Check className="h-5 w-5 text-blue-600 mr-3" />
                <div>
                  <h3 className="font-semibold text-blue-800">Real-time Collaboration</h3>
                  <p className="text-sm text-blue-700">Live status updates, task assignments, and team communication</p>
                </div>
              </div>
            </div>
          </div>

          {/* Business Analytics */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-text">Business Analytics</h2>
              <BarChart3 className="h-5 w-5 text-lifetime-text" />
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Monthly Revenue</span>
                <span className="text-sm font-semibold">${businessMetrics.income.toLocaleString()}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-lifetime-text h-2 rounded-full" 
                  style={{ width: `${(businessMetrics.profit / businessMetrics.income) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm mt-2">
                <span className="text-gray-600">Expenses: ${businessMetrics.expenses.toLocaleString()}</span>
                <span className="text-green-600">Profit: ${businessMetrics.profit.toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-3">
              {businessMetrics.categories.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full ${category.color} mr-3`}></div>
                    <span className="text-sm text-gray-600">{category.name}</span>
                  </div>
                  <span className="text-sm font-semibold">${category.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-600 mr-3" />
                <div>
                  <h3 className="font-semibold text-green-800">Advanced Analytics</h3>
                  <p className="text-sm text-green-700">Detailed revenue tracking and business insights</p>
                </div>
              </div>
            </div>
          </div>

          {/* Marketing Tools */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-text">Marketing Campaigns</h2>
              <Zap className="h-5 w-5 text-lifetime-text" />
            </div>

            <div className="space-y-4">
              {marketingCampaigns.map((campaign, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-text">{campaign.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      campaign.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {campaign.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Budget:</span>
                      <span className="font-semibold ml-1">${campaign.budget}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Spent:</span>
                      <span className="font-semibold ml-1">${campaign.spent}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">ROI:</span>
                      <span className="font-semibold text-green-600 ml-1">${campaign.roi}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <div className="flex items-center">
                <Check className="h-5 w-5 text-purple-600 mr-3" />
                <div>
                  <h3 className="font-semibold text-purple-800">Marketing Automation</h3>
                  <p className="text-sm text-purple-700">Track campaigns, ROI, and performance metrics</p>
                </div>
              </div>
            </div>
          </div>

          {/* Integrations */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-text">Integrations</h2>
              <Globe className="h-5 w-5 text-lifetime-text" />
            </div>

            <div className="space-y-3">
              {integrations.map((integration, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full ${
                      integration.status === 'connected' ? 'bg-green-500' : 'bg-red-500'
                    } mr-3`}></div>
                    <span className="font-semibold text-text">{integration.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-green-600 capitalize">{integration.status}</div>
                    <div className="text-xs text-gray-500">{integration.lastSync}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-center">
                <Check className="h-5 w-5 text-orange-600 mr-3" />
                <div>
                  <h3 className="font-semibold text-orange-800">Seamless Integrations</h3>
                  <p className="text-sm text-orange-700">Connect with TruthWeb, Cloudy, and Pi Network</p>
                </div>
              </div>
            </div>
          </div>

          {/* Virtual Assistant */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-text">Virtual Assistant</h2>
              <Bot className="h-5 w-5 text-lifetime-text" />
            </div>

            <div className="p-4 bg-gradient-to-r from-lifetime-text to-lifetime-bg rounded-lg text-white mb-6">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
                  <Bot className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-semibold">SmartSolve AI</h3>
                  <p className="text-sm opacity-90">{virtualAssistant.status}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-text">Recent Tasks:</h4>
              {virtualAssistant.recentTasks.map((task, index) => (
                <div key={index} className="flex items-start">
                  <span className="text-lifetime-text mr-2">•</span>
                  <span className="text-sm text-gray-600">{task}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
              <div className="flex items-center">
                <Check className="h-5 w-5 text-indigo-600 mr-3" />
                <div>
                  <h3 className="font-semibold text-indigo-800">AI-Powered Assistant</h3>
                  <p className="text-sm text-indigo-700">Automate tasks, schedule meetings, and manage communications</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Upgrade CTA */}
        <div className="mt-12 card bg-gradient-to-r from-lifetime-text to-lifetime-bg text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Get Lifetime Access!</h2>
          <p className="text-lg mb-6 opacity-90">
            Pay once and unlock everything forever. No monthly fees, priority support, and exclusive features.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setShowUpgradeModal(true)}
              className="btn bg-white text-lifetime-text hover:bg-gray-100 text-lg px-8 py-4"
            >
              Get Lifetime Access
            </button>
            <Link to="/pricing" className="btn bg-transparent border-2 border-white text-white hover:bg-white hover:text-lifetime-text text-lg px-8 py-4">
              View All Plans
            </Link>
          </div>
        </div>
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <div className="text-center mb-6">
              <Crown className="h-12 w-12 text-lifetime-text mx-auto mb-4" />
              <h3 className="text-xl font-bold text-text mb-2">Lifetime Plan</h3>
              <p className="text-gray-600">Pay once, unlock everything forever!</p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3" />
                <span className="text-sm">All Pro Plan features</span>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3" />
                <span className="text-sm">Lifetime access - No monthly fees</span>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3" />
                <span className="text-sm">Priority support</span>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3" />
                <span className="text-sm">Early access to new features</span>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3" />
                <span className="text-sm">Exclusive lifetime badge</span>
              </div>
            </div>

            <div className="text-center mb-6">
              <div className="text-3xl font-bold text-lifetime-text">99 Pi</div>
              <div className="text-sm text-gray-600">One-time payment</div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => setShowUpgradeModal(false)}
                className="btn btn-secondary flex-1"
              >
                Maybe Later
              </button>
              <Link to="/pricing" className="btn btn-lifetime flex-1">
                Get Lifetime Access
              </Link>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  )
}

export default DemoProPlan 