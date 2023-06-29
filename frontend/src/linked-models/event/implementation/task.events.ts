import { ITaskAttached } from "../../task/task.model";
import { EventName } from "../event.enum";
import { TypedEvent } from "../event.interface";

export const TaskCreatedEvent = new TypedEvent<ITaskAttached>(
  EventName.TaskCreated
);

export const TaskUpdatedEvent = new TypedEvent<ITaskAttached>(
  EventName.TaskUpdated
);

export const TaskDeletedEvent = new TypedEvent<ITaskAttached>(
  EventName.TaskDeleted
);
