import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import LoadingSpinner from './LoadingSpinner'

interface PageTransitionProps {
  children: React.ReactNode
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [displayChildren, setDisplayChildren] = useState(true)
  const location = useLocation()

  useEffect(() => {
    setIsLoading(true)
    setDisplayChildren(false)
    
    // Simulate loading time for smooth transition
    const timer = setTimeout(() => {
      setIsLoading(false)
      setDisplayChildren(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [location.pathname])

  return (
    <div className="min-h-screen">
      {isLoading && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-xl">
            <LoadingSpinner size="lg" color="primary" />
            <p className="text-center mt-4 text-gray-600 dark:text-gray-300">
              Loading...
            </p>
          </div>
        </div>
      )}
      
      <div className={`transition-opacity duration-300 ${displayChildren ? 'opacity-100' : 'opacity-0'}`}>
        {children}
      </div>
    </div>
  )
}

export default PageTransition 