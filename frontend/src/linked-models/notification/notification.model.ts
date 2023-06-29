import { EventName } from "linked-models/event/event.enum";
import { IBaseModelAttached } from "../abstraction/base.interface";

export interface INotification {
  /** Action that caused notification */
  action: EventName;
  /** User who caused action */
  actionCreatorId: string;
  /** Id of todo list that action was performed on */
  todoListId: string;
  /** Id of task that action was performed on */
  taskId?: string;
}

export interface INotificationWithReadonlyProperties extends INotification {
  /** Date when notification was created */
  readonly whenCreated: Date;
}

export type INotificationAttached = INotificationWithReadonlyProperties &
  IBaseModelAttached;
