import { ErrorHTTP } from '../../errors/errors.class';

import { Request, Response, NextFunction } from 'express';
import { loggerService } from '../../logger';
import { userService } from './user.services';
import { validationResult } from 'express-validator';

import { BasketModel } from '../basket/basket.models';
import { IBasketModel } from '../basket/basket.types';
import { ILoginRequest } from './user.types';
import { ProductModel } from '../product/product.models';
import { Types } from 'mongoose';
import { basketService } from '../basket/basket.services';
import { IDoughModel, ISizeModel } from '../product/product.types';

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
        sameSite: 'none',
        // domain: "mevn-cloud-server.onrender.com",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      let candidateBasket;
      if (cart) {
        candidateBasket = await BasketModel.findOne({
          userId: userDTO.id,
        }).exec();

        const productCartIds = cart.map((item) => item.id);

        const productsDb = await ProductModel.find({ _id: { $in: productCartIds } });

        if (!candidateBasket) {
          candidateBasket = new BasketModel();
          candidateBasket.userId = userDTO.id;
        }

        for (let i = 0; i < cart.length; i++) {
          const item = cart[i];

          const idxProduct = candidateBasket.products.findIndex((pr) => pr.product.toString() === item.id.toString());
          const productDb = productsDb.find((pr) => pr._id.toString() === item.id);

          if (!productDb) continue;

          const productIngredients = productDb.ingredients.filter((ing) =>
            item.ingredients.find((cartIng) => cartIng.id.toString() === ing._id.toString())
          );

          const productSize = productDb.sizes.find(
            (prSize) => prSize._id.toString() === item.size.id.toString()
          ) as ISizeModel;

          const productDough = productDb.dough.find(
            (prDough) => prDough._id.toString() === item.dough.id.toString()
          ) as IDoughModel;

          if (idxProduct !== -1) {
            candidateBasket.products[idxProduct].quantity = item.quantity;
            candidateBasket.products[idxProduct].totalPrice = basketService.calculateTotalPriceProduct(productDb, {
              productSize,
              productIngredients,
              productDough,
            });
            candidateBasket.products[idxProduct].ingredients = productIngredients;
            candidateBasket.products[idxProduct].dough = productDough;
            candidateBasket.products[idxProduct].size = productSize;
          } else {
            candidateBasket.products.push({
              _id: candidateBasket._id,
              quantity: item.quantity,
              totalPrice: basketService.calculateTotalPriceProduct(productDb, {
                productSize,
                productIngredients,
                productDough,
              }),
              product: new Types.ObjectId(item.id),
              size: productSize,
              dough: productDough,
              ingredients: productIngredients,
            });
          }
        }

        candidateBasket.save();
      }

      return res.json({
        accessToken: tokens.accessToken,
        user: userDTO,
        cart: candidateBasket ? candidateBasket : {},
      });
    } catch (e) {
      loggerService.err(`[Login]: ${e}`);
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
