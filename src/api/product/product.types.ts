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
  _id: Schema.Types.ObjectId;
}

export interface IDough {
  title: string;
  price: number;
  _id: Schema.Types.ObjectId;
}

export interface ISize {
  size: number;
  title: string;
  price: number;
  _id: Schema.Types.ObjectId;
}

export interface IProductModel extends IProduct {
  _id: Schema.Types.ObjectId;
  ingredients: IIngredient[];
  dough: IDough[];
  sizes: ISize[];
}

export interface IProductDTO extends IProduct {
  id: Schema.Types.ObjectId;
  ingredients: {
    title: string;
    price: number;
    img: string;
    id: Schema.Types.ObjectId;
  }[];

  dough: {
    title: string;
    price: number;
    id: Schema.Types.ObjectId;
  }[];

  sizes: {
    title: string;
    price: number;
    id: Schema.Types.ObjectId;
  }[];
}
