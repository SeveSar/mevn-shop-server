import { model, Schema, Types } from 'mongoose';

const categorychema = new Schema(
  {
    title: { type: String, default: '', unique: true, required: true },
    description: { type: String, default: null },
    products: [{ type: Types.ObjectId, ref: 'Product' }],
  },
  {
    timestamps: true,
  }
);

const CategoryModel = model('Category', categorychema);

export { CategoryModel };
