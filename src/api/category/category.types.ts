import { Schema, Types } from 'mongoose';
export interface ICategory {
  title: string;
  price: number;
  description: string;
  imageUrl: string;
  amount: number;
  sizes: number[];
  category: Types.ObjectId;
  dough: number;
}
export interface IProductModel extends ICategory {
  _id: Types.ObjectId;
}

export interface IProductDTO extends ICategory {
  id: Types.ObjectId;
}
