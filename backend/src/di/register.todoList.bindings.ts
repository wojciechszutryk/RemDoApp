import { TodoListController } from "controllers/todoList/todoList.controller";
import { TodoListTaskController } from "controllers/todoList/todoList.task.controller";
import { TodoListTasksController } from "controllers/todoList/todoList.tasks.controller";
import { TodoListsController } from "controllers/todoList/todoLists.controller";
import {
  getTodoListCollection,
  TodoListCollectionName,
} from "dbSchemas/TodoList.schema";
import { Container } from "inversify";
import { SetPermissions } from "middlewares/permissions/setPermissions.middleware";
import { TodoListService } from "services/TodoList.service";

export const registerTodoListBindings = (container: Container) => {
  container
    .bind(TodoListCollectionName)
    .toDynamicValue(() => getTodoListCollection());
  container.bind(SetPermissions).toSelf();
  container.bind(TodoListService).toSelf();
  container.bind(TodoListsController).toSelf();
  container.bind(TodoListController).toSelf();
  container.bind(TodoListTasksController).toSelf();
  container.bind(TodoListTaskController).toSelf();
};
