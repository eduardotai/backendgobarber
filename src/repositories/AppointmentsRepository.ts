import Appointment from '../models/appointments'
import { EntityRepository, Repository, Entity } from 'typeorm'



@EntityRepository(Appointment)
class AppointmentRepository extends Repository<Appointment> {

    public async findByDate(date: Date): Promise<Appointment | null> {

        const findAppointment = await this.findOne({
            where: { date },
        })

        return findAppointment || null
    }
}

export default AppointmentRepository