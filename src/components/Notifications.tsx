import React, { useState } from 'react'
import { 
  Bell,
  Check,
  X,
  Filter,
  Search,
  MoreHorizontal,
  Settings,
  User,
  Target,
  DollarSign,
  Utensils,
  Heart,
  Calendar,
  Clock,
  AlertCircle,
  Info,
  CheckCircle,
  Star,
  MessageCircle,
  Share2,
  Download,
  Upload,
  RefreshCw,
  Eye,
  EyeOff,
  Trash2,
  Archive,
  Pin,
  Unpin,
  Edit,
  Save,
  Plus,
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
  TrendingUp,
  ThumbsUp,
  BookOpen,
  Lightbulb,
  Sparkles,
  Rocket,
  Crown,
  Zap,
  Gift,
  Award,
  Timer,
  BarChart3,
  Activity,
  Users,
  Building,
  Globe,
  MapPin,
  Phone,
  Mail,
  Link,
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

interface NotificationsProps {
  isOpen: boolean
  onClose: () => void
}

const Notifications: React.FC<NotificationsProps> = ({ isOpen, onClose }) => {
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const notifications = [
    {
      id: 1,
      type: 'task',
      title: 'Task Reminder',
      message: 'Your task "Complete project proposal" is due in 2 hours',
      time: '2 hours ago',
      read: false,
      priority: 'high',
      icon: Target,
      color: 'blue'
    },
    {
      id: 2,
      type: 'budget',
      title: 'Budget Alert',
      message: 'You\'ve exceeded your monthly budget for groceries by $50',
      time: '4 hours ago',
      read: false,
      priority: 'medium',
      icon: DollarSign,
      color: 'red'
    },
    {
      id: 3,
      type: 'meal',
      title: 'Meal Reminder',
      message: 'Time to plan your meals for tomorrow!',
      time: '6 hours ago',
      read: true,
      priority: 'low',
      icon: Utensils,
      color: 'green'
    },
    {
      id: 4,
      type: 'mood',
      title: 'Mood Check-in',
      message: 'Don\'t forget to track your mood today',
      time: '1 day ago',
      read: true,
      priority: 'low',
      icon: Heart,
      color: 'pink'
    },
    {
      id: 5,
      type: 'system',
      title: 'System Update',
      message: 'New features are available! Check out the latest updates',
      time: '2 days ago',
      read: true,
      priority: 'medium',
      icon: Info,
      color: 'purple'
    },
    {
      id: 6,
      type: 'achievement',
      title: 'Achievement Unlocked',
      message: 'Congratulations! You\'ve completed 7 tasks in a row',
      time: '3 days ago',
      read: true,
      priority: 'high',
      icon: Star,
      color: 'yellow'
    }
  ]

  const filters = [
    { id: 'all', name: 'All', count: notifications.length },
    { id: 'unread', name: 'Unread', count: notifications.filter(n => !n.read).length },
    { id: 'task', name: 'Tasks', count: notifications.filter(n => n.type === 'task').length },
    { id: 'budget', name: 'Budget', count: notifications.filter(n => n.type === 'budget').length },
    { id: 'meal', name: 'Meals', count: notifications.filter(n => n.type === 'meal').length },
    { id: 'mood', name: 'Mood', count: notifications.filter(n => n.type === 'mood').length },
    { id: 'system', name: 'System', count: notifications.filter(n => n.type === 'system').length }
  ]

  const filteredNotifications = notifications.filter(notification => {
    const matchesFilter = activeFilter === 'all' || 
      (activeFilter === 'unread' && !notification.read) ||
      notification.type === activeFilter
    
    const matchesSearch = notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesFilter && matchesSearch
  })

  const markAsRead = (id: number) => {
    // Update notification read status
    console.log('Marked as read:', id)
  }

  const deleteNotification = (id: number) => {
    // Delete notification
    console.log('Deleted notification:', id)
  }

  const markAllAsRead = () => {
    // Mark all notifications as read
    console.log('Marked all as read')
  }

  const clearAll = () => {
    // Clear all notifications
    console.log('Cleared all notifications')
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getTypeColor = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-500'
      case 'red': return 'bg-red-500'
      case 'green': return 'bg-green-500'
      case 'pink': return 'bg-pink-500'
      case 'purple': return 'bg-purple-500'
      case 'yellow': return 'bg-yellow-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center ${isOpen ? 'block' : 'hidden'}`}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bell className="h-6 w-6" />
              <h2 className="text-xl font-semibold">Notifications</h2>
              <span className="bg-white bg-opacity-20 px-2 py-1 rounded-full text-sm">
                {notifications.filter(n => !n.read).length}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={markAllAsRead}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                title="Mark all as read"
              >
                <Check className="h-5 w-5" />
              </button>
              <button
                onClick={clearAll}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                title="Clear all"
              >
                <Trash2 className="h-5 w-5" />
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search notifications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <Filter className="h-5 w-5" />
            </button>
          </div>

          {/* Filter Tabs */}
          <div className="flex space-x-1 overflow-x-auto">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeFilter === filter.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter.name}
                <span className="ml-1 text-xs opacity-75">({filter.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        <div className="max-h-[calc(90vh-200px)] overflow-y-auto">
          {filteredNotifications.length === 0 ? (
            <div className="p-8 text-center">
              <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
              <p className="text-gray-600">You're all caught up!</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-gray-50 transition-colors ${
                    !notification.read ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    {/* Icon */}
                    <div className={`w-10 h-10 ${getTypeColor(notification.color)} rounded-full flex items-center justify-center flex-shrink-0`}>
                      <notification.icon className="h-5 w-5 text-white" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="text-sm font-medium text-gray-900">
                              {notification.title}
                            </h4>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(notification.priority)}`}>
                              {notification.priority}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-2">
                            {notification.time}
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-1 ml-2">
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                              title="Mark as read"
                            >
                              <Check className="h-4 w-4" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>
              {filteredNotifications.length} notification{filteredNotifications.length !== 1 ? 's' : ''}
            </span>
            <button className="text-blue-600 hover:text-blue-700 font-medium">
              Notification Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Notifications 