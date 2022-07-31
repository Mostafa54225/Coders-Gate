import { StatusCodes } from "http-status-codes";
import { SignInRequest, SignUpRequest, SignUpResponse } from "../api";
import { db } from "../datastore";
import { ExpressHandler, User } from "../types";
import crypto from 'crypto'
import bcrypt from 'bcryptjs'
import { compaerHashedPassword, hashPassword } from "../utils/hashing";

export const signUp: ExpressHandler<SignUpRequest, SignUpResponse> = async (req, res) => {
    const {firstName, lastName, username, email, password} = req.body;
    if(!firstName || !lastName || !username || !email || !password) {
        return res.sendStatus(StatusCodes.BAD_REQUEST);
    }

    const existing = await db.getUserByEmail(email) || await db.getUserByUsername(username)
    if(existing) return res.status(StatusCodes.CONFLICT).send(`User with ${existing.email === email ? 'email' : 'username'} ${existing.email === email ? existing.email : existing.username} already exists`)



    const user: User = {
        id: crypto.randomUUID(),
        email,
        firstName,
        lastName,
        username,
        password: await hashPassword(password)
    }
    await db.createUser(user)
    return res.status(StatusCodes.CREATED).send(`User ${user.username} created`)
}


export const signIn: ExpressHandler<SignInRequest, SignUpResponse> = async (req, res) => {
    const { login, password } = req.body

    if(!login || !password) {
        return res.status(StatusCodes.BAD_REQUEST).send(`Invalid login`)
    }
    const existing = await db.getUserByEmail(login) || await db.getUserByUsername(login)
    if(!existing) {
        return res.status(StatusCodes.NOT_FOUND).send(`User ${login} not found`)
    }

    let hashedPassword = await compaerHashedPassword(password, existing.password)
    if(!hashedPassword) {
        return res.status(StatusCodes.UNAUTHORIZED).send(`Invalid password`)
    }
    return res.status(StatusCodes.OK).send({
        email: existing.email,
        firstName: existing.firstName,
        lastName: existing.lastName,
        username: existing.username,
        id: existing.id
    })

}