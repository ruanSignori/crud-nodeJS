import { User } from "../../models/user";
import { HttpResponse, IController } from "../protocols";
import { IGetUsersRepository } from "./protocols";
export declare class GetUsersController implements IController {
    private readonly getUsersRepository;
    constructor(getUsersRepository: IGetUsersRepository);
    handle(): Promise<HttpResponse<User[] | string>>;
}
