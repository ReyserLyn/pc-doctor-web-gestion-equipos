export class EquipmentController {
  constructor ({ equipmentModel }) {
    this.equipmentModel = equipmentModel
  }

  create = async (req, res) => {
    const newEquipment = await this.equipmentModel.create({ equipment: req.body })

    if (newEquipment) {
      return res.status(201).json(newEquipment)
    } else {
      return res.json({ message: 'Eror al crear equipo' })
    }
  }

  getAll = async (req, res) => {
    const equipments = await this.equipmentModel.getAll()
    return res.json(equipments)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const equipment = await this.equipmentModel.getById({ id })

    if (equipment) {
      return res.json(equipment)
    } else {
      return res.status(404).json({ message: 'El equipo no existe' })
    }
  }

  delete = async (req, res) => {
    const { id } = req.params
    const result = await this.equipmentModel.delete({ id })

    if (result) {
      return res.json({ message: 'Equipo eliminado' })
    } else {
      return res.json({ message: 'El equipo no existe' })
    }
  }

  update = async (req, res) => {
    const { id } = req.params
    const updateEquipment = await this.equipmentModel.update({ id, equipment: req.body })

    if (updateEquipment) {
      return res.json(updateEquipment)
    } else {
      return res.json({ message: 'El equipo no existe' })
    }
  }

  setRepair = async (req, res) => {
    const { id } = req.params
    const result = await this.equipmentModel.setRepair({ id, description: req.body })
    if (result) {
      return res.json({ message: 'Equipo reparado' })
    } else {
      return res.json({ message: 'El equipo no existe' })
    }
  }

  setDelivered = async (req, res) => {
    const { id } = req.params
    const result = await this.equipmentModel.setDelivered({ id, date: req.body })
    if (result) {
      return res.json({ message: 'Equipo entregado' })
    } else {
      return res.json({ message: 'El equipo no existe' })
    }
  }

  getServices = async (req, res) => {
    const services = await this.equipmentModel.getServices()
    return res.json(services)
  }

  getStatusCounts = async (req, res) => {
    const statuses = await this.equipmentModel.getStatusCounts()
    return res.json(statuses)
  }
}
