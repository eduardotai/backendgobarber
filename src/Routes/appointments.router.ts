import { Router } from 'express'
import { startOfHour, parseISO } from 'date-fns'
import AppointmentsRepository from '../repositories/AppointmentsRepository'
import CreateAppointmentsService from '../services/CreateAppointmentService'
import { getCustomRepository } from 'typeorm'
import AppointmentRepository from '../repositories/AppointmentsRepository'
import ensureAuthenticated from '../middleware/ensureAuthenticated'

const appointmentsRouter = Router()

appointmentsRouter.use(ensureAuthenticated)

appointmentsRouter.get('/', async(request, response) => {
    const appointmentsRepository = getCustomRepository(AppointmentRepository)
    const appointments = await appointmentsRepository.find()

    return response.json(appointments)
})

appointmentsRouter.post('/', async (request, response) => {

try {
    const { provider, date } = request.body

    const parsedDate = parseISO(date)

    
    const CreateAppointment = new CreateAppointmentsService()
    
    const appointment = await CreateAppointment.execute({date: parsedDate, provider})
    
        return response.json({appointment})
        
} catch(err) {
    return response.status(400).json({error: err.message})
}
})

export default appointmentsRouter