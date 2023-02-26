import { Schema } from "mongoose";
export interface ICategory {
  title: string;
  price: number;
  description: string;
  imageUrl: string;
  amount: number;
  sizes: number[];
  category: Schema.Types.ObjectId;
  dough: number;
}
export interface IProductModel extends ICategory {
  _id: Schema.Types.ObjectId;
}

export interface IProductDTO extends ICategory {
  id: Schema.Types.ObjectId;
}
