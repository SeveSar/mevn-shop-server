import { Router } from "express";
import { basketController } from "./basket.controllers";
import { verifyToken } from "./basket.middleware";
import { authMiddleware } from "../../middleware/auth.middleware";

const basketRouter = Router();

basketRouter.get("/all", basketController.getAll);

basketRouter.get("", authMiddleware, basketController.get);
basketRouter.post("", authMiddleware, basketController.add.bind(basketController));

export { basketRouter };
