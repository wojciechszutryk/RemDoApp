import "controllers/collaboration/collaboration.invintation.controller";
import "controllers/collaboration/user.collaborants.controller";
import "controllers/other/pushSubscription.controller";
import "controllers/reminder/reminder.controller";
import "controllers/reminder/reminders.controller";
import "controllers/task/todoList.task.controller";
import "controllers/task/todoList.tasks.controller";
import "controllers/todoList/todoList.controller";
import "controllers/todoList/todoLists.controller";
import "controllers/user/user.auth.controller";
import "controllers/user/user.controller";
import "controllers/user/user.notification";
import { Container } from "inversify";

export const container = new Container({
  // defaultScope: "Request",
  // autoBindInjectable: true,
});
