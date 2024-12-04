import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  
  const login = async (credentials) => {
    // Temporary: Accept any credentials
    if (credentials.username && credentials.password) {
      setIsAuthenticated(true)
      setUser({
        username: credentials.username,
        plan: 'free'
      })
      return { success: true }
    }
    return { success: false, message: 'Please enter both username and password' }
  }

  const logout = async () => {
    try {
      // Add your logout API call here if needed
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
    } finally {
      setIsAuthenticated(false)
      setUser(null)
      localStorage.removeItem('token')
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)