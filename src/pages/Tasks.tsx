import React, { useState, useEffect } from 'react'
import { 
  CheckSquare, 
  Plus, 
  Trash2, 
  Clock,
  Target,
  Users,
  Heart,
  Filter,
  Search,
  CheckCircle,
  Circle,
  AlertTriangle,
  CalendarDays,
  ListTodo,
  Edit
} from 'lucide-react'

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

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddTask, setShowAddTask] = useState(false)

  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium' as const,
    category: 'personal'
  })

  useEffect(() => {
    // if (user?.email) { // Removed: user?.email
    //   loadTasks() // Removed: loadTasks()
    // }
  }, []) // Removed: [user]

  const loadTasks = async () => {
    try {
      setLoading(true)
      // const userTasks = await dataService.getTasks(user?.email || '') // Removed: dataService.getTasks
      setTasks([]) // Placeholder for now
    } catch (error) {
      console.error('Error loading tasks:', error)
      // toast.error('Failed to load tasks') // Removed: toast.error
    } finally {
      setLoading(false)
    }
  }

  const addTask = async () => {
    if (!newTask.title.trim()) {
      // toast.error('Please enter a task title') // Removed: toast.error
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

      const updatedTasks = [task, ...tasks]
      // await dataService.saveTasks(user?.email || '', updatedTasks) // Removed: dataService.saveTasks
      setTasks(updatedTasks)
      setNewTask({ title: '', description: '', dueDate: '', priority: 'medium', category: 'personal' })
      setShowAddTask(false)
      // toast.success('Task added successfully!') // Removed: toast.success
    } catch (error) {
      console.error('Error adding task:', error)
      // toast.error('Failed to add task') // Removed: toast.error
    }
  }

  const updateTask = async (taskId: string, updates: Partial<Task>) => {
    try {
      const updatedTasks = tasks.map(task => 
        task.id === taskId ? { ...task, ...updates } : task
      )
      // await dataService.saveTasks(user?.email || '', updatedTasks) // Removed: dataService.saveTasks
      setTasks(updatedTasks)
      // toast.success('Task updated!') // Removed: toast.success
    } catch (error) {
      console.error('Error updating task:', error)
      // toast.error('Failed to update task') // Removed: toast.error
    }
  }

  const deleteTask = async (taskId: string) => {
    try {
      const updatedTasks = tasks.filter(task => task.id !== taskId)
      // await dataService.saveTasks(user?.email || '', updatedTasks) // Removed: dataService.saveTasks
      setTasks(updatedTasks)
      // toast.success('Task deleted!') // Removed: toast.success
    } catch (error) {
      console.error('Error deleting task:', error)
      // toast.error('Failed to delete task') // Removed: toast.error
    }
  }

  const toggleTaskComplete = async (taskId: string) => {
    const task = tasks.find(t => t.id === taskId)
    if (task) {
      await updateTask(taskId, { completed: !task.completed })
    }
  }

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

  const filteredTasks = tasks.filter(task => {
    const matchesFilter = filter === 'all' || 
      (filter === 'completed' && task.completed) ||
      (filter === 'pending' && !task.completed) ||
      (filter === 'overdue' && new Date(task.dueDate) < new Date() && !task.completed)
    
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()))
    
    return matchesFilter && matchesSearch
  })

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length,
    overdue: tasks.filter(t => new Date(t.dueDate) < new Date() && !t.completed).length
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tasks</h1>
          <p className="text-gray-600">Manage your daily tasks and priorities</p>
        </div>
        <button
          onClick={() => setShowAddTask(true)}
          className="bg-blue-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
        >
          <Plus className="h-5 w-5" />
          Add Task
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Removed: motion.div */}
        <div
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Tasks</p>
              <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="p-3 rounded-xl bg-blue-50">
              <ListTodo className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Removed: motion.div */}
        <div
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
            </div>
            <div className="p-3 rounded-xl bg-green-50">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </div>

        {/* Removed: motion.div */}
        <div
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
            </div>
            <div className="p-3 rounded-xl bg-yellow-50">
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </div>
        </div>

        {/* Removed: motion.div */}
        <div
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Overdue</p>
              <p className="text-3xl font-bold text-red-600">{stats.overdue}</p>
            </div>
            <div className="p-3 rounded-xl bg-red-50">
              <AlertTriangle className="h-8 w-8 text-red-600" />
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
                <option value="all">All Tasks</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-64"
            />
          </div>
        </div>
      </div>

      {/* Add Task Form */}
      {showAddTask && (
        {/* Removed: motion.div */}
        <div
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Add New Task</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
          <textarea
            placeholder="Task description (optional)"
            value={newTask.description}
            onChange={(e) => setNewTask({...newTask, description: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
            rows={3}
          />
          <div className="flex gap-2">
            <button
              onClick={addTask}
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

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 text-center">
            <CheckSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No tasks found</h3>
            <p className="text-gray-600">Create your first task to get started!</p>
          </div>
        ) : (
          filteredTasks.map((task, index) => (
            {/* Removed: motion.div */}
            <div
              key={task.id}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <button
                  onClick={() => toggleTaskComplete(task.id)}
                  className="mt-1"
                >
                  {task.completed ? (
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  ) : (
                    <Circle className="h-6 w-6 text-gray-400" />
                  )}
                </button>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className={`text-lg font-semibold ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                          {task.title}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                        <div className="flex items-center text-gray-500">
                          {getCategoryIcon(task.category)}
                        </div>
                      </div>
                      
                      {task.description && (
                        <p className={`text-gray-600 mb-3 ${task.completed ? 'line-through' : ''}`}>
                          {task.description}
                        </p>
                      )}
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <CalendarDays className="h-4 w-4" />
                          {new Date(task.dueDate).toLocaleDateString()}
                        </div>
                        {new Date(task.dueDate) < new Date() && !task.completed && (
                          <div className="flex items-center gap-1 text-red-500">
                            <AlertTriangle className="h-4 w-4" />
                            Overdue
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateTask(task.id, {})}
                        className="text-blue-500 hover:text-blue-700 transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
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

export default Tasks 