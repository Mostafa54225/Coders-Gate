import { ExpressHandler } from "../types";
import { CreateCommentRequest, CreateCommentResponse, DeleteCommentRequest, DeleteCommentResponse, GetCommentRequest, GetCommentResponse, UpdateCommentRequest, UpdateCommentResponse } from '../api'
import { StatusCodes } from "http-status-codes";
import crypto from 'crypto'
import { db } from "../datastore";

export const createComment: ExpressHandler<CreateCommentRequest, CreateCommentResponse> = async (req, res) => {
    const postId = req.params.postId
    const { comment } = req.body
    if(!postId) {
        return res.status(StatusCodes.NOT_FOUND).send({error: 'Post not found'})
    }
    if(!comment) {
        return res.status(StatusCodes.BAD_REQUEST).send({error: 'Comment is required'})
    }
    const newComment = {
        id: crypto.randomUUID(),
        userId: res.locals.userId,
        postId: postId,
        comment: comment,
        postedAt:  Date.now()
    }

    await db.createComment(newComment)
    return res.sendStatus(StatusCodes.CREATED)
}

export const getComments: ExpressHandler<GetCommentRequest, GetCommentResponse> = async (req, res) => {
    const postId = req.params.postId
    if(!postId) {
        return res.status(StatusCodes.NOT_FOUND).send({error: 'Post not found'})
    }
    const comments = await db.getComments(postId)
    if(comments.length === 0) {
        return res.status(StatusCodes.NOT_FOUND).send({message: 'No Comments yet'})
    }
    return res.status(StatusCodes.OK).send({comments})
}

export const deleteComment: ExpressHandler<DeleteCommentRequest, DeleteCommentResponse> = async (req, res) => {
    const commentId = req.params.commentId
    if(!commentId) {
        return res.status(StatusCodes.NOT_FOUND).send({error: 'Comment not found'})
    }
    const comment = await db.getComment(commentId)
    if(comment.userId !== res.locals.userId) {
        return res.status(StatusCodes.UNAUTHORIZED).send({error: 'You are not authorized to delete this comment'})
    }
    await db.deleteComment(commentId)
    return res.sendStatus(StatusCodes.OK)
}

export const updateComment: ExpressHandler<UpdateCommentRequest, UpdateCommentResponse> = async (req, res) => {
    const commentId = req.params.commentId
    const { updatedComment } = req.body

    if(!commentId) {
        return res.status(StatusCodes.NOT_FOUND).send({error: 'Comment not found'})
    }
    if(!updatedComment) {
        return res.status(StatusCodes.BAD_REQUEST).send({error: 'Comment text is required'})
    }
    const comment = await db.getComment(commentId)
    if(comment.userId !== res.locals.userId) {
        return res.status(StatusCodes.UNAUTHORIZED).send({error: 'You are not authorized to delete this comment'})
    }

    comment.comment = updatedComment
    await db.updateComment(comment)
    return res.sendStatus(StatusCodes.OK)
}

