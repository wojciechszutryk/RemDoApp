import { IUserAttached } from "linked-models/user/user.model";
import { ITaskAttached } from "../../task/task.model";
import { EventName } from "../event.enum";
import { TypedEvent } from "../event.interface";

export interface ITaskCreatedEventPayload {
  eventCreator: IUserAttached;
  createdTask: ITaskAttached;
}

export const TaskCreatedEvent = new TypedEvent<ITaskCreatedEventPayload>(
  EventName.TaskCreated
);

export const TaskUpdatedEvent = new TypedEvent<ITaskAttached>(
  EventName.TaskUpdated
);

export const TaskDeletedEvent = new TypedEvent<ITaskAttached>(
  EventName.TaskDeleted
);
