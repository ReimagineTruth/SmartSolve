import React, { useState, useEffect } from 'react'
import { 
  Heart, 
  Plus, 
  Smile,
  Frown,
  Meh,
  Activity,
  Moon,
  Brain,
  Search,
  Filter,
  Trash2,
  Calendar,
  CheckCircle
} from 'lucide-react'

interface WellnessEntry {
  id: string
  date: string
  mood: number // 1-10 scale
  sleep: number // hours
  exercise: boolean
  meditation: boolean
  notes?: string
}

const Wellness: React.FC = () => {
  const [entries, setEntries] = useState<WellnessEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddEntry, setShowAddEntry] = useState(false)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [newEntry, setNewEntry] = useState({
    date: new Date().toISOString().split('T')[0],
    mood: 7,
    sleep: 7.5,
    exercise: false,
    meditation: false,
    notes: ''
  })

  useEffect(() => {
    // if (user?.email) {
    //   loadEntries()
    // }
  }, [])

  const loadEntries = async () => {
    try {
      setLoading(true)
      // const userEntries = await dataService.getWellnessEntries(user?.email || '')
      // setEntries(userEntries)
    } catch (error) {
      console.error('Error loading wellness entries:', error)
      // toast.error('Failed to load wellness entries')
    } finally {
      setLoading(false)
    }
  }

  const addEntry = async () => {
    try {
      const entry: WellnessEntry = {
        id: Date.now().toString(),
        date: newEntry.date,
        mood: newEntry.mood,
        sleep: newEntry.sleep,
        exercise: newEntry.exercise,
        meditation: newEntry.meditation,
        notes: newEntry.notes
      }

      const updatedEntries = [entry, ...entries]
      // await dataService.saveWellnessEntries(user?.email || '', updatedEntries)
      setEntries(updatedEntries)
      setNewEntry({
        date: new Date().toISOString().split('T')[0],
        mood: 7,
        sleep: 7.5,
        exercise: false,
        meditation: false,
        notes: ''
      })
      setShowAddEntry(false)
      // toast.success('Wellness entry added successfully!')
    } catch (error) {
      console.error('Error adding wellness entry:', error)
      // toast.error('Failed to add wellness entry')
    }
  }

  const deleteEntry = async (entryId: string) => {
    try {
      const updatedEntries = entries.filter(entry => entry.id !== entryId)
      // await dataService.saveWellnessEntries(user?.email || '', updatedEntries)
      setEntries(updatedEntries)
      // toast.success('Entry deleted!')
    } catch (error) {
      console.error('Error deleting entry:', error)
      // toast.error('Failed to delete entry')
    }
  }

  const getMoodIcon = (mood: number) => {
    if (mood >= 8) return <Smile className="h-6 w-6 text-green-500" />
    if (mood >= 5) return <Meh className="h-6 w-6 text-yellow-500" />
    return <Frown className="h-6 w-6 text-red-500" />
  }

  const getMoodColor = (mood: number) => {
    if (mood >= 8) return 'text-green-600 bg-green-50 border-green-200'
    if (mood >= 5) return 'text-yellow-600 bg-yellow-50 border-yellow-200'
    return 'text-red-600 bg-red-50 border-red-200'
  }

  const getSleepQuality = (sleep: number) => {
    if (sleep >= 8) return 'Excellent'
    if (sleep >= 7) return 'Good'
    if (sleep >= 6) return 'Fair'
    return 'Poor'
  }

  const getSleepColor = (sleep: number) => {
    if (sleep >= 8) return 'text-green-600'
    if (sleep >= 7) return 'text-blue-600'
    if (sleep >= 6) return 'text-yellow-600'
    return 'text-red-600'
  }

  const filteredEntries = entries.filter(entry => {
    const matchesFilter = filter === 'all' || 
      (filter === 'good' && entry.mood >= 7) ||
      (filter === 'exercise' && entry.exercise) ||
      (filter === 'meditation' && entry.meditation)
    
    const matchesSearch = entry.notes?.toLowerCase().includes(searchTerm.toLowerCase()) || false
    
    return matchesFilter && (matchesSearch || !searchTerm)
  })

  const stats = {
    total: entries.length,
    averageMood: entries.length > 0 ? entries.reduce((sum, e) => sum + e.mood, 0) / entries.length : 0,
    averageSleep: entries.length > 0 ? entries.reduce((sum, e) => sum + e.sleep, 0) / entries.length : 0,
    exerciseDays: entries.filter(e => e.exercise).length,
    meditationDays: entries.filter(e => e.meditation).length
  }

  const moodLabels = [
    'Terrible', 'Very Bad', 'Bad', 'Poor', 'Okay', 'Good', 'Great', 'Excellent', 'Amazing', 'Perfect'
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
          <h1 className="text-3xl font-bold text-gray-900">Mental Wellness</h1>
          <p className="text-gray-600">Track your mood, sleep, and wellness activities</p>
        </div>
        <button
          onClick={() => setShowAddEntry(true)}
          className="bg-blue-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
        >
          <Plus className="h-5 w-5" />
          Add Entry
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Mood</p>
              <p className="text-3xl font-bold text-blue-600">
                {stats.averageMood.toFixed(1)}/10
              </p>
            </div>
            <div className="p-3 rounded-xl bg-blue-50">
              <Heart className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Sleep</p>
              <p className="text-3xl font-bold text-purple-600">
                {stats.averageSleep.toFixed(1)}h
              </p>
            </div>
            <div className="p-3 rounded-xl bg-purple-50">
              <Moon className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </div>

        <div
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Exercise Days</p>
              <p className="text-3xl font-bold text-green-600">{stats.exerciseDays}</p>
            </div>
            <div className="p-3 rounded-xl bg-green-50">
              <Activity className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </div>

        <div
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Meditation Days</p>
              <p className="text-3xl font-bold text-orange-600">{stats.meditationDays}</p>
            </div>
            <div className="p-3 rounded-xl bg-orange-50">
              <Brain className="h-8 w-8 text-orange-600" />
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
                <option value="all">All Entries</option>
                <option value="good">Good Mood (7+)</option>
                <option value="exercise">Exercise Days</option>
                <option value="meditation">Meditation Days</option>
              </select>
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-64"
            />
          </div>
        </div>
      </div>

      {/* Add Entry Form */}
      {showAddEntry && (
        <div
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Add Wellness Entry</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="date"
              value={newEntry.date}
              onChange={(e) => setNewEntry({...newEntry, date: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mood (1-10)</label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={newEntry.mood}
                  onChange={(e) => setNewEntry({...newEntry, mood: parseInt(e.target.value)})}
                  className="flex-1"
                />
                <span className="text-sm font-medium text-gray-900">{newEntry.mood}/10</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">{moodLabels[newEntry.mood - 1]}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sleep (hours)</label>
              <input
                type="number"
                step="0.5"
                min="0"
                max="24"
                value={newEntry.sleep}
                onChange={(e) => setNewEntry({...newEntry, sleep: parseFloat(e.target.value)})}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={newEntry.exercise}
                  onChange={(e) => setNewEntry({...newEntry, exercise: e.target.checked})}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">Exercise</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={newEntry.meditation}
                  onChange={(e) => setNewEntry({...newEntry, meditation: e.target.checked})}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">Meditation</span>
              </label>
            </div>
          </div>
          <textarea
            placeholder="Notes about your day (optional)"
            value={newEntry.notes}
            onChange={(e) => setNewEntry({...newEntry, notes: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
            rows={3}
          />
          <div className="flex gap-2">
            <button
              onClick={addEntry}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Add Entry
            </button>
            <button
              onClick={() => setShowAddEntry(false)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Entries List */}
      <div className="space-y-4">
        {filteredEntries.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 text-center">
            <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No wellness entries found</h3>
            <p className="text-gray-600">Add your first entry to start tracking your wellness journey!</p>
          </div>
        ) : (
          filteredEntries.map((entry, index) => (
            <div
              key={entry.id}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      {getMoodIcon(entry.mood)}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getMoodColor(entry.mood)}`}>
                        {moodLabels[entry.mood - 1]}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      {new Date(entry.date).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Moon className="h-4 w-4" />
                      <span>Sleep: {entry.sleep}h</span>
                      <span className={`text-xs font-medium ${getSleepColor(entry.sleep)}`}>
                        ({getSleepQuality(entry.sleep)})
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Activity className="h-4 w-4" />
                      <span>Exercise: {entry.exercise ? 'Yes' : 'No'}</span>
                      {entry.exercise && <CheckCircle className="h-4 w-4 text-green-500" />}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Brain className="h-4 w-4" />
                      <span>Meditation: {entry.meditation ? 'Yes' : 'No'}</span>
                      {entry.meditation && <CheckCircle className="h-4 w-4 text-green-500" />}
                    </div>
                  </div>

                  {entry.notes && (
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">Notes:</h4>
                      <p className="text-sm text-gray-600">{entry.notes}</p>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => deleteEntry(entry.id)}
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
    </div>
  )
}

export default Wellness 