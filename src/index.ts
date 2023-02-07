import express from "express";
import { config } from "dotenv";
import { GetUsersController } from "./controllers/get-users";
import { MongoGetUsersRepository } from "./repositories/get-users/mongo-get-users";
import { MongoClient } from "./database/mongo";

config();

const main = async () => {
  const app = express();
  const port = process.env.PORT || 8080;

  await MongoClient.connect();

  app.listen(port, () => console.log(`Server is runing at localhost:${port}`));

  app.get("/users", async (req, res) => {
    const mongoGetUsersRepository = new MongoGetUsersRepository();

    const getUsersController = new GetUsersController(mongoGetUsersRepository);

    const { body, statusCode } = await getUsersController.handle();
    res.send(body).status(statusCode);
  });
};

main()