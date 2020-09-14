import { Router } from 'express'
import AuthenticateUserService from '../../../services/AuthenticateUserService'
import AppError from '../../../../../shared/errors/AppError'
import UsersRepository from '../../../infra/typeorm/repositories/UsersRepository'
import {container } from 'tsyringe'
import SessionsControllers from '../controllers/SessionsController'

const sessionsRouter = Router()
const sessionsController = new SessionsControllers()

sessionsRouter.post('/', sessionsController.create)
    
export default sessionsRouter