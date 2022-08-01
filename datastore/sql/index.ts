import { Database, open as sqliteOpen } from "sqlite";
import sqlite3 from "sqlite3";
import path from 'path'
import { Datastore } from "..";
import { User, Post, Comment, Like } from "../../types";

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
    getPosts(): Promise<Post[]> {
        return this.db.all<Post[]>('SELECT * FROM posts')
    }
    async createPost(post: Post): Promise<void> {
        await this.db.run('INSERT INTO posts (id, title, url, postedAt, userId) VALUES (?,?,?,?,?)', post.id, post.title, post.url, post.postedAt, post.userId)
    }
    async getPost(id: string): Promise<Post | undefined> {
        return this.db.get<Post>('SELECT * FROM posts WHERE id = ?', id)
    }
    async deletePost(id: string): Promise<void> {
        await this.db.run('DELETE FROM posts WHERE id = ?', id)
    }
    getComments(postId: string): Promise<Comment[]> {
        throw new Error("Method not implemented.");
    }
    createComment(comment: Comment): Promise<void> {
        throw new Error("Method not implemented.");
    }
    deleteComment(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    createLike(like: Like): Promise<void> {
        throw new Error("Method not implemented.");
    }

}