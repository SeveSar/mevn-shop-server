import { Schema } from "mongoose";

export interface IProduct {
  title: string;
  price: number;
  description: string;
  imageUrl: string;
  amount: number;
  sizes: number[];
  category: Schema.Types.ObjectId;
  dough: number[];
  filters: string[];
}
export interface IProductModel extends IProduct {
  _id: Schema.Types.ObjectId;
}

export interface IProductDTO extends IProduct {
  id: Schema.Types.ObjectId;
}
