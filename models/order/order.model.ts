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

export interface IOrderWithReadonlyProperties extends IOrder {
  /** Date when order was created */
  readonly whenCreated: Date;
}

export type IOrderAttached = IOrderWithReadonlyProperties & IBaseModelAttached;
