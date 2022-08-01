import { UpdateUserRequest } from "../../api";
import { User } from "../../types";

export interface UserDao {
    createUser(user: User): Promise<void>
    getUserById(id: string): Promise<User | undefined>
    getUserByEmail(email: string): Promise<User | undefined>
    getUserByUsername(username: string): Promise<User | undefined>
    getUsers(): Promise<User[] | undefined>
    updateUser(id: string, user: UpdateUserRequest): Promise<void>
}