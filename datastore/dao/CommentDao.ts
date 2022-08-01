import { Comment } from "../../types";

export interface CommentDao {
    getComments(postId: string): Promise<Comment[]>
    getComment(commentId: string): Promise<Comment>
    createComment(comment: Comment): Promise<void>
    deleteComment(commentId: string): Promise<void>
    updateComment(comment: Comment): Promise<void>
}