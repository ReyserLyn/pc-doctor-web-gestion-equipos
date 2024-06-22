import { useState, useEffect } from 'react'
import { getStatusCounts } from '@/api/equipment'

export function useStatusCount () {
  const [statusCounts, setStatusCounts] = useState({
    Todos: 0,
    'En reparación': 0,
    Entregado: 0,
    Reparado: 0
  })

  const refreshStatusCounts = async () => {
    try {
      const counts = await getStatusCounts()

      const countsMap = counts.reduce((acc, item) => {
        acc[item.status] = item.count
        acc.Todos += item.count
        return acc
      }, { 'En reparación': 0, Entregado: 0, Reparado: 0, Todos: 0 })
      setStatusCounts(countsMap)
    } catch (error) {
      console.error('Error en el fetch status counts:', error)
    }
  }

  useEffect(() => {
    refreshStatusCounts()
  }, [])

  return { statusCounts, refreshStatusCounts }
}
