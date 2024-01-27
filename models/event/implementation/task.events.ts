import { ITaskAttached } from "../../task/task.model";
import { EventName } from "../event.enum";
import { CreatorScopedEventPayload } from "../event.handler.interface";
import { TypedEvent } from "../event.interface";

export const TaskCreatedEvent = new TypedEvent<
  CreatorScopedEventPayload<ITaskAttached>
>(EventName.TaskCreated);

export const TaskUpdatedEvent = new TypedEvent<
  CreatorScopedEventPayload<
    ITaskAttached & {
      updateType: EventName;
    }
  >
>(EventName.TaskUpdated);

export const TaskDeletedEvent = new TypedEvent<ITaskAttached>(
  EventName.TaskDeleted
);
