import {
  IOrderAttached,
  IOrderWithReadonlyProperties,
} from "linked-models/order/order.model";
import { TASK_PARAM } from "linked-models/task/task.urls";
import { TODO_LIST_PARAM } from "linked-models/todoList/todoList.urls";
import { USER_PARAM } from "linked-models/user/user.urls";
import mongoose, { Document, Schema } from "mongoose";

export const OrderCollectionName = "Order";

const OrderSchema = new Schema({
  whenCreated: {
    type: Date,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  [USER_PARAM]: {
    type: String,
    required: true,
  },
  [TODO_LIST_PARAM]: {
    type: String,
    required: false,
  },
  [TASK_PARAM]: {
    type: String,
    required: false,
  },
});
export type OrderCollectionType = mongoose.Model<OrderDocument>;
export interface OrderDocument extends IOrderWithReadonlyProperties, Document {}
export const OrderCollection = mongoose.model<OrderDocument>(
  OrderCollectionName,
  OrderSchema
);

export const getOrderCollection = () =>
  mongoose.model<OrderDocument>(OrderCollectionName, OrderSchema);

export const mapOrderToAttached = (order: OrderDocument): IOrderAttached => {
  return {
    id: order.id,
    value: order.value,
    whenCreated: order.whenCreated,
    [USER_PARAM]: order[USER_PARAM],
    [TODO_LIST_PARAM]: order[TODO_LIST_PARAM],
    [TASK_PARAM]: order[TASK_PARAM],
  };
};
