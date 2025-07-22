import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

// Types
interface DashboardStats {
  productivityScore: number
  streakDays: number
  weeklyGoal: number
  weeklyProgress: number
  averageMood: number
  totalTasks: number
  completedTasks: number
  budgetSpent: number
  budgetLimit: number
  mealsPlanned: number
  totalMeals: number
}

interface Task {
  id: string
  title: string
  description: string
  priority: 'low' | 'medium' | 'high'
  status: 'pending' | 'in-progress' | 'completed'
  dueDate: string
  category: string
  createdAt: string
  updatedAt: string
}

interface BudgetItem {
  id: string
  title: string
  amount: number
  type: 'income' | 'expense'
  category: string
  date: string
  description: string
}

interface Meal {
  id: string
  name: string
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack'
  date: string
  calories: number
  ingredients: string[]
  instructions: string[]
  prepTime: number
  cookTime: number
}

interface MoodEntry {
  id: string
  date: string
  mood: number // 1-10
  notes: string
  activities: string[]
  sleepHours: number
  exerciseMinutes: number
}

interface Notification {
  id: string
  type: 'task' | 'budget' | 'meal' | 'mood' | 'system' | 'achievement'
  title: string
  message: string
  time: string
  read: boolean
  priority: 'low' | 'medium' | 'high'
}

interface UserProfile {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  location: string
  birthday: string
  bio: string
  avatar: string
  plan: 'free' | 'standard' | 'premium' | 'pro'
  planExpiry: string
}

interface DashboardState {
  stats: DashboardStats
  tasks: Task[]
  budgetItems: BudgetItem[]
  meals: Meal[]
  moodEntries: MoodEntry[]
  notifications: Notification[]
  userProfile: UserProfile
  isLoading: boolean
  error: string | null
  activeTab: string
  showStats: boolean
  searchQuery: string
  filters: {
    taskStatus: string
    taskPriority: string
    budgetType: string
    mealType: string
    moodRange: string
  }
}

interface DashboardContextType {
  state: DashboardState
  actions: {
    setActiveTab: (tab: string) => void
    setShowStats: (show: boolean) => void
    setSearchQuery: (query: string) => void
    setFilters: (filters: Partial<DashboardState['filters']>) => void
    addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void
    updateTask: (id: string, updates: Partial<Task>) => void
    deleteTask: (id: string) => void
    addBudgetItem: (item: Omit<BudgetItem, 'id'>) => void
    updateBudgetItem: (id: string, updates: Partial<BudgetItem>) => void
    deleteBudgetItem: (id: string) => void
    addMeal: (meal: Omit<Meal, 'id'>) => void
    updateMeal: (id: string, updates: Partial<Meal>) => void
    deleteMeal: (id: string) => void
    addMoodEntry: (entry: Omit<MoodEntry, 'id'>) => void
    updateMoodEntry: (id: string, updates: Partial<MoodEntry>) => void
    deleteMoodEntry: (id: string) => void
    markNotificationAsRead: (id: string) => void
    deleteNotification: (id: string) => void
    markAllNotificationsAsRead: () => void
    updateUserProfile: (updates: Partial<UserProfile>) => void
    refreshData: () => void
    resetData: (dataTypes: string[]) => void
  }
  computed: {
    filteredTasks: Task[]
    filteredBudgetItems: BudgetItem[]
    filteredMeals: Meal[]
    filteredMoodEntries: MoodEntry[]
    filteredNotifications: Notification[]
    totalIncome: number
    totalExpenses: number
    netBalance: number
    taskCompletionRate: number
    averageMood: number
    weeklyProgress: number
    unreadNotificationsCount: number
  }
}

// Create Context
const DashboardContext = createContext<DashboardContextType | undefined>(undefined)

// Provider Component
interface DashboardProviderProps {
  children: ReactNode
}

export const DashboardProvider: React.FC<DashboardProviderProps> = ({ children }) => {
  const [state, setState] = useState<DashboardState>({
    stats: {
      productivityScore: 85,
      streakDays: 12,
      weeklyGoal: 20,
      weeklyProgress: 15,
      averageMood: 8,
      totalTasks: 25,
      completedTasks: 18,
      budgetSpent: 1200,
      budgetLimit: 2000,
      mealsPlanned: 14,
      totalMeals: 21
    },
    tasks: [
      {
        id: '1',
        title: 'Complete project proposal',
        description: 'Finish the quarterly project proposal for the marketing team',
        priority: 'high',
        status: 'pending',
        dueDate: '2024-01-25',
        category: 'work',
        createdAt: '2024-01-20T10:00:00Z',
        updatedAt: '2024-01-20T10:00:00Z'
      },
      {
        id: '2',
        title: 'Grocery shopping',
        description: 'Buy ingredients for weekly meal plan',
        priority: 'medium',
        status: 'completed',
        dueDate: '2024-01-22',
        category: 'personal',
        createdAt: '2024-01-19T15:30:00Z',
        updatedAt: '2024-01-21T09:00:00Z'
      }
    ],
    budgetItems: [
      {
        id: '1',
        title: 'Salary',
        amount: 5000,
        type: 'income',
        category: 'salary',
        date: '2024-01-15',
        description: 'Monthly salary payment'
      },
      {
        id: '2',
        title: 'Grocery shopping',
        amount: 150,
        type: 'expense',
        category: 'food',
        date: '2024-01-21',
        description: 'Weekly grocery shopping'
      }
    ],
    meals: [
      {
        id: '1',
        name: 'Grilled Chicken Salad',
        type: 'lunch',
        date: '2024-01-22',
        calories: 350,
        ingredients: ['chicken breast', 'mixed greens', 'tomatoes', 'olive oil'],
        instructions: ['Grill chicken', 'Mix salad', 'Add dressing'],
        prepTime: 15,
        cookTime: 20
      }
    ],
    moodEntries: [
      {
        id: '1',
        date: '2024-01-21',
        mood: 8,
        notes: 'Had a great workout and productive day at work',
        activities: ['exercise', 'work', 'reading'],
        sleepHours: 7.5,
        exerciseMinutes: 45
      }
    ],
    notifications: [
      {
        id: '1',
        type: 'task',
        title: 'Task Reminder',
        message: 'Your task "Complete project proposal" is due in 2 hours',
        time: '2 hours ago',
        read: false,
        priority: 'high'
      },
      {
        id: '2',
        type: 'budget',
        title: 'Budget Alert',
        message: 'You\'ve exceeded your monthly budget for groceries by $50',
        time: '4 hours ago',
        read: false,
        priority: 'medium'
      }
    ],
    userProfile: {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      location: 'New York, NY',
      birthday: '1990-05-15',
      bio: 'Productivity enthusiast and wellness advocate',
      avatar: '/api/placeholder/150/150',
      plan: 'premium',
      planExpiry: '2025-08-22'
    },
    isLoading: false,
    error: null,
    activeTab: 'overview',
    showStats: true,
    searchQuery: '',
    filters: {
      taskStatus: 'all',
      taskPriority: 'all',
      budgetType: 'all',
      mealType: 'all',
      moodRange: 'all'
    }
  })

  // Actions
  const actions = {
    setActiveTab: (tab: string) => {
      setState(prev => ({ ...prev, activeTab: tab }))
    },

    setShowStats: (show: boolean) => {
      setState(prev => ({ ...prev, showStats: show }))
    },

    setSearchQuery: (query: string) => {
      setState(prev => ({ ...prev, searchQuery: query }))
    },

    setFilters: (filters: Partial<DashboardState['filters']>) => {
      setState(prev => ({
        ...prev,
        filters: { ...prev.filters, ...filters }
      }))
    },

    addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
      const newTask: Task = {
        ...task,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      setState(prev => ({
        ...prev,
        tasks: [...prev.tasks, newTask]
      }))
    },

    updateTask: (id: string, updates: Partial<Task>) => {
      setState(prev => ({
        ...prev,
        tasks: prev.tasks.map(task =>
          task.id === id
            ? { ...task, ...updates, updatedAt: new Date().toISOString() }
            : task
        )
      }))
    },

    deleteTask: (id: string) => {
      setState(prev => ({
        ...prev,
        tasks: prev.tasks.filter(task => task.id !== id)
      }))
    },

    addBudgetItem: (item: Omit<BudgetItem, 'id'>) => {
      const newItem: BudgetItem = {
        ...item,
        id: Date.now().toString()
      }
      setState(prev => ({
        ...prev,
        budgetItems: [...prev.budgetItems, newItem]
      }))
    },

    updateBudgetItem: (id: string, updates: Partial<BudgetItem>) => {
      setState(prev => ({
        ...prev,
        budgetItems: prev.budgetItems.map(item =>
          item.id === id ? { ...item, ...updates } : item
        )
      }))
    },

    deleteBudgetItem: (id: string) => {
      setState(prev => ({
        ...prev,
        budgetItems: prev.budgetItems.filter(item => item.id !== id)
      }))
    },

    addMeal: (meal: Omit<Meal, 'id'>) => {
      const newMeal: Meal = {
        ...meal,
        id: Date.now().toString()
      }
      setState(prev => ({
        ...prev,
        meals: [...prev.meals, newMeal]
      }))
    },

    updateMeal: (id: string, updates: Partial<Meal>) => {
      setState(prev => ({
        ...prev,
        meals: prev.meals.map(meal =>
          meal.id === id ? { ...meal, ...updates } : meal
        )
      }))
    },

    deleteMeal: (id: string) => {
      setState(prev => ({
        ...prev,
        meals: prev.meals.filter(meal => meal.id !== id)
      }))
    },

    addMoodEntry: (entry: Omit<MoodEntry, 'id'>) => {
      const newEntry: MoodEntry = {
        ...entry,
        id: Date.now().toString()
      }
      setState(prev => ({
        ...prev,
        moodEntries: [...prev.moodEntries, newEntry]
      }))
    },

    updateMoodEntry: (id: string, updates: Partial<MoodEntry>) => {
      setState(prev => ({
        ...prev,
        moodEntries: prev.moodEntries.map(entry =>
          entry.id === id ? { ...entry, ...updates } : entry
        )
      }))
    },

    deleteMoodEntry: (id: string) => {
      setState(prev => ({
        ...prev,
        moodEntries: prev.moodEntries.filter(entry => entry.id !== id)
      }))
    },

    markNotificationAsRead: (id: string) => {
      setState(prev => ({
        ...prev,
        notifications: prev.notifications.map(notification =>
          notification.id === id ? { ...notification, read: true } : notification
        )
      }))
    },

    deleteNotification: (id: string) => {
      setState(prev => ({
        ...prev,
        notifications: prev.notifications.filter(notification => notification.id !== id)
      }))
    },

    markAllNotificationsAsRead: () => {
      setState(prev => ({
        ...prev,
        notifications: prev.notifications.map(notification => ({
          ...notification,
          read: true
        }))
      }))
    },

    updateUserProfile: (updates: Partial<UserProfile>) => {
      setState(prev => ({
        ...prev,
        userProfile: { ...prev.userProfile, ...updates }
      }))
    },

    refreshData: () => {
      setState(prev => ({ ...prev, isLoading: true }))
      // Simulate API call
      setTimeout(() => {
        setState(prev => ({ ...prev, isLoading: false }))
      }, 1000)
    },

    resetData: (dataTypes: string[]) => {
      setState(prev => {
        const newState = { ...prev }
        
        if (dataTypes.includes('tasks')) {
          newState.tasks = []
        }
        if (dataTypes.includes('budget')) {
          newState.budgetItems = []
        }
        if (dataTypes.includes('meals')) {
          newState.meals = []
        }
        if (dataTypes.includes('mood')) {
          newState.moodEntries = []
        }
        if (dataTypes.includes('notifications')) {
          newState.notifications = []
        }
        if (dataTypes.includes('preferences')) {
          // Reset preferences to defaults
          newState.userProfile = {
            ...newState.userProfile,
            bio: 'Productivity enthusiast and wellness advocate',
            location: 'New York, NY',
            phone: '+1 (555) 123-4567'
          }
        }
        
        return newState
      })
    }
  }

  // Computed values
  const computed = {
    filteredTasks: state.tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(state.searchQuery.toLowerCase())
      const matchesStatus = state.filters.taskStatus === 'all' || task.status === state.filters.taskStatus
      const matchesPriority = state.filters.taskPriority === 'all' || task.priority === state.filters.taskPriority
      return matchesSearch && matchesStatus && matchesPriority
    }),

    filteredBudgetItems: state.budgetItems.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(state.searchQuery.toLowerCase())
      const matchesType = state.filters.budgetType === 'all' || item.type === state.filters.budgetType
      return matchesSearch && matchesType
    }),

    filteredMeals: state.meals.filter(meal => {
      const matchesSearch = meal.name.toLowerCase().includes(state.searchQuery.toLowerCase())
      const matchesType = state.filters.mealType === 'all' || meal.type === state.filters.mealType
      return matchesSearch && matchesType
    }),

    filteredMoodEntries: state.moodEntries.filter(entry => {
      const matchesSearch = entry.notes.toLowerCase().includes(state.searchQuery.toLowerCase())
      const matchesRange = state.filters.moodRange === 'all' || 
        (state.filters.moodRange === 'high' && entry.mood >= 7) ||
        (state.filters.moodRange === 'medium' && entry.mood >= 4 && entry.mood < 7) ||
        (state.filters.moodRange === 'low' && entry.mood < 4)
      return matchesSearch && matchesRange
    }),

    filteredNotifications: state.notifications.filter(notification => {
      return notification.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        notification.message.toLowerCase().includes(state.searchQuery.toLowerCase())
    }),

    totalIncome: state.budgetItems
      .filter(item => item.type === 'income')
      .reduce((sum, item) => sum + item.amount, 0),

    totalExpenses: state.budgetItems
      .filter(item => item.type === 'expense')
      .reduce((sum, item) => sum + item.amount, 0),

    netBalance: computed.totalIncome - computed.totalExpenses,

    taskCompletionRate: state.tasks.length > 0 
      ? (state.tasks.filter(task => task.status === 'completed').length / state.tasks.length) * 100
      : 0,

    averageMood: state.moodEntries.length > 0
      ? state.moodEntries.reduce((sum, entry) => sum + entry.mood, 0) / state.moodEntries.length
      : 0,

    weeklyProgress: state.stats.weeklyProgress,

    unreadNotificationsCount: state.notifications.filter(notification => !notification.read).length
  }

  // Load initial data
  useEffect(() => {
    actions.refreshData()
  }, [])

  const value: DashboardContextType = {
    state,
    actions,
    computed
  }

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  )
}

// Hook to use dashboard context
export const useDashboard = () => {
  const context = useContext(DashboardContext)
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider')
  }
  return context
}

export default DashboardProvider 