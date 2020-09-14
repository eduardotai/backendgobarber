import { UpdateDateColumn } from "typeorm";

import User from '../../../modules/users/infra/typeorm/entities/user'
import path from 'path'
import uploadConfig from '../../../config/upload'
import AppError from  '../../../shared/errors/AppError'

import IUsersRepository from '../repositories/IUsersRepository'
import {  injectable, inject } from 'tsyringe'



import fs from 'fs'

interface Request {
    user_id: string
    avatarFileName: string
}

@injectable()
class UpdateUserAvatarService {

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) {
        
    }

    public async execute({ user_id, avatarFileName}: Request): Promise<User>{

        
        const user = await this.usersRepository.findById(user_id)

        console.log(user)

        if(!user){
            throw new AppError('tOnly authenticated users can change avatar', 401)
        }

        if(user.avatar){
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)

            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath)

            if(userAvatarFileExists){
                await fs.promises.unlink(userAvatarFilePath)
            }
        }

        user.avatar = avatarFileName

        await this.usersRepository.save(user)

        return user

    }
    
}

export default UpdateUserAvatarService