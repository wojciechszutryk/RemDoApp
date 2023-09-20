import { INotificationDto } from "linked-models/notification/notification.dto";
import { Dispatch, SetStateAction } from "react";

export interface ContextProps {
  notifications: INotificationDto[];
  setNotifications: Dispatch<SetStateAction<INotificationDto[]>>;
  handleSocketNotification: (
    notification: INotificationDto,
    notificationMessage: string
  ) => void;
}
