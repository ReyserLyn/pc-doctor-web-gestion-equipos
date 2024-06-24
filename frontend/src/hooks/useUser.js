import { UserContext } from '@/context/user'
import { useContext } from 'react'

export const useEquipment = () => {
  const context = useContext(UserContext)

  if (context === undefined) {
    throw new Error('Revisar el contextoUser')
  }

  return context
}
