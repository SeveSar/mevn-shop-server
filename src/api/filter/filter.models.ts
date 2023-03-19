import { model, Schema, Types } from "mongoose";

const filterSchema = new Schema(
  {
    title: { type: String, unique: true, required: true },
    items: [
      {
        ref: "FilterItem",
        type: Schema.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const filterItemSchema = new Schema(
  {
    title: { type: String, unique: true, required: true },
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    parent: { type: Schema.Types.ObjectId, ref: "Filter" },
  },
  {
    timestamps: true,
  }
);

const FilterModel = model("Filter", filterSchema);
const FilterItemModel = model("FilterItem", filterItemSchema);

export { FilterModel, FilterItemModel };
