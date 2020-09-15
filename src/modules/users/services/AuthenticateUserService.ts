import User from '../infra/typeorm/entities/user'
import { sign } from 'jsonwebtoken'
import authConfig from '../../../config/auth'
import AppError from  '../../../shared/errors/AppError'
import IUsersRepository from '../repositories/IUsersRepository'
import {  injectable, inject } from 'tsyringe'
import IHashProvider from '../providers/HashProvider/Models/IHashProvider'



interface Request{
    email: string
    password: string
}

interface Response {
    user: User
    token: string
}
@injectable()
class AuthenticateUserService { 

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('IHashProvider')
        private hashProvider: IHashProvider
    ) { }

    public async execute({  email, password }: Request): Promise<Response>{

        const user = await this.usersRepository.findByEmail(email)

        if(!user){
        throw new AppError('Incorret email/password combination', 401)
        }

        const passwordMatched = await this.hashProvider.compareHash(password, user.password)

        if(!passwordMatched){
            throw new AppError('Incorret email/password combination', 401)
        }

        const {  secret, expiresIn } = authConfig.jwt

        const token =  sign({  }, secret, {
            subject: user.id,
            expiresIn
        })

        return {
            user,
            token
        }
    }    
}

export default AuthenticateUserService