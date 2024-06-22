import { API_BASE_URL } from '@/assets/config'

export const loginUser = async (user) => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })

    return await response.json()
  } catch (error) {
    throw new Error('Error al mandar la solicitud de login')
  }
}
