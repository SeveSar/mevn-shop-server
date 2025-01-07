import { Router } from 'express';
import { userRouter } from './user/user.routes';
import { productRouter } from './product/product.routes';
import { categoryRouter } from './category/category.routes';
import { orderRouter } from './order/order.routes';

import { filterRouter } from './filter/filter.routes';

import { basketRouter } from './basket/basket.routes';

const router = Router();
router.use('/auth', userRouter);
router.use('/products', productRouter);
router.use('/categories', categoryRouter);
router.use('/order', orderRouter);
router.use('/filter', filterRouter);
router.use('/basket', basketRouter);

export { router };
