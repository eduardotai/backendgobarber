import { UpdateDateColumn } from "typeorm";

import User from '../../../modules/users/infra/typeorm/entities/user'
import path from 'path'
import uploadConfig from '../../../config/upload'
import AppError from  '../../../shared/errors/AppError'

import IUsersRepository from '../repositories/IUsersRepository'
import {  injectable, inject } from 'tsyringe'

import IStorageProvider from '../../../shared/container/providers/StorageProvider/models/IStorageProvider'



import fs from 'fs'

interface Request {
    user_id: string
    avatarFileName: string
}

@injectable()
class UpdateUserAvatarService {

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('StorageProvider')
        private storageProvider: IStorageProvider
    ) {
        
    }

    public async execute({ user_id, avatarFileName}: Request): Promise<User>{

        
        const user = await this.usersRepository.findById(user_id)

        console.log(user)

        if(!user){
            throw new AppError('tOnly authenticated users can change avatar', 401)
        }

        if(user.avatar){
            await this.storageProvider.deleteFile(user.avatar)
        }

        const fileName = await this.storageProvider.saveFile(avatarFileName)

        user.avatar = fileName

        await this.usersRepository.save(user)

        return user

    }
    
}

export default UpdateUserAvatarService