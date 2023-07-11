import { INotificationDto } from "linked-models/notification/notification.dto";
import { Dispatch, SetStateAction } from "react";
import { INotificationMessage } from "../useCreateNotificationMessage/notificationMessage.model";

export interface ContextProps {
  notifications: INotificationDto[];
  setNotifications: Dispatch<SetStateAction<INotificationDto[]>>;
  handleSocketNotification: (
    notification: INotificationDto,
    notificationMessageData: INotificationMessage
  ) => void;
}
