import { Container } from "inversify";
import { ReminderService } from "services/reminder/reminder.service";

export const registerReminderBindings = (container: Container) => {
  container.bind(ReminderService).toSelf();
};
