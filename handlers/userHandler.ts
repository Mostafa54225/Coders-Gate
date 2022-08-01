import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { GetUserByIDRequest, GetUserByIdResponse, GetUsersRequest, GetUsersResponse } from "../api";
import { db } from "../datastore";
import { ExpressHandler } from "../types";

export const getUsers: ExpressHandler<GetUsersRequest, GetUsersResponse> = async (req, res) => {
    res.send({users: await db.getUsers()})
}

export const getUserById: ExpressHandler<GetUserByIDRequest, GetUserByIdResponse> = async (req, res) => {
    console.log(req.params)
    // const user = await db.getUserById(id)
    // if(!user) {
    //     return res.status(StatusCodes.NOT_FOUND).send({error: 'User not found'})
    // }
    // return res.status(StatusCodes.OK).send({user: user})
}