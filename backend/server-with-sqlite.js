import { createServer } from './index.js'
import { UserModel } from './models/sqlite/user.js'
import { EquipmentModel } from './models/sqlite/equipment.js'

createServer({ userModel: UserModel, equipmentModel: EquipmentModel })
