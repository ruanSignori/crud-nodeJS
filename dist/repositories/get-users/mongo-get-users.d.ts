import { IGetUsersRepository } from "../../controllers/get-users/protocols";
import { User } from "../../models/user";
export declare class MongoGetUsersRepository implements IGetUsersRepository {
    getUsers(): Promise<User[]>;
}
