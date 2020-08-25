import { isThisISOWeek } from 'date-fns'
import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn} from 'typeorm'
import user from './user'
import User from './user'


@Entity('appointments')
class Appointment {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    provider: string

    @ManyToOne(() => User)
    @JoinColumn({name: 'provider'})
    provider_id: User

    @Column('timestamp with time zone')
    date: Date

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}

export default Appointment