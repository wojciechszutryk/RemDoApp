import "controllers/todoList/todoList.controller";
import "controllers/todoList/todoList.task.controller";
import "controllers/todoList/todoList.tasks.controller";
import "controllers/todoList/todoLists.controller";
import "controllers/user/user.auth.controller";
import "controllers/user/user.controller";
import "controllers/user/user.notification";
import { Container } from "inversify";

export const container = new Container({
  defaultScope: "Request",
  autoBindInjectable: true,
});
