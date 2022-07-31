import { Post } from "../types";

export interface PostDao {
    getPosts(): Post[]
    createPost(post: Post): void
    getPost(id: string): Post | undefined
    deletePost(id: string): void
}