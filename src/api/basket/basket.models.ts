import { model, Schema, Types } from "mongoose";
import { IBasketModel } from "./basket.types";

const basketSchema = new Schema<IBasketModel>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    products: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 0 },
      },
    ],
    quantity: { type: Number, default: 0 },
  },

  {
    timestamps: true,
  }
);

basketSchema.pre("save", function (next) {
  // calculate basket quantity
  this.quantity = this.products.reduce((sum, pr) => {
    return (sum += pr.quantity);
  }, 0);
  next();
});
const BasketModel = model<IBasketModel>("Basket", basketSchema);

export { BasketModel };
