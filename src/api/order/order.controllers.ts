import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { ErrorHTTP } from '../../errors/errors.class';
import { orderService } from './order.services';
import { IOrderRequest } from './order.types';

class OrderController {
  async create(req: Request<{}, {}, IOrderRequest>, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return next(new ErrorHTTP(400, 'Неверные данные', errors));
      }

      const user = req.user;

      await orderService.create(user.id, req.body);

      return res.json({ success: true, message: 'Заказ успешно создан' });
    } catch (e) {
      next(e);
    }
  }

  async getAllByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user;
      const items = await orderService.getByUserId(user.id);
      return res.json(items);
    } catch (e) {
      next(e);
    }
  }
}

const orderController = new OrderController();

export { orderController };
