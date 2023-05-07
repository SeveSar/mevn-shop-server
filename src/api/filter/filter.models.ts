import { model, Schema, Types } from "mongoose";
import { IFilterModel, IFilterItemModel } from "./filter.types";
const filterSchema = new Schema<IFilterModel>(
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

const filterItemSchema = new Schema<IFilterItemModel>(
  {
    title: { type: String, unique: true, required: true },
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    parent: { type: Schema.Types.ObjectId, ref: "Filter" },
  },
  {
    timestamps: true,
  }
);

const FilterModel = model<IFilterModel>("Filter", filterSchema);
const FilterItemModel = model<IFilterItemModel>("FilterItem", filterItemSchema);

export { FilterModel, FilterItemModel };
