import "reflect-metadata"

import Appointment from '../infra/typeorm/entities/appointments'
import AppointmentRepository from '../infra/typeorm/repositories/AppointmentsRepository'
import { startOfHour } from 'date-fns'
import AppError from  '../../../shared/errors/AppError'

import {injectable, inject} from 'tsyringe'


import IAppointmentsRepository from '../repositories/IAppointmentsRepository'



interface Request {
    provider_id: string
    date: Date
}

@injectable()
class CreateAppointmentService {


    constructor(

        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository
    ) {
        
    }

    public async execute({date, provider_id}: Request): Promise<Appointment> {

        const appointmentDate = startOfHour(date)

        const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(appointmentDate,)

        if(findAppointmentInSameDate) {
            throw new AppError('This appointment is already booked')
        
        }
    
        const appointment = await this.appointmentsRepository.create({
            provider_id,
            date: appointmentDate,
        })


        return appointment

        }
}

export default CreateAppointmentService