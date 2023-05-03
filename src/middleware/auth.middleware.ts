import { ErrorHTTP } from "./../errors/errors.class";
import { Request, Response, NextFunction } from "express";
import { tokenService } from "../tokens/tokens.services";
import { CustomRequest } from "../types/CustomRequest.interface";
import { ITokenPayload } from "../api/user/user.types";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return next(new ErrorHTTP(401, "Вы не авторизованы"));
    }
    const decoded = tokenService.validateAccessToken(token);
    if (!decoded) {
      return next(new ErrorHTTP(401, "Вы не авторизованы"));
    }
    const reqCurrent = req as Request & { user: ITokenPayload };
    reqCurrent.user = decoded;
    // if (!req.user) {
    //   req.user = decoded;
    // }

    next();
  } catch (e) {
    return next(new ErrorHTTP(401, "Вы не авторизованы"));
  }
}
