import { model, Schema, Types } from "mongoose";
import { IBasketModel } from "./basket.types";

const basketSchema = new Schema<IBasketModel>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    sessionId: { type: String, unique: true },
    products: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 0 },
      },
    ],
    cart_quantity: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

// basketSchema.pre("save", function (next) {
//   console.log("calling next!");
//   // `return next();` will make sure the rest of this function doesn't run

//   // Unless you comment out the `return` above, 'after next' will print
//   console.log("after next");
//   /* return */ next();
// });

const BasketModel = model<IBasketModel>("Basket", basketSchema);

export { BasketModel };
