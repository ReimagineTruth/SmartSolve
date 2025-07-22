import React, { useState } from 'react'
import { 
  RefreshCw,
  AlertTriangle,
  Check,
  X,
  Trash2,
  Database,
  Shield,
  Info,
  Clock,
  User,
  Target,
  DollarSign,
  Utensils,
  Heart,
  Bell,
  Settings,
  Calendar,
  BarChart3,
  Activity,
  TrendingUp,
  TrendingDown,
  Star,
  Award,
  Zap,
  Crown,
  Gift,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Download,
  Upload,
  Sync,
  MoreHorizontal,
  Filter,
  Search,
  Plus,
  Edit,
  Save,
  Minus,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Home,
  Briefcase,
  GraduationCap,
  Baby,
  Palette,
  Music,
  Gamepad2,
  Wifi,
  Cloud,
  Globe,
  MapPin,
  Phone,
  Mail,
  Share2,
  BookOpen,
  Lightbulb,
  Sparkles,
  Rocket,
  ThumbsUp,
  MessageCircle,
  FileText,
  Image,
  Video,
  Camera,
  Mic,
  Send,
  Smile,
  Paperclip,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Move,
  Crop,
  Type,
  Bold,
  Italic,
  Underline,
  List,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Indent,
  Outdent,
  Quote,
  Code,
  Link2,
  Unlink,
  Table,
  Columns,
  Rows,
  Merge,
  Split,
  SortAsc,
  SortDesc
} from 'lucide-react'

interface ResetDataProps {
  isOpen: boolean
  onClose: () => void
  onReset: (dataTypes: string[]) => void
}

const ResetData: React.FC<ResetDataProps> = ({ isOpen, onClose, onReset }) => {
  const [selectedDataTypes, setSelectedDataTypes] = useState<string[]>([])
  const [resetStep, setResetStep] = useState<'select' | 'confirm' | 'processing' | 'complete'>('select')
  const [isProcessing, setIsProcessing] = useState(false)

  const dataTypes = [
    {
      id: 'tasks',
      name: 'Tasks',
      description: 'All your tasks, projects, and to-do items',
      icon: Target,
      color: 'blue',
      count: 25,
      warning: 'This will permanently delete all your tasks and progress'
    },
    {
      id: 'budget',
      name: 'Budget & Finance',
      description: 'Income, expenses, and financial tracking data',
      icon: DollarSign,
      color: 'green',
      count: 48,
      warning: 'All budget entries and financial history will be lost'
    },
    {
      id: 'meals',
      name: 'Meal Planning',
      description: 'Meal plans, recipes, and nutrition data',
      icon: Utensils,
      color: 'orange',
      count: 12,
      warning: 'All meal plans and recipe data will be removed'
    },
    {
      id: 'mood',
      name: 'Mood & Wellness',
      description: 'Mood tracking, wellness entries, and health data',
      icon: Heart,
      color: 'pink',
      count: 30,
      warning: 'All wellness tracking and mood history will be deleted'
    },
    {
      id: 'notifications',
      name: 'Notifications',
      description: 'All notification history and preferences',
      icon: Bell,
      color: 'purple',
      count: 15,
      warning: 'Notification history and settings will be reset'
    },
    {
      id: 'preferences',
      name: 'Preferences',
      description: 'App settings, themes, and personal preferences',
      icon: Settings,
      color: 'gray',
      count: 8,
      warning: 'All app settings and preferences will be reset to default'
    }
  ]

  const handleDataTypeToggle = (dataTypeId: string) => {
    setSelectedDataTypes(prev => 
      prev.includes(dataTypeId)
        ? prev.filter(id => id !== dataTypeId)
        : [...prev, dataTypeId]
    )
  }

  const handleSelectAll = () => {
    setSelectedDataTypes(dataTypes.map(type => type.id))
  }

  const handleSelectNone = () => {
    setSelectedDataTypes([])
  }

  const handleReset = async () => {
    setIsProcessing(true)
    setResetStep('processing')
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Call the reset function
    onReset(selectedDataTypes)
    
    setResetStep('complete')
    setIsProcessing(false)
    
    // Auto close after showing completion
    setTimeout(() => {
      onClose()
      setResetStep('select')
      setSelectedDataTypes([])
    }, 3000)
  }

  const handleCancel = () => {
    onClose()
    setResetStep('select')
    setSelectedDataTypes([])
  }

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-500 text-blue-600 bg-blue-100'
      case 'green': return 'bg-green-500 text-green-600 bg-green-100'
      case 'orange': return 'bg-orange-500 text-orange-600 bg-orange-100'
      case 'pink': return 'bg-pink-500 text-pink-600 bg-pink-100'
      case 'purple': return 'bg-purple-500 text-purple-600 bg-purple-100'
      case 'gray': return 'bg-gray-500 text-gray-600 bg-gray-100'
      default: return 'bg-gray-500 text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center ${isOpen ? 'block' : 'hidden'}`}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 to-orange-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <RefreshCw className="h-6 w-6" />
              <h2 className="text-xl font-semibold">Reset Dashboard Data</h2>
            </div>
            <button
              onClick={handleCancel}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {resetStep === 'select' && (
            <div className="space-y-6">
              <div className="text-center">
                <AlertTriangle className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Reset Your Dashboard</h3>
                <p className="text-gray-600">
                  Select the data you want to reset. This action cannot be undone.
                </p>
              </div>

              {/* Selection Controls */}
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleSelectAll}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Select All
                </button>
                <button
                  onClick={handleSelectNone}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Select None
                </button>
              </div>

              {/* Data Type Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dataTypes.map((dataType) => (
                  <div
                    key={dataType.id}
                    className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 ${
                      selectedDataTypes.includes(dataType.id)
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleDataTypeToggle(dataType.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-10 h-10 ${getColorClasses(dataType.color).split(' ')[0]} rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <dataType.icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">{dataType.name}</h4>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-500">{dataType.count} items</span>
                            {selectedDataTypes.includes(dataType.id) && (
                              <Check className="h-4 w-4 text-red-500" />
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{dataType.description}</p>
                        <div className="flex items-center space-x-1 text-xs text-red-600">
                          <AlertTriangle className="h-3 w-3" />
                          <span>{dataType.warning}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={handleCancel}
                  className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setResetStep('confirm')}
                  disabled={selectedDataTypes.length === 0}
                  className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {resetStep === 'confirm' && (
            <div className="space-y-6">
              <div className="text-center">
                <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Confirm Reset</h3>
                <p className="text-gray-600">
                  You are about to permanently delete the following data:
                </p>
              </div>

              {/* Selected Data Summary */}
              <div className="bg-red-50 rounded-xl p-4">
                <h4 className="font-semibold text-red-800 mb-3">Selected Data Types:</h4>
                <div className="space-y-2">
                  {selectedDataTypes.map(dataTypeId => {
                    const dataType = dataTypes.find(type => type.id === dataTypeId)
                    if (!dataType) return null
                    return (
                      <div key={dataTypeId} className="flex items-center space-x-2">
                        <div className={`w-4 h-4 ${getColorClasses(dataType.color).split(' ')[0]} rounded-full flex items-center justify-center`}>
                          <dataType.icon className="h-2 w-2 text-white" />
                        </div>
                        <span className="text-sm text-red-700">{dataType.name}</span>
                        <span className="text-xs text-red-500">({dataType.count} items)</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Warning */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-yellow-800">Important Warning</h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      This action cannot be undone. All selected data will be permanently deleted and cannot be recovered.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setResetStep('select')}
                  className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Go Back
                </button>
                <button
                  onClick={handleReset}
                  className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Confirm Reset
                </button>
              </div>
            </div>
          )}

          {resetStep === 'processing' && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-500 mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Resetting Data...</h3>
              <p className="text-gray-600">Please wait while we reset your selected data.</p>
            </div>
          )}

          {resetStep === 'complete' && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Reset Complete!</h3>
              <p className="text-gray-600">
                Your selected data has been successfully reset. The dashboard will refresh automatically.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ResetData 