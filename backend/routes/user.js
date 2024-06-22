import { Router } from 'express'
import { UserController } from '../controllers/user.js'

export const createUserRouter = ({ userModel }) => {
  const userRouter = Router()

  const userController = new UserController({ userModel })

  userRouter.get('/', userController.getAll)

  userRouter.post('/login', userController.login)
  userRouter.post('/register', userController.register)

  userRouter.get('/:id', userController.getById)
  userRouter.delete('/:id', userController.delete)
  userRouter.put('/:id', userController.update)

  return userRouter
}
