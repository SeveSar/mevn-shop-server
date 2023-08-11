import { model, Schema, Types } from 'mongoose';
import { TOrderModel, IOrderProduct, IOrderAddress } from './order.types';
import { ORDER_STATUS, ORDER_PAYMENT, ORDER_TYPE_DELIVERY, ORDER_TYPE_TIMING } from './order.constants';

const orderSchema = new Schema<TOrderModel>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    email: { type: String, unique: true, default: null },
    name: { type: String, required: true, default: null },
    phone: { type: String, default: null },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: 'BasketProduct',
      },
    ],
    number: {
      type: String,
      unique: true,
      default: '0001',
    },
    status: {
      type: String,
      default: ORDER_STATUS['PROCESSED'],
      required: true,
      enum: [ORDER_STATUS['DELIVERED'], ORDER_STATUS['CANCELED'], ORDER_STATUS['PROCESSED']],
    },
    comment: { type: String },
    address: { type: Schema.Types.ObjectId, ref: 'OrderAddress', default: null },
    typeDelivery: {
      type: String,
      required: true,
      enum: [ORDER_TYPE_DELIVERY['ADDRESS'], ORDER_TYPE_DELIVERY['RESTAURANT']],
    },
    typeTiming: {
      type: String,
      required: true,
      enum: [ORDER_TYPE_TIMING['DATE'], ORDER_TYPE_TIMING['URGENT']],
    },
    timingDate: { type: String, default: null },
    restaurant: { type: String, default: null },
    payment: {
      type: String,
      default: ORDER_PAYMENT['CASH'],
      required: true,
      enum: [ORDER_PAYMENT['CASH'], ORDER_PAYMENT['CARD'], ORDER_PAYMENT['APPLE']],
    },
  },

  {
    timestamps: true,
  }
);

orderSchema.pre('save', async function (next) {
  const count = await OrderModel.countDocuments();
  this.number = (count + 1).toString().padStart(4, '0');
  next();
});

// orderSchema.pre('remove', async function (next) {
//   next();
// });
const OrderModel = model<TOrderModel>('Order', orderSchema);

const orderAddressSchema = new Schema<IOrderAddress>(
  {
    street: { type: String, required: true },
    flat: { type: String, default: null },
    door_phone: { type: Number, default: null },
    porch: { type: Number, default: null },
    floor: { type: Number, default: null },
    house: { type: String, default: null },
  },

  {
    timestamps: true,
  }
);

const OrderAddressModel = model<IOrderProduct>('OrderAddress', orderAddressSchema);

export { OrderModel, OrderAddressModel };
