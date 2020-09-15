import "reflect-metadata"

import AppError from '../../../shared/errors/AppError'
import FakeStorageProvider from  '../../../shared/container/providers/StorageProvider/fakes/FakeStorageProvider'

import UpdateUserAvatarService from './UpdateUserAvatarService'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'


describe('UpdateUserAvatar',  () => {
    it('should be able to create a new user', async () => {
       const  fakeUsersRepository = new FakeUsersRepository() 
       const fakeStorageProvider = new FakeStorageProvider()

       const updateUserAvatar = new UpdateUserAvatarService(fakeUsersRepository, fakeStorageProvider)

        const user = await fakeUsersRepository.create({
            name: 'jhon doe',
            email: 'sadasd@asdasd.com',
            password: '123456'
        })

       const appointment = await updateUserAvatar.execute({
        user_id: user.id,
        avatarFileName: 'avatar.jpg'
       }) 

       expect(user.avatar).toBe('avatar.jpg')

    })

    it('should not be able to update avatar from non existing user', async () => {
        const  fakeUsersRepository = new FakeUsersRepository() 
        const fakeStorageProvider = new FakeStorageProvider()
 
        const updateUserAvatar = new UpdateUserAvatarService(fakeUsersRepository, fakeStorageProvider)
 
        expect(updateUserAvatar.execute({
            user_id: 'non-existing-user',
            avatarFileName: 'avatar.jpg'
           }) ).rejects.toBeInstanceOf(AppError)
 
     })

     it('it should delete old avatar when updanting new one', async () => {
        const  fakeUsersRepository = new FakeUsersRepository() 
        const fakeStorageProvider = new FakeStorageProvider()

        const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile')
 
        const updateUserAvatar = new UpdateUserAvatarService(fakeUsersRepository, fakeStorageProvider)
 
         const user = await fakeUsersRepository.create({
             name: 'jhon doe',
             email: 'sadasd@asdasd.com',
             password: '123456'
         })
 
        await updateUserAvatar.execute({
         user_id: user.id,
         avatarFileName: 'avatar.jpg'
        }) 

       await updateUserAvatar.execute({
            user_id: user.id,
            avatarFileName: 'avatar2.jpg'
           }) 
           
        
        expect(deleteFile).toHaveBeenCalledWith('avatar.jpg')

        expect(user.avatar).toBe('avatar2.jpg')
 
     })
})