import Appointment from '../../infra/typeorm/entities/appointments'

import IAppointmentsRepository from '../../../appointments/repositories/IAppointmentsRepository'

import iCreateAppointmentDTO from '../../dtos/ICreateAppointmentDTO'

import {  uuid } from 'uuidv4'
import ICreateAppointmentDTO from '../../dtos/ICreateAppointmentDTO'

import { isEqual } from 'date-fns'
 

class AppointmentRepository  implements IAppointmentsRepository{

    private appointments: Appointment[] = []
    
    public async findByDate(date: Date): Promise<Appointment | undefined> {

        const findAppointment = this.appointments.find(appointment => 
            isEqual(appointment.date, date)
        )
    
        return findAppointment   
    }
    public async create({ provider_id, date}: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = new Appointment()

        Object.assign(appointment, { id: uuid(), date, provider_id})

        
        this.appointments.push(appointment)

        return appointment
    }
}


export default AppointmentRepository