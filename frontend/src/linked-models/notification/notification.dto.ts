import { INotification } from "./notification.model";
import { IUserNotification } from "./userNotification.model";

export interface INotificationDto
  extends Omit<INotification, "id" | "whenCreated">,
    Omit<IUserNotification, "id" | "whenCreated"> {
  notificationId: string;
  userNotificationId: string;
}

export interface INotificationWithPayloadDto<T> {
  notification: INotificationDto;
  payload?: T;
}

export interface IUpdateUserNotificationDto extends Partial<IUserNotification> {
  editedUserNotificationId: string;
}
