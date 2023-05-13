import { ICustomRequest } from "../../types/CustomRequest";
import { Request, Response, NextFunction } from "express";
import { BasketModel } from "./basket.models";

import { ProductModel } from "../product/product.models";
import { ErrorHTTP } from "../../errors/errors.class";
import { IBasketRequest } from "./basket.types";
import { Types } from "mongoose";
import { basketService } from "./basket.services";

class BasketController {
  async add(req: Request<{}, {}, IBasketRequest>, res: Response, next: NextFunction) {
    try {
      const { productId, dough, ingredients, size } = req.body;

      const user = (req as ICustomRequest).user;
      const currentBasket = await basketService.add({
        productId,
        dough,
        size,
        ingredients,
        user,
      });
      return res.json(currentBasket);
    } catch (e) {
      next(e);
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const user = (req as ICustomRequest).user;
      const basket = await BasketModel.findOne({ userId: user.id });

      return res.json(basket);
    } catch (e) {
      next(e);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const baskets = await BasketModel.find();

      return res.json(baskets);
    } catch (e) {
      next(e);
    }
  }
}

const basketController = new BasketController();

export { basketController };
