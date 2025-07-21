import React, { useState, useEffect } from 'react'
import { 
  DollarSign, 
  Plus, 
  TrendingUp,
  TrendingDown,
  PieChart,
  BarChart3,
  Calendar,
  Filter,
  Search,
  Trash2,
  Wallet,
  CreditCard,
  PiggyBank
} from 'lucide-react'

interface Expense {
  id: string
  title: string
  amount: number
  category: string
  date: string
  type: 'expense' | 'income'
  description?: string
}

const Budget: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddExpense, setShowAddExpense] = useState(false)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [newExpense, setNewExpense] = useState({
    title: '',
    amount: '',
    category: 'food',
    date: new Date().toISOString().split('T')[0],
    type: 'expense' as const,
    description: ''
  })

  useEffect(() => {
    // if (user?.email) {
    //   loadExpenses()
    // }
  }, [])

  const loadExpenses = async () => {
    try {
      setLoading(true)
      // const userExpenses = await dataService.getExpenses(user?.email || '')
      // setExpenses(userExpenses)
    } catch (error) {
      console.error('Error loading expenses:', error)
      // toast.error('Failed to load expenses')
    } finally {
      setLoading(false)
    }
  }

  const addExpense = async () => {
    if (!newExpense.title.trim() || !newExpense.amount) {
      // toast.error('Please fill in all required fields')
      return
    }

    try {
      const expense: Expense = {
        id: Date.now().toString(),
        title: newExpense.title,
        amount: parseFloat(newExpense.amount),
        category: newExpense.category,
        date: newExpense.date,
        type: newExpense.type,
        description: newExpense.description
      }

      const updatedExpenses = [expense, ...expenses]
      // await dataService.saveExpenses(user?.email || '', updatedExpenses)
      setExpenses(updatedExpenses)
      setNewExpense({
        title: '',
        amount: '',
        category: 'food',
        date: new Date().toISOString().split('T')[0],
        type: 'expense',
        description: ''
      })
      setShowAddExpense(false)
      // toast.success('Transaction added successfully!')
    } catch (error) {
      console.error('Error adding expense:', error)
      // toast.error('Failed to add transaction')
    }
  }

  const deleteExpense = async (expenseId: string) => {
    try {
      const updatedExpenses = expenses.filter(expense => expense.id !== expenseId)
      // await dataService.saveExpenses(user?.email || '', updatedExpenses)
      setExpenses(updatedExpenses)
      // toast.success('Transaction deleted!')
    } catch (error) {
      console.error('Error deleting expense:', error)
      // toast.error('Failed to delete transaction')
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'food': return <PieChart className="h-4 w-4" />
      case 'transport': return <TrendingUp className="h-4 w-4" />
      case 'entertainment': return <BarChart3 className="h-4 w-4" />
      case 'shopping': return <CreditCard className="h-4 w-4" />
      case 'health': return <PiggyBank className="h-4 w-4" />
      case 'bills': return <Wallet className="h-4 w-4" />
      case 'salary': return <PiggyBank className="h-4 w-4" />
      default: return <DollarSign className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'food': return 'text-orange-600 bg-orange-50 border-orange-200'
      case 'transport': return 'text-blue-600 bg-blue-50 border-blue-200'
      case 'entertainment': return 'text-purple-600 bg-purple-50 border-purple-200'
      case 'shopping': return 'text-pink-600 bg-pink-50 border-pink-200'
      case 'health': return 'text-green-600 bg-green-50 border-green-200'
      case 'bills': return 'text-red-600 bg-red-50 border-red-200'
      case 'salary': return 'text-emerald-600 bg-emerald-50 border-emerald-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const filteredExpenses = expenses.filter(expense => {
    const matchesFilter = filter === 'all' || 
      (filter === 'expenses' && expense.type === 'expense') ||
      (filter === 'income' && expense.type === 'income') ||
      (filter === 'category' && expense.category === filter)
    
    const matchesSearch = expense.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (expense.description && expense.description.toLowerCase().includes(searchTerm.toLowerCase()))
    
    return matchesFilter && matchesSearch
  })

  const stats = {
    totalIncome: expenses.filter(e => e.type === 'income').reduce((sum, e) => sum + e.amount, 0),
    totalExpenses: expenses.filter(e => e.type === 'expense').reduce((sum, e) => sum + e.amount, 0),
    balance: expenses.filter(e => e.type === 'income').reduce((sum, e) => sum + e.amount, 0) - 
             expenses.filter(e => e.type === 'expense').reduce((sum, e) => sum + e.amount, 0),
    monthlyExpenses: expenses
      .filter(e => e.type === 'expense' && new Date(e.date).getMonth() === new Date().getMonth())
      .reduce((sum, e) => sum + e.amount, 0)
  }

  const categories = [
    { value: 'food', label: 'Food & Dining' },
    { value: 'transport', label: 'Transportation' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'shopping', label: 'Shopping' },
    { value: 'health', label: 'Healthcare' },
    { value: 'bills', label: 'Bills & Utilities' },
    { value: 'salary', label: 'Salary' }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Budget & Finance</h1>
          <p className="text-gray-600">Track your income, expenses, and financial goals</p>
        </div>
        <button
          onClick={() => setShowAddExpense(true)}
          className="bg-blue-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
        >
          <Plus className="h-5 w-5" />
          Add Transaction
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Balance</p>
              <p className={`text-3xl font-bold ${stats.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${stats.balance.toFixed(2)}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-blue-50">
              <Wallet className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Income</p>
              <p className="text-3xl font-bold text-green-600">
                ${stats.totalIncome.toFixed(2)}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-green-50">
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </div>

        <div
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Expenses</p>
              <p className="text-3xl font-bold text-red-600">
                ${stats.totalExpenses.toFixed(2)}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-red-50">
              <TrendingDown className="h-8 w-8 text-red-600" />
            </div>
          </div>
        </div>

        <div
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-3xl font-bold text-orange-600">
                ${stats.monthlyExpenses.toFixed(2)}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-orange-50">
              <Calendar className="h-8 w-8 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Transactions</option>
                <option value="expenses">Expenses Only</option>
                <option value="income">Income Only</option>
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-64"
            />
          </div>
        </div>
      </div>

      {/* Add Transaction Form */}
      {showAddExpense && (
        <div
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Add New Transaction</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Transaction title"
              value={newExpense.title}
              onChange={(e) => setNewExpense({...newExpense, title: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="number"
              placeholder="Amount"
              value={newExpense.amount}
              onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <select
              value={newExpense.type}
              onChange={(e) => setNewExpense({...newExpense, type: e.target.value as any})}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
            <select
              value={newExpense.category}
              onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
            <input
              type="date"
              value={newExpense.date}
              onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <textarea
            placeholder="Description (optional)"
            value={newExpense.description}
            onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
            rows={3}
          />
          <div className="flex gap-2">
            <button
              onClick={addExpense}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Add Transaction
            </button>
            <button
              onClick={() => setShowAddExpense(false)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Transactions List */}
      <div className="space-y-4">
        {filteredExpenses.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 text-center">
            <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No transactions found</h3>
            <p className="text-gray-600">Add your first transaction to start tracking your finances!</p>
          </div>
        ) : (
          filteredExpenses.map((expense, index) => (
            <div
              key={expense.id}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${expense.type === 'income' ? 'bg-green-50' : 'bg-red-50'}`}>
                    {expense.type === 'income' ? (
                      <TrendingUp className="h-6 w-6 text-green-600" />
                    ) : (
                      <TrendingDown className="h-6 w-6 text-red-600" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {expense.title}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(expense.category)}`}>
                        {categories.find(c => c.value === expense.category)?.label || expense.category}
                      </span>
                      <div className="flex items-center text-gray-500">
                        {getCategoryIcon(expense.category)}
                      </div>
                    </div>
                    
                    {expense.description && (
                      <p className="text-gray-600 mb-2">
                        {expense.description}
                      </p>
                    )}
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(expense.date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className={`text-xl font-bold ${expense.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                      {expense.type === 'income' ? '+' : '-'}${expense.amount.toFixed(2)}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => deleteExpense(expense.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Budget 