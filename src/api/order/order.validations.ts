import { body } from 'express-validator';
import { ORDER_TYPE_DELIVERY, ORDER_TYPE_TIMING, ORDER_PAYMENT } from './order.constants';
export const orderValidations = [
  body('name', 'Обязательное поле').isString().notEmpty(),
  body('email', 'Неверный e-mail').optional({ nullable: true }).isEmail(),
  body('phone', 'Обязательное поле').isString().notEmpty(),
  body('typeDelivery').notEmpty().isIn([ORDER_TYPE_DELIVERY.ADDRESS, ORDER_TYPE_DELIVERY.RESTAURANT]),
  body('typeTiming').notEmpty().isIn([ORDER_TYPE_TIMING.URGENT, ORDER_TYPE_TIMING.DATE]),
  body('payment').notEmpty().isIn([ORDER_PAYMENT.APPLE, ORDER_PAYMENT.CARD, ORDER_PAYMENT.CASH]),
  body('timingDate').if(body('typeTiming').equals(ORDER_TYPE_TIMING.DATE)).notEmpty(),
  body('address', 'Обязательное поле')
    .if(body('typeDelivery').equals(ORDER_TYPE_DELIVERY.ADDRESS))
    .notEmpty()
    .isObject(),
  body('address.street', 'Обязательное поле').if(body('address').exists()).notEmpty(),
  body('restaurant', 'Обязательное поле')
    .if(body('typeDelivery').equals(ORDER_TYPE_DELIVERY.RESTAURANT))
    .notEmpty()
    .isString(),
  body('comment').optional({ nullable: true }).isString(),
];
