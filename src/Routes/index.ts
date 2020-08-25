import { Router } from 'express'
import appointsmentsRouter from './appointments.router'

const routes = Router()

routes.use('/appointments', appointsmentsRouter)

export default routes