import { UserDao } from './dao/UserDao'
import { PostDao } from './dao/PostDao'
import { CommentDao } from './dao/CommentDao'
import { LikeDao } from './dao/LikeDao'
import { SqlDatastore } from './sql'
// import { InMemoryDatastore } from './memorydb'

export interface Datastore extends UserDao, PostDao, CommentDao, LikeDao {}

export let db: Datastore


export async function initDB() {
    // db = new InMemoryDatastore()
    db = await new SqlDatastore().openDB()
} 