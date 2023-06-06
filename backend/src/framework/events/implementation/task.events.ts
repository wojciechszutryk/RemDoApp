import { TypedEvent } from "framework/events/event.interface";
import { ITaskAttached } from "linked-models/task/task.model";

export const TaskCreatedEvent = new TypedEvent<ITaskAttached>(
  "TaskCreatedEvent"
);
export const TaskUpdatedEvent = new TypedEvent<ITaskAttached>(
  "TaskUpdatedEvent"
);
export const TaskDeletedEvent = new TypedEvent<ITaskAttached>(
  "TaskDeletedEvent"
);
