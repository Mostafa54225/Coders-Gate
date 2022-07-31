import { RequestHandler } from "express"
import { StatusCodes } from "http-status-codes"
import { db } from "../datastore"
import { ExpressHandler, Post } from "../types"
import crypto from 'crypto'
import { CreatePostRequest, CreatePostResponse, ListPostsRequest, ListPostsResponse } from "../api"



export const getposts: ExpressHandler<ListPostsRequest, ListPostsResponse> = async (req, res) => {
    res.send({posts: await db.getPosts()})
}  

export const createPost: ExpressHandler<CreatePostRequest, CreatePostResponse> = async (req, res) => {
    if(!req.body.title || !req.body.url || !req.body.userId) {
        return res.sendStatus(StatusCodes.BAD_REQUEST)
    }

    const post: Post = {
        id: crypto.randomUUID(),
        postedAt: Date.now(),
        title: req.body.title,
        url: req.body.url,
        userId: req.body.userId
    }
    await db.createPost(post)
    res.sendStatus(StatusCodes.CREATED)
}