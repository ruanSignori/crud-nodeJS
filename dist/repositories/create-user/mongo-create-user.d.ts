import { CreateUserParams, ICreateUserRepository } from "../../controllers/create-user/protocols";
import { User } from "../../models/user";
export declare class MongoCreateUserRepository implements ICreateUserRepository {
    createUser(params: CreateUserParams): Promise<User>;
}
