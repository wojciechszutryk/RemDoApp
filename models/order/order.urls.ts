export const ORDER_PARAM = "orderId";
export const URL_ORDERS = "/orders";

export const URL_ORDER = (orderId?: string) =>
  `/${orderId || ":" + ORDER_PARAM}`;
