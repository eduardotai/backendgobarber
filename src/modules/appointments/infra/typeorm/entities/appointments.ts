import { isThisISOWeek } from 'date-fns'
import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn} from 'typeorm'
import User from '../../../../users/infra/typeorm/entities/user'


@Entity('appointments')
class Appointment {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    provider_id: string

    @ManyToOne(() => User)
    @JoinColumn({name: 'provider_id'})
    provider: User

    @Column('timestamp with time zone')
    date: Date

    @UpdateDateColumn()
    updated_at: Date
}

export default Appointment