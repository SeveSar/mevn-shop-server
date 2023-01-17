import { Router } from "express";
import { userRouter } from "./api/user/user.routes";

const router = Router();

router.use("/auth", userRouter);

export { router };
