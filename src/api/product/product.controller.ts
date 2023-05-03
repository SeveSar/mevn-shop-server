import { ErrorHTTP } from "./../../errors/errors.class";
import { Request, Response, NextFunction } from "express";
import { productService } from "./product.services";
import { Types } from "mongoose";
import { IProduct } from "./product.types";

class ProductController {
  async create(
    req: Request<{}, {}, IProduct>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const product = await productService.create(req.body);
      return res.json(product);
    } catch (e: any) {
      next(e);
    }
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) {
        throw new ErrorHTTP(400, "Не указан id продукта");
      }
      const isValidId = Types.ObjectId.isValid(id);
      if (!isValidId) {
        throw new ErrorHTTP(400, "Некорректный id продукта");
      }
      const item = await productService.findOne(id);
      return res.json(item);
    } catch (e) {
      next(e);
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await productService.findAll(req);
      console.log(req.sessionID);
      console.log(req.session.cookie.expires);
      return res.json(products);
    } catch (e) {
      next(e);
    }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const isValidId = Types.ObjectId.isValid(id);
      if (!isValidId) {
        throw new ErrorHTTP(400, "Некорректный id продукта");
      }
      const newItem = await productService.update(id, req.body);
      return res.json(newItem);
    } catch (e) {
      next(e);
    }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const isValidId = Types.ObjectId.isValid(id);
      if (!isValidId) {
        throw new ErrorHTTP(400, "Некорректный id продукта");
      }
      await productService.delete(id);
      return res.json({ message: "Продукт удалён" });
    } catch (e) {
      next(e);
    }
  }
}

const productController = new ProductController();
export { productController };
