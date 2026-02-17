import { IBasketProductModel } from './../basket/basket.types';
import { ORDER_TYPE_DELIVERY } from './order.constants';
import { IOrderProduct, IOrderRequest } from './order.types';
import { ErrorHTTP } from './../../errors/errors.class';
import { Types, Document } from 'mongoose';
import { UserModel } from '../user/user.models';
import { OrderModel } from './order.models';
import { OrderAddressModel } from './order.models';

import { basketService } from '../basket/basket.services';

class OrderService {
  async create(userId: Types.ObjectId, orderInfo: IOrderRequest) {
    const user = await UserModel.findById(userId);
    const { name, phone, email, payment, comment, typeDelivery, address, restaurant, timingDate, typeTiming } =
      orderInfo;
    if (!user) {
      throw new ErrorHTTP(400, `Пользователь не существует`);
    }

    const userBasket = await basketService.getByUserId(userId);

    if (!userBasket) {
      throw new ErrorHTTP(400, `Корзина не найдена`);
    }

    let currentRestaurant = null as string | null;
    let newAddressModel:
      | (Document<unknown, any, IOrderProduct> &
        IOrderProduct &
        Required<{
          _id: Types.ObjectId;
        }>)
      | null = null;

    if (typeDelivery === ORDER_TYPE_DELIVERY.ADDRESS) {
      newAddressModel = await OrderAddressModel.create(orderInfo.address);
      currentRestaurant = null;
    } else {
      currentRestaurant = restaurant ?? null;
      newAddressModel = null;
    }
    const orderProducts: Types.ObjectId[] = userBasket.products.map((item) => item._id);

    const newOrderModel = new OrderModel({
      user: userId,
      products: orderProducts,
      name,
      phone,
      email,
      payment,
      comment,
      address: newAddressModel ? newAddressModel._id : null,
      timingDate,
      typeDelivery,
      restaurant: currentRestaurant,
      typeTiming,
    });

    await newOrderModel.save();
    userBasket.remove();
    return newOrderModel;
  }

  async getByUserId(userId: Types.ObjectId, page: string) {
    const localPage = typeof page === 'string' ? Number(page) : page || 1;
    const perPage = 5;
    const totalItems = await OrderModel.countDocuments({ user: userId }).exec()
    const orderItems = await OrderModel.find({ user: userId })
      .skip((localPage - 1) * perPage)
      .limit(perPage)
      .populate({ path: 'products', populate: { path: 'product' } })
      .populate('user')
      .populate('address')
      .exec();
    if (!orderItems) throw new ErrorHTTP(404, 'Заказы не найден');
    return { items: orderItems, currentPage: localPage, total: totalItems };
  }
}

const orderService = new OrderService();

export { orderService };
