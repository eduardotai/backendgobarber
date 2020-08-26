import { Router } from 'express'
import appointsmentsRouter from './appointments.router'
import usersRouter from './users.routes'
import sessionsRouter from './sessions.routes'

const routes = Router()

routes.use('/appointments', appointsmentsRouter)
routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter)



export default routes