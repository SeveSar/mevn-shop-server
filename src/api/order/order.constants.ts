export const ORDER_STATUS = {
  PROCESSED: 'PROCESSED',
  DELIVERED: 'DELIVERED',
  CANCELED: 'CANCLED',
} as const;

export const ORDER_PAYMENT = {
  CASH: 'CASH',
  CARD: 'CARD',
  APPLE: 'APPLE',
} as const;

export const ORDER_TYPE_DELIVERY = {
  ADDRESS: 'ADDRESS',
  RESTAURANT: 'RESTAURANT',
} as const;

export const ORDER_TYPE_TIMING = {
  URGENT: 'URGENT',
  DATE: 'DATE',
} as const;

export type TOrderStatus = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];
export type TOrderPayment = (typeof ORDER_PAYMENT)[keyof typeof ORDER_PAYMENT];
export type TOrderTypeDelivery = (typeof ORDER_TYPE_DELIVERY)[keyof typeof ORDER_TYPE_DELIVERY];
export type TOrderTypeTiming = (typeof ORDER_TYPE_TIMING)[keyof typeof ORDER_TYPE_TIMING];
