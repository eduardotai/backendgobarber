import {Request, Response} from 'express'
import { startOfHour, parseISO } from 'date-fns'
import { container } from 'tsyringe'
import CreateAppointmentsService from '../../../services/CreateAppointmentService'


export default class AppointmentController {
    public async create(request: Request, response: Response): Promise<Response>{
        const { provider_id, date } = request.body

        const parsedDate = parseISO(date)
    
    
        
        const CreateAppointment = container.resolve(CreateAppointmentsService)
        
        const appointment = await CreateAppointment.execute({date: parsedDate, provider_id})
        
            return response.json({appointment}) 
    }
}