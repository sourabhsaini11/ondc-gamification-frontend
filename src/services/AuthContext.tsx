import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type AuthContextType = {
  isAuthenticated: boolean
  userEmail: string | null
  login: (token: string, email: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

type AuthProviderProps = {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [userEmail, setUserEmail] = useState<string | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const email = localStorage.getItem('userEmail')

    if (token && email) {
      setUserEmail(JSON.parse(email))
      setIsAuthenticated(true)
      setUserEmail(null)
    }
  }, [])

  const login = (token: string, data: any) => {
    localStorage.setItem('token', token)
    localStorage.setItem('userEmail', JSON.stringify(data.email))
    setIsAuthenticated(true)
    setUserEmail(data.email)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userEmail')
    setIsAuthenticated(false)
    setUserEmail(null)
  }

  return <AuthContext.Provider value={{ isAuthenticated, userEmail, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
