import "reflect-metadata";
import express, { Request, Response } from "express";
import "express-async-errors";

import createConnection from "./database";
import { router } from "./routes";
import { AppError } from "./errors/AppError";

createConnection();

const app = express();

app.use(express.json());

app.use((err: Error, req: Request, res: Response, _next: NewableFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  return res.status(500).json({
    message: `Internal server error ${err.message}`,
  });
});

app.use(router);

export default app;
