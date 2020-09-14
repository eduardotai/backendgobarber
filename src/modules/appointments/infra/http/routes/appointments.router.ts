import { Router } from 'express'
import ensureAuthenticated from '../../../../users/infra/http/middleware/ensureAuthenticated'
import AppointmentController from '../controllers/AppointmentController'

const appointmentsRouter = Router()

const appointmentController = new AppointmentController()

appointmentsRouter.use(ensureAuthenticated)

appointmentsRouter.post('/', appointmentController.create) 

export default appointmentsRouter