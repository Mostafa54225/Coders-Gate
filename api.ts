import { Comment, Post, Like, User, JwtObject } from "./types";



// Post APIs
export interface ListPostsRequest {}
export interface ListPostsResponse {
    posts: Post[]
}

export type CreatePostRequest = Pick<Post, 'title' | 'url' | 'userId'>
export interface CreatePostResponse {}
export interface DeletePostRequest {}
export interface DeletePostResponse {
    message: string
}
export type UpdatePostRequest = Pick<Post, 'title' | 'url'>
export interface UpdatePostResponse {
    message: string
}
export interface GetPostRequest {}
export interface GetPostResponse {
    post: Post
}

// Comment APIs

export type CreateCommentRequest = Pick<Comment, 'comment'>
export interface CreateCommentResponse {}
export interface DeleteCommentRequest {commentId: string}
export interface DeleteCommentResponse {}
export interface GetCommentRequest {}
export type GetCommentResponse =  {comments: Comment[], message: string}

export interface UpdateCommentRequest {updatedComment: string}
export interface UpdateCommentResponse {message: string}


// Like APIs
export type CreateLikeRequest = Pick<Like, 'postId' | 'userId'>
export interface CreateLikeResponse {}
export interface DeleteLikeRequest {likeId: string}
export interface DeleteLikeResponse {}
export interface GetLikeRequest {}
export interface GetLikeResponse {likes: Like[]}


// Auth APIs
export type SignUpRequest = Pick<User, 'email' | 'firstName' | 'lastName' | 'username' | 'password'>
export interface SignUpResponse {
    jwt: string
}
export interface SignInRequest {
    login: string
    password: string
}

export type SignInResponse = {
    user: Pick<User, 'email' |'firstName' | 'lastName' | 'username' | 'id'>
    jwt: string
}

// User APIs
export interface GetUsersRequest {}
export interface GetUsersResponse {
    users: User[]
}

export interface GetUserByIdRequest {}
export interface GetUserByIdResponse {
    user: User
}

export type UpdateUserRequest = Pick<User, 'email' |'firstName' | 'lastName' | 'username' | 'password'>

export interface UpdateUserResponse {
    message: string
}


