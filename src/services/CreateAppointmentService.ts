import Appointment from '../models/appointments'
import appointmentsRepository from '../repositories/AoointmentsRepository'
import AppointmentRepository from '../repositories/AoointmentsRepository'
import { startOfHour } from 'date-fns'


interface Request {
    provider: string
    date: Date
}

class CreateAppointmentService {

    private appointmentsRepository: AppointmentRepository
    constructor(appointmentsRepository: AppointmentRepository ) {
        this.appointmentsRepository = appointmentsRepository
    }

    public execute({date, provider}: Request): Appointment {
        const appointmentDate = startOfHour(date)

        const findAppointmentInSameDate = this.appointmentsRepository.findByDate(appointmentDate,)

        if(findAppointmentInSameDate) {
            throw Error('This appointment is already booked')
        
        }
    
        const appointment = this.appointmentsRepository.create({
            provider, 
            date: appointmentDate,
        })

        return appointment

        }
}

export default CreateAppointmentService