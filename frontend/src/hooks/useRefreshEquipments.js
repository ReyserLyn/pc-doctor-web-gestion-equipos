import { useState, useEffect } from 'react'
import { getAll } from '@/api/equipment'

export function useRefreshEquipments () {
  const [equipments, setEquipments] = useState([])

  const refreshEquipments = async () => {
    try {
      const equipments = await getAll()
      setEquipments(equipments)
    } catch (error) {
      console.error('Error en el fech equipments:', error)
    }
  }

  useEffect(() => {
    refreshEquipments()
  }, [])

  return { equipments, refreshEquipments }
}
