import React, { useState, useEffect } from 'react'
import { 
  Utensils, 
  Plus, 
  Clock,
  Users,
  ChefHat,
  Search,
  Filter,
  Trash2,
  Calendar,
  Heart,
  Star,
  X,
  Sun
} from 'lucide-react'
import Footer from '../components/Footer'

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
  favorite?: boolean
}

const Meals: React.FC = () => {
  const [meals, setMeals] = useState<Meal[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddMeal, setShowAddMeal] = useState(false)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [newMeal, setNewMeal] = useState({
    name: '',
    ingredients: [''],
    instructions: [''],
    prepTime: 15,
    cookTime: 30,
    servings: 2,
    category: 'breakfast',
    date: new Date().toISOString().split('T')[0]
  })

  useEffect(() => {
    // if (user?.email) {
    //   loadMeals()
    // }
  }, [])

  const loadMeals = async () => {
    try {
      setLoading(true)
      // const userMeals = await dataService.getMeals(user?.email || '')
      // setMeals(userMeals)
    } catch (error) {
      console.error('Error loading meals:', error)
      // toast.error('Failed to load meals')
    } finally {
      setLoading(false)
    }
  }

  const addMeal = async () => {
    if (!newMeal.name.trim()) {
      // toast.error('Please enter a meal name')
      return
    }

    try {
      const meal: Meal = {
        id: Date.now().toString(),
        name: newMeal.name,
        ingredients: newMeal.ingredients.filter(ing => ing.trim()),
        instructions: newMeal.instructions.filter(inst => inst.trim()),
        prepTime: newMeal.prepTime,
        cookTime: newMeal.cookTime,
        servings: newMeal.servings,
        category: newMeal.category,
        date: newMeal.date
      }

      const updatedMeals = [meal, ...meals]
      // await dataService.saveMeals(user?.email || '', updatedMeals)
      setMeals(updatedMeals)
      setNewMeal({
        name: '',
        ingredients: [''],
        instructions: [''],
        prepTime: 15,
        cookTime: 30,
        servings: 2,
        category: 'breakfast',
        date: new Date().toISOString().split('T')[0]
      })
      setShowAddMeal(false)
      // toast.success('Meal added successfully!')
    } catch (error) {
      console.error('Error adding meal:', error)
      // toast.error('Failed to add meal')
    }
  }

  const deleteMeal = async (mealId: string) => {
    try {
      const updatedMeals = meals.filter(meal => meal.id !== mealId)
      // await dataService.saveMeals(user?.email || '', updatedMeals)
      setMeals(updatedMeals)
      // toast.success('Meal deleted!')
    } catch (error) {
      console.error('Error deleting meal:', error)
      // toast.error('Failed to delete meal')
    }
  }

  const toggleFavorite = async (mealId: string) => {
    try {
      const updatedMeals = meals.map(meal => 
        meal.id === mealId ? { ...meal, favorite: !meal.favorite } : meal
      )
      // await dataService.saveMeals(user?.email || '', updatedMeals)
      setMeals(updatedMeals)
    } catch (error) {
      console.error('Error updating meal:', error)
      // toast.error('Failed to update meal')
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'breakfast': return <Sun className="h-4 w-4" />
      case 'lunch': return <Utensils className="h-4 w-4" />
      case 'dinner': return <ChefHat className="h-4 w-4" />
      case 'snack': return <Heart className="h-4 w-4" />
      default: return <Utensils className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'breakfast': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'lunch': return 'text-orange-600 bg-orange-50 border-orange-200'
      case 'dinner': return 'text-purple-600 bg-purple-50 border-purple-200'
      case 'snack': return 'text-green-600 bg-green-50 border-green-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const filteredMeals = meals.filter(meal => {
    const matchesFilter = filter === 'all' || 
      (filter === 'favorites' && meal.favorite) ||
      (filter === 'category' && meal.category === filter)
    
    const matchesSearch = meal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meal.ingredients.some(ing => ing.toLowerCase().includes(searchTerm.toLowerCase()))
    
    return matchesFilter && matchesSearch
  })

  const stats = {
    total: meals.length,
    favorites: meals.filter(m => m.favorite).length,
    thisWeek: meals.filter(m => {
      const mealDate = new Date(m.date)
      const now = new Date()
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      return mealDate >= weekAgo
    }).length,
    totalTime: meals.reduce((sum, m) => sum + m.prepTime + m.cookTime, 0)
  }

  const categories = [
    { value: 'breakfast', label: 'Breakfast' },
    { value: 'lunch', label: 'Lunch' },
    { value: 'dinner', label: 'Dinner' },
    { value: 'snack', label: 'Snack' }
  ]

  const addIngredient = () => {
    setNewMeal({...newMeal, ingredients: [...newMeal.ingredients, '']})
  }

  const removeIngredient = (index: number) => {
    const updatedIngredients = newMeal.ingredients.filter((_, i) => i !== index)
    setNewMeal({...newMeal, ingredients: updatedIngredients})
  }

  const updateIngredient = (index: number, value: string) => {
    const updatedIngredients = [...newMeal.ingredients]
    updatedIngredients[index] = value
    setNewMeal({...newMeal, ingredients: updatedIngredients})
  }

  const addInstruction = () => {
    setNewMeal({...newMeal, instructions: [...newMeal.instructions, '']})
  }

  const removeInstruction = (index: number) => {
    const updatedInstructions = newMeal.instructions.filter((_, i) => i !== index)
    setNewMeal({...newMeal, instructions: updatedInstructions})
  }

  const updateInstruction = (index: number, value: string) => {
    const updatedInstructions = [...newMeal.instructions]
    updatedInstructions[index] = value
    setNewMeal({...newMeal, instructions: updatedInstructions})
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Meal Planning</h1>
          <p className="text-gray-600">Plan your meals, discover recipes, and manage your nutrition</p>
        </div>
        <button
          onClick={() => setShowAddMeal(true)}
          className="bg-blue-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
        >
          <Plus className="h-5 w-5" />
          Add Meal
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Meals</p>
              <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="p-3 rounded-xl bg-blue-50">
              <Utensils className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Favorites</p>
              <p className="text-3xl font-bold text-yellow-600">{stats.favorites}</p>
            </div>
            <div className="p-3 rounded-xl bg-yellow-50">
              <Star className="h-8 w-8 text-yellow-600" />
            </div>
          </div>
        </div>

        <div
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">This Week</p>
              <p className="text-3xl font-bold text-green-600">{stats.thisWeek}</p>
            </div>
            <div className="p-3 rounded-xl bg-green-50">
              <Calendar className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </div>

        <div
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Time</p>
              <p className="text-3xl font-bold text-orange-600">{stats.totalTime}m</p>
            </div>
            <div className="p-3 rounded-xl bg-orange-50">
              <Clock className="h-8 w-8 text-orange-600" />
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
                <option value="all">All Meals</option>
                <option value="favorites">Favorites</option>
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
              placeholder="Search meals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-64"
            />
          </div>
        </div>
      </div>

      {/* Add Meal Form */}
      {showAddMeal && (
        <div
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Add New Meal</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Meal name"
              value={newMeal.name}
              onChange={(e) => setNewMeal({...newMeal, name: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <select
              value={newMeal.category}
              onChange={(e) => setNewMeal({...newMeal, category: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Prep time (minutes)"
              value={newMeal.prepTime}
              onChange={(e) => setNewMeal({...newMeal, prepTime: parseInt(e.target.value)})}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="number"
              placeholder="Cook time (minutes)"
              value={newMeal.cookTime}
              onChange={(e) => setNewMeal({...newMeal, cookTime: parseInt(e.target.value)})}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="number"
              placeholder="Servings"
              value={newMeal.servings}
              onChange={(e) => setNewMeal({...newMeal, servings: parseInt(e.target.value)})}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="date"
              value={newMeal.date}
              onChange={(e) => setNewMeal({...newMeal, date: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Ingredients */}
          <div className="mb-4">
            <h4 className="font-semibold text-gray-900 mb-2">Ingredients</h4>
            {newMeal.ingredients.map((ingredient, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Ingredient"
                  value={ingredient}
                  onChange={(e) => updateIngredient(index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={() => removeIngredient(index)}
                  className="px-3 py-2 text-red-500 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
            <button
              onClick={addIngredient}
              className="text-blue-500 hover:text-blue-700 text-sm"
            >
              + Add Ingredient
            </button>
          </div>

          {/* Instructions */}
          <div className="mb-4">
            <h4 className="font-semibold text-gray-900 mb-2">Instructions</h4>
            {newMeal.instructions.map((instruction, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <span className="text-gray-500 mt-2">{index + 1}.</span>
                <input
                  type="text"
                  placeholder="Instruction step"
                  value={instruction}
                  onChange={(e) => updateInstruction(index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={() => removeInstruction(index)}
                  className="px-3 py-2 text-red-500 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
            <button
              onClick={addInstruction}
              className="text-blue-500 hover:text-blue-700 text-sm"
            >
              + Add Instruction
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={addMeal}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Add Meal
            </button>
            <button
              onClick={() => setShowAddMeal(false)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Meals List */}
      <div className="space-y-4">
        {filteredMeals.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 text-center">
            <Utensils className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No meals found</h3>
            <p className="text-gray-600">Add your first meal to start planning your nutrition!</p>
          </div>
        ) : (
          filteredMeals.map((meal, index) => (
            <div
              key={meal.id}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {meal.name}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(meal.category)}`}>
                      {categories.find(c => c.value === meal.category)?.label || meal.category}
                    </span>
                    <div className="flex items-center text-gray-500">
                      {getCategoryIcon(meal.category)}
                    </div>
                    <button
                      onClick={() => toggleFavorite(meal.id)}
                      className={`ml-auto ${meal.favorite ? 'text-yellow-500' : 'text-gray-400'} hover:text-yellow-500 transition-colors`}
                    >
                      <Star className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>Prep: {meal.prepTime}m</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <ChefHat className="h-4 w-4" />
                      <span>Cook: {meal.cookTime}m</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="h-4 w-4" />
                      <span>Serves: {meal.servings}</span>
                    </div>
                  </div>

                  {meal.ingredients.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">Ingredients:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {meal.ingredients.map((ingredient, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                            {ingredient}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {meal.instructions.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">Instructions:</h4>
                      <ol className="text-sm text-gray-600 space-y-1">
                        {meal.instructions.map((instruction, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-gray-500 font-medium">{idx + 1}.</span>
                            {instruction}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}

                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(meal.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => deleteMeal(meal.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <Footer />
    </div>
  )
}

export default Meals 