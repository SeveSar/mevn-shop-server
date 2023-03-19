import { IProductModel } from "./product.types";
import { Schema } from "mongoose";

export class ProductDTO {
  id: Schema.Types.ObjectId;
  title: string;
  price: number;
  description: string;
  imageUrl: string;
  amount: number;
  sizes: number[];
  category: Schema.Types.ObjectId;
  dough: number[];
  filters: string[];

  constructor(model: IProductModel) {
    this.id = model._id;
    this.title = model.title;
    this.price = model.price;
    this.description = model.description;
    this.imageUrl = model.imageUrl;
    this.amount = model.amount;
    this.sizes = model.sizes;
    this.category = model.category;
    this.dough = model.dough;
    this.filters = model.filters;
  }
}
