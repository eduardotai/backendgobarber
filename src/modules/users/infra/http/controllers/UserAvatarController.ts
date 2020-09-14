import {Request, Response} from 'express'
import {container } from 'tsyringe'
import CreateUserService from '../../../../users/services/CreateUserService'
import UpdateUserAvatarService from '../../../../users/services/UpdateUserAvatarService'




export default class UserAvatarController{
    public async update(request: Request, response: Response): Promise<Response> {
        console.log(request.file)
        

        const updateUserAvatar = container.resolve(UpdateUserAvatarService)


        const user = await updateUserAvatar.execute({
            user_id: request.user.id,
            avatarFileName: request.file.filename
        })

        return response.json(user)
}
}
