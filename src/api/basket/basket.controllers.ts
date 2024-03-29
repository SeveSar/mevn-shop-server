import { Request, Response, NextFunction } from 'express';
import { BasketModel } from './basket.models';

import { IBasketProductModel, IBasketRequest } from './basket.types';

import { basketService } from './basket.services';

import { ErrorHTTP } from '../../errors/errors.class';
import { Types } from 'mongoose';

class BasketController {
  async add(req: Request<{}, {}, IBasketRequest>, res: Response, next: NextFunction) {
    try {
      const { productId, dough, ingredients, size } = req.body;

      const user = req.user;
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
      const user = req.user;

      const basket = await basketService.getByUserId(user.id);

      return res.json(basket);
    } catch (e) {
      next(e);
    }
  }

  async updateProduct(req: Request<{ id: string }, {}, IBasketProductModel>, res: Response, next: NextFunction) {
    try {
      const { ...updatedProduct } = req.body;

      const userId = req.user.id;
      const { id } = req.params;

      const isValidId = Types.ObjectId.isValid(id);
      if (!isValidId) {
        throw new ErrorHTTP(400, 'Некорректный id продукта');
      }
      const newItem = await basketService.updateProduct({ user: userId, productId: id, updatedProduct });
      return res.json(newItem);
    } catch (e) {
      console.error(e, 'ERROR');
      next(e);
    }
  }

  async removeProduct(req: Request<{ id: string }, {}>, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const isValidId = Types.ObjectId.isValid(id);
      if (!isValidId) {
        throw new ErrorHTTP(400, 'Некорректный id продукта');
      }
      const newItem = await basketService.removeProduct({ userId, productId: id });
      return res.json(newItem);
    } catch (e) {
      console.error(e, 'ERROR');
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
