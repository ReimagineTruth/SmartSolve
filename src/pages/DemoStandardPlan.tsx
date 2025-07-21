import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Star, ArrowUp, Check, X, Plus, Trash2, Edit, Calendar, DollarSign, Utensils, Heart, Brain, TrendingUp, Target, Zap } from 'lucide-react'
import localStorageService, { Task, BudgetItem, Meal, WellnessData } from '../lib/localStorage'

const DemoStandardPlan: React.FC = () => {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [tasks, setTasks] = useState<Task[]>([])
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([])
  const [meals, setMeals] = useState<Meal[]>([])
  const [wellnessData, setWellnessData] = useState<WellnessData[]>([])
  const [newTask, setNewTask] = useState('')
  const [newBudgetItem, setNewBudgetItem] = useState({ name: '', amount: 0, type: 'expense' as const, category: '' })
  const [newMeal, setNewMeal] = useState({ name: '', ingredients: '', instructions: '', prepTime: 0, cookTime: 0, servings: 1, cost: 0, category: 'dinner' as const })
  const [moodRating, setMoodRating] = useState(5)
  const [aiMoodAdvice, setAiMoodAdvice] = useState('')
  const [editingTask, setEditingTask] = useState<string | null>(null)
  const [editingBudget, setEditingBudget] = useState<string | null>(null)

  // Load data on component mount
  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    const storedTasks = localStorageService.getTasks()
    const storedBudget = localStorageService.getBudgetItems()
    const storedMeals = localStorageService.getMeals()
    const storedWellness = localStorageService.getWellnessData()

    setTasks(storedTasks) // Unlimited tasks for Standard plan
    setBudgetItems(storedBudget)
    setMeals(storedMeals)
    setWellnessData(storedWellness)
  }

  // Task management functions
  const addTask = () => {
    if (newTask.trim()) {
      const task: Omit<Task, 'id' | 'createdAt'> = {
        text: newTask.trim(),
        completed: false,
        priority: 'medium',
        category: 'personal'
      }
      localStorageService.addTask(task)
      setNewTask('')
      loadData()
    }
  }

  const toggleTask = (id: string) => {
    const task = tasks.find(t => t.id === id)
    if (task) {
      localStorageService.updateTask(id, { completed: !task.completed })
      loadData()
    }
  }

  const deleteTask = (id: string) => {
    localStorageService.deleteTask(id)
    loadData()
  }

  const updateTask = (id: string, text: string) => {
    localStorageService.updateTask(id, { text })
    setEditingTask(null)
    loadData()
  }

  // Budget management functions
  const addBudgetItem = () => {
    if (newBudgetItem.name && newBudgetItem.amount > 0) {
      const item: Omit<BudgetItem, 'id'> = {
        name: newBudgetItem.name,
        amount: newBudgetItem.amount,
        type: newBudgetItem.type,
        category: newBudgetItem.category || 'Other',
        date: new Date()
      }
      localStorageService.addBudgetItem(item)
      setNewBudgetItem({ name: '', amount: 0, type: 'expense', category: '' })
      loadData()
    }
  }

  const deleteBudgetItem = (id: string) => {
    localStorageService.deleteBudgetItem(id)
    loadData()
  }

  // Meal management functions
  const addMeal = () => {
    if (newMeal.name && newMeal.ingredients) {
      const meal: Omit<Meal, 'id'> = {
        name: newMeal.name,
        ingredients: newMeal.ingredients.split(',').map(i => i.trim()),
        instructions: newMeal.instructions.split(',').map(i => i.trim()),
        prepTime: newMeal.prepTime,
        cookTime: newMeal.cookTime,
        servings: newMeal.servings,
        cost: newMeal.cost,
        category: newMeal.category,
        isFavorite: false
      }
      localStorageService.addMeal(meal)
      setNewMeal({ name: '', ingredients: '', instructions: '', prepTime: 0, cookTime: 0, servings: 1, cost: 0, category: 'dinner' })
      loadData()
    }
  }

  const deleteMeal = (id: string) => {
    localStorageService.deleteMeal(id)
    loadData()
  }

  // AI Mood Assistant
  const generateMoodAdvice = () => {
    const advice = [
      "Take a 10-minute walk outside to boost your mood and energy levels.",
      "Practice deep breathing exercises for 5 minutes to reduce stress.",
      "Listen to your favorite music while organizing your workspace.",
      "Try a new hobby or activity you've been curious about.",
      "Connect with a friend or family member for a quick chat.",
      "Write down three things you're grateful for today.",
      "Do some light stretching or yoga to improve your mood.",
      "Plan something fun for the weekend to look forward to."
    ]
    const randomAdvice = advice[Math.floor(Math.random() * advice.length)]
    setAiMoodAdvice(randomAdvice)
  }

  // Wellness tracking
  const addWellnessEntry = () => {
    const entry: Omit<WellnessData, 'date'> = {
      mood: moodRating,
      sleep: 7, // Default values
      water: 8,
      exercise: 30
    }
    localStorageService.addWellnessEntry(entry)
    loadData()
  }

  // Get statistics
  const budgetStats = localStorageService.getBudgetStats()
  const taskStats = localStorageService.getTaskStats()

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
              <span className="text-sm text-secondary font-semibold">Standard Plan</span>
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
          <p className="text-gray-600">Unlimited tasks, advanced budget tools, and AI-powered features.</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card text-center">
            <div className="text-2xl font-bold text-primary mb-2">{tasks.length}</div>
            <div className="text-sm text-gray-600">Total Tasks</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-primary mb-2">{meals.length}</div>
            <div className="text-sm text-gray-600">Meal Plans</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-primary mb-2">${budgetStats.expenses.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Monthly Expenses</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-primary mb-2">{taskStats.completionRate}%</div>
            <div className="text-sm text-gray-600">Completion Rate</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Tasks Section */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-text">Unlimited Tasks</h2>
              <Zap className="h-5 w-5 text-secondary" />
            </div>
            
            {/* Add new task */}
            <div className="mb-4 flex gap-2">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTask()}
                placeholder="Add a new task..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                onClick={addTask}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {tasks.slice(0, 10).map((task) => (
                <div key={task.id} className="flex items-center p-3 bg-gray-50 rounded-lg group">
                  <button 
                    onClick={() => toggleTask(task.id)}
                    className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center transition-colors ${
                      task.completed 
                        ? 'bg-primary border-primary' 
                        : 'border-gray-300 hover:border-primary'
                    }`}
                  >
                    {task.completed && <Check className="h-3 w-3 text-white" />}
                  </button>
                  
                  {editingTask === task.id ? (
                    <input
                      type="text"
                      defaultValue={task.text}
                      onBlur={(e) => updateTask(task.id, e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && updateTask(task.id, e.currentTarget.value)}
                      className="flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                      autoFocus
                    />
                  ) : (
                    <span className={`flex-1 ${task.completed ? 'line-through text-gray-500' : ''}`}>
                      {task.text}
                    </span>
                  )}
                  
                  <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => setEditingTask(editingTask === task.id ? null : task.id)}
                      className="p-1 text-gray-500 hover:text-primary"
                    >
                      <Edit className="h-3 w-3" />
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="p-1 text-gray-500 hover:text-red-500"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Budget Section */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-text">Advanced Budget</h2>
              <TrendingUp className="h-5 w-5 text-secondary" />
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Monthly Budget</span>
                <span className="text-sm font-semibold">${budgetStats.income}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full" 
                  style={{ width: `${budgetStats.income > 0 ? (budgetStats.expenses / budgetStats.income) * 100 : 0}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm mt-2">
                <span className="text-gray-600">Spent: ${budgetStats.expenses}</span>
                <span className="text-green-600">Saved: ${budgetStats.savings}</span>
              </div>
            </div>

            {/* Add budget item */}
            <div className="mb-4 space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newBudgetItem.name}
                  onChange={(e) => setNewBudgetItem({...newBudgetItem, name: e.target.value})}
                  placeholder="Item name..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="number"
                  value={newBudgetItem.amount}
                  onChange={(e) => setNewBudgetItem({...newBudgetItem, amount: parseFloat(e.target.value) || 0})}
                  placeholder="Amount"
                  className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={newBudgetItem.type}
                  onChange={(e) => setNewBudgetItem({...newBudgetItem, type: e.target.value as 'income' | 'expense'})}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
                <select
                  value={newBudgetItem.category}
                  onChange={(e) => setNewBudgetItem({...newBudgetItem, category: e.target.value})}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Category</option>
                  <option value="Housing">Housing</option>
                  <option value="Food">Food</option>
                  <option value="Transport">Transport</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Other">Other</option>
                </select>
                <button
                  onClick={addBudgetItem}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="space-y-3 max-h-48 overflow-y-auto">
              {budgetItems.slice(0, 8).map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg group">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-3 ${
                      item.type === 'income' ? 'bg-green-500' : 'bg-red-500'
                    }`}></div>
                    <div>
                      <span className="text-sm font-medium">{item.name}</span>
                      <span className="text-xs text-gray-500 ml-2">{item.category}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm font-semibold ${
                      item.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {item.type === 'income' ? '+' : '-'}${item.amount}
                    </span>
                    <button
                      onClick={() => deleteBudgetItem(item.id)}
                      className="p-1 text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Meal Planner */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-text">Meal Planner</h2>
              <Utensils className="h-5 w-5 text-secondary" />
            </div>

            {/* Add new meal */}
            <div className="mb-4 space-y-2">
              <input
                type="text"
                value={newMeal.name}
                onChange={(e) => setNewMeal({...newMeal, name: e.target.value})}
                placeholder="Meal name..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMeal.ingredients}
                  onChange={(e) => setNewMeal({...newMeal, ingredients: e.target.value})}
                  placeholder="Ingredients (comma separated)"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="number"
                  value={newMeal.cost}
                  onChange={(e) => setNewMeal({...newMeal, cost: parseFloat(e.target.value) || 0})}
                  placeholder="Cost"
                  className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={newMeal.category}
                  onChange={(e) => setNewMeal({...newMeal, category: e.target.value as any})}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                  <option value="snack">Snack</option>
                </select>
                <button
                  onClick={addMeal}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="space-y-3 max-h-48 overflow-y-auto">
              {meals.slice(0, 6).map((meal) => (
                <div key={meal.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{meal.name}</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">${meal.cost}</span>
                      <button
                        onClick={() => deleteMeal(meal.id)}
                        className="p-1 text-gray-500 hover:text-red-500"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    <span className="capitalize">{meal.category}</span> • {meal.ingredients.length} ingredients
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Mood Assistant */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-text">AI Mood Assistant</h2>
              <Brain className="h-5 w-5 text-secondary" />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">How are you feeling today?</label>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">😢</span>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={moodRating}
                  onChange={(e) => setMoodRating(parseInt(e.target.value))}
                  className="flex-1 mx-4"
                />
                <span className="text-sm text-gray-600">😊</span>
              </div>
              <div className="text-center mt-2">
                <span className="text-lg font-semibold text-primary">{moodRating}/10</span>
              </div>
            </div>

            <button
              onClick={generateMoodAdvice}
              className="w-full mb-4 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-primary transition-colors"
            >
              Get AI Advice
            </button>

            {aiMoodAdvice && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center mb-2">
                  <Brain className="h-4 w-4 text-blue-600 mr-2" />
                  <span className="text-sm font-medium text-blue-800">AI Suggestion</span>
                </div>
                <p className="text-sm text-blue-700">{aiMoodAdvice}</p>
              </div>
            )}

            <button
              onClick={addWellnessEntry}
              className="w-full mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors"
            >
              Track Today's Mood
            </button>
          </div>
        </div>

        {/* Upgrade Modal */}
        {showUpgradeModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 max-w-md w-11/12">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-text mb-2">Upgrade to Premium</h3>
                <p className="text-gray-600">Unlock family features, kids mode, and group collaboration!</p>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span>Family Calendar & Task Sharing</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span>Kids Mode with Rewards</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span>Group Chat & File Sharing</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span>Full Grocery Planner</span>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowUpgradeModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Maybe Later
                </button>
                <Link
                  to="/pricing"
                  className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary text-center"
                >
                  View Plans
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DemoStandardPlan 