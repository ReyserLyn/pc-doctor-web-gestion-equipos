/* eslint-disable camelcase */
import * as crypto from 'crypto'
import { DateTime } from 'luxon'
import dotenv from 'dotenv'
import { createClient } from '@libsql/client'

dotenv.config()

const db = createClient({
  url: 'libsql://pcdoctor-reyserzap.turso.io',
  authToken: process.env.DB_TOKEN
})

export class EquipmentModel {
  static async create ({ equipment }) {
    const {
      customer,
      phone,
      device_id,
      brand,
      model,
      entry_condition,
      services
    } = equipment

    const id = crypto.randomUUID()

    const now = DateTime.now().setZone('America/Lima')
    const reception_date = now.toFormat('dd/MM/yyyy HH:mm')
    const delivery_date = 'Pendiente'
    const state_id = 1
    const exit_condition = 'Pendiente'

    let insertedDeviceId = device_id

    if (!['1', '2', '3'].includes(device_id)) {
      try {
        const existingDevice = await db.execute({
          sql: 'SELECT id FROM devices_equipment WHERE name = ?',
          args: [device_id]
        })

        if (existingDevice.rows[0]) {
          insertedDeviceId = existingDevice.rows[0].id.toString()
        } else {
          const result = await db.execute({
            sql: 'INSERT INTO devices_equipment (name) VALUES (?)',
            args: [device_id]
          })
          insertedDeviceId = result.lastInsertRowid.toString()
        }
      } catch (error) {
        console.error('Error al insertar o consultar dispositivo', error)
      }
    }

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
      await db.execute({
        sql: query,
        args: [id, customer, phone, insertedDeviceId, brand, model, entry_condition, reception_date, delivery_date, state_id, exit_condition]
      })

      await Promise.all(services.map(async (serviceName) => {
        const serviceResult = await db.execute({
          sql: 'SELECT id FROM services_equipment WHERE name = ?',
          args: [serviceName.trim()]
        })
        const service = serviceResult.rows[0]

        if (service) {
          await db.execute({
            sql: 'INSERT INTO equipment_services (equipment_id, service_id) VALUES (?, ?)',
            args: [id, service.id]
          })
        } else {
          console.warn(`El servicio '${serviceName}' no existe en la tabla services_equipment.`)
        }
      }))
    } catch (error) {
      console.error('Error al crear equipo', insertedDeviceId, error)
    }

    const createdEquipmentQuery = `
      SELECT
        e.rowid,
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

    const createdEquipmentResult = await db.execute({
      sql: createdEquipmentQuery,
      args: [id]
    })
    const createdEquipment = createdEquipmentResult.rows[0]
    return createdEquipment
  }

  static async getAll () {
    const query = `
      SELECT
        e.rowid,
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
    const equipmentsResult = await db.execute({
      sql: query,
      args: []
    })
    const equipments = equipmentsResult.rows
    return equipments
  }

  static async getById ({ id }) {
    const query = `
      SELECT 
        e.rowid,
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

    const equipmentResult = await db.execute({
      sql: query,
      args: [id]
    })
    const equipment = equipmentResult.rows[0]

    if (!equipment) return null
    return equipment
  }

  static async delete ({ id }) {
    const equipmentResult = await db.execute({
      sql: 'SELECT customer, device_id FROM equipments WHERE id = ?',
      args: [id]
    })
    const equipment = equipmentResult.rows[0]
    if (!equipment) return null

    try {
      await db.execute({
        sql: 'DELETE FROM equipment_services WHERE equipment_id = ?',
        args: [id]
      })
      await db.execute({
        sql: 'DELETE FROM equipments WHERE id = ?',
        args: [id]
      })

      return true
    } catch (error) {
      console.error('Error al eliminar equipo', error)
    }
  }

  static async setRepair ({ id, description }) {
    const existingEquipmentResult = await db.execute({
      sql: 'SELECT customer, device_id FROM equipments WHERE id = ?',
      args: [id]
    })
    const existingEquipment = existingEquipmentResult.rows[0]
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
      await db.execute({
        sql: query,
        args: [state_id, exit_condition, id]
      })

      return true
    } catch (error) {
      console.error('Error al modificar estado en reparacion del equipo', error)
    }
  }

  static async setDelivered ({ id, date }) {
    const existingEquipmentResult = await db.execute({
      sql: 'SELECT customer, device_id FROM equipments WHERE id = ?',
      args: [id]
    })
    const existingEquipment = existingEquipmentResult.rows[0]
    if (!existingEquipment) return null

    const state_id = 3
    const { delivery_date } = date

    const query = `
    UPDATE equipments
    SET 
    state_id = ?,
    delivery_date = ?
    WHERE id = ?
    `

    try {
      await db.execute({
        sql: query,
        args: [state_id, delivery_date, id]
      })

      return true
    } catch (error) {
      console.error('Error al modificar estado a entregado del equipo', error)
      return false
    }
  }

  static async update ({ id, equipment }) {
    const existingEquipmentResult = await db.execute({
      sql: 'SELECT customer, device_id FROM equipments WHERE id = ?',
      args: [id]
    })
    const existingEquipment = existingEquipmentResult.rows[0]
    if (!existingEquipment) return null

    const {
      customer,
      device_id,
      brand,
      model,
      phone,
      entry_condition,
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

    let insertedDeviceId = device_id

    if (!['1', '2', '3'].includes(device_id)) {
      try {
        const existingDevice = await db.execute({
          sql: 'SELECT id FROM devices_equipment WHERE name = ?',
          args: [device_id]
        })

        if (existingDevice.rows[0]) {
          insertedDeviceId = existingDevice.rows[0].id.toString()
        } else {
          const result = await db.execute({
            sql: 'INSERT INTO devices_equipment (name) VALUES (?)',
            args: [device_id]
          })
          insertedDeviceId = result.lastInsertRowid.toString()
        }
      } catch (error) {
        console.error('Error al insertar o consultar dispositivo', error)
      }
    }

    try {
      await db.execute({
        sql: query,
        args: [customer, insertedDeviceId, brand, model, phone, entry_condition, id]
      })
      await db.execute({
        sql: 'DELETE FROM equipment_services WHERE equipment_id = ?',
        args: [id]
      })

      await Promise.all(services.map(async (serviceName) => {
        const serviceResult = await db.execute({
          sql: 'SELECT id FROM services_equipment WHERE name = ?',
          args: [serviceName.trim()]
        })
        const service = serviceResult.rows[0]

        if (service) {
          await db.execute({
            sql: 'INSERT INTO equipment_services (equipment_id, service_id) VALUES (?, ?)',
            args: [id, service.id]
          })
        } else {
          console.warn(`El servicio '${serviceName}' no existe en la tabla services_equipment.`)
        }
      }))
    } catch (error) {
      console.error('Error el editar equipo', error)
    }

    const updatedEquipmentQuery = `
      SELECT 
        e.rowid,
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

    const updatedEquipmentResult = await db.execute({
      sql: updatedEquipmentQuery,
      args: [id]
    })
    const updatedEquipment = updatedEquipmentResult.rows[0]
    return updatedEquipment
  }

  static async getServices () {
    try {
      const servicesResult = await db.execute({
        sql: 'SELECT name FROM services_equipment',
        args: []
      })
      const services = servicesResult.rows
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
      const statusesResult = await db.execute({
        sql: query,
        args: []
      })
      const statuses = statusesResult.rows
      return statuses
    } catch (error) {
      console.error('Error al obtener los conteos de estados de usuarios', error)
    }
  }
}
