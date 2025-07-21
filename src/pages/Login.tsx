import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, Target, Shield, Zap, CheckCircle, AlertCircle } from 'lucide-react'
import Footer from '../components/Footer'

interface LoginFormData {
  email: string
  password: string
}

interface RegisterFormData extends LoginFormData {
  name: string
}

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [piLoading, setPiLoading] = useState(false)
  const navigate = useNavigate()

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<LoginFormData | RegisterFormData>()

  const onSubmit = async (data: LoginFormData | RegisterFormData) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      if (isLogin) {
        // await login(data.email, data.password) // Removed: useAuth
        toast.success('Welcome back!', {
          icon: <CheckCircle className="h-5 w-5 text-green-500" />,
        })
      } else {
        const registerData = data as RegisterFormData
        // await register(registerData.email, registerData.password, registerData.name) // Removed: useAuth
        toast.success('Account created successfully!', {
          icon: <CheckCircle className="h-5 w-5 text-green-500" />,
        })
      }
      navigate('/dashboard')
    } catch (error: any) {
      toast.error(error.message || 'An error occurred', {
        icon: <AlertCircle className="h-5 w-5 text-red-500" />,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handlePiLogin = async () => {
    setPiLoading(true)
    try {
      // Simulate Pi Network authentication
      toast.loading('Connecting to Pi Network...', { id: 'pi-login' })
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Simulate Pi authentication success
      toast.success('Pi Network login successful!', {
        id: 'pi-login',
        icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      })
      
      // Simulate user data
      const mockUser = {
        name: 'Pi Pioneer',
        email: 'pioneer@pi.network',
        subscription: 'standard'
      }
      
      // Store mock user data
      localStorage.setItem('user', JSON.stringify(mockUser))
      
      navigate('/dashboard')
    } catch (error) {
      toast.error('Pi Network login failed', {
        id: 'pi-login',
        icon: <AlertCircle className="h-5 w-5 text-red-500" />,
      })
    } finally {
      setPiLoading(false)
    }
  }

  const toggleMode = () => {
    setIsLogin(!isLogin)
    reset()
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Removed: motion.div */}
        <div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center">
            <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl mr-4 flex items-center justify-center">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">
                SmartSolve
              </h1>
            </div>
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              {isLogin ? 'Welcome back' : 'Create your account'}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {isLogin ? 'Sign in to your account' : 'Start your productivity journey'}
            </p>
          </div>

          <div className="mt-8 space-y-6">
            {/* Pi Network Login */}
            <div className="space-y-4">
              <button
                onClick={handlePiLogin}
                disabled={piLoading}
                className="w-full flex justify-center items-center px-4 py-3 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                {piLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <div className="w-5 h-5 mr-2 bg-white rounded-full flex items-center justify-center">
                      <span className="text-orange-500 text-xs font-bold">π</span>
                    </div>
                    Continue with Pi Network
                  </>
                )}
              </button>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with email
                  </span>
                </div>
              </div>
            </div>

            {/* Email/Password Form */}
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              {!isLogin && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      {...registerField('name', { required: !isLogin && 'Name is required' })}
                      type="text"
                      className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Enter your full name"
                    />
                  </div>
                  {!isLogin && (errors as any).name && (
                    <p className="mt-1 text-sm text-red-600">{(errors as any).name.message}</p>
                  )}
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    {...registerField('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    type="email"
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    {...registerField('password', { 
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters'
                      }
                    })}
                    type={showPassword ? 'text' : 'password'}
                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>

              {isLogin && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <a href="#" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                      Forgot your password?
                    </a>
                  </div>
                </div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-500 text-white py-3 px-4 rounded-xl font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mx-auto"></div>
                  ) : (
                    isLogin ? 'Sign in' : 'Create account'
                  )}
                </button>
              </div>
            </form>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                <button
                  onClick={toggleMode}
                  className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                >
                  {isLogin ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>

            {/* Features Preview */}
            <div className="mt-8 p-6 bg-gray-50 rounded-2xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                Why choose SmartSolve?
              </h3>
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-sm text-gray-600">Secure Pi Network integration</span>
                </div>
                <div className="flex items-center">
                  <Zap className="h-5 w-5 text-blue-500 mr-3" />
                  <span className="text-sm text-gray-600">Lightning-fast performance</span>
                </div>
                <div className="flex items-center">
                  <Target className="h-5 w-5 text-purple-500 mr-3" />
                  <span className="text-sm text-gray-600">AI-powered insights</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Login 