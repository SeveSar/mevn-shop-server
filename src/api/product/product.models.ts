import { model, Schema, Types } from 'mongoose';
import { IProductModel } from './product.types';

const productSchema = new Schema<IProductModel>(
  {
    title: { type: String, default: null, unique: true },
    price: { type: Number, default: null },
    description: { type: String, default: null },
    imageUrl: { type: String, default: null },
    amount: { type: Number, default: null },
    sizes: {
      type: [
        {
          size: Number,
          price: Number,
          title: String,
        },
      ],
      validate: [sizesLimit, 'Максимум 3 размера'],
    },
    ingredients: {
      type: [
        {
          title: String,
          price: Number,
          img: String,
        },
      ],
    },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    dough: {
      type: [
        {
          title: String,
          price: Number,
        },
      ],
      validate: [doughLimit, 'Максимум 2 теста'],
    },
    filters: [
      {
        type: Types.ObjectId,
        ref: 'FilterItem',
      },
    ],
  },
  {
    timestamps: true,
  }
);
function sizesLimit(val: number[]) {
  return val.length <= 3;
}

function doughLimit(val: number[]) {
  return val.length <= 2;
}
const ProductModel = model('Product', productSchema);

export { ProductModel };
