import { RequestHandler } from "express"
import { StatusCodes } from "http-status-codes"
import { db } from "../datastore"
import { ExpressHandler, Post } from "../types"
import crypto from 'crypto'



type CreatePostRequest = Pick<Post, 'title' | 'url' | 'userId'>

interface CreatePostResponse {}


export const getposts: ExpressHandler<{}, {}> =  (req, res) => {
    res.send({posts: db.getPosts()})
}

export const createPost: ExpressHandler<CreatePostRequest, CreatePostResponse> = (req, res) => {
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
    db.createPost(post)
    res.sendStatus(StatusCodes.CREATED)
}