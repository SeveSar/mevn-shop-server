import { ICustomRequest } from "../../types/CustomRequest";
import { Request, Response, NextFunction } from "express";
import { BasketModel } from "./basket.models";

import { IBasketRequest } from "./basket.types";

import { basketService } from "./basket.services";
import { BasketDto } from "./basket.dto";
import { ErrorHTTP } from "../../errors/errors.class";

class BasketController {
  async add(req: Request<{}, {}, IBasketRequest>, res: Response, next: NextFunction) {
    try {
      const { productId, dough, ingredients, size } = req.body;
      console.log(dough, size);
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
      const basket = await BasketModel.findOne({ userId: user.id }).populate("products.product");
      if (!basket) {
        throw new ErrorHTTP(404, "Корзина не найдена");
      }

      return res.json(new BasketDto(basket));
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
