import { Request, Response, NextFunction } from 'express';
import { BasketModel } from './basket.models';

import { IBasketProductDTO, IBasketProductModel, IBasketRequest } from './basket.types';

import { basketService } from './basket.services';
import { BasketDto } from './basket.dto';
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
      const basket = await BasketModel.findOne({ userId: user.id }).populate('products.product');
      if (!basket) {
        throw new ErrorHTTP(404, 'Корзина не найдена');
      }

      return res.json(new BasketDto(basket));
    } catch (e) {
      next(e);
    }
  }

  async update(req: Request<{ id: string }, object, IBasketProductModel>, res: Response, next: NextFunction) {
    try {
      const { ...updatedProduct } = req.body;

      const userId = req.user.id;
      const { id } = req.params;

      const isValidId = Types.ObjectId.isValid(id);
      if (!isValidId) {
        throw new ErrorHTTP(400, 'Некорректный id продукта');
      }
      const newItem = await basketService.update({ userId, productId: id, updatedProduct });
      return res.json(newItem);
    } catch (e) {
      console.log(e, 'ERROR');
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
