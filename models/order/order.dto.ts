import { ITaskAttached } from "linked-models/task/task.model";
import { ITodoListAttached } from "linked-models/todoList/todoList.model";
import { IUserPublicDataDTO } from "linked-models/user/user.dto";
import { INotification } from "./notification.model";
import { IUserNotification } from "./userNotification.model";

export interface INotificationDto
  extends Omit<INotification, "id" | "whenCreated">,
    Omit<IUserNotification, "id" | "whenCreated"> {
  notificationId: string;
  userNotificationId: string;
}

export interface INotificationResponseDto {
  notifications: INotificationDto[];
  todoLists: ITodoListAttached[];
  tasks: ITaskAttached[];
  creators: IUserPublicDataDTO[];
}

export interface IUpdateUserNotificationDto extends Partial<IUserNotification> {
  editedUserNotificationId: string;
}
