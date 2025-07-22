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
  LineChart,
  Bell,
  Settings,
  User,
  HelpCircle,
  Zap,
  Sparkles,
  Target as TargetIcon,
  TrendingDown,
  Eye,
  EyeOff,
  RefreshCw,
  MoreHorizontal,
  Filter,
  Search,
  Download,
  Share2,
  Lock,
  Unlock,
  Crown,
  Gift,
  CalendarDays,
  Clock3,
  Timer,
  CheckCheck,
  AlertCircle,
  Info,
  Lightbulb,
  Brain,
  Palette,
  Music,
  Coffee,
  BookOpen,
  Gamepad2,
  Dumbbell,
  Bed,
  Sunrise,
  Moon,
  Cloud,
  Sun,
  Rain,
  Snowflake,
  Wind,
  Thermometer,
  Droplets,
  Waves,
  Building,
  ShoppingCart,
  MessageCircle
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import ProfileSettings from '../components/ProfileSettings'
import Notifications from '../components/Notifications'
import ResetData from '../components/ResetData'
import UpgradeModal from '../components/UpgradeModal'
import { useDashboard } from '../controllers/DashboardController'
import Footer from '../components/Footer'
import LoadingSpinner from '../components/LoadingSpinner'

interface Task {
  id: string
  title: string
  description?: string
  completed: boolean
  dueDate: string
  priority: 'low' | 'medium' | 'high'
  category: string
  createdAt: string
  estimatedTime?: number
  tags?: string[]
}

interface Expense {
  id: string
  title: string
  amount: number
  category: string
  date: string
  type: 'income' | 'expense'
  description?: string
  recurring?: boolean
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
  nutrition?: {
    calories: number
    protein: number
    carbs: number
    fat: number
  }
}

interface WellnessEntry {
  id: string
  date: string
  mood: number // 1-10
  sleep: number // hours
  exercise: boolean
  meditation: boolean
  notes: string
  weather?: string
  activities?: string[]
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
  productivityScore: number
  streakDays: number
  weeklyGoal: number
  weeklyProgress: number
}

const Dashboard: React.FC = () => {
  const { subscription, renewSubscription, upgradeSubscription } = useAuth()
  const { state, actions, computed } = useDashboard()
  const [stats, setStats] = useState<DashboardStats>({
    tasksCompleted: computed.taskCompletionRate * 100 || 0,
    totalTasks: state.tasks.length,
    totalBudget: computed.netBalance || 0,
    monthlyExpenses: computed.totalExpenses || 0,
    monthlyIncome: computed.totalIncome || 0,
    mealsPlanned: state.meals.length,
    wellnessDays: state.moodEntries.length,
    averageMood: computed.averageMood || 0,
    recentTasks: computed.filteredTasks.slice(0, 5).map(task => ({
      id: task.id,
      title: task.title,
      description: task.description,
      completed: task.status === 'completed',
      dueDate: task.dueDate,
      priority: task.priority,
      category: task.category,
      createdAt: task.createdAt,
      estimatedTime: 0,
      tags: []
    })),
    upcomingExpenses: computed.filteredBudgetItems.slice(0, 5).map(item => ({
      id: item.id,
      title: item.title,
      amount: item.amount,
      category: item.category,
      date: item.date,
      type: item.type,
      recurring: false
    })),
    recentMeals: computed.filteredMeals.slice(0, 5).map(meal => ({
      id: meal.id,
      name: meal.name,
      ingredients: meal.ingredients,
      instructions: meal.instructions,
      prepTime: meal.prepTime,
      cookTime: meal.cookTime,
      servings: 4,
      category: meal.type,
      date: meal.date,
      nutrition: { calories: 0, protein: 0, carbs: 0, fat: 0 }
    })),
    wellnessEntries: computed.filteredMoodEntries.slice(0, 5).map(entry => ({
      id: entry.id,
      date: entry.date,
      mood: entry.mood,
      sleep: entry.sleepHours,
      exercise: entry.exerciseMinutes > 0,
      meditation: false,
      notes: entry.notes,
      activities: entry.activities
    })),
    productivityScore: 85,
    streakDays: 7,
    weeklyGoal: 10,
    weeklyProgress: 8
  })
  const [loading, setLoading] = useState(true)
  const [showAddTask, setShowAddTask] = useState(false)
  const [showStats, setShowStats] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium' as const,
    category: 'personal',
    estimatedTime: 0,
    tags: [] as string[]
  })
  const [showProfileSettings, setShowProfileSettings] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showResetData, setShowResetData] = useState(false)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)

  // Update stats when dashboard state changes
  useEffect(() => {
    const updatedStats: DashboardStats = {
      tasksCompleted: computed.taskCompletionRate * 100 || 0,
      totalTasks: state.tasks.length,
      totalBudget: computed.netBalance || 0,
      monthlyExpenses: computed.totalExpenses || 0,
      monthlyIncome: computed.totalIncome || 0,
      mealsPlanned: state.meals.length,
      wellnessDays: state.moodEntries.length,
      averageMood: computed.averageMood || 0,
      recentTasks: computed.filteredTasks.slice(0, 5).map(task => ({
        id: task.id,
        title: task.title,
        description: task.description,
        completed: task.status === 'completed',
        dueDate: task.dueDate,
        priority: task.priority,
        category: task.category,
        createdAt: task.createdAt,
        estimatedTime: 0,
        tags: []
      })),
      upcomingExpenses: computed.filteredBudgetItems.slice(0, 5).map(item => ({
        id: item.id,
        title: item.title,
        amount: item.amount,
        category: item.category,
        date: item.date,
        type: item.type,
        recurring: false
      })),
      recentMeals: computed.filteredMeals.slice(0, 5).map(meal => ({
        id: meal.id,
        name: meal.name,
        ingredients: meal.ingredients,
        instructions: meal.instructions,
        prepTime: meal.prepTime,
        cookTime: meal.cookTime,
        servings: 4,
        category: meal.type,
        date: meal.date,
        nutrition: { calories: 0, protein: 0, carbs: 0, fat: 0 }
      })),
      wellnessEntries: computed.filteredMoodEntries.slice(0, 5).map(entry => ({
        id: entry.id,
        date: entry.date,
        mood: entry.mood,
        sleep: entry.sleepHours,
        exercise: entry.exerciseMinutes > 0,
        meditation: false,
        notes: entry.notes,
        activities: entry.activities
      })),
      productivityScore: 85,
      streakDays: 7,
      weeklyGoal: 10,
      weeklyProgress: 8
    }

    setStats(updatedStats)
    setLoading(false)
  }, [state.tasks, state.budgetItems, state.meals, state.moodEntries, computed])

  const PLAN_FEATURES = {
    free: {
      maxTasks: 5,
      budget: 'basic',
      maxMeals: 2,
      aiMood: false,
      family: false,
      business: false,
      ads: true,
      analytics: false,
      integrations: false,
      localServices: 'view-only',
      dailyQuotes: true,
      groceryPlanner: false,
      kidsMode: false,
      groupChat: false,
      virtualAssistant: false,
      teamCollaboration: false,
      marketingTools: false,
      incomeTracker: false,
      mealSuggestions: 2,
      unlimitedPlanning: false
    },
    standard: {
      maxTasks: Infinity,
      budget: 'advanced',
      maxMeals: Infinity,
      aiMood: true,
      family: false,
      business: false,
      ads: false,
      analytics: true,
      integrations: false,
      localServices: 'post-requests',
      dailyQuotes: true,
      groceryPlanner: false,
      kidsMode: false,
      groupChat: false,
      virtualAssistant: false,
      teamCollaboration: false,
      marketingTools: false,
      incomeTracker: false,
      mealSuggestions: Infinity,
      unlimitedPlanning: true
    },
    premium: {
      maxTasks: Infinity,
      budget: 'advanced',
      maxMeals: Infinity,
      aiMood: true,
      family: true,
      business: false,
      ads: false,
      analytics: true,
      integrations: true,
      localServices: 'post-requests',
      dailyQuotes: true,
      groceryPlanner: true,
      kidsMode: true,
      groupChat: true,
      virtualAssistant: false,
      teamCollaboration: false,
      marketingTools: false,
      incomeTracker: false,
      mealSuggestions: Infinity,
      unlimitedPlanning: true
    },
    pro: {
      maxTasks: Infinity,
      budget: 'advanced',
      maxMeals: Infinity,
      aiMood: true,
      family: true,
      business: true,
      ads: false,
      analytics: true,
      integrations: true,
      localServices: 'post-requests',
      dailyQuotes: true,
      groceryPlanner: true,
      kidsMode: true,
      groupChat: true,
      virtualAssistant: true,
      teamCollaboration: true,
      marketingTools: true,
      incomeTracker: true,
      mealSuggestions: Infinity,
      unlimitedPlanning: true
    },
    lifetime: {
      maxTasks: Infinity,
      budget: 'advanced',
      maxMeals: Infinity,
      aiMood: true,
      family: true,
      business: true,
      ads: false,
      analytics: true,
      integrations: true,
      localServices: 'post-requests',
      dailyQuotes: true,
      groceryPlanner: true,
      kidsMode: true,
      groupChat: true,
      virtualAssistant: true,
      teamCollaboration: true,
      marketingTools: true,
      incomeTracker: true,
      mealSuggestions: Infinity,
      unlimitedPlanning: true
    },
  }
  
  const planKey = subscription.plan.toLowerCase() as keyof typeof PLAN_FEATURES;
  const planFeatures = PLAN_FEATURES[planKey] || PLAN_FEATURES.free;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200'
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'low': return 'text-green-600 bg-green-50 border-green-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
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

  const getMoodEmoji = (mood: number) => {
    if (mood >= 9) return '😄'
    if (mood >= 7) return '🙂'
    if (mood >= 5) return '😐'
    if (mood >= 3) return '😕'
    return '😢'
  }

  const getProductivityColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 70) return 'text-blue-600'
    if (score >= 50) return 'text-yellow-600'
    return 'text-red-600'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Target className="h-6 w-6 text-white" />
      </div>
          <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-sm text-gray-500">Welcome back! Here's your productivity overview</p>
          </div>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setShowResetData(true)}
                className="p-2 text-gray-400 hover:text-orange-600 transition-colors"
                title="Reset Dashboard Data"
              >
                <RefreshCw className="h-5 w-5" />
              </button>
              <button 
                onClick={() => setShowNotifications(true)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors relative"
              >
                <Bell className="h-5 w-5" />
                {computed.unreadNotificationsCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {computed.unreadNotificationsCount}
                  </span>
                )}
              </button>
              <button 
                onClick={() => setShowProfileSettings(true)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Settings className="h-5 w-5" />
              </button>
              <button 
                onClick={() => setShowProfileSettings(true)}
                className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center hover:scale-105 transition-transform"
              >
                <User className="h-4 w-4 text-white" />
              </button>
        </div>
      </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Plan Status */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Crown className="h-6 w-6" />
          </div>
          <div>
                  <h2 className="text-xl font-bold">{subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1)} Plan</h2>
            <p className="text-blue-100">
                    {subscription.status === 'active' ? 'Active' : 'Expired'} • 
                    {subscription.plan !== 'lifetime' && subscription.expiration && 
                      ` Expires ${new Date(subscription.expiration).toLocaleDateString()}`
                    }
            </p>
          </div>
        </div>
              <div className="flex space-x-3">
                {subscription.status === 'expired' ? (
                  <button 
                    onClick={renewSubscription}
                    className="px-6 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                  >
                    Renew
                  </button>
                ) : (
                  <button 
                    onClick={() => setShowUpgradeModal(true)}
                    className="px-6 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                  >
                    Upgrade
                  </button>
                )}
          </div>
          </div>
        </div>
      </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-gray-600">Productivity Score</p>
                <p className={`text-3xl font-bold ${getProductivityColor(stats.productivityScore)}`}>
                  {stats.productivityScore}%
                </p>
                <p className="text-xs text-gray-500 mt-1">+5% from last week</p>
            </div>
              <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600">
                <TrendingUp className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-gray-600">Streak Days</p>
                <p className="text-3xl font-bold text-orange-600">{stats.streakDays}</p>
                <p className="text-xs text-gray-500 mt-1">Keep it going! 🔥</p>
            </div>
              <div className="p-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500">
                <Zap className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-gray-600">Weekly Progress</p>
                <p className="text-3xl font-bold text-green-600">{stats.weeklyProgress}/{stats.weeklyGoal}</p>
                <p className="text-xs text-gray-500 mt-1">{Math.round((stats.weeklyProgress / stats.weeklyGoal) * 100)}% complete</p>
            </div>
              <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600">
                <Target className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Mood</p>
                <p className="text-3xl font-bold text-pink-600">{stats.averageMood}/10</p>
                <p className="text-xs text-gray-500 mt-1">{getMoodEmoji(stats.averageMood)} Great week!</p>
            </div>
              <div className="p-3 rounded-xl bg-gradient-to-r from-pink-500 to-pink-600">
                <Heart className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>
      </div>

        {/* Main Content Tabs */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {['overview', 'tasks', 'budget', 'meals', 'mood', 'wellness'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Quick Actions */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
                      onClick={() => setShowAddTask(true)}
                      className="group flex flex-col items-center p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200"
          >
            <div className="p-4 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 mb-4 group-hover:scale-110 transition-transform duration-300">
              <Plus className="h-8 w-8 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-900 text-center">Add Task</span>
            {planFeatures.maxTasks !== Infinity && stats.recentTasks.length >= planFeatures.maxTasks && (
              <span className="text-xs text-red-500 mt-2">Upgrade for more</span>
            )}
          </button>

                    <button className="group flex flex-col items-center p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200">
            <div className="p-4 rounded-xl bg-gradient-to-r from-green-500 to-green-600 mb-4 group-hover:scale-110 transition-transform duration-300">
              <DollarSign className="h-8 w-8 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-900 text-center">Log Expense</span>
            {planFeatures.budget === 'basic' && <span className="text-xs text-red-500 mt-2">Upgrade for advanced</span>}
                    </button>

                    <button className="group flex flex-col items-center p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-br from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200">
            <div className="p-4 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 mb-4 group-hover:scale-110 transition-transform duration-300">
              <Utensils className="h-8 w-8 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-900 text-center">Plan Meal</span>
            {planFeatures.maxMeals !== Infinity && <span className="text-xs text-red-500 mt-2">Upgrade for unlimited</span>}
                    </button>

                    <button className="group flex flex-col items-center p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-br from-pink-50 to-pink-100 hover:from-pink-100 hover:to-pink-200">
            <div className="p-4 rounded-xl bg-gradient-to-r from-pink-500 to-pink-600 mb-4 group-hover:scale-110 transition-transform duration-300">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-900 text-center">Track Mood</span>
            {!planFeatures.aiMood && <span className="text-xs text-red-500 mt-2">Upgrade for AI</span>}
                    </button>
        </div>
      </div>

                {/* Plan-Specific Features */}
                {planFeatures.family && (
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl flex items-center justify-center">
                          <Users className="h-6 w-6 text-white" />
        </div>
          <div>
                          <h3 className="text-lg font-semibold text-gray-900">Family Sharing</h3>
                          <p className="text-gray-600">Share tasks, meals, and wellness with your family</p>
          </div>
                      </div>
                      <button className="px-6 py-2 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg hover:from-green-600 hover:to-blue-700 transition-all duration-300">
                        Manage Family
                      </button>
                    </div>
        </div>
      )}

                {planFeatures.business && (
                  <div className="bg-gradient-to-r from-purple-50 to-yellow-50 rounded-xl p-6 border border-purple-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-yellow-600 rounded-xl flex items-center justify-center">
                          <Building className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">Business Tools</h3>
                          <p className="text-gray-600">Marketing tools, income tracker, and team collaboration</p>
                        </div>
                      </div>
                      <button className="px-6 py-2 bg-gradient-to-r from-purple-500 to-yellow-600 text-white rounded-lg hover:from-purple-600 hover:to-yellow-700 transition-all duration-300">
                        Business Dashboard
                      </button>
                    </div>
        </div>
      )}

                {planFeatures.integrations && (
                  <div className="bg-gradient-to-r from-indigo-50 to-cyan-50 rounded-xl p-6 border border-indigo-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-cyan-600 rounded-xl flex items-center justify-center">
                          <Zap className="h-6 w-6 text-white" />
        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">Integrations</h3>
                          <p className="text-gray-600">Sync with TruthWeb, Cloudy, and other services</p>
                        </div>
                      </div>
                      <button className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-cyan-600 text-white rounded-lg hover:from-indigo-600 hover:to-cyan-700 transition-all duration-300">
                        Manage Integrations
                      </button>
                    </div>
        </div>
      )}

                {/* Local Services */}
                <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                        <Target className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Local Services</h3>
                        <p className="text-gray-600">
                          {planFeatures.business ? 'Post and manage service requests' : 'View local services'}
                        </p>
                      </div>
                    </div>
                    <button className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition-all duration-300">
                      {planFeatures.business ? 'Post Request' : 'Browse Services'}
                    </button>
                  </div>
                </div>

                {/* Kids Mode */}
                {planFeatures.family && (
                  <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-6 border border-pink-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
                          <Star className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">Kids Mode</h3>
                          <p className="text-gray-600">Safe and fun experience for children</p>
                        </div>
                      </div>
                      <button className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300">
                        Enable Kids Mode
                      </button>
                    </div>
                  </div>
                )}

                {/* Virtual Assistant */}
      {planFeatures.business && (
                  <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl p-6 border border-teal-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-blue-600 rounded-xl flex items-center justify-center">
                          <Brain className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">Virtual Assistant</h3>
                          <p className="text-gray-600">Book and manage virtual assistant services</p>
                        </div>
                      </div>
                      <button className="px-6 py-2 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-lg hover:from-teal-600 hover:to-blue-700 transition-all duration-300">
                        Book Assistant
                      </button>
                    </div>
        </div>
      )}

                {/* AI Features */}
                {planFeatures.aiMood ? (
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
                          <Brain className="h-6 w-6 text-white" />
      </div>
        <div>
                          <h3 className="text-lg font-semibold text-gray-900">AI Mood Assistant</h3>
                          <p className="text-gray-600">Get personalized insights and recommendations</p>
        </div>
      </div>
                      <button className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-lg hover:from-purple-600 hover:to-blue-700 transition-all duration-300">
                        Analyze Mood
                      </button>
      </div>
                  </div>
                ) : (
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
                          <Brain className="h-6 w-6 text-white" />
                        </div>
        <div>
                          <h3 className="text-lg font-semibold text-gray-900">AI Mood Assistant</h3>
                          <p className="text-gray-600">Upgrade to Premium to unlock AI-powered insights</p>
        </div>
      </div>
                      <button 
                        onClick={() => upgradeSubscription('premium', 'monthly')}
                        className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-lg hover:from-purple-600 hover:to-blue-700 transition-all duration-300"
                      >
                        Upgrade
                      </button>
                    </div>
                  </div>
                )}

                {/* Daily Quotes */}
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Daily Quote</h3>
                    <p className="text-gray-600 italic mb-4">
                      "The only way to do great work is to love what you do." - Steve Jobs
                    </p>
                    <button className="px-6 py-2 bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-lg hover:from-yellow-600 hover:to-orange-700 transition-all duration-300">
                      Get New Quote
                    </button>
                  </div>
                </div>

                {/* Grocery Planner */}
                {planFeatures.family && (
                  <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-6 border border-emerald-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl flex items-center justify-center">
                          <ShoppingCart className="h-6 w-6 text-white" />
                        </div>
        <div>
                          <h3 className="text-lg font-semibold text-gray-900">Full Grocery Planner</h3>
                          <p className="text-gray-600">Plan meals and create shopping lists</p>
        </div>
      </div>
                      <button className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-lg hover:from-emerald-600 hover:to-green-700 transition-all duration-300">
                        Plan Groceries
                      </button>
                    </div>
                  </div>
                )}

                {/* Group Chat */}
                {(planFeatures.family || planFeatures.business) && (
                  <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl p-6 border border-violet-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
                          <MessageCircle className="h-6 w-6 text-white" />
        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">Group Chat</h3>
                          <p className="text-gray-600">
                            {planFeatures.family ? 'Family chat and collaboration' : 'Team collaboration and communication'}
                          </p>
                        </div>
                      </div>
                      <button className="px-6 py-2 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-lg hover:from-violet-600 hover:to-purple-700 transition-all duration-300">
                        Open Chat
                      </button>
                    </div>
                  </div>
                )}

                {/* Analytics */}
                {planFeatures.analytics && (
                  <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-xl p-6 border border-slate-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-slate-500 to-gray-600 rounded-xl flex items-center justify-center">
                          <BarChart3 className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">Advanced Analytics</h3>
                          <p className="text-gray-600">Detailed insights and performance reports</p>
                        </div>
                      </div>
                      <button className="px-6 py-2 bg-gradient-to-r from-slate-500 to-gray-600 text-white rounded-lg hover:from-slate-600 hover:to-gray-700 transition-all duration-300">
                        View Analytics
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'tasks' && (
              <div className="space-y-6">
        {/* Add Task Form */}
        {showAddTask && (
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <Plus className="h-5 w-5 mr-2 text-blue-600" />
                      Add New Task
                    </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Task title"
                value={newTask.title}
                onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
              <input
                type="date"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
              <select
                value={newTask.priority}
                onChange={(e) => setNewTask({...newTask, priority: e.target.value as any})}
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
              <select
                value={newTask.category}
                onChange={(e) => setNewTask({...newTask, category: e.target.value})}
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              >
                <option value="personal">Personal</option>
                <option value="work">Work</option>
                <option value="health">Health</option>
              </select>
            </div>
                    <div className="flex gap-3 mt-4">
              <button
                        onClick={() => {/* Add task logic */}}
                        className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
              >
                Add Task
              </button>
              <button
                onClick={() => setShowAddTask(false)}
                        className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

                {/* Tasks List */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Tasks</h3>
                    <button className="text-sm text-blue-600 hover:text-blue-700 transition-colors flex items-center">
                      View all <ArrowRight className="ml-1 h-4 w-4" />
                    </button>
                  </div>
                  <div className="space-y-3">
          {stats.recentTasks.map((task) => (
                      <div key={task.id} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-300 border border-gray-200">
              <div className="flex items-center flex-1">
                          <button className="mr-3 p-1 hover:bg-gray-200 rounded-full transition-colors">
                  {task.completed ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <Circle className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                    <span className={`${task.completed ? 'line-through text-gray-500' : 'text-gray-900'} font-medium`}>
                      {task.title}
                    </span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                    <div className="flex items-center text-gray-500">
                      {getCategoryIcon(task.category)}
                    </div>
                  </div>
                  {task.description && (
                              <p className="text-sm text-gray-600">{task.description}</p>
                            )}
                            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                              <span className="flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                {new Date(task.dueDate).toLocaleDateString()}
                              </span>
                              {task.estimatedTime && (
                                <span className="flex items-center">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {task.estimatedTime}min
                                </span>
                  )}
                </div>
              </div>
                </div>
                        <div className="flex items-center gap-2">
                          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-red-400 hover:text-red-600 transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
              </div>
            )}

            {activeTab === 'budget' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Monthly Income</h3>
                      <DollarSign className="h-6 w-6 text-green-600" />
        </div>
                    <p className="text-3xl font-bold text-green-600">${stats.monthlyIncome}</p>
                    <p className="text-sm text-gray-600 mt-2">+12% from last month</p>
                  </div>

                  <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-6 border border-red-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Monthly Expenses</h3>
                      <TrendingDown className="h-6 w-6 text-red-600" />
                    </div>
                    <p className="text-3xl font-bold text-red-600">${stats.monthlyExpenses}</p>
                    <p className="text-sm text-gray-600 mt-2">-5% from last month</p>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Net Balance</h3>
                      <TrendingUp className="h-6 w-6 text-blue-600" />
                    </div>
                    <p className="text-3xl font-bold text-blue-600">${stats.monthlyIncome - stats.monthlyExpenses}</p>
                    <p className="text-sm text-gray-600 mt-2">+8% from last month</p>
                  </div>
                </div>

                {/* Budget Tracking Form */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <DollarSign className="h-5 w-5 mr-2 text-blue-600" />
                    Track Budget
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      type="text"
                      placeholder="Transaction title"
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    />
                    <input
                      type="number"
                      placeholder="Amount"
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    />
                    <select className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300">
                      <option value="">Select Category</option>
                      <option value="food">Food & Dining</option>
                      <option value="transportation">Transportation</option>
                      <option value="entertainment">Entertainment</option>
                      <option value="shopping">Shopping</option>
                      <option value="bills">Bills & Utilities</option>
                      <option value="health">Healthcare</option>
                      <option value="income">Income</option>
                    </select>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <button className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300">
                      Add Income
                    </button>
                    <button className="px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300">
                      Add Expense
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Transactions</h3>
                  <div className="space-y-3">
          {stats.upcomingExpenses.map((expense) => (
                      <div key={expense.id} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-300 border border-gray-200">
                        <div className="flex items-center space-x-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            expense.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                          }`}>
                            <DollarSign className={`h-5 w-5 ${expense.type === 'income' ? 'text-green-600' : 'text-red-600'}`} />
                          </div>
              <div>
                <p className="font-medium text-gray-900">{expense.title}</p>
                <p className="text-sm text-gray-500 flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                  Due {new Date(expense.date).toLocaleDateString()}
                              {expense.recurring && <span className="ml-2 text-blue-600">Recurring</span>}
                </p>
                          </div>
              </div>
              <span className={`text-lg font-semibold ${expense.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                {expense.type === 'income' ? '+' : '-'}${expense.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
              </div>
            )}

            {activeTab === 'meals' && (
              <div className="space-y-6">
                {/* Meal Planning Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Meals Planned</h3>
                      <Utensils className="h-6 w-6 text-orange-600" />
                    </div>
                    <p className="text-3xl font-bold text-orange-600">{stats.mealsPlanned}</p>
                    <p className="text-sm text-gray-600 mt-2">This week</p>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Calories Today</h3>
                      <Target className="h-6 w-6 text-green-600" />
                    </div>
                    <p className="text-3xl font-bold text-green-600">1,850</p>
                    <p className="text-sm text-gray-600 mt-2">Goal: 2,000</p>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Water Intake</h3>
                      <Droplets className="h-6 w-6 text-purple-600" />
                    </div>
                    <p className="text-3xl font-bold text-purple-600">6/8</p>
                    <p className="text-sm text-gray-600 mt-2">Glasses today</p>
                  </div>
                </div>

                {/* Meal Planning Form */}
                <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-6 border border-orange-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Utensils className="h-5 w-5 mr-2 text-orange-600" />
                    Plan Your Meal
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Meal name"
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                    />
                    <select className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300">
                      <option value="">Select Meal Type</option>
                      <option value="breakfast">Breakfast</option>
                      <option value="lunch">Lunch</option>
                      <option value="dinner">Dinner</option>
                      <option value="snack">Snack</option>
                    </select>
                    <input
                      type="date"
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                    />
                    <input
                      type="number"
                      placeholder="Calories"
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  <div className="flex gap-3 mt-4">
                    <button className="px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300">
                      Add Meal
                    </button>
                    <button className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-all duration-300">
                      Browse Recipes
                    </button>
                  </div>
                </div>

                {/* Meal Suggestions */}
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Meal Suggestions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4 border border-yellow-200">
                      <h4 className="font-semibold text-gray-900 mb-2">Breakfast</h4>
                      <p className="text-sm text-gray-600 mb-2">Oatmeal with berries</p>
                      <p className="text-xs text-gray-500">320 calories</p>
                    </div>
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 border border-green-200">
                      <h4 className="font-semibold text-gray-900 mb-2">Lunch</h4>
                      <p className="text-sm text-gray-600 mb-2">Grilled chicken salad</p>
                      <p className="text-xs text-gray-500">450 calories</p>
                    </div>
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
                      <h4 className="font-semibold text-gray-900 mb-2">Dinner</h4>
                      <p className="text-sm text-gray-600 mb-2">Salmon with vegetables</p>
                      <p className="text-xs text-gray-500">580 calories</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'mood' && (
              <div className="space-y-6">
                {/* Mood Tracking Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-r from-pink-50 to-pink-100 rounded-xl p-6 border border-pink-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Average Mood</h3>
                      <Heart className="h-6 w-6 text-pink-600" />
                    </div>
                    <p className="text-3xl font-bold text-pink-600">{stats.averageMood}/10</p>
                    <p className="text-sm text-gray-600 mt-2">{getMoodEmoji(stats.averageMood)} Great week!</p>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Sleep Quality</h3>
                      <Bed className="h-6 w-6 text-purple-600" />
                    </div>
                    <p className="text-3xl font-bold text-purple-600">7.5h</p>
                    <p className="text-sm text-gray-600 mt-2">Last night</p>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Exercise</h3>
                      <Dumbbell className="h-6 w-6 text-blue-600" />
                    </div>
                    <p className="text-3xl font-bold text-blue-600">5/7</p>
                    <p className="text-sm text-gray-600 mt-2">Days this week</p>
                  </div>
                </div>

                {/* Mood Tracking Form */}
                <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-6 border border-pink-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Heart className="h-5 w-5 mr-2 text-pink-600" />
                    Track Your Mood
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">How are you feeling?</label>
                      <div className="flex justify-between">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((mood) => (
                          <button
                            key={mood}
                            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-pink-200 transition-colors flex items-center justify-center text-xs"
                          >
                            {mood}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Sleep hours</label>
                      <input
                        type="number"
                        min="0"
                        max="24"
                        step="0.5"
                        placeholder="7.5"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Activities today</label>
                    <div className="flex flex-wrap gap-2">
                      {['Exercise', 'Meditation', 'Reading', 'Social', 'Work', 'Rest'].map((activity) => (
                        <button
                          key={activity}
                          className="px-3 py-1 rounded-full bg-gray-200 hover:bg-pink-200 transition-colors text-sm"
                        >
                          {activity}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                    <textarea
                      placeholder="How was your day?"
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  <div className="flex gap-3 mt-4">
                    <button className="px-6 py-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-lg hover:from-pink-600 hover:to-pink-700 transition-all duration-300">
                      Save Entry
                    </button>
                    <button className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-all duration-300">
                      View History
                    </button>
                  </div>
                </div>

                {/* Mood Insights */}
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Mood Insights</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 border border-green-200">
                      <h4 className="font-semibold text-gray-900 mb-2">Positive Trends</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Mood improved on exercise days</li>
                        <li>• Better sleep quality this week</li>
                        <li>• Consistent morning routine helps</li>
                      </ul>
                    </div>
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4 border border-yellow-200">
                      <h4 className="font-semibold text-gray-900 mb-2">Suggestions</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Try 10-minute meditation daily</li>
                        <li>• Increase water intake</li>
                        <li>• Take more breaks during work</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'wellness' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-r from-pink-50 to-pink-100 rounded-xl p-6 border border-pink-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Average Mood</h3>
                      <Heart className="h-6 w-6 text-pink-600" />
                    </div>
                    <p className="text-3xl font-bold text-pink-600">{stats.averageMood}/10</p>
                    <p className="text-sm text-gray-600 mt-2">{getMoodEmoji(stats.averageMood)} Great week!</p>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Wellness Days</h3>
                      <Bed className="h-6 w-6 text-purple-600" />
                    </div>
                    <p className="text-3xl font-bold text-purple-600">{stats.wellnessDays}</p>
                    <p className="text-sm text-gray-600 mt-2">This month</p>
                  </div>

                  <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Meals Planned</h3>
                      <Utensils className="h-6 w-6 text-orange-600" />
                    </div>
                    <p className="text-3xl font-bold text-orange-600">{stats.mealsPlanned}</p>
                    <p className="text-sm text-gray-600 mt-2">This week</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Wellness Tips</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Sunrise className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Morning Routine</h4>
                        <p className="text-sm text-gray-600">Start your day with 10 minutes of meditation</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Dumbbell className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Exercise</h4>
                        <p className="text-sm text-gray-600">30 minutes of moderate activity daily</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bed className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Sleep</h4>
                        <p className="text-sm text-gray-600">Aim for 7-9 hours of quality sleep</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Coffee className="h-4 w-4 text-orange-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Hydration</h4>
                        <p className="text-sm text-gray-600">Drink 8 glasses of water daily</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-blue-50">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Completed task: "Project proposal"</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-green-50">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <DollarSign className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Logged expense: "Grocery shopping"</p>
                <p className="text-xs text-gray-500">4 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-pink-50">
              <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                <Heart className="h-4 w-4 text-pink-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Tracked mood: 8/10</p>
                <p className="text-xs text-gray-500">6 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ProfileSettings 
        isOpen={showProfileSettings} 
        onClose={() => setShowProfileSettings(false)}
        onResetData={(dataTypes) => {
          actions.resetData(dataTypes)
          setShowProfileSettings(false)
        }}
      />
      <Notifications 
        isOpen={showNotifications} 
        onClose={() => setShowNotifications(false)} 
      />
      <ResetData 
        isOpen={showResetData} 
        onClose={() => setShowResetData(false)}
        onReset={(dataTypes) => {
          actions.resetData(dataTypes)
          setShowResetData(false)
        }}
      />
      <UpgradeModal 
        isOpen={showUpgradeModal} 
        onClose={() => setShowUpgradeModal(false)}
        onUpgrade={(plan, billing) => {
          upgradeSubscription(plan, billing)
          setShowUpgradeModal(false)
        }}
        currentPlan={subscription.plan}
      />
    </div>
  )
}

export default Dashboard 