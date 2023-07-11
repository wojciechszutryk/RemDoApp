import { IBaseModelAttached } from "../abstraction/base.interface";
import { UserNotificationState } from "./notification.enum";

export interface IUserNotification {
  notificationId: string;
  userId: string;
  state: UserNotificationState;
}

export interface IUserNotificationWithReadonlyProperties
  extends IUserNotification {
  /** Date when notification was created */
  readonly whenCreated: Date;
}

export type IUserNotificationAttached =
  IUserNotificationWithReadonlyProperties & IBaseModelAttached;
