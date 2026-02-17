import { Schema, Types } from 'mongoose';
import { IDoughModel, IIngredientModel, ISizeModel } from '../product/product.types';

export interface IBasketProductModel {
  _id: Types.ObjectId;
  ingredients: IIngredientModel[];
  size: ISizeModel;
  dough: IDoughModel;
  quantity: number;
  product: Types.ObjectId;
  totalPrice: number;
  basket: Types.ObjectId;
}

export interface IBasketModel {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  products: Types.ObjectId[];
}

export interface IBasketRequest {
  size: string;
  dough: string;
  ingredients: string[];
  productId: string;
}
