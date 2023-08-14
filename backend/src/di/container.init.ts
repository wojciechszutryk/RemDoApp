import "controllers/collaboration/user.collaborants.controller";
import "controllers/reminder/reminder.controller";
import "controllers/reminders.controller";
import "controllers/task/todoList.task.controller";
import "controllers/todoList.tasks.controller";
import "controllers/todoList/todoList.controller";
import "controllers/todoLists.controller";
import "controllers/user.controller";
import "controllers/user.notification";
import "controllers/user/user.auth.controller";
import { Container } from "inversify";

export const container = new Container({
  defaultScope: "Request",
  autoBindInjectable: true,
});
