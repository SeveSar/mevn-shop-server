import { model, Schema, Types } from "mongoose";

const productSchema = new Schema(
  {
    title: { type: String, default: "" },
    price: { type: String, default: "" },
    description: { type: String, default: "" },
    imageUrl: { type: String, default: "" },
    amount: { type: Number, default: "" },
    sizes: [{ type: Number, default: "" }],
    category: { type: Types.ObjectId, ref: "Category" },
  },
  {
    timestamps: true,
  }
);

const ProductModel = model("Product", productSchema);

export { ProductModel };
