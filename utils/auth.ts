import jwt from 'jsonwebtoken'

import { JwtObject } from '../types'

export const generateToken = (obj: JwtObject): string  => {
    return jwt.sign(obj, getJwtSecret(), { expiresIn: process.env.JWT_EXPIRATION })
}

export const verifyToken = (token: string): JwtObject => {
    return jwt.verify(token, getJwtSecret()) as JwtObject
}



const getJwtSecret = () => {
    const secret = process.env.JWT_SECRET
    if(!secret) {
        console.error(`JWT Secret Missing`)
        process.exit(1)
    }
    return secret
}