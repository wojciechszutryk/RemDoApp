import { ITaskCreatedEventPayload } from "services/task/event-handlers/task.created.event.handlers";
import { ITaskAttached } from "../../task/task.model";
import { EventName } from "../event.enum";
import { TypedEvent } from "../event.interface";

export const TaskCreatedEvent = new TypedEvent<ITaskCreatedEventPayload>(
  EventName.TaskCreated
);

export const TaskUpdatedEvent = new TypedEvent<ITaskAttached>(
  EventName.TaskUpdated
);

export const TaskDeletedEvent = new TypedEvent<ITaskAttached>(
  EventName.TaskDeleted
);
