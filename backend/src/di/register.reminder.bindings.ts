import { Container } from "inversify";
import { ReminderCreatedEventHandler } from "services/reminder/event-handlers/reminder.created.event.handlers";
import { ReminderDeletedEventHandler } from "services/reminder/event-handlers/reminder.deleted.event.handlers";
import { ReminderUpdatedEventHandler } from "services/reminder/event-handlers/reminder.updated.event.handlers";
import { ReminderService } from "services/reminder/reminder.service";

export const registerReminderBindings = (container: Container) => {
  container.bind(ReminderService).toSelf();
  container.bind(ReminderCreatedEventHandler).toSelf();
  container.bind(ReminderUpdatedEventHandler).toSelf();
  container.bind(ReminderDeletedEventHandler).toSelf();
};
