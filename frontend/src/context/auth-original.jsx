import { createContext, useState } from 'react'
import { loginUser } from '@/api/auth'

export const AuthContext = createContext()

export function AuthProvider ({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)

  const login = async (formData) => {
    try {
      const response = await loginUser(formData)

      if (response.message) {
        setError(response.message)
        setIsAuthenticated(false)
        setUser(null)
      } else {
        setError(null)
        setIsAuthenticated(true)
        setUser(response)
      }
    } catch (error) {
      setError('Error al inciar sesión')
    }
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, error, setError, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
