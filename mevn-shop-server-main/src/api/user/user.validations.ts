import { body } from 'express-validator';

export const userValidations = [
  body('email', 'Неверный e-mail').isEmail(),
  body('password', 'Минимальная длинна пароля - 6 символов').isLength({
    min: 6,
  }),
];
