import { useState, useEffect, createContext } from 'react'
import { getAll, create, edit, deleteUs } from '@/api/user'
import { toast } from 'sonner'

export const UserContext = createContext()

export function UserProvider ({ children }) {
  const [users, setUsers] = useState([])

  const refreshUsers = async () => {
    try {
      const usersFetch = await getAll()
      setUsers(usersFetch)
    } catch (error) {
      console.error('Error en el fetch de usuarios:', error)
    }
  }

  useEffect(() => {
    refreshUsers()
  }, [])

  const createUser = async (newUser) => {
    try {
      const response = await create(newUser)
      if (response.message) {
        toast.error(response.message)
      } else {
        await refreshUsers()
        toast.success('Usuario creado exitosamente')

        return true
      }
    } catch (error) {
      console.error('Error al crear usuario:', error.message)
      toast.error('Error al crear usuario')
    }
  }

  const editUser = async (user, id) => {
    try {
      const response = await edit(user, id)

      if (response.message) {
        toast.error(response.message)
      } else {
        await refreshUsers()
        toast.success('Usuario editado exitosamente')
        return true
      }
    } catch (error) {
      console.error('Error al editar usuario:', error.message)
      toast.error('Error al editar usuario')
    }
  }

  const deleteUser = async (id) => {
    try {
      await deleteUs(id)
      await refreshUsers()
      toast.info('Usuario eliminado exitosamente')
    } catch (error) {
      console.error('Error al eliminar usuario:', error.message)
      toast.error('Error al eliminar usuario')
    }
  }

  return (
    <UserContext.Provider
      value={{
        users,
        createUser,
        editUser,
        deleteUser
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
