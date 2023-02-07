import { IGetUsersRepository } from "../../controllers/get-users/protocols";
import { User } from "../../models/user";

export class MongoGetUsersRepository implements IGetUsersRepository {
  async getUsers(): Promise<User[]> {
    return [{
      firstName: 'RUAN',
      lastName: 'PRETO',
      email: 'ruanpre@gmail.com',
      password: '123'
    }]
  }
   
}