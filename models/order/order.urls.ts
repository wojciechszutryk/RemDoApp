import { URL_USER, URL_USERS } from "../user/user.urls";

export const ORDER_PARAM = "orderId";
export const URL_ORDERS = "/orders";

export const URL_ORDER = (orderId?: string) =>
  `/${orderId || ":" + ORDER_PARAM}`;

/** orders/{orderId}/user/{userId} */
export const URL_USER_ORDERS = (orderId?: string, userId?: string): string =>
  `${URL_ORDERS}${URL_ORDER(orderId)}${URL_USERS}${URL_USER(userId)}`;
