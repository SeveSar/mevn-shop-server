import { IProductModel } from "../product/product.types";
import { Types } from "mongoose";
export interface IFilterItem {
  title: string;
  products: IProductModel[];
  parent: Types.ObjectId;
}
export interface IFilter {
  title: string;
  items: IFilterItem[];
}
