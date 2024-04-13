import { IBaseModelAttached } from "../abstraction/base.interface";

export interface IOrder {
  /** Order value */
  value: number;
  /** User id */
  user: string;
  /** Todo list id */
  todoListId?: string;
  /** Task id */
  taskId?: string;
}

export type IOrderAttached = IOrder & IBaseModelAttached;
