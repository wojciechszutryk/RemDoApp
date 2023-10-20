import { IReminderAttached } from "../../reminder/reminder.model";
import { EventName } from "../event.enum";
import { CreatorScopedEventPayload } from "../event.handler.interface";
import { TypedEvent } from "../event.interface";

export const ReminderCreatedEvent = new TypedEvent<
  CreatorScopedEventPayload<IReminderAttached>
>(EventName.ReminderCreated);

export const ReminderUpdatedEvent = new TypedEvent<
  CreatorScopedEventPayload<IReminderAttached>
>(EventName.ReminderUpdated);

export const ReminderDeletedEvent = new TypedEvent<IReminderAttached>(
  EventName.ReminderDeleted
);
