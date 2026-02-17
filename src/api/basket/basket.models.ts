import { model, Schema, Types } from 'mongoose';
import { IBasketModel, IBasketProductModel } from './basket.types';

const basketProductSchema = new Schema<IBasketProductModel>({
  basket: {
    type: Schema.Types.ObjectId,
    ref: 'Basket',
  },
  product: { type: Schema.Types.ObjectId, ref: 'Product' },
  dough: {
    title: { type: String },
    price: { type: Number },
  },
  size: {
    size: { type: Number },
    title: { type: String },
    price: { type: Number },
  },
  ingredients: [
    {
      title: { type: String },
      price: { type: Number },
      img: { type: String },
    },
  ],
  quantity: { type: Number, default: 0 },
  totalPrice: { type: Number },
});

const BasketProductModel = model<IBasketProductModel>('BasketProduct', basketProductSchema);

const basketSchema = new Schema<IBasketModel>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: 'BasketProduct',
        required: true,
      },
    ],
  },

  {
    timestamps: true,
  }
);

// basketSchema.pre("save", async function (next) {
//   // calculate product's price in basket

//   this.products = this.products.map((pr) => {
//     const sizePrice = pr.size?.price ?? 0;
//     const doughPrice = pr.dough?.price ?? 0;
//     let ingredientsPrice = 0;

//     if (pr.ingredients && pr.ingredients.length) {
//       ingredientsPrice = pr.ingredients.reduce((sum, ing) => sum + ing.price, 0);
//     }
//     pr.product.
//     const totalPriceProduct = (pr?.price || 0) + sizePrice + doughPrice + ingredientsPrice;
//     console.log(totalPriceProduct, "totalPriceProduct");
//     console.log(pr?.price, "product price");
//     console.log(pr.ingredients, "ingredients");
//     return {
//       ...pr,
//       price: totalPriceProduct * pr.quantity,
//     };
//   }, 0);

//   console.log(this.products, "products");
//   next();
// });
const BasketModel = model<IBasketModel>('Basket', basketSchema);

export { BasketModel, BasketProductModel };
