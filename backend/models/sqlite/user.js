/* eslint-disable camelcase */
import Database from 'better-sqlite3'
import crypto from 'node:crypto'
import { DateTime } from 'luxon'
import bcrypt from 'bcrypt'

import { SALT_ROUNDS } from '../../config.js'

const db = new Database('./models/sqlite/database.db')

export class UserModel {
  static async login ({ username, password }) {
    const user = await db.prepare('SELECT id, password FROM users WHERE username = ? ').get(username)
    if (!user) return null

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) return null

    const loginUser = await db.prepare('SELECT first_name, last_name, username, email, phone, role_id, status_id FROM users WHERE id = ?').get(user.id)
    return loginUser
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

    const existingUserWithUsername = await db.prepare('SELECT * FROM users WHERE username = ?').get(username)
    if (existingUserWithUsername) {
      return { error: 'Ya existe otro usuario con este nombre de usuario. Por favor, elige uno diferente.' }
    }

    const id = crypto.randomUUID()
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

    const now = DateTime.now().setZone('America/Lima')
    const created_at = now.toFormat('dd/MM/yyyy, HH:mm') // eslint-disable-line camelcase

    try {
      await db.prepare('INSERT INTO users (id, first_name, last_name, username, password, email, phone, role_id, status_id, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
        .run(id, first_name, last_name, username, hashedPassword, email, phone, role_id, status_id, created_at)
    } catch (error) {
      console.error('Error al registrar usuario:', error.message)
      throw new Error('Error al registrar usuario')
    }

    const registerUser = await db.prepare('SELECT first_name, last_name, username, email, phone, role_id, status_id FROM users WHERE id = ?').get(id)

    return registerUser
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

    const users = await db.prepare(query).all()
    return users
  }

  static async getById ({ id }) {
    const user = await db.prepare('SELECT first_name, last_name, username, email, phone, role_id, status_id FROM users WHERE id = ?').get(id)

    if (!user) return null
    return user
  }

  static async delete ({ id }) {
    const user = await db.prepare('SELECT username FROM users WHERE id = ?').get(id)
    if (!user) return null

    try {
      await db.prepare('DELETE FROM users WHERE id = ?').run(id)
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

    const existingUser = await db.prepare('SELECT * FROM users WHERE id = ?').get(id)
    if (!existingUser) {
      return { error: 'El usuario no existe' }
    }

    const existingUserWithUsername = await db.prepare('SELECT * FROM users WHERE username = ? AND id != ?').get(username, id)
    if (existingUserWithUsername) {
      return { error: 'Ya existe otro usuario con este nombre de usuario. Por favor, elige uno diferente.' }
    }

    let query
    let params

    if (password !== '') {
      const isPasswordValid = await bcrypt.compare(password, existingUser.password)
      if (isPasswordValid) {
        return { error: 'La contraseña proporcionada es igual a la contraseña actual. Debes ingresar una contraseña diferente.' }
      }

      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
      query = 'UPDATE users SET first_name = ?, last_name = ?, username = ?, password = ?, email = ?, phone = ?, role_id = ?, status_id = ? WHERE id = ?'
      params = [first_name, last_name, username, hashedPassword, email, phone, role_id, status_id, id]
    } else {
      query = 'UPDATE users SET first_name = ?, last_name = ?, username = ?, email = ?, phone = ?, role_id = ?, status_id = ? WHERE id = ?'
      params = [first_name, last_name, username, email, phone, role_id, status_id, id]
    }

    try {
      await db.prepare(query).run(...params)
    } catch (error) {
      throw new Error('Error al actualizar usuario')
    }

    const updatedUser = await db.prepare('SELECT * FROM users WHERE id = ?').get(id)
    return updatedUser
  }
}
