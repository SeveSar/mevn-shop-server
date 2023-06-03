import { Types } from "mongoose";
import { IBasketModel, IBasketProductDTO, IBasketProductModel } from "./basket.types";
import { ProductDTO } from "../product/product.dtos";

export class BasketDto {
  id: Types.ObjectId;
  userId: Types.ObjectId | null;
  products: IBasketProductDTO[];

  constructor(basketModel: IBasketModel) {
    this.id = basketModel._id;
    this.userId = basketModel.userId;
    this.products = basketModel.products.map((item) => {
      const { quantity, product, totalPrice, size, dough, ingredients, _id } = item;

      const serializedIngredients = ingredients.map((ing) => {
        const { img, price, title } = ing;

        return {
          id: ing._id,
          img,
          price,
          title,
        };
      });
      const serializedSize = { id: size._id, price: size.price, title: size.title, size: size.size };
      console.log(serializedSize);
      const serializedDough = { id: dough._id, price: dough.price, title: dough.title };
      console.log(serializedDough);
      return {
        quantity,
        product,
        totalPrice,
        size: serializedSize,
        dough: serializedDough,
        ingredients: serializedIngredients,
        id: _id,
      };
    });
  }
}
