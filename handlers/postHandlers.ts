import { RequestHandler } from "express"
import { StatusCodes } from "http-status-codes"
import { db } from "../datastore"
import { ExpressHandler, Post } from "../types"
import crypto from 'crypto'
import { CreatePostRequest, CreatePostResponse, DeletePostRequest, DeletePostResponse, ListPostsRequest, ListPostsResponse, GetPostRequest, GetPostResponse, UpdatePostRequest, UpdatePostResponse } from "../api"





export const createPost: ExpressHandler<CreatePostRequest, CreatePostResponse> = async (req, res) => {
    if(!req.body.title || !req.body.url) {
        return res.sendStatus(StatusCodes.BAD_REQUEST)
    }

    const post: Post = {
        id: crypto.randomUUID(),
        postedAt: Date.now(),
        title: req.body.title,
        url: req.body.url,
        userId: res.locals.userId
    }
    await db.createPost(post)
    res.sendStatus(StatusCodes.CREATED)
}

export const getposts: ExpressHandler<ListPostsRequest, ListPostsResponse> = async (req, res) => {
    res.send({posts: await db.getPosts()})
}  

export const getPost: ExpressHandler<GetPostRequest, GetPostResponse> = async (req, res) => {
    const postId = req.params.postId
    if(!postId) {
        return res.status(StatusCodes.NOT_FOUND).send({error: 'Post not found'})
    }
    const post = await db.getPost(postId)
    if(!post) {
        return res.status(StatusCodes.NOT_FOUND).send({error: 'Post not found'})
    }
    return res.status(StatusCodes.OK).send({post: post})
}

export const deletePost: ExpressHandler<DeletePostRequest, DeletePostResponse> = async (req, res) => {
    const postId = req.params.postId
    if(!postId) {
        return res.status(StatusCodes.NOT_FOUND).send({error: 'Post not found'})
    }
    const post = await db.getPost(postId)
    if(!post) {
        return res.status(StatusCodes.NOT_FOUND).send({error: 'Post not found'})
    }
    if(res.locals.userId !== post.userId) return res.status(StatusCodes.UNAUTHORIZED).send({error: 'Unauthorized'})
    await db.deletePost(postId)
    return res.status(StatusCodes.OK).send({message: 'Post deleted'})
}

export const updatePost: ExpressHandler<UpdatePostRequest, UpdatePostResponse> = async (req, res) => {
    const { title, url } = req.body
    if(!title || !url) {
        return res.sendStatus(StatusCodes.BAD_REQUEST)
    }
    const postId = req.params.postId
    if(!postId){
        return res.status(StatusCodes.NOT_FOUND).send({error: 'Post not found'})
    }

    const post = await db.getPost(postId)
    if(!post) {
        return res.status(StatusCodes.NOT_FOUND).send({error: 'Post not found'})
    }

    if(res.locals.userId !== post.userId) return res.status(StatusCodes.UNAUTHORIZED).send({error: 'Unauthorized'})
    await db.updatePost(postId, {title, url})
    return res.status(StatusCodes.OK).send({message: 'Post updated'})
}