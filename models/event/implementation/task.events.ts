import { ITaskAttached } from "../../task/task.model";
import { TypedEvent } from "../event.interface";

export const TaskCreatedEvent = new TypedEvent<ITaskAttached>(
  "TaskCreatedEvent"
);
export const TaskUpdatedEvent = new TypedEvent<ITaskAttached>(
  "TaskUpdatedEvent"
);
export const TaskDeletedEvent = new TypedEvent<ITaskAttached>(
  "TaskDeletedEvent"
);
