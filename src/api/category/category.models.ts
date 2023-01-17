import { model, Schema, Types } from "mongoose";

const categorychema = new Schema(
  {
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    products: [{ type: Types.ObjectId, ref: "Product" }],
  },
  {
    timestamps: true,
  }
);

const CategoryModel = model("Category", categorychema);

export { CategoryModel };
