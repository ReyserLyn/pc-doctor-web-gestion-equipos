import { createContext, useState, useEffect } from 'react'
import { loginUser } from '@/api/auth'

export const AuthContext = createContext()

export function AuthProvider ({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const storedUser = window.localStorage.getItem('user')
    const storedExpireTime = window.localStorage.getItem('expireTime')

    if (storedUser && storedExpireTime) {
      const userObj = JSON.parse(storedUser)
      const expireTime = new Date(storedExpireTime)

      if (new Date() < expireTime) {
        setUser(userObj)
        setIsAuthenticated(true)

        // Calcular el tiempo restante para la sesión
        const timeRemaining = expireTime.getTime() - new Date().getTime()
        setTimeout(() => logout(), timeRemaining)
      } else {
        logout()
      }
    }
  }, [])

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

        // Establecer tiempo de expiración en 1 hora
        const expireTime = new Date()
        expireTime.setHours(expireTime.getHours() + 1)

        window.localStorage.setItem('user', JSON.stringify(response))
        window.localStorage.setItem('expireTime', expireTime.toISOString())

        setTimeout(() => logout(), 3000000)
      }
    } catch (error) {
      setError('Error al iniciar sesión')
    }
  }

  const logout = () => {
    window.localStorage.removeItem('user')
    window.localStorage.removeItem('expireTime')
    setIsAuthenticated(false)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, error, setError, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
