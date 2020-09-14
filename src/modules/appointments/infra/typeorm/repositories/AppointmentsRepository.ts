import Appointment from '../entities/appointments'
import { getRepository, Repository } from 'typeorm'

import IAppointmentsRepository from '../../../../appointments/repositories/IAppointmentsRepository'

import iCreateAppointmentDTO from '../../../dtos/ICreateAppointmentDTO'
import ICreateAppointmentDTO from '../../../dtos/ICreateAppointmentDTO'


class AppointmentRepository  implements IAppointmentsRepository{

    private ormRepository: Repository<Appointment>

    constructor () {
        this.ormRepository = getRepository((Appointment))
    }

    public async findByDate(date: Date): Promise<Appointment | undefined> {

        const findAppointment = await this.ormRepository.findOne({
            where: { date },
        })

        return findAppointment
    }

    public async create({ provider_id, date}: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = this.ormRepository.create({provider_id, date})

        await this.ormRepository.save(appointment)

        return appointment
    }
}

export default AppointmentRepository