import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  
  const login = (credentials) => {
    // TODO: Integrate with backend
    setIsAuthenticated(true)
    setUser({ username: credentials.username })
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)