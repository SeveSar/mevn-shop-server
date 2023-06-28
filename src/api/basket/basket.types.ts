import { Schema, Types } from 'mongoose';
import {
  IDoughModel,
  IIngredientDTO,
  IIngredientModel,
  ISizeModel,
  ISizeDTO,
  IDoughDTO,
} from '../product/product.types';

export interface IBasketProduct {
  quantity: number;
  product: Types.ObjectId;
  totalPrice: number;
}

export interface IBasketModel {
  _id: Types.ObjectId;
  userId: Types.ObjectId | null;
  products: IBasketProductModel[];
}

export interface IBasketProductModel extends IBasketProduct {
  _id: Types.ObjectId;
  ingredients: IIngredientModel[];
  size: ISizeModel;
  dough: IDoughModel;
}

export interface IBasketProductDTO extends IBasketProduct {
  id: Types.ObjectId;
  ingredients: IIngredientDTO[];
  size: ISizeDTO | null;
  dough: IDoughDTO | null;
}

export interface IBasketDTO {
  id: Types.ObjectId;
  userId: Types.ObjectId | null;
  products: IBasketProductDTO[];
}

export interface IBasketRequest {
  size: string;
  dough: string;
  ingredients: string[];
  productId: string;
}
