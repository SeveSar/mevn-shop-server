import { IDoughDTO, IIngredientDTO, IProductModel, ISizeDTO } from './product.types';
import { Schema, Types } from 'mongoose';
import { IFilterItemDTO } from '../filter/filter.types';

export class ProductDTO {
  id: Types.ObjectId;
  title: string;
  price: number;
  description: string;
  imageUrl: string;

  constructor(model: IProductModel) {
    this.id = model._id;
    this.title = model.title;
    this.price = model.price;
    this.description = model.description;
    this.imageUrl = model.imageUrl;
  }
}

export class ProductOneDTO {
  id: Types.ObjectId;
  title: string;
  price: number;
  description: string;
  imageUrl: string;
  amount: number;
  sizes: ISizeDTO[];
  category: Types.ObjectId;
  dough: IDoughDTO[];
  filters: IFilterItemDTO[];
  ingredients: IIngredientDTO[];

  constructor(model: IProductModel) {
    this.id = model._id;
    this.title = model.title;
    this.price = model.price;
    this.description = model.description;
    this.imageUrl = model.imageUrl;
    this.amount = model.amount;
    this.sizes = model.sizes.map((sz) => {
      return {
        id: sz._id,
        price: sz.price,
        size: sz.size,
        title: sz.title,
      };
    });
    this.category = model.category;
    this.dough = model.dough.map((dh) => {
      return {
        id: dh._id,
        price: dh.price,
        title: dh.title,
      };
    });
    this.filters = model.filters;
    this.ingredients = model.ingredients.map((item) => {
      return {
        id: item._id,
        title: item.title,
        price: item.price,
        img: item.img,
      };
    });
  }
}
