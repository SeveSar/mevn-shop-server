import { Request, Response, NextFunction } from "express";
import { tokenService } from "../../tokens/tokens.services";
import { CustomRequest } from "../../types/CustomRequest.interface";

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return next();
    }
    const decoded = tokenService.validateAccessToken(token);
    if (!decoded) {
      return next();
    }

    (req as CustomRequest).user = decoded;

    next();
  } catch (e) {
    return;
  }
}
