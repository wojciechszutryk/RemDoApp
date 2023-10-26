import { EventName, EventSubject } from "linked-models/event/event.enum";
import { IBaseModelAttached } from "../abstraction/base.interface";

export interface INotification {
  /** Action that caused notification */
  action: EventName;
  /** Subject of action */
  actionSubject: EventSubject;
  /** User who caused action */
  actionCreatorId: string;
  /** Id of todoList that action was performed on */
  todoListId?: string;
  /** Id of task that action was performed on */
  taskId?: string;
}

export interface INotificationWithReadonlyProperties extends INotification {
  /** Date when notification was created */
  readonly whenCreated: Date;
}

export type INotificationAttached = INotificationWithReadonlyProperties &
  IBaseModelAttached;
