import { Router } from "express";
import { basketController } from "./basket.controllers";
import { verifyToken } from "./basket.middleware";

const basketRouter = Router();

basketRouter.get("/all", basketController.getAll);

basketRouter.post(
  "/",
  verifyToken,
  basketController.add.bind(basketController)
);

export { basketRouter };
