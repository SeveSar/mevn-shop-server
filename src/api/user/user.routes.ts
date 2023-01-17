import { Router } from "express";
import { userController } from "./user.controllers";
const { check } = require("express-validator");
const userRouter = Router();

userRouter.post(
  "/register",
  check("email", "Не верный e-mail").isEmail(),
  check("password", "Минимальная длинна пароля - 6 символов").isLength({
    min: 6,
  }),
  userController.register
);
userRouter.post(
  "/login",
  check("email", "Не верный e-mail").isEmail(),
  check("password", "Минимальная длинна пароля - 6 символов").isLength({
    min: 6,
  }),
  userController.login
);

userRouter.get("/refresh", userController.refresh);

export { userRouter };
