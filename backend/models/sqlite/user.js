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
      status_id // eslint-disable-line camelcase
    } = user

    const id = crypto.randomUUID()
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

    const now = DateTime.now().setZone('America/Lima')
    const created_at = now.toFormat('dd/MM/yyyy, HH:mm') // eslint-disable-line camelcase
    const role_id = 1 // eslint-disable-line camelcase

    const existingUser = await db.prepare('SELECT first_name, last_name, username, email, phone, role_id, status_id FROM users WHERE username = ?').get(username)

    if (existingUser) return null

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
    const users = await db.prepare('SELECT first_name, last_name, username, email, phone, role_id, status_id FROM users').all()

    return users
  }

  static async getById ({ id }) {
    const user = await db.prepare('SELECT first_name, last_name, username, email, phone, role_id, status_id FROM users WHERE id = ?').get(id)

    if (!user) return null
    return user
  }

  static async delete ({ id }) {
    const user = await db.prepare('SELECT first_name, last_name, username, email, phone, role_id, status_id FROM users WHERE id = ?').get(id)
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

    const existingUser = await db.prepare('SELECT first_name, last_name, username, email, phone, role_id, status_id FROM users WHERE id = ?').get(id)
    if (!existingUser) return null

    try {
      await db.prepare('UPDATE users SET first_name = ?, last_name = ?, username = ?, password = ?, email = ?, phone = ?, role_id = ?, status_id = ? WHERE id = ?')
        .run(first_name, last_name, username, password, email, phone, role_id, status_id, id)
    } catch (error) {
      throw new Error('Error al actualizar usuario')
    }

    const updatedUser = await db.prepare('SELECT first_name, last_name, username, email, phone, role_id, status_id FROM users WHERE id = ?').get(id)

    return updatedUser
  }
}
