import { API_BASE_URL } from '@/assets/config'

export const getAll = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return await response.json()
  } catch (error) {
    throw new Error('Error al mandar solicitud para obtener los usuarios')
  }
}

export const create = async (user) => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(user)
    })

    if (!response.ok) {
      throw new Error('Error al crear usuario')
    }

    return await response.json()
  } catch (error) {
    console.error('Error al mandar la solicitud para crear usuario:', error)
    throw new Error('Error al mandar la solicitud para crear usuario')
  }
}

export const edit = async (user, id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(user)
    })

    if (!response.ok) {
      throw new Error('Error al editar usuario')
    }

    return await response.json()
  } catch (error) {
    console.error('Error al mandar la solicitud para editar el usuario:', error)
    throw new Error('Error al mandar la solicitud para editar el usuario')
  }
}

export const deleteUs = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return await response.json()
  } catch (error) {
    throw new Error('Error al mandar la solicitud para eliminar el usuario')
  }
}
