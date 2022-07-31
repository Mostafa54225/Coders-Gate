import { Comment } from "../../types";

export interface CommentDao {
    getComments(postId: string): Promise<Comment[]>
    createComment(comment: Comment): Promise<void>
    deleteComment(id: string): Promise<void>
}