import { EquipmentContext } from '@/context/equipment'
import { useContext } from 'react'

export const useEquipment = () => {
  const context = useContext(EquipmentContext)

  if (context === undefined) {
    throw new Error('Revisar el contexto Equipment')
  }

  return context
}
