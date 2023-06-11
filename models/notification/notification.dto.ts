import { INotification } from "./notification.model";
import { IUserNotification } from "./userNotification.model";

export interface INotificationDto
  extends Omit<INotification, "id" | "whenCreated">,
    Omit<IUserNotification, "id" | "whenCreated"> {
  notificationId: string;
  userNotificationId: string;
}
