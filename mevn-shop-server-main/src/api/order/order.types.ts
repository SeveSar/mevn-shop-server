import { Types } from 'mongoose';
import { TOrderStatus, TOrderPayment, TOrderTypeTiming, TOrderTypeDelivery } from './order.constants';
import { IDoughModel, IIngredientModel, ISizeModel } from '../product/product.types';

export type TOrderModel = {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  name: string;
  phone: number;
  email: string;
  status: TOrderStatus;
  products: IOrderProduct[];
  number: string;
  payment: TOrderPayment;
  comment: string;
  typeTiming: TOrderTypeTiming;
  typeDelivery: TOrderTypeDelivery;
  address: IOrderAddress | null;
  restaurant: string | null;
  timingDate: string;
};

export interface IOrderProduct {
  _id: Types.ObjectId;
  ingredients: IIngredientModel[];
  size: ISizeModel;
  dough: IDoughModel;
  quantity: number;
  product: Types.ObjectId;
  totalPrice: number;
}

export interface IOrderAddress {
  _id: Types.ObjectId;
  street: string;
  house?: number;
  porch?: number;
  floor?: number;
  flat?: number;
  door_phone?: number;
}

export interface IOrderRequest {
  name: string;
  phone: string;
  email?: string;
  payment: TOrderPayment;
  comment?: string;
  typeTiming: TOrderTypeTiming;
  typeDelivery: TOrderTypeDelivery;
  address?: Omit<IOrderAddress, 'id'> | null;
  restaurant?: string | null;
  timingDate: string;
}
