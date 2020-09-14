import { Request, Response, NextFunction  } from 'express'
import { verify } from 'jsonwebtoken'
import authConfig from '../../../../../config/auth'
import AppError from '../../../../../shared/errors/AppError'


interface tokenPayLoad { 
    iat: number
    exp: number
    sub: string
}

export default function ensureAuthenticated(
    request: Request, 
    response: Response, 
    next: NextFunction): void
     {
    
    const authHeader = request.headers.authorization

    if(!authHeader){
        throw new AppError('JWT TOKEN IS MISSING', 401)
    }

    const [, token] = authHeader.split(' ')

    
        
        const decoded = verify(token, authConfig.jwt.secret)

        console.log(decoded)

        const { sub } = decoded as tokenPayLoad

        request.user = {
            id: sub
        }

        return next()

}