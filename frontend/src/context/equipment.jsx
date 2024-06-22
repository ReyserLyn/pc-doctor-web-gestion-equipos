import { createContext } from 'react'
import { create, edit, deleteEq, setRepair, setDelivered } from '@/api/equipment'
import { useRefreshEquipments } from '@/hooks/useRefreshEquipments'
import { useStatusCount } from '@/hooks/useStatusCount'

import { toast } from 'sonner'
import { DateTime } from 'luxon'

export const EquipmentContext = createContext()

export function EquipmentProvider ({ children }) {
  const { equipments, refreshEquipments } = useRefreshEquipments()
  const { statusCounts, refreshStatusCounts } = useStatusCount()

  const createEquipment = async (newEquipment) => {
    try {
      await create(newEquipment)
      await refreshEquipments()
      await refreshStatusCounts()

      const dt = DateTime.now().setZone('America/Lima')

      const formattedDate = dt.setLocale('es').toLocaleString({
        weekday: 'long',
        month: 'long',
        day: '2-digit',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      })

      toast.success('Equipo agregado exitosamente', {
        description: formattedDate,
        action: {
          label: 'Cerrar'
        }
      })
    } catch (error) {
      console.error('Error al crear equipo:', error.message)
      toast.error('Error al añadir equipo')
    }
  }

  const editEquipment = async (equipment, id) => {
    try {
      await edit(equipment, id)
      await refreshEquipments()
      toast.success('Equipo editado exitosamente')
    } catch (error) {
      console.error('Error al editar equipo:', error.message)
      toast.error('Error al editar equipo')
    }
  }

  const deleteEquipment = async (id) => {
    try {
      await deleteEq(id)
      await refreshStatusCounts()
      await refreshEquipments()
      toast.info('Equipo eliminado exitosamente')
    } catch (error) {
      console.error('Error al eliminar equipo:', error.message)
      toast.error('Error al eliminar equipo')
    }
  }

  const setRepairEquipment = async (id, exitCondition) => {
    try {
      await setRepair(id, exitCondition)

      await refreshStatusCounts()
      await refreshEquipments()
      toast.success('Equipo reparado exitosamente')
    } catch (error) {
      console.error('Error al modificar estado a reparado en el equipo:', error.message)
      toast.error('Error al cambiar de estado')
    }
  }

  const setDeliveredEquipment = async (id, date) => {
    try {
      await setDelivered(id, date)

      await refreshStatusCounts()
      await refreshEquipments()
      toast.success('Equipo entregado exitosamente')
    } catch (error) {
      console.error('Error al modificar estado a entregado en el equipo:', error.message)
      toast.error('Error al cambiar de estado')
    }
  }

  return (
    <EquipmentContext.Provider
      value={{
        equipments,
        statusCounts,
        createEquipment,
        editEquipment,
        deleteEquipment,
        setRepairEquipment,
        setDeliveredEquipment
      }}
    >
      {children}
    </EquipmentContext.Provider>
  )
}
