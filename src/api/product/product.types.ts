import { Schema, Types } from 'mongoose';
import { IFilterItemDTO } from '../filter/filter.types';

export interface IProduct {
  title: string;
  price: number;
  description: string;
  imageUrl: string;
  amount: number;
  category: Types.ObjectId;
  filters: IFilterItemDTO[];
}

export interface IIngredient {
  title: string;
  price: number;
  img: string;
}
export interface IIngredientModel extends IIngredient {
  _id: Types.ObjectId;
}

export interface IDough {
  title: string;
  price: number;
}

export interface IDoughModel extends IDough {
  _id: Types.ObjectId;
}

export interface ISize {
  size: number;
  title: string;
  price: number;
}

export interface ISizeModel extends ISize {
  _id: Types.ObjectId;
}

export interface IProductModel extends IProduct {
  _id: Types.ObjectId;
  ingredients: IIngredientModel[];
  dough: IDoughModel[];
  sizes: ISizeModel[];
}
