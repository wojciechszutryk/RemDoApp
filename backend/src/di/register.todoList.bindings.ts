import { TodoListController } from "controllers/todoList/todoList.controller";
import { TodoListTaskController } from "controllers/todoList/todoList.task.controller";
import {
  getTodoListCollection,
  TodoListCollectionName,
} from "dbSchemas/TodoList.schema";
import { Container } from "inversify";
import { CheckTodoListPermissions } from "middlewares/todoList/checkTodoListPermission.middleware";
import { TodoListService } from "services/TodoList.service";

export const registerTodoListBindings = (container: Container) => {
  container
    .bind(TodoListCollectionName)
    .toDynamicValue(() => getTodoListCollection());
  container.bind(CheckTodoListPermissions).toSelf();
  container.bind(TodoListService).toSelf();
  container.bind(TodoListController).toSelf();
  container.bind(TodoListTaskController).toSelf();
};
