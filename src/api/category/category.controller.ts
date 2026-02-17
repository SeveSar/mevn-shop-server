import { ErrorHTTP } from './../../errors/errors.class';
import { Request, Response, NextFunction } from 'express';
import { categoryService } from './category.services';
import { Types } from 'mongoose';

import { ICategory } from './category.types';
class CategoryController {
  async create(req: Request<{}, {}, ICategory>, res: Response, next: NextFunction) {
    try {
      const category = await categoryService.create(req.body);
      return res.json(category);
    } catch (e: any) {
      next(e);
    }
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) {
        return next(new ErrorHTTP(400, 'Не указан id категории'));
      }
      const isValidId = Types.ObjectId.isValid(id);
      if (!isValidId) {
        return next(new ErrorHTTP(400, 'Некорректный id категории'));
      }
      const category = await categoryService.findOne(id);
      return res.json(category);
    } catch (e) {
      next(e);
    }
  }
  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await categoryService.findAll();
      return res.json(categories);
    } catch (e) {
      next(e);
    }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const isValidId = Types.ObjectId.isValid(id);
      if (!isValidId) {
        return next(new ErrorHTTP(400, 'Некорректный id категории'));
      }
      const newItem = await categoryService.update(id, req.body);
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
        return next(new ErrorHTTP(400, 'Некорректный id категории'));
      }
      await categoryService.delete(id);
      return res.json({ message: 'Категория удалёна' });
    } catch (e) {
      next(e);
    }
  }
}

const categoryController = new CategoryController();
export { categoryController };
