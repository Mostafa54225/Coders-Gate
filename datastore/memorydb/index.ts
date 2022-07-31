import { Datastore } from "..";
import { Comment, Like, Post, User } from "../../types";

export class InMemoryDatastore implements Datastore {

    private users: User[] = []
    private comments: Comment[] = []
    private likes: Like[] = []
    private posts: Post[] = []


    createUser(user: User): void {
        this.users.push(user)
    }
    getUserByEmail(email: string): User | undefined {
        return this.users.find(user => user.email === email)
    }
    getUserByUsername(username: string): User | undefined {
        return this.users.find(user => user.username === username)
    }
    getPosts(): Post[] {
        return this.posts
    }
    createPost(post: Post): void {
        this.posts.push(post)
    }
    getPost(id: string): Post | undefined {
       return this.posts.find(post => post.id === id) 
    }
    deletePost(id: string): void {
        const index = this.posts.findIndex(post => post.id === id)
        if (index === -1) return
        this.posts.splice(index, 1)
    }
    getComments(postId: string): Comment[] {
        return this.comments
    }
    createComment(comment: Comment): void {
        this.comments.push(comment)
    }
    deleteComment(id: string): void {
        const index = this.comments.findIndex(comment => comment.id === id)
        if (index === -1) return
        this.comments.splice(index, 1)
    }
    createLike(like: Like): void {
        this.likes.push(like)
    }

}