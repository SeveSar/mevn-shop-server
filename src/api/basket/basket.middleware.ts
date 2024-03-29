import { Request, Response, NextFunction } from 'express';
import { tokenService } from '../../tokens/tokens.services';

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return next();
    }
    const decoded = tokenService.validateAccessToken(token);
    if (!decoded) {
      return next();
    }

    req.user = decoded;

    next();
  } catch (e) {
    return;
  }
}
