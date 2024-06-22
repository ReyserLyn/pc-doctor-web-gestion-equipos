import { Router } from 'express'
import { EquipmentController } from '../controllers/equipment.js'

export const createEquipmentRouter = ({ equipmentModel }) => {
  const equipmentRouter = Router()
  const equipmentController = new EquipmentController({ equipmentModel })

  equipmentRouter.get('/', equipmentController.getAll)
  equipmentRouter.get('/services', equipmentController.getServices)
  equipmentRouter.get('/statuses', equipmentController.getStatusCounts)

  equipmentRouter.post('/create', equipmentController.create)

  equipmentRouter.get('/:id', equipmentController.getById)
  equipmentRouter.delete('/:id', equipmentController.delete)
  equipmentRouter.put('/:id', equipmentController.update)

  equipmentRouter.patch('/setRepair/:id', equipmentController.setRepair)
  equipmentRouter.patch('/setDelivered/:id', equipmentController.setDelivered)

  return equipmentRouter
}
