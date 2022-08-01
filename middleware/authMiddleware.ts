import { StatusCodes } from "http-status-codes";
import { db } from "../datastore";
import { ExpressHandler } from "../types";
import { verifyToken } from "../utils/auth";

export const authMiddleware: ExpressHandler<any, any> = async (req, res, next) => {
    const token = req.cookies.access_token;
    if(!token){
        return res.sendStatus(StatusCodes.UNAUTHORIZED)
    }

    try {
        const payload = verifyToken(token);
        const user = await db.getUserById(payload.userId)
        if(!user) {
            throw 'not found'
        }
        res.locals.userId = user.id
        next()
    } catch (error) {
        return res.status(StatusCodes.UNAUTHORIZED).send({error: 'Invalid token'})
    }
}