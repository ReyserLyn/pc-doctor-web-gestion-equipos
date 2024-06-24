import { createServer } from './index.js'
import { UserModel } from './models/turso/user.js'
import { EquipmentModel } from './models/turso/equipment.js'

createServer({ userModel: UserModel, equipmentModel: EquipmentModel })
