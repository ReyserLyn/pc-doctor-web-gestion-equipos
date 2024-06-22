import { AuthContext } from '@/context/auth'
import { useContext } from 'react'

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error('revisar contexo Auth')
  }

  return context
}
