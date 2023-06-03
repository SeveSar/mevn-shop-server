import { Schema } from "mongoose";
import { IFilterDTO, IFilterItemDTO } from "../filter/filter.types";

export interface IProduct {
  title: string;
  price: number;
  description: string;
  imageUrl: string;
  amount: number;
  category: Schema.Types.ObjectId;
  filters: IFilterItemDTO[];
}

export interface IIngredient {
  title: string;
  price: number;
  img: string;
}
export interface IIngredientModel extends IIngredient {
  _id: Schema.Types.ObjectId;
}

export interface IDough {
  title: string;
  price: number;
}

export interface IDoughModel extends IDough {
  _id: Schema.Types.ObjectId;
}

export interface ISize {
  size: number;
  title: string;
  price: number;
}

export interface ISizeModel extends ISize {
  _id: Schema.Types.ObjectId;
}

export interface IProductModel extends IProduct {
  _id: Schema.Types.ObjectId;
  ingredients: IIngredientModel[];
  dough: IDoughModel[];
  sizes: ISizeModel[];
}

export interface IDoughDTO extends IDough {
  id: Schema.Types.ObjectId;
}
export interface ISizeDTO extends ISize {
  id: Schema.Types.ObjectId;
}

export interface IIngredientDTO extends IIngredient {
  id: Schema.Types.ObjectId;
}

export interface IProductDTO extends IProduct {
  id: Schema.Types.ObjectId;
  ingredients: IIngredientDTO[];
  dough: IDoughDTO[];
  sizes: ISizeDTO[];
}
