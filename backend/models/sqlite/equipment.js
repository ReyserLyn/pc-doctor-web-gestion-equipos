import Database from 'better-sqlite3'
import crypto from 'node:crypto'
import { DateTime } from 'luxon'

const db = new Database('./models/sqlite/database.db')

export class EquipmentModel {
  static async create ({ equipment }) {
    const {
      customer,
      phone,
      device_id, // eslint-disable-line camelcase
      brand,
      model,
      entry_condition, // eslint-disable-line camelcase
      services
    } = equipment

    const id = crypto.randomUUID()

    const now = DateTime.now().setZone('America/Lima')
    const reception_date = now.toFormat('dd/MM/yyyy HH:mm') // eslint-disable-line camelcase
    const delivery_date = 'Pendiente' // eslint-disable-line camelcase
    const state_id = 1 // eslint-disable-line camelcase
    const exit_condition = 'Pendiente' // eslint-disable-line camelcase

    const query = `
      INSERT INTO equipments (
        id,
        customer,
        phone,
        device_id,
        brand,
        model,
        entry_condition,
        reception_date,
        delivery_date,
        state_id,
        exit_condition
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `

    try {
      await db.prepare(query).run(id, customer, phone, device_id, brand, model, entry_condition, reception_date, delivery_date, state_id, exit_condition)

      await Promise.all(services.map(async (serviceName) => {
        const service = await db.prepare('SELECT id FROM services_equipment WHERE name = ?').get(serviceName.trim())

        if (service) {
          await db.prepare('INSERT INTO equipment_services (equipment_id, service_id) VALUES (?, ?)').run(id, service.id)
        } else {
          console.warn(`El servicio '${serviceName}' no existe en la tabla services_equipment.`)
        }
      }))
    } catch (error) {
      console.error('Error al crear equipo', error)
    }

    const createdEquipmentQuery = `
      SELECT 
        e.customer,
        e.phone,
        de.name AS device,
        e.brand,
        e.model,
        e.reception_date,
        e.delivery_date,
        se.name AS state,
        e.entry_condition,
        e.exit_condition,
        GROUP_CONCAT(se2.name, ', ') AS services
      FROM 
        equipments e
      LEFT JOIN 
        devices_equipment de ON e.device_id = de.id
      LEFT JOIN 
        state_equipment se ON e.state_id = se.id
      LEFT JOIN 
        equipment_services es ON e.id = es.equipment_id
      LEFT JOIN 
        services_equipment se2 ON es.service_id = se2.id
      WHERE 
        e.id = ?
      GROUP BY 
        e.id, e.customer, e.phone, de.name, e.brand, e.model, e.reception_date, e.delivery_date, se.name, e.entry_condition, e.exit_condition;
    `

    const createdEquipment = await db.prepare(createdEquipmentQuery).get(id)
    return createdEquipment
  }

  static async getAll () {
    const query = `
      SELECT
        e.id,
        e.customer,
        e.phone,
        de.name AS device,
        e.brand,
        e.model,
        e.reception_date,
        e.delivery_date,
        se.name AS state,
        e.entry_condition,
        e.exit_condition,
        GROUP_CONCAT(se2.name, ', ') AS services
      FROM 
        equipments e
      LEFT JOIN 
        devices_equipment de ON e.device_id = de.id
      LEFT JOIN 
        state_equipment se ON e.state_id = se.id
      LEFT JOIN 
        equipment_services es ON e.id = es.equipment_id
      LEFT JOIN 
        services_equipment se2 ON es.service_id = se2.id
      GROUP BY 
        e.id, e.customer, e.phone, de.name, e.brand, e.model, e.reception_date, e.delivery_date, se.name, e.entry_condition, e.exit_condition
      ORDER BY 
        SUBSTR(e.reception_date, 7, 4) || '-' || SUBSTR(e.reception_date, 4, 2) || '-' || SUBSTR(e.reception_date, 1, 2) || ' ' || SUBSTR(e.reception_date, 12, 5) DESC;
    `
    const equipments = await db.prepare(query).all()
    return equipments
  }

  static async getById ({ id }) {
    const query = `
      SELECT 
        e.id,
        e.customer,
        e.phone,
        de.name AS device,
        e.brand,
        e.model,
        e.reception_date,
        e.delivery_date,
        se.name AS state,
        e.entry_condition,
        e.exit_condition,
        GROUP_CONCAT(se2.name, ', ') AS services
      FROM 
        equipments e
      LEFT JOIN 
        devices_equipment de ON e.device_id = de.id
      LEFT JOIN 
        state_equipment se ON e.state_id = se.id
      LEFT JOIN 
        equipment_services es ON e.id = es.equipment_id
      LEFT JOIN 
        services_equipment se2 ON es.service_id = se2.id
      WHERE 
        e.id = ?
      GROUP BY 
        e.id, e.customer, e.phone, de.name, e.brand, e.model, e.reception_date, e.delivery_date, se.name, e.entry_condition, e.exit_condition;
    `

    const equipment = await db.prepare(query).get(id)

    if (!equipment) return null
    return equipment
  }

  static async delete ({ id }) {
    const equipment = await db.prepare('SELECT customer, device_id FROM equipments WHERE id = ?').get(id)
    if (!equipment) return null

    try {
      await db.prepare('DELETE FROM equipment_services WHERE equipment_id = ?').run(id)
      await db.prepare('DELETE FROM equipments WHERE id = ?').run(id)

      return true
    } catch (error) {
      console.error('Error al eliminar equipo', error)
    }
  }

  static async setRepair ({ id, description }) {
    const existingEquipment = await db.prepare('SELECT customer, device_id FROM equipments WHERE id = ?').get(id)
    if (!existingEquipment) return null

    const { exit_condition } = description // eslint-disable-line camelcase
    const state_id = 2 // eslint-disable-line camelcase

    const query = `
    UPDATE equipments
    SET 
    state_id = ?,
    exit_condition = ?
    WHERE id = ?
    `

    try {
      await db.prepare(query).run(state_id, exit_condition, id)

      return true
    } catch (error) {
      console.error('Error al modificar estado en reparacion del equipo', error)
    }
  }

  static async setDelivered ({ id, date }) {
    const existingEquipment = await db.prepare('SELECT customer, device_id FROM equipments WHERE id = ?').get(id)
    if (!existingEquipment) return null

    const state_id = 3 // eslint-disable-line camelcase

    const { delivery_date } = date // eslint-disable-line camelcase

    const query = `
    UPDATE equipments
    SET 
    state_id = ?,
    delivery_date = ?
    WHERE id = ?
    `

    try {
      await db.prepare(query).run(state_id, delivery_date, id)

      return true
    } catch (error) {
      console.error('Error al modificar estado en reparacion del equipo', error)
      return false
    }
  }

  static async update ({ id, equipment }) {
    const existingEquipment = await db.prepare('SELECT customer, device_id FROM equipments WHERE id = ?').get(id)
    if (!existingEquipment) return null

    const {
      customer,
      device_id, // eslint-disable-line camelcase
      brand,
      model,
      phone,
      entry_condition, // eslint-disable-line camelcase
      services
    } = equipment

    const query = `
      UPDATE equipments
      SET 
        customer = ?,
        device_id = ?,
        brand = ?,
        model = ?,
        phone = ?,
        entry_condition = ?
      WHERE id = ?
    `
    try {
      await db.prepare(query).run(customer, device_id, brand, model, phone, entry_condition, id)
      await db.prepare('DELETE FROM equipment_services WHERE equipment_id = ?').run(id)

      await Promise.all(services.map(async (serviceName) => {
        const service = await db.prepare('SELECT id FROM services_equipment WHERE name = ?').get(serviceName.trim())

        if (service) await db.prepare('INSERT INTO equipment_services (equipment_id, service_id) VALUES (?, ?)').run(id, service.id)
        else console.warn(`El servicio '${serviceName}' no existe en la tabla services_equipment.`)
      }))
    } catch (error) {
      console.error('Error el editar equipo', error)
    }

    const updatedEquipmentQuery = `
      SELECT 
        e.id,
        e.customer,
        e.phone,
        de.name AS device,
        e.brand,
        e.model,
        e.reception_date,
        e.delivery_date,
        se.name AS state,
        e.entry_condition,
        e.exit_condition,
        GROUP_CONCAT(se2.name, ', ') AS services
      FROM 
        equipments e
      LEFT JOIN 
        devices_equipment de ON e.device_id = de.id
      LEFT JOIN 
        state_equipment se ON e.state_id = se.id
      LEFT JOIN 
        equipment_services es ON e.id = es.equipment_id
      LEFT JOIN 
        services_equipment se2 ON es.service_id = se2.id
      WHERE 
        e.id = ?
      GROUP BY 
        e.id, e.customer, e.phone, de.name, e.brand, e.model, e.reception_date, e.delivery_date, se.name, e.entry_condition, e.exit_condition;
    `

    const updatedEquipment = await db.prepare(updatedEquipmentQuery).get(id)
    return updatedEquipment
  }

  static async getServices () {
    try {
      const services = await db.prepare('SELECT name FROM services_equipment').all()
      return services
    } catch (error) {
      console.error('Error al obtener los servicios del equipo', error)
    }
  }

  static async getStatusCounts () {
    try {
      const query = `
        SELECT se.name AS status, COUNT(e.id) AS count
        FROM equipments e
        INNER JOIN state_equipment se ON e.state_id = se.id
        GROUP BY se.name
      `
      const statuses = await db.prepare(query).all()
      return statuses
    } catch (error) {
      console.error('Error al obtener los conteos de estados de usuarios', error)
    }
  }
}
