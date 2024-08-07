export class UserController {
  constructor ({ userModel }) {
    this.userModel = userModel
  }

  getAll = async (req, res) => {
    const users = await this.userModel.getAll()
    return res.json(users)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const user = await this.userModel.getById({ id })

    if (user) {
      return res.json(user)
    } else {
      return res.status(404).json({ message: 'Usuario no existe' })
    }
  }

  register = async (req, res) => {
    const newUser = await this.userModel.register({ user: req.body })

    if ('error' in newUser) {
      return res.json({ message: newUser.error })
    } else {
      return res.json(newUser)
    }
  }

  login = async (req, res) => {
    const { username, password } = req.body
    const user = await this.userModel.login({ username, password })

    if (user) {
      return res.json(user)
    } else {
      return res.json({ message: 'Usuario no existe o datos incorrectos' })
    }
  }

  delete = async (req, res) => {
    const { id } = req.params
    const result = await this.userModel.delete({ id })

    if (result) {
      return res.json({ message: 'Usuario eliminado' })
    } else {
      return res.json({ message: 'El usuario no existe' })
    }
  }

  update = async (req, res) => {
    const { id } = req.params
    const updateUser = await this.userModel.update({ id, user: req.body })

    if ('error' in updateUser) {
      return res.json({ message: updateUser.error })
    } else {
      return res.json(updateUser)
    }
  }
}
