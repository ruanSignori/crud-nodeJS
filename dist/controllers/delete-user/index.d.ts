import { User } from "../../models/user";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IDeleteUserRepository } from "./protocols";
export declare class DeleteUserController implements IController {
    private readonly deleteUserRepository;
    constructor(deleteUserRepository: IDeleteUserRepository);
    handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User | string>>;
}
