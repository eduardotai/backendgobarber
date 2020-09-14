import { Router } from 'express'
import CreateUserService from '../../../../users/services/CreateUserService'
import ensureAuthenticated from '../middleware/ensureAuthenticated'
import multer from 'multer'
import uploadConfig from '../../../../../config/upload'
import {container } from 'tsyringe'
import UserController from '../controllers/UserController'
import UserAvatarController from '../controllers/UserAvatarController'


import UpdateUserAvatarService from '../../../../users/services/UpdateUserAvatarService'
import User from '../../../../users/infra/typeorm/entities/user'

import UsersRepository from '../../../infra/typeorm/repositories/UsersRepository'




const usersRouter = Router()
const userController = new UserController()
const userAvatarController = new UserAvatarController()
const upload = multer(uploadConfig)



usersRouter.post('/', userController.create)


usersRouter.patch('/avatar', ensureAuthenticated,upload.single('avatar'), userAvatarController.update
 )

export default usersRouter