import { Router } from 'express';
import { orderValidations } from './order.validations';
import { orderController } from './order.controllers';
import { authMiddleware } from '../../middleware/auth.middleware';
const orderRouter = Router();

orderRouter.post('', authMiddleware, orderValidations, orderController.create);
orderRouter.get('', authMiddleware, orderValidations, orderController.getAllByUserId);

export { orderRouter };
