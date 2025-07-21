import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Star, Zap, ArrowUp, Check, Users, Building, Crown } from 'lucide-react'

const DemoStandardPlan: React.FC = () => {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)

  const tasks = [
    { id: 1, text: 'Buy groceries', completed: true, priority: 'high' },
    { id: 2, text: 'Call dentist', completed: false, priority: 'medium' },
    { id: 3, text: 'Pay electricity bill', completed: false, priority: 'high' },
    { id: 4, text: 'Schedule car service', completed: false, priority: 'low' },
    { id: 5, text: 'Plan weekend trip', completed: false, priority: 'medium' },
    { id: 6, text: 'Review budget', completed: true, priority: 'high' },
    { id: 7, text: 'Update resume', completed: false, priority: 'medium' },
    { id: 8, text: 'Book flight tickets', completed: false, priority: 'high' }
  ]

  const budgetData = {
    income: 3500,
    expenses: 2200,
    savings: 1300,
    categories: [
      { name: 'Housing', amount: 1000, color: 'bg-blue-500', trend: 'up' },
      { name: 'Food', amount: 500, color: 'bg-green-500', trend: 'down' },
      { name: 'Transport', amount: 300, color: 'bg-yellow-500', trend: 'stable' },
      { name: 'Entertainment', amount: 200, color: 'bg-purple-500', trend: 'up' },
      { name: 'Utilities', amount: 150, color: 'bg-red-500', trend: 'down' },
      { name: 'Healthcare', amount: 50, color: 'bg-indigo-500', trend: 'stable' }
    ]
  }

  const meals = [
    { day: 'Monday', meal: 'Chicken Stir Fry', cost: 12, ingredients: ['Chicken', 'Vegetables', 'Soy Sauce'] },
    { day: 'Tuesday', meal: 'Pasta Carbonara', cost: 8, ingredients: ['Pasta', 'Eggs', 'Bacon', 'Cheese'] },
    { day: 'Wednesday', meal: 'Grilled Salmon', cost: 15, ingredients: ['Salmon', 'Lemon', 'Herbs'] },
    { day: 'Thursday', meal: 'Beef Tacos', cost: 10, ingredients: ['Ground Beef', 'Tortillas', 'Lettuce', 'Tomatoes'] },
    { day: 'Friday', meal: 'Vegetarian Curry', cost: 9, ingredients: ['Chickpeas', 'Coconut Milk', 'Rice'] }
  ]

  const moodData = {
    currentMood: 'Happy',
    moodScore: 8,
    weeklyTrend: [6, 7, 8, 7, 9, 8, 8],
    suggestions: [
      'Take a 10-minute walk outside',
      'Practice deep breathing exercises',
      'Listen to your favorite music',
      'Connect with a friend or family member'
    ]
  }

  const localServices = [
    { id: 1, title: 'House Cleaning', price: '50 Pi', location: 'Downtown', rating: 4.8 },
    { id: 2, title: 'Tutoring Services', price: '30 Pi/hour', location: 'University Area', rating: 4.9 },
    { id: 3, title: 'Pet Sitting', price: '25 Pi/day', location: 'Suburbs', rating: 4.7 }
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
              <span className="text-sm text-primary font-semibold">Standard Plan</span>
              <button 
                onClick={() => setShowUpgradeModal(true)}
                className="btn btn-primary text-sm"
              >
                <ArrowUp className="h-4 w-4 mr-2" />
                Upgrade to Premium
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text mb-2">Welcome to SmartSolve Standard!</h1>
          <p className="text-gray-600">You have access to unlimited tasks, advanced budget tools, and AI-powered features.</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card text-center">
            <div className="text-2xl font-bold text-primary mb-2">8</div>
            <div className="text-sm text-gray-600">Active Tasks</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-primary mb-2">5</div>
            <div className="text-sm text-gray-600">Meals Planned</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-primary mb-2">$1,300</div>
            <div className="text-sm text-gray-600">Monthly Savings</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-primary mb-2">8/10</div>
            <div className="text-sm text-gray-600">Mood Score</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Tasks Section */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-text">Today's Tasks</h2>
              <span className="text-sm text-green-600 font-semibold">Unlimited</span>
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
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    task.priority === 'high' ? 'bg-red-100 text-red-800' :
                    task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {task.priority}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-600 mr-3" />
                <div>
                  <h3 className="font-semibold text-green-800">Unlimited Tasks</h3>
                  <p className="text-sm text-green-700">Create as many tasks as you need with priority levels</p>
                </div>
              </div>
            </div>
          </div>

          {/* Budget Section */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-text">Advanced Budget</h2>
              <span className="text-sm text-primary font-semibold">AI Insights</span>
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
                  <div className="flex items-center">
                    <span className="text-sm font-semibold mr-2">${category.amount}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      category.trend === 'up' ? 'bg-red-100 text-red-800' :
                      category.trend === 'down' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {category.trend}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center">
                <Check className="h-5 w-5 text-blue-600 mr-3" />
                <div>
                  <h3 className="font-semibold text-blue-800">Smart Insights</h3>
                  <p className="text-sm text-blue-700">AI-powered spending analysis and savings recommendations</p>
                </div>
              </div>
            </div>
          </div>

          {/* Meals Section */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-text">Full Meal Planner</h2>
              <span className="text-sm text-primary font-semibold">Unlimited</span>
            </div>

            <div className="space-y-4">
              {meals.map((meal, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-text">{meal.day}</h3>
                    <span className="text-sm text-green-600">${meal.cost}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{meal.meal}</p>
                  <div className="flex flex-wrap gap-1">
                    {meal.ingredients.map((ingredient, idx) => (
                      <span key={idx} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-600 mr-3" />
                <div>
                  <h3 className="font-semibold text-green-800">Complete Meal Planning</h3>
                  <p className="text-sm text-green-700">Get ingredient lists, cost estimates, and nutritional info</p>
                </div>
              </div>
            </div>
          </div>

          {/* AI Mood Assistant */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-text">AI Mood Assistant</h2>
              <span className="text-sm text-primary font-semibold">Active</span>
            </div>

            <div className="p-6 bg-gradient-to-r from-primary to-secondary rounded-lg text-white text-center mb-6">
              <div className="text-4xl mb-2">😊</div>
              <h3 className="text-xl font-semibold mb-2">{moodData.currentMood}</h3>
              <div className="flex justify-center items-center space-x-1">
                {moodData.weeklyTrend.map((score, index) => (
                  <div 
                    key={index}
                    className="w-8 h-8 bg-white/20 rounded flex items-center justify-center text-sm font-semibold"
                  >
                    {score}
                  </div>
                ))}
              </div>
              <p className="text-sm opacity-90 mt-2">Weekly Mood Trend</p>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-text">Today's Suggestions:</h4>
              {moodData.suggestions.map((suggestion, index) => (
                <div key={index} className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span className="text-sm text-gray-600">{suggestion}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <div className="flex items-center">
                <Check className="h-5 w-5 text-purple-600 mr-3" />
                <div>
                  <h3 className="font-semibold text-purple-800">Personalized Wellness</h3>
                  <p className="text-sm text-purple-700">AI-powered mood tracking and wellness recommendations</p>
                </div>
              </div>
            </div>
          </div>

          {/* Local Services */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-text">Local Services</h2>
              <span className="text-sm text-primary font-semibold">Pi Network</span>
            </div>

            <div className="space-y-4">
              {localServices.map((service) => (
                <div key={service.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-text">{service.title}</h3>
                    <span className="text-sm text-green-600">{service.price}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{service.location}</span>
                    <div className="flex items-center">
                      <span className="text-yellow-500 mr-1">★</span>
                      <span className="text-sm text-gray-600">{service.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-center">
                <Check className="h-5 w-5 text-orange-600 mr-3" />
                <div>
                  <h3 className="font-semibold text-orange-800">Pi Network Integration</h3>
                  <p className="text-sm text-orange-700">Browse and book local services using Pi currency</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Upgrade CTA */}
        <div className="mt-12 card bg-gradient-to-r from-secondary to-primary text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Ready for Family Features?</h2>
          <p className="text-lg mb-6 opacity-90">
            Upgrade to Premium Plan and get family calendar sharing, kids mode, group chat, and more!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setShowUpgradeModal(true)}
              className="btn bg-white text-secondary hover:bg-gray-100 text-lg px-8 py-4"
            >
              Upgrade to Premium
            </button>
            <Link to="/demo/premium" className="btn bg-transparent border-2 border-white text-white hover:bg-white hover:text-secondary text-lg px-8 py-4">
              See Premium Demo
            </Link>
          </div>
        </div>
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <div className="text-center mb-6">
              <Users className="h-12 w-12 text-secondary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-text mb-2">Upgrade to Premium</h3>
              <p className="text-gray-600">Perfect for families and small groups</p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3" />
                <span className="text-sm">All Standard features</span>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3" />
                <span className="text-sm">Family calendar & sharing</span>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3" />
                <span className="text-sm">Kids mode with rewards</span>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3" />
                <span className="text-sm">Group chat & file sharing</span>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3" />
                <span className="text-sm">Full grocery planner</span>
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

export default DemoStandardPlan 