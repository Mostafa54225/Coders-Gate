import { Database, open as sqliteOpen } from "sqlite";
import sqlite3 from "sqlite3";
import path from 'path'
import { Datastore } from "..";
import { User, Post, Comment, Like } from "../../types";
import { UpdatePostRequest, UpdateUserRequest } from "../../api";

export class SqlDatastore implements Datastore {



    private db!: Database<sqlite3.Database, sqlite3.Statement>
    public async openDB() {
        this.db = await sqliteOpen({
            filename: path.join(__dirname, 'codergate.sqlite'),
            driver: sqlite3.Database
        });

        this.db.run('PRAGMA foreign_keys = ON;');
        await this.db.migrate({
            migrationsPath: path.join(__dirname, 'migrations')
        })
        return this
    }

    // User
    async createUser(user: User): Promise<void> {
        await this.db.run('INSERT INTO users (id, email, firstName, lastName, username, password) VALUES (?,?,?,?,?,?)', 
            user.id, 
            user.email, 
            user.firstName, 
            user.lastName, 
            user.username, 
            user.password
        )
    }
    

    // Users
    async getUsers(): Promise<User[] | undefined> {
        return this.db.all<User[]>('SELECT * FROM users')
    }

    async getUserById(id: string): Promise<User | undefined> {
        return this.db.get<User>('SELECT * FROM users WHERE id = ?', id)
    }

    async getUserByEmail(email: string): Promise<User | undefined> {
        return await this.db.get<User>('SELECT * FROM users WHERE email = ?', email)
    }
    async getUserByUsername(username: string): Promise<User | undefined> {
        return await this.db.get<User>('SELECT * FROM users WHERE username = ?', username)
    }

    async updateUser(id: string, user: UpdateUserRequest): Promise<void> {
        await this.db.run('UPDATE users SET email = ?, firstName = ?, lastName = ?, username = ?, password = ? WHERE id = ?'
        ,user.email, user.firstName, user.lastName, user.username, user.password, id)
    }


    // Posts
    async getPosts(): Promise<Post[]> {
        return await this.db.all<Post[]>('SELECT * FROM posts')
    }
    async getPost(id: string): Promise<Post | undefined> {
        return this.db.get<Post>('SELECT * FROM posts WHERE id = ?', id)
    }
    async createPost(post: Post): Promise<void> {
        await this.db.run('INSERT INTO posts (id, title, url, postedAt, userId) VALUES (?,?,?,?,?)', post.id, post.title, post.url, post.postedAt, post.userId)
    }

    async updatePost(postId: string, post: UpdatePostRequest): Promise<void> {
        await this.db.run('UPDATE posts SET title = ?, url = ? WHERE id = ?', post.title, post.url, postId)
    }

    async deletePost(id: string): Promise<void> {
        await this.db.run('DELETE FROM posts WHERE id = ?', id)
    }

    // Comment
    async getComments(postId: string): Promise<Comment[]> {
        return await this.db.all<Comment[]>('SELECT * FROM comments WHERE postId = ?', postId)
    }

    async getComment(commentId: string): Promise<Comment> {
        return await this.db.get<Comment>('SELECT * FROM comments WHERE id = ?', commentId) as Comment
    }

    async createComment(comment: Comment): Promise<void> {
        await this.db.run('INSERT INTO comments (id, userId, postId, comment, postedAt) VALUES (?,?,?,?,?)', comment.id, comment.userId, comment.postId, comment.comment, comment.postedAt)
    }

    async updateComment(comment: Comment): Promise<void> {
        await this.db.run('UPDATE comments SET comment = ? WHERE id = ?', comment.comment, comment.id)
    }
    async deleteComment(commentId: string): Promise<void> {
        await this.db.run('DELETE FROM comments WHERE id = ?', commentId)
    }

    

    // Likes
    async createLike(like: Like): Promise<void> {
        await this.db.run('INSERT INTO likes (userId, postId) VALUES (?,?)', like.userId, like.postId)
    }

    async getLikesByPostId(postId: string): Promise<Like[]> {
        return await this.db.all<Like[]>('SELECT * FROM likes WHERE postId = ?', postId)
    }

}