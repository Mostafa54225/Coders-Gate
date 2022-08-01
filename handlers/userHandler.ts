import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { GetUserByIdRequest, GetUserByIdResponse, GetUsersRequest, GetUsersResponse, UpdateUserRequest, UpdateUserResponse } from "../api";
import { db } from "../datastore";
import { ExpressHandler } from "../types";
import { compaerHashedPassword, hashPassword } from "../utils/hashing";

export const getUsers: ExpressHandler<GetUsersRequest, GetUsersResponse> = async (req, res) => {
    res.send({users: await db.getUsers()})
}

export const getUserById: ExpressHandler<GetUserByIdRequest, GetUserByIdResponse> = async (req, res) => {
    
    const userId = req.params.userId
    const user = await db.getUserById(userId)
    if(!user) {
        return res.status(StatusCodes.NOT_FOUND).send({error: 'User not found'})
    }
    return res.status(StatusCodes.OK).send({user: user})
}

export const updateUser: ExpressHandler<UpdateUserRequest, UpdateUserResponse> = async (req, res) => {
    let {firstName, lastName, email, password, username} = req.body
    if(!firstName || !lastName || !email || !password || !username) {
        return res.status(StatusCodes.BAD_REQUEST).send({error: 'Invalid request'})
    }
    const userId = req.params.userId
    const user = await db.getUserById(userId)
    if(!user) {
        return res.status(StatusCodes.NOT_FOUND).send({error: 'User not found'})
    }    
    password = await hashPassword(password)
    
    await db.updateUser(userId, {firstName, lastName, email, password, username})

    return res.status(StatusCodes.OK).send({message: `User ${username} updated`})
}