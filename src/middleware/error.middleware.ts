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
    loggerService.err(`Ошибка ${err.status}: ${err.message}`);
    res.status(err.status).json({ message: err.message, errors: err.errors });
  } else {
    loggerService.err(`${err.message}`);
    res.status(500).json({ message: err.message });
  }
}
