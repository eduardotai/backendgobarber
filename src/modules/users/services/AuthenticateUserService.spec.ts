import "reflect-metadata"
import FakeHashProvider from  '../providers/HashProvider/fakes/FakeHashProvider'

import AppError from '../../../shared/errors/AppError'


import AuthenticateUserService from './AuthenticateUserService'
import CreateUserService from './CreateUserService'

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'

describe('AuthenticateUserService',  () => {
    it('it should be able to authenticate', async () => {
       const  fakeUsersRepository = new FakeUsersRepository() 
       const fakeHashProvider = new FakeHashProvider()


       const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider)

       const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider)

       await createUser.execute({
        name: 'jhon doe',
        email: 'expalme@dasldas.com',
        password: '123456'
       })


       const response = await authenticateUser.execute({
           email: 'expalme@dasldas.com',
           password: '123456'
       }) 

       expect(response).toHaveProperty('token')


    })

    it('it should be not able to authenticate with non existing user', async () => {
        const  fakeUsersRepository = new FakeUsersRepository() 
        const fakeHashProvider = new FakeHashProvider()
 
 
        const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider)
 
        const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider)
 
    
        expect(authenticateUser.execute({
            email: 'expalme@dasldas.com',
            password: '123456'
        }) 
        ).rejects.toBeInstanceOf(AppError)
 
 
     })

     it('it should  not be able to authenticate with wrong password', async () => {
        const  fakeUsersRepository = new FakeUsersRepository() 
        const fakeHashProvider = new FakeHashProvider()
 
 
        const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider)
 
        const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider)
 
        await createUser.execute({
         name: 'jhon doe',
         email: 'expalme@dasldas.com',
         password: '123456'
        })

 
        expect(authenticateUser.execute({
            email: 'expalme@dasldas.com',
            password: '1234567'
        }) ).rejects.toBeInstanceOf(AppError)
 
    })
})