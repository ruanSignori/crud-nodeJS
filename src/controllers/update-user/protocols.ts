import { User } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";

export interface UpdateUserParams {
  firstName: string;
  lastName: string;
  password: string;
}

export interface IUpdateUserController {
  handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>>;
}

export interface IUpdateUserRespository {
  updateUser(id: string, params: Partial<UpdateUserParams>): Promise<User>;
}
