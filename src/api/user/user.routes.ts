import { Router } from 'express';
import { userController } from './user.controller';
import { userValidations } from './user.validations';
import { authMiddleware } from '../../middleware/auth.middleware';

const userRouter = Router();

userRouter.post('/register', userValidations, userController.register);
userRouter.post('/login', userValidations, userController.login);
userRouter.patch('/update', authMiddleware, userController.update);
userRouter.get('/logout', userValidations, userController.logout);
userRouter.get('/refresh', userController.refresh);

export { userRouter };
