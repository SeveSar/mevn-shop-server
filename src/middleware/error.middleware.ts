import { ErrorHTTP } from "./../errors/errors.class";
import { Request, Response, NextFunction } from "express";
import { loggerService } from "../logger";

export function errorMiddleware(
  err: Error | ErrorHTTP,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ErrorHTTP) {
    console.error(err);
    res.status(err.status).json({ message: err.message, errors: err.errors });
  } else {
    console.error(err);

    res.status(500).json({ message: err.message });
  }
}
