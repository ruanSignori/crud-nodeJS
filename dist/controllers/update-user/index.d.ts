import { User } from "../../models/user";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IUpdateUserRespository, UpdateUserParams } from "./protocols";
export declare class UpdateUserController implements IController {
    private readonly updateUserRepository;
    constructor(updateUserRepository: IUpdateUserRespository);
    handle(httpRequest: HttpRequest<UpdateUserParams>): Promise<HttpResponse<User | string>>;
}
