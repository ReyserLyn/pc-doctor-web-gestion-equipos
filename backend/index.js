import express, { json } from 'express'
import { corsMiddleware } from './middlewares/cors.js'
import { createUserRouter } from './routes/user.js'
import { createEquipmentRouter } from './routes/equipment.js'
import { UserModel } from './models/turso/user.js'
import { EquipmentModel } from './models/turso/equipment.js'

const app = express()

app.use(json())
app.use(corsMiddleware())
app.disable('x-powered-by')

app.use('/user', createUserRouter({ userModel: UserModel }))
app.use('/equipment', createEquipmentRouter({ equipmentModel: EquipmentModel }))

const PORT = process.env.PORT ?? 3005

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`)
})

export default app
