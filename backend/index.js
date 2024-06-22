import express, { json } from 'express'
import { corsMiddleware } from './middlewares/cors.js'
import { createUserRouter } from './routes/user.js'
import { createEquipmentRouter } from './routes/equipment.js'

export const createServer = ({ userModel, equipmentModel }) => {
  const app = express()

  app.use(json())
  app.use(corsMiddleware())
  app.disable('x-powered-by')

  app.use('/user', createUserRouter({ userModel }))
  app.use('/equipment', createEquipmentRouter({ equipmentModel }))

  const PORT = process.env.PORT ?? 3000

  app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`)
  })
}
