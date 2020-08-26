import Appointment from '../models/appointments'
import AppointmentRepository from '../repositories/AppointmentsRepository'
import { startOfHour } from 'date-fns'
import { getCustomRepository } from 'typeorm'


interface Request {
    provider: string
    date: Date
}

class CreateAppointmentService {


    public async execute({date, provider}: Request): Promise<Appointment> {
        const appointmentsRepository = getCustomRepository(AppointmentRepository)

        const appointmentDate = startOfHour(date)

        const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate,)

        if(findAppointmentInSameDate) {
            throw Error('This appointment is already booked')
        
        }
    
        const appointment = appointmentsRepository.create({
            date: appointmentDate,
        })

        await appointmentsRepository.save(appointment)

        return appointment

        }
}

export default CreateAppointmentService