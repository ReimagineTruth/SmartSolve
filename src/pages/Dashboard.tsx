import React, { useState, useEffect } from 'react'
import { 
  CheckSquare, 
  DollarSign, 
  Utensils, 
  Heart, 
  TrendingUp, 
  Calendar,
  Plus,
  ArrowRight,
  Target,
  Clock,
  Award,
  Users,
  Activity,
  Edit,
  Trash2,
  CheckCircle,
  Circle,
  Star,
  BarChart3,
  PieChart,
  LineChart
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import Footer from '../components/Footer'

interface Task {
  id: string
  title: string
  description?: string
  completed: boolean
  dueDate: string
  priority: 'low' | 'medium' | 'high'
  category: string
  createdAt: string
}

interface Expense {
  id: string
  title: string
  amount: number
  category: string
  date: string
  type: 'income' | 'expense'
  description?: string
}

interface Meal {
  id: string
  name: string
  ingredients: string[]
  instructions: string[]
  prepTime: number
  cookTime: number
  servings: number
  category: string
  date: string
}

interface WellnessEntry {
  id: string
  date: string
  mood: number // 1-10
  sleep: number // hours
  exercise: boolean
  meditation: boolean
  notes: string
}

interface DashboardStats {
  tasksCompleted: number
  totalTasks: number
  totalBudget: number
  monthlyExpenses: number
  monthlyIncome: number
  mealsPlanned: number
  wellnessDays: number
  averageMood: number
  recentTasks: Task[]
  upcomingExpenses: Expense[]
  recentMeals: Meal[]
  wellnessEntries: WellnessEntry[]
}

const Dashboard: React.FC = () => {
  const { subscription, renewSubscription, upgradeSubscription } = useAuth()
  const [stats, setStats] = useState<DashboardStats>({
    tasksCompleted: 0,
    totalTasks: 0,
    totalBudget: 0,
    monthlyExpenses: 0,
    monthlyIncome: 0,
    mealsPlanned: 0,
    wellnessDays: 0,
    averageMood: 0,
    recentTasks: [],
    upcomingExpenses: [],
    recentMeals: [],
    wellnessEntries: []
  })
  const [loading, setLoading] = useState(true)
  const [showAddTask, setShowAddTask] = useState(false)
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium' as const,
    category: 'personal'
  })

  useEffect(() => {
    // Removed: if (user?.email) {
    loadUserData()
    // }
  }, []) // Removed: [user]

  const loadUserData = async () => {
    try {
      setLoading(true)
      
      // Initialize user data if needed
      // Removed: await dataService.initializeUserData(user?.email || '')
      
      // Load dashboard stats
      // Removed: const dashboardStats = await dataService.getDashboardStats(user?.email || '')
      // if (dashboardStats) {
      //   setStats(dashboardStats)
      // }
    } catch (error) {
      console.error('Error loading user data:', error)
      // Removed: toast.error('Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  const toggleTaskComplete = async (taskId: string) => {
    try {
      const updatedTasks = stats.recentTasks.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
      
      // Save updated tasks
      // Removed: await dataService.saveTasks(user?.email || '', updatedTasks)
      
      // Reload dashboard stats
      // const dashboardStats = await dataService.getDashboardStats(user?.email || '')
      // if (dashboardStats) {
      //   setStats(dashboardStats)
      // }
      
      // Removed: toast.success('Task updated!')
    } catch (error) {
      console.error('Error updating task:', error)
      // Removed: toast.error('Failed to update task')
    }
  }

  // Plan feature matrix
  const PLAN_FEATURES = {
    free: {
      maxTasks: 5,
      budget: 'basic',
      maxMeals: 2,
      aiMood: false,
      family: false,
      business: false,
      ads: true,
    },
    standard: {
      maxTasks: Infinity,
      budget: 'advanced',
      maxMeals: Infinity,
      aiMood: true,
      family: false,
      business: false,
      ads: false,
    },
    premium: {
      maxTasks: Infinity,
      budget: 'advanced',
      maxMeals: Infinity,
      aiMood: true,
      family: true,
      business: false,
      ads: false,
    },
    pro: {
      maxTasks: Infinity,
      budget: 'advanced',
      maxMeals: Infinity,
      aiMood: true,
      family: true,
      business: true,
      ads: false,
    },
    lifetime: {
      maxTasks: Infinity,
      budget: 'advanced',
      maxMeals: Infinity,
      aiMood: true,
      family: true,
      business: true,
      ads: false,
    },
  }
  const planKey = subscription.plan.toLowerCase() as keyof typeof PLAN_FEATURES;
  const planFeatures = PLAN_FEATURES[planKey] || PLAN_FEATURES.free;

  // In addNewTask, restrict for Free plan
  const addNewTask = async () => {
    if (!newTask.title.trim()) {
      return
    }
    if (planFeatures.maxTasks !== Infinity && stats.recentTasks.length >= planFeatures.maxTasks) {
      alert('Upgrade your plan to add more tasks!')
      return
    }

    try {
      const task: Task = {
        id: Date.now().toString(),
        title: newTask.title,
        description: newTask.description,
        completed: false,
        dueDate: newTask.dueDate,
        priority: newTask.priority,
        category: newTask.category,
        createdAt: new Date().toISOString()
      }

      const updatedTasks = [task, ...stats.recentTasks]
      // Removed: await dataService.saveTasks(user?.email || '', updatedTasks)
      
      // Reload dashboard stats
      // const dashboardStats = await dataService.getDashboardStats(user?.email || '')
      // if (dashboardStats) {
      //   setStats(dashboardStats)
      // }

      setNewTask({ title: '', description: '', dueDate: '', priority: 'medium', category: 'personal' })
      setShowAddTask(false)
      // Removed: toast.success('Task added successfully!')
    } catch (error) {
      console.error('Error adding task:', error)
      // Removed: toast.error('Failed to add task')
    }
  }

  const deleteTask = async (taskId: string) => {
    try {
      const updatedTasks = stats.recentTasks.filter(task => task.id !== taskId)
      // Removed: await dataService.saveTasks(user?.email || '', updatedTasks)
      
      // Reload dashboard stats
      // const dashboardStats = await dataService.getDashboardStats(user?.email || '')
      // if (dashboardStats) {
      //   setStats(dashboardStats)
      // }
      
      // Removed: toast.success('Task deleted!')
    } catch (error) {
      console.error('Error deleting task:', error)
      // Removed: toast.error('Failed to delete task')
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50'
      case 'medium': return 'text-yellow-600 bg-yellow-50'
      case 'low': return 'text-green-600 bg-green-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'work': return <Target className="h-4 w-4" />
      case 'personal': return <Users className="h-4 w-4" />
      case 'health': return <Heart className="h-4 w-4" />
      default: return <CheckSquare className="h-4 w-4" />
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Plan Badge */}
      <div className="flex justify-end">
        <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mb-2 ${
          planKey === 'lifetime' ? 'bg-lifetime-bg text-lifetime-text' : 'bg-gradient-to-r from-primary to-secondary text-white'
        }`}>
          {subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1)} Plan
        </span>
      </div>
      {/* Subscription Status Banner */}
      <div className="mb-4">
        <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-white shadow">
          <div>
            <div className="font-bold text-lg">Current Plan: {subscription.plan}</div>
            {subscription.plan !== 'lifetime' && subscription.expiration && (
              <div className="text-sm">Expires: {new Date(subscription.expiration).toLocaleDateString()}</div>
            )}
            <div className={`text-sm font-semibold ${subscription.status === 'active' ? 'text-green-200' : 'text-yellow-200'}`}>{subscription.status === 'active' ? 'Active' : 'Expired'}</div>
          </div>
          {subscription.status === 'expired' ? (
            <button className="btn btn-primary" onClick={renewSubscription}>Renew</button>
          ) : (
            <button className="btn btn-secondary" onClick={() => upgradeSubscription('premium', 'monthly')}>Upgrade</button>
          )}
        </div>
      </div>
      {/* Welcome Section */}
      <div
        // Removed: initial={{ opacity: 0, y: 20 }}
        // Removed: animate={{ opacity: 1, y: 0 }}
        // Removed: transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl p-8 text-white shadow-lg"
      >
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
            <Target className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">
              Welcome back, {/* Removed: {user?.name}! */}
            </h1>
            <p className="text-blue-100">
              Here's your productivity overview for today.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="text-center">
            <div className="text-2xl font-bold">{stats.tasksCompleted}/{stats.totalTasks}</div>
            <div className="text-sm text-blue-100">Tasks Done</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">${stats.totalBudget}</div>
            <div className="text-sm text-blue-100">Budget Left</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{stats.mealsPlanned}</div>
            <div className="text-sm text-blue-100">Meals Planned</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{stats.wellnessDays}</div>
            <div className="text-sm text-blue-100">Wellness Days</div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          // Removed: initial={{ opacity: 0, y: 20 }}
          // Removed: animate={{ opacity: 1, y: 0 }}
          // Removed: transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Task Completion</p>
              <p className="text-3xl font-bold text-gray-900">
                {stats.totalTasks > 0 ? Math.round((stats.tasksCompleted / stats.totalTasks) * 100) : 0}%
              </p>
            </div>
            <div className="p-3 rounded-xl bg-blue-50">
              <CheckSquare className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div
          // Removed: initial={{ opacity: 0, y: 20 }}
          // Removed: animate={{ opacity: 1, y: 0 }}
          // Removed: transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Monthly Balance</p>
              <p className="text-3xl font-bold text-gray-900">${stats.monthlyIncome - stats.monthlyExpenses}</p>
            </div>
            <div className="p-3 rounded-xl bg-green-50">
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </div>

        <div
          // Removed: initial={{ opacity: 0, y: 20 }}
          // Removed: animate={{ opacity: 1, y: 0 }}
          // Removed: transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Meals Planned</p>
              <p className="text-3xl font-bold text-gray-900">{stats.mealsPlanned}</p>
            </div>
            <div className="p-3 rounded-xl bg-orange-50">
              <Utensils className="h-8 w-8 text-orange-600" />
            </div>
          </div>
        </div>

        <div
          // Removed: initial={{ opacity: 0, y: 20 }}
          // Removed: animate={{ opacity: 1, y: 0 }}
          // Removed: transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Mood</p>
              <p className="text-3xl font-bold text-gray-900">{stats.averageMood}/10</p>
            </div>
            <div className="p-3 rounded-xl bg-pink-50">
              <Heart className="h-8 w-8 text-pink-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div
        // Removed: initial={{ opacity: 0, y: 20 }}
        // Removed: animate={{ opacity: 1, y: 0 }}
        // Removed: transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => {
              if (planFeatures.maxTasks !== Infinity && stats.recentTasks.length >= planFeatures.maxTasks) {
                alert('Upgrade your plan to add more tasks!')
                return
              }
              setShowAddTask(true)
            }}
            className="group flex flex-col items-center p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="p-4 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 mb-4 group-hover:scale-110 transition-transform duration-300">
              <Plus className="h-8 w-8 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-900 text-center">Add Task</span>
            {planFeatures.maxTasks !== Infinity && stats.recentTasks.length >= planFeatures.maxTasks && (
              <span className="text-xs text-red-500 mt-2">Upgrade for more</span>
            )}
          </button>
          <a
            href="/budget"
            className="group flex flex-col items-center p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="p-4 rounded-xl bg-gradient-to-r from-green-500 to-green-600 mb-4 group-hover:scale-110 transition-transform duration-300">
              <DollarSign className="h-8 w-8 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-900 text-center">Log Expense</span>
            {planFeatures.budget === 'basic' && <span className="text-xs text-red-500 mt-2">Upgrade for advanced</span>}
          </a>
          <a
            href="/meals"
            className="group flex flex-col items-center p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="p-4 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 mb-4 group-hover:scale-110 transition-transform duration-300">
              <Utensils className="h-8 w-8 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-900 text-center">Plan Meal</span>
            {planFeatures.maxMeals !== Infinity && <span className="text-xs text-red-500 mt-2">Upgrade for unlimited</span>}
          </a>
          <a
            href="/wellness"
            className="group flex flex-col items-center p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="p-4 rounded-xl bg-gradient-to-r from-pink-500 to-pink-600 mb-4 group-hover:scale-110 transition-transform duration-300">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-900 text-center">Track Mood</span>
            {!planFeatures.aiMood && <span className="text-xs text-red-500 mt-2">Upgrade for AI</span>}
          </a>
        </div>
      </div>

      {/* Recent Tasks */}
      <div
        // Removed: initial={{ opacity: 0, y: 20 }}
        // Removed: animate={{ opacity: 1, y: 0 }}
        // Removed: transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Recent Tasks</h2>
          <a href="/tasks" className="text-sm text-blue-600 hover:text-blue-700 transition-colors flex items-center">
            View all <ArrowRight className="ml-1 h-4 w-4" />
          </a>
        </div>
        
        {/* Add Task Form */}
        {showAddTask && (
          <div className="mb-6 p-4 bg-gray-50 rounded-xl">
            <h3 className="font-semibold text-gray-900 mb-4">Add New Task</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Task title"
                value={newTask.title}
                onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="date"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <select
                value={newTask.priority}
                onChange={(e) => setNewTask({...newTask, priority: e.target.value as any})}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
              <select
                value={newTask.category}
                onChange={(e) => setNewTask({...newTask, category: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="personal">Personal</option>
                <option value="work">Work</option>
                <option value="health">Health</option>
              </select>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={addNewTask}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Add Task
              </button>
              <button
                onClick={() => setShowAddTask(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {stats.recentTasks.map((task) => (
            <div key={task.id} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex items-center flex-1">
                <button
                  onClick={() => toggleTaskComplete(task.id)}
                  className="mr-3"
                >
                  {task.completed ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <Circle className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`${task.completed ? 'line-through text-gray-500' : 'text-gray-900'} font-medium`}>
                      {task.title}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                    <div className="flex items-center text-gray-500">
                      {getCategoryIcon(task.category)}
                    </div>
                  </div>
                  {task.description && (
                    <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(task.dueDate).toLocaleDateString()}
                </div>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Expenses */}
      <div
        // Removed: initial={{ opacity: 0, y: 20 }}
        // Removed: animate={{ opacity: 1, y: 0 }}
        // Removed: transition={{ duration: 0.5, delay: 0.7 }}
        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Upcoming Expenses</h2>
          <a href="/budget" className="text-sm text-blue-600 hover:text-blue-700 transition-colors flex items-center">
            View all <ArrowRight className="ml-1 h-4 w-4" />
          </a>
        </div>
        <div className="space-y-4">
          {stats.upcomingExpenses.map((expense) => (
            <div key={expense.id} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <div>
                <p className="font-medium text-gray-900">{expense.title}</p>
                <p className="text-sm text-gray-500 flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  Due {new Date(expense.date).toLocaleDateString()}
                </p>
              </div>
              <span className={`text-lg font-semibold ${expense.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                {expense.type === 'income' ? '+' : '-'}${expense.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Dashboard 