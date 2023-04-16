import { Schema } from "mongoose";
import { IFilter } from "../filter/filter.types";

export interface IProduct {
  title: string;
  price: number;
  description: string;
  imageUrl: string;
  amount: number;
  category: Schema.Types.ObjectId;
  filters: IFilter[];
}

export interface IProductModel extends IProduct {
  _id: Schema.Types.ObjectId;
  ingredients: {
    title: string;
    price: number;
    img: string;
    _id: Schema.Types.ObjectId;
  }[];
  dough: {
    title: string;
    price: number;
    _id: Schema.Types.ObjectId;
  }[];
  sizes: {
    title: string;
    price: number;
    _id: Schema.Types.ObjectId;
  }[];
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
