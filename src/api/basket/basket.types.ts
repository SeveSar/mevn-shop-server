import { Schema, Types } from "mongoose";
import { IDough, IIngredient, ISize } from "../product/product.types";

interface IBasket {
  products: {
    quantity: number;
    product: Types.ObjectId;
    totalPrice: number;

    size: ISize | null;
    dough: IDough | null;
    ingredients: IIngredient[] | null;
  }[];
  userId: Types.ObjectId | null;
  // totalPrice: number;
}

export interface IBasketModel extends IBasket {
  _id: Types.ObjectId;
}

export interface IBasketDTO extends IBasket {
  id: Types.ObjectId;
}

export interface IBasketRequest {
  size: string;
  dough: string;
  ingredients: string[];
  productId: string;
}
