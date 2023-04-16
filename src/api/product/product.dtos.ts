import { IProductModel } from "./product.types";
import { Schema } from "mongoose";
import { IFilter } from "../filter/filter.types";
export class ProductDTO {
  id: Schema.Types.ObjectId;
  title: string;
  price: number;
  description: string;
  imageUrl: string;
  amount: number;
  sizes: { title: string; price: number }[];
  category: Schema.Types.ObjectId;
  dough: { title: string; price: number }[];
  filters: IFilter[];
  ingredients: {
    title: string;
    price: number;
    img: string;
    id: Schema.Types.ObjectId;
  }[];

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
    this.ingredients = model.ingredients.map((item) => {
      return {
        id: item._id,
        title: item.title,
        price: item.price,
        img: item.img,
      };
    });
  }
}
