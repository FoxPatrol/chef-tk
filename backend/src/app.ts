import express, { Request, Response } from "express";
import cors from "cors";
import router from "@routes/index";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello, TypeScript with Express!");
});

app.use(router);

export default app;
