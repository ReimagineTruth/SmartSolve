// Local Storage Service for SmartSolve
// Alternative to Supabase for data persistence

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  dueDate?: Date;
  priority: 'low' | 'medium' | 'high';
  category?: string;
}

export interface BudgetItem {
  id: string;
  name: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: Date;
  recurring?: boolean;
}

export interface Meal {
  id: string;
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTime: number;
  cookTime: number;
  servings: number;
  cost: number;
  category: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  isFavorite: boolean;
}

export interface UserPreferences {
  plan: 'free' | 'standard' | 'premium' | 'pro';
  theme: 'light' | 'dark';
  notifications: boolean;
  language: string;
  currency: string;
}

export interface WellnessData {
  mood: number; // 1-10 scale
  sleep: number; // hours
  water: number; // glasses
  exercise: number; // minutes
  date: Date;
}

class LocalStorageService {
  private readonly PREFIX = 'smartsolve_';

  // Generic storage methods
  private getKey(key: string): string {
    return `${this.PREFIX}${key}`;
  }

  private setItem<T>(key: string, value: T): void {
    try {
      localStorage.setItem(this.getKey(key), JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  private getItem<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(this.getKey(key));
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return defaultValue;
    }
  }

  // Tasks management
  getTasks(): Task[] {
    return this.getItem<Task[]>('tasks', []);
  }

  saveTasks(tasks: Task[]): void {
    this.setItem('tasks', tasks);
  }

  addTask(task: Omit<Task, 'id' | 'createdAt'>): Task {
    const tasks = this.getTasks();
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    tasks.push(newTask);
    this.saveTasks(tasks);
    return newTask;
  }

  updateTask(id: string, updates: Partial<Task>): void {
    const tasks = this.getTasks();
    const index = tasks.findIndex(task => task.id === id);
    if (index !== -1) {
      tasks[index] = { ...tasks[index], ...updates };
      this.saveTasks(tasks);
    }
  }

  deleteTask(id: string): void {
    const tasks = this.getTasks();
    const filteredTasks = tasks.filter(task => task.id !== id);
    this.saveTasks(filteredTasks);
  }

  // Budget management
  getBudgetItems(): BudgetItem[] {
    return this.getItem<BudgetItem[]>('budget', []);
  }

  saveBudgetItems(items: BudgetItem[]): void {
    this.setItem('budget', items);
  }

  addBudgetItem(item: Omit<BudgetItem, 'id'>): BudgetItem {
    const items = this.getBudgetItems();
    const newItem: BudgetItem = {
      ...item,
      id: Date.now().toString()
    };
    items.push(newItem);
    this.saveBudgetItems(items);
    return newItem;
  }

  updateBudgetItem(id: string, updates: Partial<BudgetItem>): void {
    const items = this.getBudgetItems();
    const index = items.findIndex(item => item.id === id);
    if (index !== -1) {
      items[index] = { ...items[index], ...updates };
      this.saveBudgetItems(items);
    }
  }

  deleteBudgetItem(id: string): void {
    const items = this.getBudgetItems();
    const filteredItems = items.filter(item => item.id !== id);
    this.saveBudgetItems(filteredItems);
  }

  // Meals management
  getMeals(): Meal[] {
    return this.getItem<Meal[]>('meals', []);
  }

  saveMeals(meals: Meal[]): void {
    this.setItem('meals', meals);
  }

  addMeal(meal: Omit<Meal, 'id'>): Meal {
    const meals = this.getMeals();
    const newMeal: Meal = {
      ...meal,
      id: Date.now().toString()
    };
    meals.push(newMeal);
    this.saveMeals(meals);
    return newMeal;
  }

  updateMeal(id: string, updates: Partial<Meal>): void {
    const meals = this.getMeals();
    const index = meals.findIndex(meal => meal.id === id);
    if (index !== -1) {
      meals[index] = { ...meals[index], ...updates };
      this.saveMeals(meals);
    }
  }

  deleteMeal(id: string): void {
    const meals = this.getMeals();
    const filteredMeals = meals.filter(meal => meal.id !== id);
    this.saveMeals(filteredMeals);
  }

  // User preferences
  getUserPreferences(): UserPreferences {
    return this.getItem<UserPreferences>('preferences', {
      plan: 'free',
      theme: 'light',
      notifications: true,
      language: 'en',
      currency: 'Pi'
    });
  }

  saveUserPreferences(preferences: UserPreferences): void {
    this.setItem('preferences', preferences);
  }

  updateUserPreferences(updates: Partial<UserPreferences>): void {
    const preferences = this.getUserPreferences();
    const updatedPreferences = { ...preferences, ...updates };
    this.saveUserPreferences(updatedPreferences);
  }

  // Wellness tracking
  getWellnessData(): WellnessData[] {
    return this.getItem<WellnessData[]>('wellness', []);
  }

  saveWellnessData(data: WellnessData[]): void {
    this.setItem('wellness', data);
  }

  addWellnessEntry(entry: Omit<WellnessData, 'date'>): WellnessData {
    const data = this.getWellnessData();
    const newEntry: WellnessData = {
      ...entry,
      date: new Date()
    };
    data.push(newEntry);
    this.saveWellnessData(data);
    return newEntry;
  }

  // Analytics and reporting
  getTaskStats() {
    const tasks = this.getTasks();
    const completed = tasks.filter(task => task.completed).length;
    const total = tasks.length;
    const today = new Date();
    const todayTasks = tasks.filter(task => {
      const taskDate = new Date(task.createdAt);
      return taskDate.toDateString() === today.toDateString();
    });

    return {
      total,
      completed,
      pending: total - completed,
      today: todayTasks.length,
      completionRate: total > 0 ? Math.round((completed / total) * 100) : 0
    };
  }

  getBudgetStats() {
    const items = this.getBudgetItems();
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const monthlyItems = items.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate.getMonth() === currentMonth && itemDate.getFullYear() === currentYear;
    });

    const income = monthlyItems
      .filter(item => item.type === 'income')
      .reduce((sum, item) => sum + item.amount, 0);

    const expenses = monthlyItems
      .filter(item => item.type === 'expense')
      .reduce((sum, item) => sum + item.amount, 0);

    const savings = income - expenses;

    return {
      income,
      expenses,
      savings,
      balance: savings,
      monthlyItems: monthlyItems.length
    };
  }

  // Data export/import
  exportData() {
    return {
      tasks: this.getTasks(),
      budget: this.getBudgetItems(),
      meals: this.getMeals(),
      preferences: this.getUserPreferences(),
      wellness: this.getWellnessData(),
      exportDate: new Date()
    };
  }

  importData(data: any) {
    if (data.tasks) this.saveTasks(data.tasks);
    if (data.budget) this.saveBudgetItems(data.budget);
    if (data.meals) this.saveMeals(data.meals);
    if (data.preferences) this.saveUserPreferences(data.preferences);
    if (data.wellness) this.saveWellnessData(data.wellness);
  }

  // Clear all data
  clearAllData() {
    const keys = ['tasks', 'budget', 'meals', 'preferences', 'wellness'];
    keys.forEach(key => {
      localStorage.removeItem(this.getKey(key));
    });
  }

  // Subscription management
  getSubscription(): {
    plan: 'free' | 'standard' | 'premium' | 'pro' | 'lifetime',
    billing: 'monthly' | 'yearly' | 'lifetime',
    status: 'active' | 'expired',
    expiration: string | null,
  } {
    return this.getItem('subscription', {
      plan: 'free',
      billing: 'monthly',
      status: 'active',
      expiration: null,
    });
  }

  saveSubscription(subscription: {
    plan: 'free' | 'standard' | 'premium' | 'pro' | 'lifetime',
    billing: 'monthly' | 'yearly' | 'lifetime',
    status: 'active' | 'expired',
    expiration: string | null,
  }): void {
    this.setItem('subscription', subscription);
  }

  updateSubscription(updates: Partial<{
    plan: 'free' | 'standard' | 'premium' | 'pro' | 'lifetime',
    billing: 'monthly' | 'yearly' | 'lifetime',
    status: 'active' | 'expired',
    expiration: string | null,
  }>): void {
    const current = this.getSubscription();
    const updated = { ...current, ...updates };
    this.saveSubscription(updated);
  }

  checkSubscriptionExpiration(): 'active' | 'expired' {
    const { expiration, plan } = this.getSubscription();
    if (plan === 'lifetime') return 'active';
    if (!expiration) return 'active';
    const now = new Date();
    const exp = new Date(expiration);
    return now > exp ? 'expired' : 'active';
  }

  clearSubscription(): void {
    localStorage.removeItem(this.getKey('subscription'));
  }
}

export const localStorageService = new LocalStorageService();
export default localStorageService; 