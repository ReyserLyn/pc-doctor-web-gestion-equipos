import { API_BASE_URL } from '@/assets/config'

export const getAll = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/equipment`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return await response.json()
  } catch (error) {
    throw new Error('Error al mandar solicitud para obtener los equipos')
  }
}

export const getById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/equipment/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return await response.json()
  } catch (error) {
    throw new Error('Error al mandar solicitud para obtener el equipo')
  }
}

export const create = async (equipment) => {
  try {
    const response = await fetch(`${API_BASE_URL}/equipment/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(equipment)
    })

    return await response.json()
  } catch (error) {
    throw new Error('Error al mandar la solicitud para crear el equipo')
  }
}

export const edit = async (equipment, id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/equipment/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(equipment)
    })

    return await response.json()
  } catch (error) {
    throw new Error('Error al mandar la solicitud para editar el equipo')
  }
}

export const getStatusCounts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/equipment/statuses`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return await response.json()
  } catch (error) {
    throw new Error('Error al mandar la solicitud para obtener los conteos de estados de equipos')
  }
}

export const deleteEq = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/equipment/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return await response.json()
  } catch (error) {
    throw new Error('Error al mandar la solicitud para eliminar el equipo')
  }
}

export const setRepair = async (id, exitCondition) => {
  try {
    const response = await fetch(`${API_BASE_URL}/equipment/setRepair/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(exitCondition)
    })

    return await response.json()
  } catch (error) {
    throw new Error('Error al mandar la solicitud para poner estado Reparado en el equipo')
  }
}

export const setDelivered = async (id, date) => {
  try {
    const response = await fetch(`${API_BASE_URL}/equipment/setDelivered/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(date)
    })

    return await response.json()
  } catch (error) {
    throw new Error('Error al mandar la solicitud para poner estado Entregado en el equipo')
  }
}
