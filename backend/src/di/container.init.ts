import "controllers/reminder.controller";
import "controllers/reminders.controller";
import "controllers/todoList.controller";
import "controllers/todoList.task.controller";
import "controllers/todoList.tasks.controller";
import "controllers/todoLists.controller";
import "controllers/user.auth.controller";
import "controllers/user.collaborants.controller";
import "controllers/user.controller";
import "controllers/user.notification";
import { Container } from "inversify";

export const container = new Container({
  defaultScope: "Request",
  autoBindInjectable: true,
});
