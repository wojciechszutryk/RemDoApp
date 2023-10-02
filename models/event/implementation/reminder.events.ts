import { IUserAttached } from "linked-models/user/user.model";
import { IReminderAttached } from "../../reminder/reminder.model";
import { EventName } from "../event.enum";
import { TypedEvent } from "../event.interface";

export interface IReminderCreatedEventPayload {
  eventCreator: IUserAttached;
  createdReminder: IReminderAttached;
}

export const ReminderCreatedEvent =
  new TypedEvent<IReminderCreatedEventPayload>(EventName.ReminderCreated);

export const ReminderUpdatedEvent = new TypedEvent<IReminderAttached>(
  EventName.ReminderUpdated
);

export const ReminderDeletedEvent = new TypedEvent<IReminderAttached>(
  EventName.ReminderDeleted
);
