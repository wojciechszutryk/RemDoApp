import { INotificationDto } from "linked-models/notification/notification.dto";
import { ILoginUserResponseDTO } from "linked-models/user/user.dto";
import { Dispatch, SetStateAction } from "react";

export interface ContextProps {
  currentUser: ILoginUserResponseDTO | undefined;
  notifications: INotificationDto[];
  setNotification: Dispatch<SetStateAction<INotificationDto[]>>;
  setCurrentUser: (user: ILoginUserResponseDTO | undefined) => void;
}
