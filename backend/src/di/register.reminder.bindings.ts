import { Container } from "inversify";
import { ReminderCreatedEventHandler } from "events/reminder/reminder.created.event.handlers";
import { ReminderDeletedEventHandler } from "events/reminder/reminder.deleted.event.handlers";
import { ReminderUpdatedEventHandler } from "events/reminder/reminder.updated.event.handlers";
import { ReminderService } from "services/reminder/reminder.service";

export const registerReminderBindings = (container: Container) => {
  container.bind(ReminderService).toSelf();
  container.bind(ReminderCreatedEventHandler).toSelf();
  container.bind(ReminderUpdatedEventHandler).toSelf();
  container.bind(ReminderDeletedEventHandler).toSelf();
};
