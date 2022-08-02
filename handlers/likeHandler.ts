import { StatusCodes } from "http-status-codes";
import { CreateLikeRequest, CreateLikeResponse, GetLikeRequest, GetLikeResponse } from "../api";
import { db } from "../datastore";
import { ExpressHandler } from "../types";

export const createLike: ExpressHandler<CreateLikeRequest, CreateLikeResponse> = async (req, res) => {
    const userId = res.locals.userId;
    const postId = req.params.postId;
    if (!postId) {
        return res.status(StatusCodes.NOT_FOUND).send({ error: "Post not found" });
    }
    if(!userId) {
        return res.status(StatusCodes.UNAUTHORIZED).send({ error: "You must be logged in to like a post" });
    }
    const newLike = {
        userId: userId,
        postId: postId,
    };
    await db.createLike(newLike);
    return res.sendStatus(StatusCodes.CREATED);
}

export const getLikesByPostId: ExpressHandler<GetLikeRequest, GetLikeResponse> = async (req, res) => {
    const postId = req.params.postId;
    if (!postId) {
        return res.status(StatusCodes.NOT_FOUND).send({ error: "Post not found" });
    }
    const likes = await db.getLikesByPostId(postId);
    return res.send({likes: likes.length});
}