import * as crypto from 'crypto'
import { DateTime } from 'luxon'
import * as bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import { createClient } from '@libsql/client'

dotenv.config()
const SALT_ROUNDS = 10

const db = createClient({
  url: 'libsql://pcdoctor-reyserzap.turso.io',
  authToken: process.env.DB_TOKEN
})

export class UserModel {
  static async login ({ username, password }) {
    try {
      const result = await db.execute({
        sql: 'SELECT id, password FROM users WHERE username = ?',
        args: [username]
      })
      const user = result.rows[0]

      if (!user) {
        console.error('Usuario no encontrado')
        return null
      }

      if (!user.password) {
        console.error('Contraseña no encontrada para el usuario')
        return null
      }

      const isPasswordValid = await bcrypt.compare(password, user.password)
      if (!isPasswordValid) {
        console.error('Contraseña incorrecta')
        return null
      }

      const loginUserResult = await db.execute({
        sql: 'SELECT first_name, last_name, username, email, phone, role_id, status_id FROM users WHERE id = ?',
        args: [user.id]
      })
      const loginUser = loginUserResult.rows[0]
      return loginUser
    } catch (error) {
      console.error('Error en login:', error.message)
      throw new Error('Error al intentar iniciar sesión')
    }
  }

  static async register ({ user }) {
    const {
      first_name, // eslint-disable-line camelcase
      last_name, // eslint-disable-line camelcase
      username,
      password,
      email,
      phone,
      role_id, // eslint-disable-line camelcase
      status_id // eslint-disable-line camelcase
    } = user

    const existingUserWithUsernameResult = await db.execute({
      sql: 'SELECT * FROM users WHERE username = ?',
      args: [username]
    })
    const existingUserWithUsername = existingUserWithUsernameResult.rows[0]

    if (existingUserWithUsername) {
      return { error: 'Ya existe otro usuario con este nombre de usuario. Por favor, elige uno diferente.' }
    }

    const id = crypto.randomUUID()
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

    const now = DateTime.now().setZone('America/Lima')
    const created_at = now.toFormat('dd/MM/yyyy, HH:mm') // eslint-disable-line camelcase

    try {
      await db.execute({
        sql: 'INSERT INTO users (id, first_name, last_name, username, password, email, phone, role_id, status_id, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        // eslint-disable-next-line camelcase
        args: [id, first_name, last_name, username, hashedPassword, email, phone, role_id, status_id, created_at]
      })
    } catch (error) {
      console.error('Error al registrar usuario:', error.message)
      throw new Error('Error al registrar usuario')
    }

    const registerUserResult = await db.execute({
      sql: 'SELECT first_name, last_name, username, email, phone, role_id, status_id FROM users WHERE id = ?',
      args: [id]
    })
    return registerUserResult.rows[0]
  }

  static async getAll () {
    const query = `
      SELECT 
        users.id, 
        users.first_name, 
        users.last_name, 
        users.username, 
        users.email, 
        users.phone, 
        role_user.name as role, 
        state_user.name as status 
      FROM users
      JOIN role_user ON users.role_id = role_user.id
      JOIN state_user ON users.status_id = state_user.id
      ORDER BY 
        state_user.id,
        CASE 
          WHEN users.role_id = 1 THEN 1
          WHEN users.role_id = 2 THEN 2
        END
    `

    const usersResult = await db.execute(query)
    return usersResult.rows
  }

  static async getById ({ id }) {
    const userResult = await db.execute({
      sql: 'SELECT first_name, last_name, username, email, phone, role_id, status_id FROM users WHERE id = ?',
      args: [id]
    })
    const user = userResult.rows[0]

    if (!user) return null
    return user
  }

  static async delete ({ id }) {
    const userResult = await db.execute({
      sql: 'SELECT username FROM users WHERE id = ?',
      args: [id]
    })
    const user = userResult.rows[0]

    if (!user) return null

    try {
      await db.execute({
        sql: 'DELETE FROM users WHERE id = ?',
        args: [id]
      })
      return true
    } catch (error) {
      throw new Error('Error al eliminar usuario')
    }
  }

  static async update ({ id, user }) {
    const {
      first_name, // eslint-disable-line camelcase
      last_name, // eslint-disable-line camelcase
      username,
      password,
      email,
      phone,
      role_id, // eslint-disable-line camelcase
      status_id // eslint-disable-line camelcase
    } = user

    const existingUserResult = await db.execute({
      sql: 'SELECT * FROM users WHERE id = ?',
      args: [id]
    })
    const existingUser = existingUserResult.rows[0]

    if (!existingUser) {
      return { error: 'El usuario no existe' }
    }

    const existingUserWithUsernameResult = await db.execute({
      sql: 'SELECT * FROM users WHERE username = ? AND id != ?',
      args: [username, id]
    })
    const existingUserWithUsername = existingUserWithUsernameResult.rows[0]

    if (existingUserWithUsername) {
      return { error: 'Ya existe otro usuario con este nombre de usuario. Por favor, elige uno diferente.' }
    }

    if (password) {
      const isPasswordValid = await bcrypt.compare(password, existingUser.password)
      if (isPasswordValid) {
        return { error: 'La contraseña proporcionada es igual a la contraseña actual. Debes ingresar una contraseña diferente.' }
      }
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

    try {
      await db.execute({
        sql: 'UPDATE users SET first_name = ?, last_name = ?, username = ?, password=?, email = ?, phone = ?, role_id = ?, status_id = ? WHERE id = ?',
        // eslint-disable-next-line camelcase
        args: [first_name, last_name, username, hashedPassword, email, phone, role_id, status_id, id]
      })
    } catch (error) {
      throw new Error('Error al actualizar usuario')
    }

    const updatedUserResult = await db.execute({
      sql: 'SELECT * FROM users WHERE id = ?',
      args: [id]
    })
    return updatedUserResult.rows[0]
  }
}
