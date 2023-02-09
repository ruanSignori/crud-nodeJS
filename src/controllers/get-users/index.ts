import { IGetUsersController, IGetUsersRepository } from "./protocols";

export class GetUsersController implements IGetUsersController {
  constructor (private readonly getUsersRepository: IGetUsersRepository) {}

  async handle() {
  
      const users = await this.getUsersRepository.getUsers();
      console.log(users)

      return {
        statusCode: 200,
        body: users
      }
   
  }
}