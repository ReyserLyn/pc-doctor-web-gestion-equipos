import { useAuth } from '@/hooks/useAuth'
import { Navigate } from 'react-router-dom'

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to='/login' />
  }

  return children
}
