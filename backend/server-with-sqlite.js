import { UserModel } from './models/sqlite/user.js'
import { EquipmentModel } from './models/sqlite/equipment.js'

import express, { json } from 'express'

import cors from 'cors'
import dotenv from 'dotenv'
import { createUserRouter } from './routes/user.js'
import { createEquipmentRouter } from './routes/equipment.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3005

app.use(json())
app.use(cors())
app.disable('x-powered-by')

app.get('/', (req, res) => {
  res.send('API Funcionando Correctamente')
})

app.use('/user', createUserRouter({ userModel: UserModel }))
app.use('/equipment', createEquipmentRouter({ equipmentModel: EquipmentModel }))

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`)
})

export default app
