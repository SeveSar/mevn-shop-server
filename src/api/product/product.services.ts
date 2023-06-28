import { ProductDTO, ProductOneDTO } from './product.dtos';
import { ErrorHTTP } from './../../errors/errors.class';
import { ProductModel } from './product.models';
import { IProduct } from './product.types';
import { Request, Response, NextFunction } from 'express';
export class ProductServices {
  async create(product: IProduct) {
    const newItem = await ProductModel.create({
      ...product,
    });
    const productDTO = new ProductDTO(newItem);
    return productDTO;
  }

  async findOne(id: string) {
    const item = await ProductModel.findById(id).exec();
    if (!item) {
      throw new ErrorHTTP(404, 'Продукт не найден');
    }
    return new ProductOneDTO(item);
  }

  async findAll(req: Request) {
    const { filters } = req.query;
    let items;
    if (filters) {
      items = await ProductModel.find({
        filters: {
          $in: filters,
        },
      })
        .populate('filters')
        .exec();
    } else {
      items = await ProductModel.find().populate('filters').exec();
    }
    items = items.map((item) => new ProductDTO(item));
    console.log(items, 'items');
    return items;
  }

  async update(id: string, updateObject: any) {
    const newItem = await ProductModel.findByIdAndUpdate(id, updateObject, {
      new: true,
    }).exec();
    return newItem;
  }

  async delete(id: string) {
    await ProductModel.findByIdAndDelete(id).exec();
  }
}

const productService = new ProductServices();
export { productService };
