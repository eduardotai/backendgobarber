import Appointment from '../models/appointments'
import { isEqual } from 'date-fns'

interface CreateAppointmentDTO {
    provider: string, 
    date: Date
}

class AppointmentRepository {
    private appointments: Appointment[]

    constructor() {
        this.appointments = []
    }

    public all(): Appointment[] {
        return this.appointments
    }

    public findByDate(date: Date): Appointment | null {
        const findAppointment = this.appointments.find(appointment => isEqual(date, appointment.date))

        return findAppointment || null
    }

    public create({provider, date}: CreateAppointmentDTO ): Appointment {
        const appointment = new Appointment({provider, date})
        this.appointments.push(appointment)
        return appointment
    }
}

export default AppointmentRepository