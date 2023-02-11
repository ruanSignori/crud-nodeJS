import { User } from "../../models/user";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { CreateUserParams, ICreateUserRepository } from "./protocols";
export declare class CreateUserController implements IController {
    private readonly createUserRepository;
    constructor(createUserRepository: ICreateUserRepository);
    handle(httpRequest: HttpRequest<CreateUserParams>): Promise<HttpResponse<User | string>>;
}
