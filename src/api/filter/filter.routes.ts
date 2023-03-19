import { Router } from "express";
import { filterController } from "./filter.controllers";
const filterRouter = Router();

filterRouter.get("", filterController.getAll.bind(filterController));
filterRouter.get("/item", filterController.getAllItem.bind(filterController));
filterRouter.post("", filterController.create.bind(filterController));
filterRouter.post(
  "/item",
  filterController.createFilterItem.bind(filterController)
);

filterRouter.patch(
  "/:id",
  filterController.updateFilter.bind(filterController)
);
filterRouter.patch(
  "/item/:id",
  filterController.updateFilterItem.bind(filterController)
);

export { filterRouter };
