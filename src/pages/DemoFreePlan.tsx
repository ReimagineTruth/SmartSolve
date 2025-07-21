import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Star, Lock, ArrowUp, Check, X, ArrowLeft } from 'lucide-react'

const DemoFreePlan: React.FC = () => {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)

  const tasks = [
    { id: 1, text: 'Buy groceries', completed: true },
    { id: 2, text: 'Call dentist', completed: false },
    { id: 3, text: 'Pay electricity bill', completed: false },
    { id: 4, text: 'Schedule car service', completed: false },
    { id: 5, text: 'Plan weekend trip', completed: false }
  ]

  const budgetData = {
    income: 2500,
    expenses: 1800,
    savings: 700,
    categories: [
      { name: 'Housing', amount: 800, color: 'bg-blue-500' },
      { name: 'Food', amount: 400, color: 'bg-green-500' },
      { name: 'Transport', amount: 300, color: 'bg-yellow-500' },
      { name: 'Entertainment', amount: 200, color: 'bg-purple-500' },
      { name: 'Utilities', amount: 100, color: 'bg-red-500' }
    ]
  }

  const meals = [
    { day: 'Monday', meal: 'Chicken Stir Fry', cost: 12 },
    { day: 'Tuesday', meal: 'Pasta Carbonara', cost: 8 },
    { day: 'Wednesday', meal: 'Grilled Salmon', cost: 15 }
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
              <span className="text-sm text-gray-600">Free Plan</span>
              <button 
                onClick={() => setShowUpgradeModal(true)}
                className="btn btn-primary text-sm"
              >
                <ArrowUp className="h-4 w-4 mr-2" />
                Upgrade
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text mb-2">Welcome to SmartSolve!</h1>
          <p className="text-gray-600">You're using the Free Plan. Upgrade to unlock unlimited features.</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card text-center">
            <div className="text-2xl font-bold text-primary mb-2">5/5</div>
            <div className="text-sm text-gray-600">Tasks Used</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-primary mb-2">2/2</div>
            <div className="text-sm text-gray-600">Meals Today</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-primary mb-2">$1,800</div>
            <div className="text-sm text-gray-600">Monthly Expenses</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-primary mb-2">85%</div>
            <div className="text-sm text-gray-600">Budget Used</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Tasks Section */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-text">Today's Tasks</h2>
              <div className="flex items-center text-sm text-gray-600">
                <span className="mr-2">1/5 completed</span>
                <Lock className="h-4 w-4" />
              </div>
            </div>
            
            <div className="space-y-3">
              {tasks.map((task) => (
                <div key={task.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <button className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                    task.completed 
                      ? 'bg-primary border-primary' 
                      : 'border-gray-300'
                  }`}>
                    {task.completed && <Check className="h-3 w-3 text-white" />}
                  </button>
                  <span className={`flex-1 ${task.completed ? 'line-through text-gray-500' : ''}`}>
                    {task.text}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center">
                <Lock className="h-5 w-5 text-yellow-600 mr-3" />
                <div>
                  <h3 className="font-semibold text-yellow-800">Task Limit Reached</h3>
                  <p className="text-sm text-yellow-700">Upgrade to Standard Plan for unlimited tasks</p>
                </div>
              </div>
              <button 
                onClick={() => setShowUpgradeModal(true)}
                className="btn btn-primary mt-3 w-full"
              >
                Upgrade to Standard
              </button>
            </div>
          </div>

          {/* Budget Section */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-text">Budget Overview</h2>
              <span className="text-sm text-gray-600">Basic Tracking</span>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Monthly Budget</span>
                <span className="text-sm font-semibold">${budgetData.income}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full" 
                  style={{ width: `${(budgetData.expenses / budgetData.income) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm mt-2">
                <span className="text-gray-600">Spent: ${budgetData.expenses}</span>
                <span className="text-green-600">Saved: ${budgetData.savings}</span>
              </div>
            </div>

            <div className="space-y-3">
              {budgetData.categories.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full ${category.color} mr-3`}></div>
                    <span className="text-sm text-gray-600">{category.name}</span>
                  </div>
                  <span className="text-sm font-semibold">${category.amount}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center">
                <Lock className="h-5 w-5 text-blue-600 mr-3" />
                <div>
                  <h3 className="font-semibold text-blue-800">Advanced Budget Tools</h3>
                  <p className="text-sm text-blue-700">Get detailed analytics and smart insights</p>
                </div>
              </div>
              <button 
                onClick={() => setShowUpgradeModal(true)}
                className="btn btn-primary mt-3 w-full"
              >
                Upgrade to Standard
              </button>
            </div>
          </div>

          {/* Meals Section */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-text">Meal Suggestions</h2>
              <span className="text-sm text-gray-600">2/2 used today</span>
            </div>

            <div className="space-y-4">
              {meals.map((meal, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-text">{meal.day}</h3>
                    <span className="text-sm text-green-600">${meal.cost}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{meal.meal}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center">
                <Lock className="h-5 w-5 text-green-600 mr-3" />
                <div>
                  <h3 className="font-semibold text-green-800">Full Meal Planner</h3>
                  <p className="text-sm text-green-700">Get unlimited meal suggestions and grocery lists</p>
                </div>
              </div>
              <button 
                onClick={() => setShowUpgradeModal(true)}
                className="btn btn-primary mt-3 w-full"
              >
                Upgrade to Standard
              </button>
            </div>
          </div>

          {/* Wellness Section */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-text">Daily Quote</h2>
              <span className="text-sm text-gray-600">Free Only</span>
            </div>

            <div className="p-6 bg-gradient-to-r from-primary to-secondary rounded-lg text-white text-center">
              <p className="text-lg italic mb-4">
                "The only way to do great work is to love what you do."
              </p>
              <p className="text-sm opacity-90">- Steve Jobs</p>
            </div>

            <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <div className="flex items-center">
                <Lock className="h-5 w-5 text-purple-600 mr-3" />
                <div>
                  <h3 className="font-semibold text-purple-800">AI Mood Assistant</h3>
                  <p className="text-sm text-purple-700">Get personalized wellness tips and mood tracking</p>
                </div>
              </div>
              <button 
                onClick={() => setShowUpgradeModal(true)}
                className="btn btn-primary mt-3 w-full"
              >
                Upgrade to Standard
              </button>
            </div>
          </div>
        </div>

        {/* Upgrade CTA */}
        <div className="mt-12 card bg-gradient-to-r from-primary to-secondary text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Unlock More?</h2>
          <p className="text-lg mb-6 opacity-90">
            Upgrade to Standard Plan and get unlimited tasks, advanced budget tools, full meal planner, and more!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setShowUpgradeModal(true)}
              className="btn bg-white text-primary hover:bg-gray-100 text-lg px-8 py-4"
            >
              Upgrade to Standard
            </button>
            <Link to="/demo/standard" className="btn bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-4">
              See Standard Demo
            </Link>
          </div>
        </div>
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <div className="text-center mb-6">
              <Lock className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-text mb-2">Upgrade Your Plan</h3>
              <p className="text-gray-600">Unlock unlimited features and remove restrictions</p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3" />
                <span className="text-sm">Unlimited tasks & planning</span>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3" />
                <span className="text-sm">Advanced budget tools</span>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3" />
                <span className="text-sm">Full meal planner</span>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3" />
                <span className="text-sm">AI mood assistant</span>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3" />
                <span className="text-sm">Ad-free experience</span>
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

export default DemoFreePlan 