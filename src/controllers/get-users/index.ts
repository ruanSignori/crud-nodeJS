import { IController } from "../protocols";
import { IGetUsersRepository } from "./protocols";

export class GetUsersController implements IController {
  constructor(private readonly getUsersRepository: IGetUsersRepository) {}

  async handle() {
    const users = await this.getUsersRepository.getUsers();
    console.log(users);

    return {
      statusCode: 200,
      body: users,
    };
  }
}
