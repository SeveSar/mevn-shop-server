import { Router } from "express";
import { userRouter } from "./api/user/user.routes";
import { productRouter } from "./api/product/product.routes";
import { categoryRouter } from "./api/category/category.routes";
import { fileRouter } from "./api/files/files.routes";
import { filterRouter } from "./api/filter/filter.routes";

import { basketRouter } from "./api/basket/basket.routes";

const router = Router();

router.use("/auth", userRouter);
router.use("/products", productRouter);
router.use("/categories", categoryRouter);
router.use("/files", fileRouter);
router.use("/filter", filterRouter);
router.use("/basket", basketRouter);

export { router };
