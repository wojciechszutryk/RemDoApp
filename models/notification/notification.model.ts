import { IBaseModelAttached } from "../abstraction/base.interface";

export interface INotification {
  message: string;
  todoListId?: string;
  taskId?: string;
}

export interface INotificationWithReadonlyProperties extends INotification {
  /** Date when notification was created */
  readonly whenCreated: Date;
}

export type INotificationAttached = INotificationWithReadonlyProperties &
  IBaseModelAttached;
