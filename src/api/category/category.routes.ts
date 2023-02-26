import { Router } from "express";
import { categoryController } from "./category.controller";

const categoryRouter = Router();

categoryRouter.get("/", categoryController.findAll);
categoryRouter.get("/:id", categoryController.findOne);
categoryRouter.patch("/:id", categoryController.update);
categoryRouter.post("/", categoryController.create);
categoryRouter.delete("/:id", categoryController.delete);

export { categoryRouter };
