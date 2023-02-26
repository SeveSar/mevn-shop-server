import { model, Schema, Types } from "mongoose";
import { IProductModel } from "./product.types";

const productSchema = new Schema<IProductModel>(
  {
    title: { type: String, default: null, unique: true },
    price: { type: Number, default: null },
    description: { type: String, default: null },
    imageUrl: { type: String, default: null },
    amount: { type: Number, default: null },
    sizes: {
      type: [Number],
      validate: [sizesLimit, "Максимум 3 размера"],
    },
    category: { type: String, ref: "Category" },
    dough: [Number],
    filters: {
      type: [Types.ObjectId],
      ref: "Filter",
    },
  },
  {
    timestamps: true,
  }
);
function sizesLimit(val: number[]) {
  return val.length <= 3;
}
const ProductModel = model("Product", productSchema);

export { ProductModel };
