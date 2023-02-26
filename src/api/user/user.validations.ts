const { check } = require("express-validator");
export const userValidations = [
  check("email", "Не верный e-mail").isEmail(),
  check("password", "Минимальная длинна пароля - 6 символов").isLength({
    min: 6,
  }),
];
