import { Router } from 'express'
import appointsmentsRouter from './appointments.router'
import usersRouter from './users.routes'

const routes = Router()

routes.use('/appointments', appointsmentsRouter)
routes.use('/users', usersRouter)


export default routes