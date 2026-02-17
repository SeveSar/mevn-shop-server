import { Router } from 'express';
import { basketController } from './basket.controllers';

import { authMiddleware } from '../../middleware/auth.middleware';

const basketRouter = Router();

basketRouter.get('/all', basketController.getAll);

basketRouter.get('', authMiddleware, basketController.get);
basketRouter.patch('/:id', authMiddleware, basketController.updateProduct);
basketRouter.delete('/:id', authMiddleware, basketController.removeProduct);
basketRouter.post('', authMiddleware, basketController.add.bind(basketController));

export { basketRouter };
