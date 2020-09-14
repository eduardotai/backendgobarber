import Appointment from '../infra/typeorm/entities/appointments'

import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO'

export default interface AppointmentsRepository {
    create(data: ICreateAppointmentDTO): Promise<Appointment>
    findByDate(date: Date): Promise<Appointment | undefined>
}