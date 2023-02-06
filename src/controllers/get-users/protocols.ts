import { User } from "../../models/user"
import { HttpResponse } from "../protocols"

export interface IGetUsersController {
  /**Responsável por validar a requisição
   * Vai direcionar chamada para o Repository
   */
  handle(): Promise<HttpResponse<User[]>>
}

export interface IGetUsersRepository {
  getUsers(): Promise<User[]>
}