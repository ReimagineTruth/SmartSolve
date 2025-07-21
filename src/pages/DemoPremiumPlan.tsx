import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Star, Users, ArrowUp, Check, Building, Crown, MessageCircle, Calendar, Gift } from 'lucide-react'

const DemoPremiumPlan: React.FC = () => {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)

  const familyMembers = [
    { id: 1, name: 'Sarah', role: 'Parent', avatar: 'S', tasks: 3 },
    { id: 2, name: 'Mike', role: 'Parent', avatar: 'M', tasks: 2 },
    { id: 3, name: 'Emma', role: 'Child', avatar: 'E', tasks: 1, rewards: 5 },
    { id: 4, name: 'Liam', role: 'Child', avatar: 'L', tasks: 2, rewards: 3 }
  ]

  const familyTasks = [
    { id: 1, text: 'Family dinner planning', assigned: 'Sarah', completed: false },
    { id: 2, text: 'Grocery shopping', assigned: 'Mike', completed: true },
    { id: 3, text: 'Clean room', assigned: 'Emma', completed: false },
    { id: 4, text: 'Homework', assigned: 'Liam', completed: true }
  ]

  const groceryList = [
    { item: 'Milk', quantity: '2 gallons', category: 'Dairy', checked: true },
    { item: 'Bread', quantity: '2 loaves', category: 'Bakery', checked: true },
    { item: 'Chicken', quantity: '3 lbs', category: 'Meat', checked: false },
    { item: 'Apples', quantity: '1 bag', category: 'Produce', checked: false },
    { item: 'Rice', quantity: '2 lbs', category: 'Pantry', checked: false }
  ]

  const chatMessages = [
    { user: 'Sarah', message: 'Who\'s picking up Emma from soccer?', time: '2:30 PM' },
    { user: 'Mike', message: 'I can do it!', time: '2:32 PM' },
    { user: 'Emma', message: 'Thanks Dad! 🥰', time: '2:33 PM' },
    { user: 'Liam', message: 'Can we get pizza for dinner?', time: '2:35 PM' }
  ]

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
              <span className="text-sm text-secondary font-semibold">Premium Plan</span>
              <button 
                onClick={() => setShowUpgradeModal(true)}
                className="btn btn-primary text-sm"
              >
                <ArrowUp className="h-4 w-4 mr-2" />
                Upgrade to Pro
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text mb-2">Welcome to SmartSolve Premium!</h1>
          <p className="text-gray-600">Perfect for families with shared calendars, kids mode, and group features.</p>
        </div>

        {/* Family Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card text-center">
            <div className="text-2xl font-bold text-secondary mb-2">4</div>
            <div className="text-sm text-gray-600">Family Members</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-secondary mb-2">8</div>
            <div className="text-sm text-gray-600">Shared Tasks</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-secondary mb-2">15</div>
            <div className="text-sm text-gray-600">Grocery Items</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-secondary mb-2">12</div>
            <div className="text-sm text-gray-600">Chat Messages</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Family Calendar */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-text">Family Calendar</h2>
              <Calendar className="h-5 w-5 text-secondary" />
            </div>
            
            <div className="space-y-4">
              {familyMembers.map((member) => (
                <div key={member.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-gradient-to-r from-secondary to-primary rounded-full flex items-center justify-center text-white font-semibold mr-3">
                    {member.avatar}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-text">{member.name}</h3>
                    <p className="text-sm text-gray-600">{member.role}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-secondary">{member.tasks} tasks</div>
                    {member.rewards && (
                      <div className="text-xs text-yellow-600 flex items-center">
                        <Gift className="h-3 w-3 mr-1" />
                        {member.rewards} rewards
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center">
                <Check className="h-5 w-5 text-blue-600 mr-3" />
                <div>
                  <h3 className="font-semibold text-blue-800">Family Sharing</h3>
                  <p className="text-sm text-blue-700">Shared calendar, tasks, and real-time updates</p>
                </div>
              </div>
            </div>
          </div>

          {/* Family Tasks */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-text">Family Tasks</h2>
              <span className="text-sm text-secondary font-semibold">Shared</span>
            </div>
            
            <div className="space-y-3">
              {familyTasks.map((task) => (
                <div key={task.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <button className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                    task.completed 
                      ? 'bg-secondary border-secondary' 
                      : 'border-gray-300'
                  }`}>
                    {task.completed && <Check className="h-3 w-3 text-white" />}
                  </button>
                  <span className={`flex-1 ${task.completed ? 'line-through text-gray-500' : ''}`}>
                    {task.text}
                  </span>
                  <span className="text-xs text-secondary font-medium">{task.assigned}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-600 mr-3" />
                <div>
                  <h3 className="font-semibold text-green-800">Collaborative Tasks</h3>
                  <p className="text-sm text-green-700">Assign and track tasks across family members</p>
                </div>
              </div>
            </div>
          </div>

          {/* Grocery Planner */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-text">Grocery Planner</h2>
              <span className="text-sm text-secondary font-semibold">Smart Lists</span>
            </div>

            <div className="space-y-3">
              {groceryList.map((item, index) => (
                <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <button className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                    item.checked 
                      ? 'bg-secondary border-secondary' 
                      : 'border-gray-300'
                  }`}>
                    {item.checked && <Check className="h-3 w-3 text-white" />}
                  </button>
                  <div className="flex-1">
                    <span className={`font-medium ${item.checked ? 'line-through text-gray-500' : ''}`}>
                      {item.item}
                    </span>
                    <span className="text-sm text-gray-600 ml-2">({item.quantity})</span>
                  </div>
                  <span className="text-xs text-secondary font-medium">{item.category}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-600 mr-3" />
                <div>
                  <h3 className="font-semibold text-green-800">Smart Grocery Lists</h3>
                  <p className="text-sm text-green-700">Organized by category with quantities and prices</p>
                </div>
              </div>
            </div>
          </div>

          {/* Family Chat */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-text">Family Chat</h2>
              <MessageCircle className="h-5 w-5 text-secondary" />
            </div>

            <div className="space-y-3 max-h-64 overflow-y-auto">
              {chatMessages.map((message, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-semibold text-secondary">{message.user}</span>
                    <span className="text-xs text-gray-500">{message.time}</span>
                  </div>
                  <p className="text-sm text-gray-700">{message.message}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <div className="flex items-center">
                <Check className="h-5 w-5 text-purple-600 mr-3" />
                <div>
                  <h3 className="font-semibold text-purple-800">Group Communication</h3>
                  <p className="text-sm text-purple-700">Real-time chat with file sharing and notifications</p>
                </div>
              </div>
            </div>
          </div>

          {/* Kids Mode */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-text">Kids Mode</h2>
              <Gift className="h-5 w-5 text-secondary" />
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-yellow-50 rounded-lg">
                <h3 className="font-semibold text-yellow-800 mb-2">Emma's Progress</h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Tasks Completed</span>
                  <span className="text-sm font-semibold text-secondary">1/2</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div className="bg-secondary h-2 rounded-full" style={{ width: '50%' }}></div>
                </div>
                <div className="mt-3 flex items-center">
                  <Gift className="h-4 w-4 text-yellow-600 mr-2" />
                  <span className="text-sm text-yellow-800">5 rewards earned</span>
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">Liam's Progress</h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Tasks Completed</span>
                  <span className="text-sm font-semibold text-secondary">2/2</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div className="bg-secondary h-2 rounded-full" style={{ width: '100%' }}></div>
                </div>
                <div className="mt-3 flex items-center">
                  <Gift className="h-4 w-4 text-yellow-600 mr-2" />
                  <span className="text-sm text-green-800">3 rewards earned</span>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center">
                <Check className="h-5 w-5 text-yellow-600 mr-3" />
                <div>
                  <h3 className="font-semibold text-yellow-800">Rewards System</h3>
                  <p className="text-sm text-yellow-700">Motivate kids with task completion rewards</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Upgrade CTA */}
        <div className="mt-12 card bg-gradient-to-r from-secondary to-primary text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Ready for Business Features?</h2>
          <p className="text-lg mb-6 opacity-90">
            Upgrade to Pro Plan and get team collaboration, business tools, advanced integrations, and more!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setShowUpgradeModal(true)}
              className="btn bg-white text-secondary hover:bg-gray-100 text-lg px-8 py-4"
            >
              Upgrade to Pro
            </button>
            <Link to="/demo/pro" className="btn bg-transparent border-2 border-white text-white hover:bg-white hover:text-secondary text-lg px-8 py-4">
              See Pro Demo
            </Link>
          </div>
        </div>
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <div className="text-center mb-6">
              <Building className="h-12 w-12 text-lifetime-text mx-auto mb-4" />
              <h3 className="text-xl font-bold text-text mb-2">Upgrade to Pro</h3>
              <p className="text-gray-600">Advanced features for businesses</p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3" />
                <span className="text-sm">All Premium features</span>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3" />
                <span className="text-sm">Team collaboration tools</span>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3" />
                <span className="text-sm">Business tools (Marketing + Income)</span>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3" />
                <span className="text-sm">TruthWeb & Cloudy integrations</span>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3" />
                <span className="text-sm">Virtual assistant booking</span>
              </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => setShowUpgradeModal(false)}
                className="btn btn-secondary flex-1"
              >
                Maybe Later
              </button>
              <Link to="/pricing" className="btn btn-primary flex-1">
                View Plans
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DemoPremiumPlan 