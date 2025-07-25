import React from 'react'
import { Navigate } from 'react-router-dom'

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // const { user, loading } = useAuth() // Removed: useAuth()

  if (loading) { // Removed: loading
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!user) { // Removed: user
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

export default ProtectedRoute 