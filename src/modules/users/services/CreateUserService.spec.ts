import "reflect-metadata"

import AppError from '../../../shared/errors/AppError'
import FakeHashProvider from  '../providers/HashProvider/fakes/FakeHashProvider'

import CreateUserService from './CreateUserService'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'

describe('CreateUJser',  () => {
    it('should be able to create a new user', async () => {
       const  fakeUsersRepository = new FakeUsersRepository() 
       const fakeHashProvider = new FakeHashProvider()

       const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider)

       const appointment = await createUser.execute({
           name: 'John doe',
           email: 'expalme@dasldas.com',
           password: '123456'
       }) 

       expect(appointment).toHaveProperty('id')

    })


    it('it not should be able to create a new user with same email from another', async () => {
        const  fakeUsersRepository = new FakeUsersRepository() 
        const fakeHashProvider = new FakeHashProvider()

        const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider)
 
       await createUser.execute({
            name: 'John doe',
            email: 'expalme@dasldas.com',
            password: '123456'
        }) 
 
        expect(createUser.execute({
            name: 'John doe',
            email: 'expalme@dasldas.com',
            password: '123456'
        }) ).rejects.toBeInstanceOf(AppError)
 
     })
 
})