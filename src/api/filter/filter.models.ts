import { model, Schema, Types } from "mongoose";

const filterSchema = new Schema(
  {
    title: { type: String, unique: true, required: true },
    values: [
      {
        name: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const FilterModel = model("Filter", filterSchema);

export { FilterModel };
