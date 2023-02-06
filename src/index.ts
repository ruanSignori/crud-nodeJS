import express from "express";
import { config } from "dotenv";

config();

const app = express();
const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send('Olá mundo')
})

app.listen(port, () => console.log(`Server is running at localhost:${port}.`))
