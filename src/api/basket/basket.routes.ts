import { Router } from 'express';
import { basketController } from './basket.controllers';

import { authMiddleware } from '../../middleware/auth.middleware';

const basketRouter = Router();

basketRouter.get('/all', basketController.getAll);

basketRouter.get('', authMiddleware, basketController.get);
basketRouter.patch('/:id', authMiddleware, basketController.update);
basketRouter.post('', authMiddleware, basketController.add.bind(basketController));

export { basketRouter };
