// Initialize Supabase client with proper fallbacks
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

// Only create Supabase client if we have valid credentials
let supabase: any = null

try {
  if (supabaseUrl && supabaseKey && 
      supabaseUrl !== 'https://placeholder.supabase.co' && 
      supabaseKey !== 'placeholder-key') {
    supabase = createClient(supabaseUrl, supabaseKey)
  }
} catch (error) {
  console.warn('Supabase client initialization failed, using localStorage fallback:', error)
}

export { supabase }

// Data service with local storage fallback
export class DataService {
  private static instance: DataService
  private useLocalStorage: boolean = true // Set to false when Supabase is configured

  private constructor() {}

  static getInstance(): DataService {
    if (!DataService.instance) {
      DataService.instance = new DataService()
    }
    return DataService.instance
  }

  // User data management
  async saveUserData(userId: string, data: any): Promise<void> {
    if (this.useLocalStorage) {
      localStorage.setItem(`userData_${userId}`, JSON.stringify(data))
      return
    }

    if (!supabase) {
      // Fallback to localStorage if Supabase is not available
      localStorage.setItem(`userData_${userId}`, JSON.stringify(data))
      return
    }

    try {
      const { error } = await supabase
        .from('user_data')
        .upsert({
          user_id: userId,
          data: data,
          updated_at: new Date().toISOString()
        })

      if (error) throw error
    } catch (error) {
      console.error('Error saving user data:', error)
      // Fallback to localStorage
      localStorage.setItem(`userData_${userId}`, JSON.stringify(data))
    }
  }

  async getUserData(userId: string): Promise<any> {
    if (this.useLocalStorage) {
      const data = localStorage.getItem(`userData_${userId}`)
      return data ? JSON.parse(data) : null
    }

    if (!supabase) {
      // Fallback to localStorage if Supabase is not available
      const data = localStorage.getItem(`userData_${userId}`)
      return data ? JSON.parse(data) : null
    }

    try {
      const { data, error } = await supabase
        .from('user_data')
        .select('data')
        .eq('user_id', userId)
        .single()

      if (error) throw error
      return data?.data || null
    } catch (error) {
      console.error('Error loading user data:', error)
      // Fallback to localStorage
      const data = localStorage.getItem(`userData_${userId}`)
      return data ? JSON.parse(data) : null
    }
  }

  // Tasks management
  async saveTasks(userId: string, tasks: any[]): Promise<void> {
    if (this.useLocalStorage) {
      const userData = await this.getUserData(userId) || {}
      userData.tasks = tasks
      await this.saveUserData(userId, userData)
      return
    }

    if (!supabase) {
      // Fallback to localStorage if Supabase is not available
      const userData = await this.getUserData(userId) || {}
      userData.tasks = tasks
      await this.saveUserData(userId, userData)
      return
    }

    try {
      const { error } = await supabase
        .from('tasks')
        .upsert(
          tasks.map(task => ({
            id: task.id,
            user_id: userId,
            title: task.title,
            description: task.description,
            completed: task.completed,
            due_date: task.dueDate,
            priority: task.priority,
            category: task.category,
            created_at: task.createdAt
          }))
        )

      if (error) throw error
    } catch (error) {
      console.error('Error saving tasks:', error)
      // Fallback to localStorage
      const userData = await this.getUserData(userId) || {}
      userData.tasks = tasks
      await this.saveUserData(userId, userData)
    }
  }

  async getTasks(userId: string): Promise<any[]> {
    if (this.useLocalStorage) {
      const userData = await this.getUserData(userId)
      return userData?.tasks || []
    }

    if (!supabase) {
      // Fallback to localStorage if Supabase is not available
      const userData = await this.getUserData(userId)
      return userData?.tasks || []
    }

    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error loading tasks:', error)
      // Fallback to localStorage
      const userData = await this.getUserData(userId)
      return userData?.tasks || []
    }
  }

  // Expenses management
  async saveExpenses(userId: string, expenses: any[]): Promise<void> {
    if (this.useLocalStorage) {
      const userData = await this.getUserData(userId) || {}
      userData.expenses = expenses
      await this.saveUserData(userId, userData)
      return
    }

    if (!supabase) {
      // Fallback to localStorage if Supabase is not available
      const userData = await this.getUserData(userId) || {}
      userData.expenses = expenses
      await this.saveUserData(userId, userData)
      return
    }

    try {
      const { error } = await supabase
        .from('expenses')
        .upsert(
          expenses.map(expense => ({
            id: expense.id,
            user_id: userId,
            title: expense.title,
            amount: expense.amount,
            category: expense.category,
            date: expense.date,
            type: expense.type,
            description: expense.description
          }))
        )

      if (error) throw error
    } catch (error) {
      console.error('Error saving expenses:', error)
      // Fallback to localStorage
      const userData = await this.getUserData(userId) || {}
      userData.expenses = expenses
      await this.saveUserData(userId, userData)
    }
  }

  async getExpenses(userId: string): Promise<any[]> {
    if (this.useLocalStorage) {
      const userData = await this.getUserData(userId)
      return userData?.expenses || []
    }

    if (!supabase) {
      // Fallback to localStorage if Supabase is not available
      const userData = await this.getUserData(userId)
      return userData?.expenses || []
    }

    try {
      const { data, error } = await supabase
        .from('expenses')
        .select('*')
        .eq('user_id', userId)
        .order('date', { ascending: false })

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error loading expenses:', error)
      // Fallback to localStorage
      const userData = await this.getUserData(userId)
      return userData?.expenses || []
    }
  }

  // Meals management
  async saveMeals(userId: string, meals: any[]): Promise<void> {
    if (this.useLocalStorage) {
      const userData = await this.getUserData(userId) || {}
      userData.meals = meals
      await this.saveUserData(userId, userData)
      return
    }

    if (!supabase) {
      // Fallback to localStorage if Supabase is not available
      const userData = await this.getUserData(userId) || {}
      userData.meals = meals
      await this.saveUserData(userId, userData)
      return
    }

    try {
      const { error } = await supabase
        .from('meals')
        .upsert(
          meals.map(meal => ({
            id: meal.id,
            user_id: userId,
            name: meal.name,
            ingredients: meal.ingredients,
            instructions: meal.instructions,
            prep_time: meal.prepTime,
            cook_time: meal.cookTime,
            servings: meal.servings,
            category: meal.category,
            date: meal.date
          }))
        )

      if (error) throw error
    } catch (error) {
      console.error('Error saving meals:', error)
      // Fallback to localStorage
      const userData = await this.getUserData(userId) || {}
      userData.meals = meals
      await this.saveUserData(userId, userData)
    }
  }

  async getMeals(userId: string): Promise<any[]> {
    if (this.useLocalStorage) {
      const userData = await this.getUserData(userId)
      return userData?.meals || []
    }

    if (!supabase) {
      // Fallback to localStorage if Supabase is not available
      const userData = await this.getUserData(userId)
      return userData?.meals || []
    }

    try {
      const { data, error } = await supabase
        .from('meals')
        .select('*')
        .eq('user_id', userId)
        .order('date', { ascending: false })

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error loading meals:', error)
      // Fallback to localStorage
      const userData = await this.getUserData(userId)
      return userData?.meals || []
    }
  }

  // Wellness management
  async saveWellnessEntries(userId: string, entries: any[]): Promise<void> {
    if (this.useLocalStorage) {
      const userData = await this.getUserData(userId) || {}
      userData.wellnessEntries = entries
      await this.saveUserData(userId, userData)
      return
    }

    if (!supabase) {
      // Fallback to localStorage if Supabase is not available
      const userData = await this.getUserData(userId) || {}
      userData.wellnessEntries = entries
      await this.saveUserData(userId, userData)
      return
    }

    try {
      const { error } = await supabase
        .from('wellness_entries')
        .upsert(
          entries.map(entry => ({
            id: entry.id,
            user_id: userId,
            date: entry.date,
            mood: entry.mood,
            sleep: entry.sleep,
            exercise: entry.exercise,
            meditation: entry.meditation,
            notes: entry.notes
          }))
        )

      if (error) throw error
    } catch (error) {
      console.error('Error saving wellness entries:', error)
      // Fallback to localStorage
      const userData = await this.getUserData(userId) || {}
      userData.wellnessEntries = entries
      await this.saveUserData(userId, userData)
    }
  }

  async getWellnessEntries(userId: string): Promise<any[]> {
    if (this.useLocalStorage) {
      const userData = await this.getUserData(userId)
      return userData?.wellnessEntries || []
    }

    if (!supabase) {
      // Fallback to localStorage if Supabase is not available
      const userData = await this.getUserData(userId)
      return userData?.wellnessEntries || []
    }

    try {
      const { data, error } = await supabase
        .from('wellness_entries')
        .select('*')
        .eq('user_id', userId)
        .order('date', { ascending: false })

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error loading wellness entries:', error)
      // Fallback to localStorage
      const userData = await this.getUserData(userId)
      return userData?.wellnessEntries || []
    }
  }

  // Analytics and statistics
  async getDashboardStats(userId: string): Promise<any> {
    const userData = await this.getUserData(userId)
    if (!userData) return null

    const tasks = userData.tasks || []
    const expenses = userData.expenses || []
    const meals = userData.meals || []
    const wellnessEntries = userData.wellnessEntries || []

    const completedTasks = tasks.filter((task: any) => task.completed).length
    const totalTasks = tasks.length
    const monthlyExpenses = expenses
      .filter((expense: any) => expense.type === 'expense' && new Date(expense.date).getMonth() === new Date().getMonth())
      .reduce((sum: number, expense: any) => sum + expense.amount, 0)
    const monthlyIncome = expenses
      .filter((expense: any) => expense.type === 'income' && new Date(expense.date).getMonth() === new Date().getMonth())
      .reduce((sum: number, expense: any) => sum + expense.amount, 0)
    const averageMood = wellnessEntries.length > 0 
      ? wellnessEntries.reduce((sum: number, entry: any) => sum + entry.mood, 0) / wellnessEntries.length 
      : 0

    return {
      tasksCompleted: completedTasks,
      totalTasks,
      totalBudget: userData.totalBudget || 0,
      monthlyExpenses,
      monthlyIncome,
      mealsPlanned: meals.length,
      wellnessDays: wellnessEntries.length,
      averageMood: Math.round(averageMood * 10) / 10,
      recentTasks: tasks.slice(0, 5),
      upcomingExpenses: expenses.slice(0, 5),
      recentMeals: meals.slice(0, 3),
      wellnessEntries: wellnessEntries.slice(0, 7)
    }
  }

  // Initialize user data with sample data
  async initializeUserData(userId: string): Promise<void> {
    const existingData = await this.getUserData(userId)
    if (existingData) return

    const sampleData = {
      totalBudget: 2500,
      tasks: [
        {
          id: '1',
          title: 'Complete project proposal',
          description: 'Finish the Q1 project proposal for the new client',
          completed: false,
          dueDate: '2024-01-15',
          priority: 'high',
          category: 'work',
          createdAt: '2024-01-10'
        },
        {
          id: '2',
          title: 'Buy groceries',
          description: 'Get ingredients for this week\'s meals',
          completed: true,
          dueDate: '2024-01-14',
          priority: 'medium',
          category: 'personal',
          createdAt: '2024-01-09'
        }
      ],
      expenses: [
        {
          id: '1',
          title: 'Rent',
          amount: 1200,
          category: 'housing',
          date: '2024-01-20',
          type: 'expense',
          description: 'Monthly rent payment'
        },
        {
          id: '2',
          title: 'Salary',
          amount: 3000,
          category: 'income',
          date: '2024-01-31',
          type: 'income',
          description: 'Monthly salary'
        }
      ],
      meals: [
        {
          id: '1',
          name: 'Grilled Chicken Salad',
          ingredients: ['chicken breast', 'lettuce', 'tomatoes', 'olive oil'],
          instructions: ['Grill chicken', 'Chop vegetables', 'Mix salad'],
          prepTime: 15,
          cookTime: 20,
          servings: 2,
          category: 'lunch',
          date: '2024-01-14'
        }
      ],
      wellnessEntries: [
        {
          id: '1',
          date: '2024-01-14',
          mood: 8,
          sleep: 7.5,
          exercise: true,
          meditation: true,
          notes: 'Great day, feeling energized'
        }
      ]
    }

    await this.saveUserData(userId, sampleData)
  }
}

export const dataService = DataService.getInstance() 