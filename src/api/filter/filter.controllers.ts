import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';
import { FilterItemModel, FilterModel } from './filter.models';
import { ErrorHTTP } from '../../errors/errors.class';

class FilterController {
  async create(req: any, res: any, next: any) {
    try {
      const { title } = req.body;
      const createdFilterParent = await FilterModel.create({
        title,
      });

      return res.json(createdFilterParent);
    } catch (e) {
      next(e);
    }
  }

  async createFilterItem(req: any, res: any, next: any) {
    try {
      const { title, parent } = req.body;
      const createdFilterItem = await FilterItemModel.create({
        title,
        parent,
      });
      return res.json(createdFilterItem);
    } catch (e) {
      console.log(e);
    }
  }

  async getAll(req: any, res: any, next: any) {
    const items = await FilterModel.find().populate('items').exec();
    return res.json(items);
  }

  async getAllItem(req: any, res: any, next: any) {
    const { parent } = req.query;
    let items;
    if (parent) {
      items = await FilterItemModel.find({ parent }).populate('parent').exec();
    } else {
      items = await FilterItemModel.find().populate('parent').exec();
    }
    return res.json(items);
  }

  async updateFilter(req: any, res: any, next: any) {
    const { id } = req.params;

    const updatedFilterParent = await FilterModel.findByIdAndUpdate(id, req.body, {
      new: true,
    }).exec();
    return res.json(updatedFilterParent);
  }

  async updateFilterItem(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const updatedFilterItem = await FilterItemModel.findByIdAndUpdate(id, req.body, {
        new: true,
      }).exec();
      return res.json(updatedFilterItem);
    } catch (e) {
      next(e);
    }
  }

  async deleteOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const isValidId = Types.ObjectId.isValid(id);
      if (!isValidId) {
        throw new ErrorHTTP(400, 'Некорректный id продукта');
      }
      await FilterModel.findByIdAndDelete(id).exec();
    } catch (e) {
      next(e);
    }
  }
}

const filterController = new FilterController();

export { filterController };
