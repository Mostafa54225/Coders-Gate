import { UserDao } from './dao/UserDao'
import { PostDao } from './dao/PostDao'
import { CommentDao } from './dao/CommentDao'
import { LikeDao } from './dao/LikeDao'
import { InMemoryDatastore } from './memorydb'

export interface Datastore extends UserDao, PostDao, CommentDao, LikeDao {}

export const db = new InMemoryDatastore()