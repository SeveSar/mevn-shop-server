import { Router } from "express";
import { filterController } from "./filter.controllers";
const filterRouter = Router();

filterRouter.get("", filterController.getAll.bind(filterController));
filterRouter.post("", filterController.create.bind(filterController));

export { filterRouter };
