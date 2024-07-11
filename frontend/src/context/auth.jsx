import { createContext, useState, useEffect } from 'react'
import { loginUser } from '@/api/auth'

export const AuthContext = createContext()

export function AuthProvider ({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const [loginAttempts, setLoginAttempts] = useState(1)
  const [isDisabled, setIsDisabled] = useState(false)

  useEffect(() => {
    const storedUser = window.localStorage.getItem('user')
    const storedExpireTime = window.localStorage.getItem('expireTime')
    const disabledState = window.localStorage.getItem('loginDisabled')

    if (disabledState) {
      setIsDisabled(true)

      const expireTime = new Date(disabledState)
      const timeRemaining = expireTime.getTime() - new Date().getTime()
      setTimeout(() => setIsDisabled(false), timeRemaining)
    }

    if (storedUser && storedExpireTime) {
      const userObj = JSON.parse(storedUser)
      const expireTime = new Date(storedExpireTime)

      if (new Date() < expireTime) {
        setUser(userObj)
        setIsAuthenticated(true)

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

      if (loginAttempts >= 5) {
        setIsDisabled(true)
        const expireTime = new Date()
        expireTime.setMinutes(expireTime.getMinutes() + 5)

        window.localStorage.setItem('loginDisabled', expireTime.toISOString())
        setTimeout(() => {
          setIsDisabled(false)
          setLoginAttempts(1)
          window.localStorage.removeItem('loginDisabled')
        }, 5 * 60 * 1000)
      }

      if (response.message) {
        setError(response.message)
        setIsAuthenticated(false)
        setUser(null)
        setLoginAttempts((prev) => prev + 1)
      } else {
        if (response.status_id === 2) {
          setError('El usuario ingresado se encuentra inactivo')
          setIsAuthenticated(false)
          setUser(null)
          setLoginAttempts(0)
        } else {
          setError(null)
          setIsAuthenticated(true)
          setUser(response)
          setLoginAttempts(0)

          const expireTime = new Date()
          expireTime.setHours(expireTime.getHours() + 2)

          window.localStorage.setItem('user', JSON.stringify(response))
          window.localStorage.setItem('expireTime', expireTime.toISOString())

          setTimeout(() => logout(), 2 * 60 * 60 * 1000)
        }
      }
    } catch (error) {
      setError('Error al iniciar sesión')
      setLoginAttempts((prev) => prev + 1)
    }
  }

  const logout = () => {
    window.localStorage.removeItem('user')
    window.localStorage.removeItem('expireTime')
    setIsAuthenticated(false)
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        error,
        setError,
        login,
        logout,
        loginAttempts,
        isDisabled
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
