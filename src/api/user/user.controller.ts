import { UserDTO } from './user.dto';
import { ErrorHTTP } from '../../errors/errors.class';

import { Request, Response, NextFunction } from 'express';
import { loggerService } from '../../logger';
import { userService } from './user.services';
import { validationResult } from 'express-validator';

import { ILoginRequest, UserUpdateRequest } from './user.types';
import { ProductModel } from '../product/product.models';
import { Types } from 'mongoose';
import { basketService } from '../basket/basket.services';

class UserController {
  async register(req: Request<{}, {}, { email: string; password: string }>, res: Response, next: NextFunction) {
    try {
      const { body } = req;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(new ErrorHTTP(400, 'Не корректный пароль или e-mail', errors));
      }

      const { tokens, userDTO } = await userService.createUser(body);
      res.cookie('refreshToken', tokens.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        // domain: "mevn-cloud-server.onrender.com",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      return res.json({
        accessToken: tokens.accessToken,
        user: userDTO,
      });
    } catch (e) {
      loggerService.err(`[Register]: ${e}`);
      next(e);
    }
  }
  async login(req: Request<{}, {}, ILoginRequest>, res: Response, next: NextFunction) {
    try {
      const { email, password, cart } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(new ErrorHTTP(400, 'Не корректный пароль или e-mail', errors));
      }
      const { tokens, userDTO } = await userService.getUser({
        email,
        password,
      });

      res.cookie('refreshToken', tokens.refreshToken, {
        httpOnly: true,
        secure: true,
        // sameSite: 'none',
        // domain: "mevn-cloud-server.onrender.com",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      await basketService.createOrUpdateBasket(cart, userDTO);

      return res.json({
        accessToken: tokens.accessToken,
        user: userDTO,
      });
    } catch (e) {
      console.dir(e);
      loggerService.err(`[Login]: ${e}`);
      next(e);
    }
  }

  async update(req: Request<{}, {}, UserUpdateRequest>, res: Response, next: NextFunction) {
    try {
      const { id } = req.user;
      const updatedUser = await userService.updateUser(req.body, id);
      return res.json(updatedUser);
    } catch (e) {
      next(e);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const { tokens, userDTO } = await userService.refresh(refreshToken);
      res.cookie('refreshToken', tokens.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        // domain: "mevn-cloud-server.onrender.com",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      return res.json({
        accessToken: tokens.accessToken,
        user: userDTO,
      });
    } catch (e) {
      loggerService.err(`[Login]: ${e}`);
      next(e);
    }
  }
  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      await userService.logout(refreshToken);
      res.clearCookie('refreshToken');
      return res.json({ success: true });
    } catch (e) {
      next(e);
    }
  }
}

const userController = new UserController();
export { userController };
