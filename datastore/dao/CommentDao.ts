import { Comment } from "../../types";

export interface CommentDao {
    getComments(postId: string): Comment[]
    createComment(comment: Comment): void
    deleteComment(id: string): void
}