import { Model, Types, Document } from "mongoose";
import { ICustomRequest } from "../../types/CustomRequest";
import { Request, Response, NextFunction } from "express";
import { BasketModel } from "./basket.models";
import { IBasketModel } from "./basket.types";

class BasketController {
  async add(req: Request, res: Response, next: NextFunction) {
    try {
      const { productId, quantity } = req.body;

      const user = (req as ICustomRequest).user;

      let currentBasket = await BasketModel.findOne({ userId: user.id });

      if (!currentBasket) {
        const newBasket = new BasketModel();
        newBasket.userId = user.id;

        newBasket.products.push({ quantity, product: productId });
        await newBasket.save();
        return res.json(newBasket);
      } else {
        const hasProductIdx = currentBasket.products.findIndex(
          (pr: any) => pr.product.toString() === productId.toString()
        );

        if (hasProductIdx !== -1) {
          currentBasket.products[hasProductIdx].quantity += quantity;
        } else {
          currentBasket.products.push({ quantity, product: productId });
        }
        await currentBasket.save();
        return res.json(currentBasket);
      }
    } catch (e) {
      next(e);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const carts = await BasketModel.find();

      return res.json(carts);
    } catch (e) {
      next(e);
    }
  }
}

const basketController = new BasketController();

export { basketController };
