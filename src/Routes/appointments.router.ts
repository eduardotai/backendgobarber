import { Router } from 'express'
import { startOfHour, parseISO } from 'date-fns'
import AppointmentsRepository from '../repositories/AoointmentsRepository'
import CreateAppointmentsService from '../services/CreateAppointmentService'

const appointmentsRouter = Router()

const appointmentsRepository = new AppointmentsRepository()

appointmentsRouter.get('/', (request, response) => {
    const appointments = appointmentsRepository.all()

    return response.json(appointments)
})

appointmentsRouter.post('/', (request, response) => {

try {
    const { provider, date } = request.body

    const parsedDate = parseISO(date)
    
    const CreateAppointment = new CreateAppointmentsService(appointmentsRepository)
    
    const appointment = CreateAppointment.execute({date: parsedDate, provider})
    
        return response.json({appointment})
        
} catch(err) {
    return response.status(400).json({error: err.message})
}
})

export default appointmentsRouter