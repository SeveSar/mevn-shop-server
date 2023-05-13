import { ErrorHTTP } from "../../errors/errors.class";

import { Request, Response, NextFunction } from "express";
import { loggerService } from "../../logger";
import { userService } from "./user.services";
import { validationResult } from "express-validator";

import { BasketModel } from "../basket/basket.models";
import { IBasketModel } from "../basket/basket.types";
import { ILoginRequest } from "./user.types";
import { ProductModel } from "../product/product.models";
import { Types } from "mongoose";
import { basketService } from "../basket/basket.services";

class UserController {
  async register(req: Request<{}, {}, { email: string; password: string }>, res: Response, next: NextFunction) {
    try {
      const { body } = req;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(new ErrorHTTP(400, "Не корректный пароль или e-mail", errors));
      }

      const { tokens, userDTO } = await userService.createUser(body);
      res.cookie("refreshToken", tokens.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
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
        return next(new ErrorHTTP(400, "Не корректный пароль или e-mail", errors));
      }
      const { tokens, userDTO } = await userService.getUser({
        email,
        password,
      });

      res.cookie("refreshToken", tokens.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
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
          const product = productsDb.find((pr) => pr._id.toString() === item.id);

          if (!product) continue;

          const productIngredients = product.ingredients.filter((ing) => item.ingredients.includes(ing._id.toString()));

          if (idxProduct === -1) {
            const currentItem = {
              quantity: 1,
              totalPrice: basketService.calculateTotalPriceProduct(product, {
                productSize: item.size,
                productIngredients,
                productDough: item.dough,
              }),
              product: new Types.ObjectId(item.id),
              size: item.size,
              dough: item.dough,
              ingredients: productIngredients,
            };
            candidateBasket.products.push(currentItem);
          } else {
            candidateBasket.products[idxProduct].quantity = item.quantity;
            candidateBasket.products[idxProduct].totalPrice = basketService.calculateTotalPriceProduct(product, {
              productSize: item.size,
              productIngredients,
              productDough: item.dough,
              quantity: candidateBasket.products[idxProduct].quantity,
            });
            candidateBasket.products[idxProduct].ingredients = productIngredients;
            candidateBasket.products[idxProduct].dough = item.dough;
            candidateBasket.products[idxProduct].size = item.size;
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
      res.cookie("refreshToken", tokens.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
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
      res.clearCookie("refreshToken");
      return res.json({ success: true });
    } catch (e) {
      next(e);
    }
  }
}

const userController = new UserController();
export { userController };
