import { EventName } from "linked-models/event/event.enum";

export interface INotificationMessage {
  action: EventName;
  actionCreatorDisplayName?: string;
  todoListName?: string;
  taskName?: string;
}
