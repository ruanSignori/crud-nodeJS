import { IUpdateUserRespository, UpdateUserParams } from "../../controllers/update-user/protocols";
import { User } from "../../models/user";
export declare class MongoUpdateUserRepository implements IUpdateUserRespository {
    updateUser(id: string, params: Partial<UpdateUserParams>): Promise<User>;
}
