import { Model, Types } from "mongoose";
import { CustomRequest } from "./../../types/CustomRequest.interface";
import { Request, Response, NextFunction } from "express";
import { BasketModel } from "./basket.models";
// import { IBasketModel } from "./basket.types";
// import { Schema } from "express-validator";

class BasketController {
  async add(req: Request, res: Response, next: NextFunction) {
    try {
      const { productId, quantity } = req.body;
      const sessionId = req.sessionID;
      let userIsAuth = false;
      const user = (req as CustomRequest).user;
      if (user) {
        userIsAuth = true;
      }
      let currentBasket;

      if (userIsAuth) {
        currentBasket = await BasketModel.findOne({ userId: user.id });
      } else {
        currentBasket = await BasketModel.findOne({ sessionId: req.sessionID });
      }

      if (!currentBasket) {
        const newBasket = new BasketModel();
        if (userIsAuth) {
          newBasket.userId = user.id;
          newBasket.sessionId = null;
        } else {
          newBasket.sessionId = sessionId;
          newBasket.userId = null;
        }
        newBasket.products.push({ quantity, product: productId });
        newBasket.cart_quantity = quantity;
        await newBasket.save();
        return res.json(newBasket);
      } else {
        const hasProductIdx = currentBasket.products.findIndex(
          (pr: any) => pr.product.toString() === productId.toString()
        );

        if (hasProductIdx !== -1) {
          currentBasket.products[hasProductIdx].quantity += quantity;
          currentBasket.cart_quantity = currentBasket.products.reduce(
            (sum: number, pr: any) => {
              return (sum += pr.quantity);
            },
            0
          );
        } else {
          currentBasket.products.push({ quantity, product: productId });
          currentBasket.cart_quantity = currentBasket.products.reduce(
            (sum: number, pr: any) => {
              return (sum += pr.quantity);
            },
            0
          );
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
