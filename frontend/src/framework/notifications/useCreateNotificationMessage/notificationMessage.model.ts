import { EventName } from "linked-models/event/event.enum";

export interface ITodoListNotificationMessage {
  action: EventName;
  actionCreatorDisplayName?: string;
  todoListName?: string;
  taskName?: string;
}
