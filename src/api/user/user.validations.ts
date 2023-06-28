import { check } from 'express-validator';

export const userValidations = [
  check('email', 'Неверный e-mail').isEmail(),
  check('password', 'Минимальная длинна пароля - 6 символов').isLength({
    min: 6,
  }),
];
