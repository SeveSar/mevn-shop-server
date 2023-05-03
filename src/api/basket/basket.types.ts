import { Types } from "mongoose";
import { IProductDTO } from "../product/product.types";

interface IBasket {
  products: { quantity: number; product: Types.ObjectId }[];
  userId: Types.ObjectId | null;
  quantity: number;
}

export interface IBasketModel extends IBasket {
  _id: Types.ObjectId;
}

export interface IBasketDTO extends IBasket {
  id: Types.ObjectId;
}
