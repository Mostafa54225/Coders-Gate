import { Comment, Post, Like, User } from "./types";



// Post APIs
export interface ListPostsRequest {}
export interface ListPostsResponse {
    posts: Post[]
}

export type CreatePostRequest = Pick<Post, 'title' | 'url' | 'userId'>
export interface CreatePostResponse {}
export interface DeletePostRequest {postId: string}
export interface DeletePostResponse {}
export interface GetPostRequest {}
export interface GetPostResponse {
    post: Post
}

// Comment APIs

export type CreateCommentRequest = Pick<Comment, 'postId' | 'comment'>
export interface CreateCommentResponse {}
export interface DeleteCommentRequest {commentId: string}
export interface DeleteCommentResponse {}
export interface GetCommentRequest {}
export interface GetCommentResponse {comments: Comment[]}


// Like APIs
export type CreateLikeRequest = Pick<Like, 'postId' | 'userId'>
export interface CreateLikeResponse {}
export interface DeleteLikeRequest {likeId: string}
export interface DeleteLikeResponse {}
export interface GetLikeRequest {}
export interface GetLikeResponse {likes: Like[]}


// User APIs
export type CreateUserRequest = Pick<User, 'email' | 'firstName' | 'lastName' | 'username' | 'password'>
export interface CreateUserResponse {}