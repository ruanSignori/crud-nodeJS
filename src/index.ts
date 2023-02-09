import express from "express";
import { config } from "dotenv";
import { GetUsersController } from "./controllers/get-users";
import { MongoGetUsersRepository } from "./repositories/get-users/mongo-get-users";
import { MongoClient } from "./database/mongo";
import { MongoCreateUserRepository } from "./repositories/create-user/mongo-create-user";
import { CreateUserController } from "./controllers/create-user";

config();

const main = async () => {
  const app = express();

  app.use(express.json());

  const port = process.env.PORT || 8080;

  await MongoClient.connect();

  app.listen(port, () => console.log(`Server is runing at localhost:${port}`));

  app.get("/users", async (req, res) => {
    const mongoGetUsersRepository = new MongoGetUsersRepository();

    const getUsersController = new GetUsersController(mongoGetUsersRepository);

    const { body, statusCode } = await getUsersController.handle();
    res.status(statusCode).send(body)
  });

  app.post("/users", async (req, res) => {
    const mongoCreateUserRepository = new MongoCreateUserRepository();

    const createUserController = new CreateUserController(mongoCreateUserRepository);

    const { body, statusCode } = await createUserController.handle({
      body: req.body,
    });

    console.log(body)

    res.status(statusCode).send(body);
  });
};

main();
