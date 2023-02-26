import { Router } from "express";
import { productController } from "./product.controller";

const productRouter = Router();

productRouter.get("/", productController.findAll);
productRouter.get("/:id", productController.findOne);
productRouter.patch("/:id", productController.update);
productRouter.post("/", productController.create);
productRouter.delete("/:id", productController.delete);

export { productRouter };
