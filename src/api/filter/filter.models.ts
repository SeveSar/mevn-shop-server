import { model, Schema, Types } from "mongoose";
import { IFilter, IFilterItem } from "./filter.types";
const filterSchema = new Schema<IFilter>(
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

const filterItemSchema = new Schema<IFilterItem>(
  {
    title: { type: String, unique: true, required: true },
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    parent: { type: Schema.Types.ObjectId, ref: "Filter" },
  },
  {
    timestamps: true,
  }
);

const FilterModel = model<IFilter>("Filter", filterSchema);
const FilterItemModel = model<IFilterItem>("FilterItem", filterItemSchema);

export { FilterModel, FilterItemModel };
