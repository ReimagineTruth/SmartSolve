import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import localStorageService from '../lib/localStorage'

interface User {
  id: string
  email: string
  name: string
  piAddress?: string
  subscription: 'free' | 'premium' | 'pro'
  preferences: {
    theme: 'light' | 'dark'
    notifications: boolean
  }
  stats: {
    tasksCompleted: number
    totalBudget: number
    mealsPlanned: number
    wellnessDays: number
  }
}

interface Subscription {
  plan: 'free' | 'standard' | 'premium' | 'pro' | 'lifetime',
  billing: 'monthly' | 'yearly' | 'lifetime',
  status: 'active' | 'expired',
  expiration: string | null,
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (email: string, password: string, name: string) => Promise<void>
  updateProfile: (data: Partial<User>) => Promise<void>
  subscription: Subscription
  renewSubscription: () => void
  upgradeSubscription: (plan: Subscription['plan'], billing: Subscription['billing']) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [subscription, setSubscription] = useState<Subscription>(localStorageService.getSubscription())

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      // api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      checkAuth()
    } else {
      setLoading(false)
    }
    // Load subscription on mount
    setSubscription(localStorageService.getSubscription())
  }, [])

  const checkAuth = async () => {
    try {
      // const response = await api.get('/auth/me')
      // setUser(response.data.user)
      setSubscription(localStorageService.getSubscription())
    } catch (error) {
      localStorage.removeItem('token')
      // delete api.defaults.headers.common['Authorization']
      localStorageService.clearSubscription()
      setSubscription(localStorageService.getSubscription())
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      // const response = await api.post('/auth/login', { email, password })
      // const { token, user } = response.data
      // localStorage.setItem('token', token)
      // api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      // setUser(user)
      setSubscription(localStorageService.getSubscription())
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed')
    }
  }

  const register = async (email: string, password: string, name: string) => {
    try {
      // const response = await api.post('/auth/register', { email, password, name })
      // const { token, user } = response.data
      // localStorage.setItem('token', token)
      // api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      // setUser(user)
      setSubscription(localStorageService.getSubscription())
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Registration failed')
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    // delete api.defaults.headers.common['Authorization']
    setUser(null)
    localStorageService.clearSubscription()
    setSubscription(localStorageService.getSubscription())
  }

  const updateProfile = async (data: Partial<User>) => {
    try {
      // const response = await api.put('/auth/profile', data)
      // setUser(response.data.user)
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Profile update failed')
    }
  }

  // Subscription helpers
  const renewSubscription = () => {
    const sub = localStorageService.getSubscription()
    if (sub.plan === 'lifetime') return
    let newExpiration: string | null = null
    const now = new Date()
    if (sub.billing === 'monthly') {
      now.setMonth(now.getMonth() + 1)
    } else if (sub.billing === 'yearly') {
      now.setFullYear(now.getFullYear() + 1)
    }
    newExpiration = now.toISOString()
    localStorageService.updateSubscription({ status: 'active', expiration: newExpiration })
    setSubscription(localStorageService.getSubscription())
  }

  const upgradeSubscription = (plan: Subscription['plan'], billing: Subscription['billing']) => {
    let expiration: string | null = null
    const now = new Date()
    if (plan === 'lifetime') {
      expiration = null
    } else if (billing === 'monthly') {
      now.setMonth(now.getMonth() + 1)
      expiration = now.toISOString()
    } else if (billing === 'yearly') {
      now.setFullYear(now.getFullYear() + 1)
      expiration = now.toISOString()
    }
    localStorageService.saveSubscription({ plan, billing, status: 'active', expiration })
    setSubscription(localStorageService.getSubscription())
  }

  // Check expiration on mount and when subscription changes
  useEffect(() => {
    const status = localStorageService.checkSubscriptionExpiration()
    if (status === 'expired' && subscription.status !== 'expired') {
      localStorageService.updateSubscription({ status: 'expired' })
      setSubscription(localStorageService.getSubscription())
    }
  }, [subscription.plan, subscription.expiration])

  const value = {
    user,
    loading,
    login,
    logout,
    register,
    updateProfile,
    subscription,
    renewSubscription,
    upgradeSubscription,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
} 