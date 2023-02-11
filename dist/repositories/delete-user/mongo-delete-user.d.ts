import { IDeleteUserRepository } from "../../controllers/delete-user/protocols";
import { User } from "../../models/user";
export declare class MongoDeleteUserRepository implements IDeleteUserRepository {
    deleteUser(id: string): Promise<User>;
}
